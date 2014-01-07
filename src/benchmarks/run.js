if (typeof SIMD === "undefined") {
  load ('../ecmascript_simd.js');
}
// Float32x4Array and Int32x4Array are not supported yet in Ion.
/*
if (typeof Float32x4Array === "undefined") {
  load ('../float32x4array.js');
}
if (typeof Int32x4Array === "undefined") {
  load ('../int32x4array.js');
}
*/

var ArrayType = TypedObject.ArrayType;

var Float32x4Array = SIMD.float32x4.array();
Float32x4Array.prototype.setAt = function(index, value) {
  this[index] = value;
}
Float32x4Array.prototype.getAt = function(index) {
  return this[index];
}

var Int32x4Array = SIMD.int32x4.array();
Int32x4Array.prototype.setAt = function(index, value) {
  this[index] = value;
}
Int32x4Array.prototype.getAt = function(index) {
  return this[index];
}

load ('base.js');

// load individual benchmarks
load ('kernel-template.js');
load ('average.js');
load ('mandelbrot.js');
load ('matrix-multiplication.js');
load ('transform.js');
//load ('shiftrows.js');
//load ('aobench.js');
//load ('transpose4x4.js');
//load ('inverse4x4.js');

function printResult (str) {
  print (str);
}

function printError (str) {
  print (str);
}

function printScore (str) {
  print (str);
}

benchmarks.runAll ({notifyResult: printResult,
                    notifyError:  printError,
                    notifyScore:  printScore},
                   true);
