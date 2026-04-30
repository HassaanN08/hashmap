import HashMap from './app.js';

const test = HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.length(), test.keys(), test.values(), test.entries(), test.has('lion'))

test.set('lion', 'king')
test.set('elephant', 'big')

console.log(test.length(), test.keys(), test.values(), test.entries(), test.has('lion'))

test.set('moon', 'silver')

console.log(test.length(), test.keys(), test.values(), test.entries(), test.has('moon'))