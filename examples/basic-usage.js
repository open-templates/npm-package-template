// Example: Basic Node.js usage (CommonJS)
const {
  greet,
  asyncGreet,
  ExampleClass,
  isProduction,
} = require('npm-package-template');

console.log('=== Basic Usage Examples ===');

console.log(greet('World'));

asyncGreet('Async World').then(message => {
  console.log(message);
});

const example = new ExampleClass('initial value');
console.log('Class getValue():', example.getValue());
example.setValue('new value');
console.log('Class after setValue():', example.getValue());

console.log('Is production?', isProduction());
