const fs = require('fs');
const uniq = require('lodash/uniq');

const file = fs.readFileSync('./input.txt').toString();

const myBag = 'shiny gold';

const inputs = file
    .split('\n')
    .map(row => {
        const parent = row.match(/(.*) bags contain/)[1]
        const childrenStrFull = row.match(/contain.*/)[0]
        const childrenStr = childrenStrFull.startsWith('contain') ? childrenStrFull.substr(7).trim() : childrenStrFull.trim();
        const children = childrenStr.split(',').map(r => {
            const count = parseInt(r);
            const m = r.match(/\d(.*) bag/);
            return {
                count,
                type: m ? m[1].trim() : null,
            }
        })
        .filter(e => e.count && e.type)

        return {
            parent,
            children
        }
    })
    

// FIRST
const inputs1 = inputs.filter(e => e.parent !== myBag);
const results = [];
let nodes = [myBag];
do {
    const current = nodes[0];
    const possibleParents = inputs1.filter(e => e.children.some(c => c.type === current));
    nodes.push(...(possibleParents.map(e => e.parent)));
    nodes = nodes.slice(1)
    results.push(...(possibleParents.map(e => e.parent)));
} while (nodes.length);

console.log(uniq(results).length)

// SECOND
function countChildren(type, currentCount) {
    const children = inputs.find(e => e.parent === type).children;

    if (!children.length) {
        return currentCount;
    }
    
    return currentCount+children.reduce((acc, curr) => acc + countChildren(curr.type,  currentCount*curr.count), 0)
}

let count = inputs
    .find(e => e.parent === myBag).children
    .reduce((acc, curr) => acc + countChildren(curr.type, curr.count), 0)

console.log(count)