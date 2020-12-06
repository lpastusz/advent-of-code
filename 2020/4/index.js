const fs = require('fs');
const file = fs.readFileSync('./input.txt').toString();

const input = file.split('\n\n').map(e => e.split(/\s/));

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const rules = {
    byr: (e) => e.length === 4 && parseInt(e) >= 1920 && parseInt(e) <= 2002,
    iyr: (e) => e.length === 4 && parseInt(e) >= 2010 && parseInt(e) <= 2020,
    eyr: (e) => e.length === 4 && parseInt(e) >= 2020 && parseInt(e) <= 2030,
    hgt: (e) => { 
        const num = parseInt(e); const str = e.substr(e.length - 2, 2);
        if (str === 'cm') {
            return num >= 150 && num <= 193;
        }
        if (str == 'in') {
            return num >= 59 && num <= 76;
        }
        return false;
    },
    hcl: (e) => e.match(/#[a-f0-9]{6}/),
    ecl: (e) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(e),
    pid: (e) => e.length === 9 && e.match(/[0-9]{9}/),
}

const valid = input.filter(set => {
    return requiredFields.every(key => {
        const field = set.find(e => e.startsWith(key+':'));
        if (!field) {
            return false;
        }
        const val = field.substr(4).trim();
        return rules[key](val);
    })

})
console.log(valid.length)