// Simple performance test of SIMD.add operation.  Use SIMD.add to average up elements
// in a Float32Array. Compare to scalar implementation of same function.
// Author: Peter Jensen

(function () {

  // Kernel configuration
  var kernelConfig = {
    kernelName:       "Average",
    kernelInit:       initArray,
    kernelCleanup:    cleanup,
    kernelSimd:       simdAverage,
    kernelNonSimd:    average,
    kernelIterations: 1000
  };

  // Hook up to the harness
  benchmarks.add(new Benchmark(kernelConfig));

  function sanityCheck() {
     return Math.abs(average(1) - simdAverage(1)) < 0.0001;
  }

  function initArray() {
    // Check that the two kernel functions yields the same result, roughly
    // Account for the fact that the simdAverage() is computed using float32
    // precision and the average() is using double precision
    return sanityCheck();
  }

  function cleanup() {
    return sanityCheck();
  }

  var length = 10000;
  var value = 0.5;

  function average(n) {
    var sum = 0.0;    // Make the Ion phi node inference happy.
    for (var i = 0; i < n; ++i) {
      var sum = 0.0;
      for (var j = 0, l = length; j < l; ++j) {
        sum += value;
      }
    }
//    print(sum);
    return sum/length;
  }

  function simdAverage(n) {
    var sum4 = SIMD.float32x4.zero(); // Make the Ion phi node inference happy.
    var b = SIMD.float32x4.splat(value);
    for (var i = 0; i < n; ++i) {
      var sum4 = SIMD.float32x4.zero();
      for (var j = 0; j < length/4; ++j) {
        sum4 = SIMD.float32x4.add(sum4, b);
      }
    }
//    print(sum4.x + sum4.y + sum4.z + sum4.w);
    return (sum4.x + sum4.y + sum4.z + sum4.w)/length;
  }

} ());
