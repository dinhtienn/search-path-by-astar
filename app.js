// Grapth and Data
let createGraph = require('ngraph.graph');
let graph = createGraph();

const listLocation = {
    'BẠCH MAI': ['A', 'B', 'C'], 
    'THANH NHÀN': ['C', 'D', 'E', 'F'], 
    'NGÕ QUỲNH': ['B', 'D'], 
    'KIM NGƯU': ['G', 'F'], 
    'TRẦN KHÁT CHÂN': ['A', 'H', 'G'], 
    'VÕ THỊ SÁU': ['H', 'E'],
    'LẠC TRUNG': ['F'],
};

const listNode = {
    'A': {x: 21.008703, y: 105.851438},
    'B': {x: 21.005588, y: 105.851164},
    'C': {x: 21.003134, y: 105.850917},
    'D': {x: 21.002856, y: 105.854357},
    'E': {x: 21.002816, y: 105.854956},
    'F': {x: 21.003034, y: 105.861303},
    'G': {x: 21.009054, y: 105.860635},
    'H': {x: 21.008953, y: 105.854680},
}

for (const [key, value] of Object.entries(listNode)) {
    graph.addNode(key, value);
}

graph.addLink('A', 'B');
graph.addLink('A', 'H');
graph.addLink('B', 'C');
graph.addLink('B', 'D');
graph.addLink('C', 'D');
graph.addLink('D', 'E');
graph.addLink('E', 'F');
graph.addLink('E', 'H');
graph.addLink('F', 'G');
graph.addLink('G', 'H');

// Function
distance = (fromNode, toNode) => {
    let dx = fromNode.x - toNode.x;
    let dy = fromNode.y - toNode.y;

    return Math.sqrt(dx * dx + dy * dy);
}

totalDistance = (listNodePath) => {
    let total = 0;
    for (let i = 0; i < listNodePath.length - 1; i++) {
        const fromNode = listNodePath[i];
        const toNode = listNodePath[i + 1];
        total += distance(listNode[fromNode], listNode[toNode]);
    }
    return total;
}

checkNodeInLocation = (node) => {
    let listLocationContain = [];
    for (const [key, value] of Object.entries(listLocation)) {
        if (value.includes(node)) listLocationContain.push(key);
    }
    return listLocationContain;
}

getLocationBetweenNode = (listLocation1, listLocation2) => {
    for (let i = 0; i < listLocation1.length; i++) {
        if (listLocation2.includes(listLocation1[i])) return listLocation1[i];
    }
    return 'NOT FOUND';
}

// Path
let path = require('ngraph.path');
let pathFinder = path.aStar(graph, {
    distance(fromNode, toNode) {
        let dx = fromNode.data.x - toNode.data.x;
        let dy = fromNode.data.y - toNode.data.y;
    
        return Math.sqrt(dx * dx + dy * dy);
    }
});

// Input data
let from = '', to = '';
const prompt = require('prompt-sync')();
 
while (!(from in listLocation)) {
    from = prompt('Nhập điểm xuất phát: ').toUpperCase();
    if (!(from in listLocation)) console.log('Điểm xuất phát không có trên bản đồ');
}
while (!(to in listLocation)) {
    to = prompt('Nhập điểm đến: ').toUpperCase();
    if (!(to in listLocation)) console.log('Điểm đến không có trên bản đồ');
}

// Process data
let listRoute = [];
let listDistance = [];
for (let i = 0; i < listLocation[from].length; i++) {
    for (let j = 0; j < listLocation[to].length; j++) {
        const route = pathFinder.find(listLocation[from][i], listLocation[to][j]);
        listRoute.push(route);
        listDistance.push(totalDistance(route.map(item => item.id)));
    }
}

// Get shortest route
let minDistance = listDistance[0];
for (let i = 0; i < listDistance.length; i++) {
    if (listDistance[i] < minDistance) minDistance = listDistance[i];
}
const index = listDistance.indexOf(minDistance);
const resultPath = listRoute[index].reverse().map(item => item.id);

// Process result
let resultData = [];
resultData.push(from);
for (let i = 0; i < resultPath.length; i++) {
    const listLocationContain = checkNodeInLocation(resultPath[i]);
    if (listLocationContain.includes(to)) resultData.push(to);
    else {
        const location = getLocationBetweenNode(listLocationContain, checkNodeInLocation(resultPath[i + 1]));
        if (resultData.includes(location)) continue;
        resultData.push(location);
    }
}

// Display result
console.log('Đường đi đề xuất: ' + resultData.join(' -> '));
