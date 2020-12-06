const fs = require('fs');
const groupBy = require('lodash/groupBy');

const file = fs.readFileSync('./input.txt').toString();

const inputs = file.split('\n\n').map(e => e.split('\n'));

// const result1 = inputs.reduce((total, group) => total + uniq(group.join('').split('')).length, 0)
// console.log(result1)

const result2 = inputs.reduce((total, group) => {
    const pplCount = group.length;
    const common = Object.entries(groupBy(group.join('').split(''), e => e)).map(([key, val]) => val).filter(e => e.length === pplCount).length;
    return total + common;
}, 0)
console.log(result2)

