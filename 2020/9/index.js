const fs = require('fs');

const input = fs
    .readFileSync('./input.txt')
    .toString()
    .split('\n')
    .map(e => parseInt(e));

const preambleLength = 25;

const notValidIndex = preambleLength + input
    .slice(preambleLength)
    .findIndex((current, i) => {
        const arr = input.slice(i, preambleLength + i);
        const results = [];

        for (let i = 0; i < arr.length - 1; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            results.push(arr[i] + arr[j]);
          }
        }
        return !results.includes(current);
    })
const notValid = input[notValidIndex];

console.log(notValidIndex, notValid)


function getSet(num, index, direction, set) {
    if (num === notValid) {
        return set;
    }

    if (num > notValid) {
        return false;
    }

    const nextIndex = index + direction;

    const nextNum = input[nextIndex];

    if (nextNum == null) {
        return false;
    }

    const nextSet = direction === 1 ? [...set, nextNum] : [nextNum, ...set];

    const result = getSet(num+nextNum, nextIndex, direction, nextSet);
    if (result) {
        return result;
    }
    return false;
}

const set = input.slice(0, notValidIndex).reduce((prev, curr, i) => {
    if (prev) {
        return prev;
    }
    const result1= getSet(curr, i, -1, [curr]);
    if (result1) {
        return result1;
    }
    const result2 = getSet(curr, i, +1, [curr]);
    if (result2) {
        return result2;
    }
}, false)

console.log(notValidIndex, notValid, set)

const sum = set.reduce((p, c) => p+c);

console.log(sum, Math.min(...set) + Math.max(...set));