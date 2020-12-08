const fs = require('fs');

const input = fs
    .readFileSync('./input.txt')
    .toString()
    .split('\n')
    .map(row => ({
        opp: row.substr(0, 3),
        num: parseInt(row.substr(3))
    }));


const visited = new Set();
let acc = 0;
let currentIndex = 0;
let initialLength;
let finalLength;
do {
    initialLength = visited.size;

    const current = input[currentIndex];

    if (current.opp === 'nop') {
        currentIndex += 1;
    }
    if (current.opp === 'acc') {
        acc += current.num;
        currentIndex += 1;
    }
    if (current.opp === 'jmp') {
        currentIndex += current.num;
    }

    visited.add(currentIndex);
    finalLength = visited.size;
} while (initialLength !== finalLength)

console.log(acc);


function run(currentIndex, acc, wasChanged, set) {
    const current = input[currentIndex];

    if (currentIndex === input.length - 1) {
        return [true, acc + (current.opp === 'acc' ? current.num : 0)];
    }

    if (set.has(currentIndex)) {
        return [false];
    }

    
    const newSet = new Set(set);
    newSet.add(currentIndex);
    
    const getParams = () => {
        const op = current.opp;
        const nextIndex = currentIndex + (op === 'jmp' ? current.num : 1);
        const nextAcc = acc + (op === 'acc' ? current.num : 0);
        return [nextIndex, nextAcc, wasChanged, newSet]
    }

    const getChangedParams = () => {
        const getOp = () => {
            if (current.opp === 'jmp') {
                return 'nop';
            }
            if (current.opp === 'nop') {
                return 'jmp';
            }
            return current.opp
        }
        const op = getOp();

        const nextIndex = currentIndex + (op === 'jmp' ? current.num : 1);
        const nextAcc = acc + (op === 'acc' ? current.num : 0);
        return [nextIndex, nextAcc, true, newSet]
    }
    

    const result1 = run(...getParams())
    if (result1[0]) {
        return result1;
    }
    if (!wasChanged) {
        const result2 = run(...getChangedParams())
        if (result2[0]) {
            return result2
        }
        return [false]
    }
    return [false];
}

console.log(run(0, 0, false, new Set()));