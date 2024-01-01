// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const C = require("./test-module-1");

const calc1 = new C();

console.log(calc1.add(2, 6));

//exports
const calc2 = require("./test-module-2");

console.log(calc2.add(2, 6));
console.log(calc2.multiply(2, 6));
console.log(calc2.divide(6, 2));

//alternative
// const calc2 = require("./test-module-2");
const { add, multiply, divide } = require("./test-module-2");

console.log(add(2, 6));
console.log(multiply(2, 6));
console.log(divide(6, 2));

//caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
