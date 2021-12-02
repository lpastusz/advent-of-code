const fs = require('fs');

module.exports.loadAndParseNumberArray = (fileName) => {
    return fs.readFileSync(fileName).toString().split('\n').filter(Boolean).map(Number);
}

module.exports.loadAndParseStringArray = (fileName) => {
    return fs.readFileSync(fileName).toString().split('\n').filter(Boolean);
}