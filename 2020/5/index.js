const fs = require('fs');

const file = fs.readFileSync('./input.txt').toString();

const inputs = file.split('\n').filter(e => e);

const getRow = (str) => parseInt(str.substr(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2);
const getSeat = (str) => parseInt(str.substr(7).replace(/R/g, '1').replace(/L/g, '0'), 2);

const seats = inputs.map(input => {
    return { row : getRow(input), seat: getSeat(input) }
});

// const result1 = seats.reduce((prev, curr) => Math.max((curr.row * 8) + curr.seat, prev) , 0)
// console.log(result1);

const result2 = seats.filter(e => e.row !== 0 && e.row !== 127).map((e) => Math.max((e.row * 8) + e.seat)).sort()

console.log(result2.find((e,i) => result2[i+1] === e + 2))
