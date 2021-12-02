const fileOp = require('../load-file');

const input = fileOp.loadAndParseNumberArray(`${__dirname}/input.txt`);
const runVersion = process.argv[2];

if (runVersion === '1') {
    let increasing = 0;
    for (let i = 1; i <= input.length; i++) {
        if (input[i] > input[i - 1]) {
            increasing++;
        }
    }
    console.log(increasing);
}

if (runVersion === '2') {
    let increasing = 0;
    for (let i = 4; i <= input.length; i++) {
        const sum1 = input[i - 4] + input[i - 3] + input[i - 2];
        const sum2 = input[i - 3] + input[i - 2] + input[i - 1];
        if (sum2 > sum1) {
            increasing++;
        }
    }
    console.log(increasing);
}