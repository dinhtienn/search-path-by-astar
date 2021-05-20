// Grapth and Data
let createGraph = require('ngraph.graph');
let graph = createGraph();

const listLocation = ['BẠCH MAI', 'THANH NHÀN', 'NGÕ QUỲNH', 'KIM NGƯU', 'TRẦN KHÁT CHÂN', 'VÕ THỊ SÁU'];

graph.addNode('BẠCH MAI', {x: 21.008728, y: 105.851407});
graph.addNode('Thanh Nhàn', {x: 21.003149, y: 105.850914});
graph.addNode('NGÕ QUỲNH', {x: 21.005623, y: 105.851150});
graph.addNode('KIM NGƯU', {x: 21.003089, y: 105.861536});
graph.addNode('TRẦN KHÁT CHÂN', {x: 21.009068, y: 105.860631});
graph.addNode('VÕ THỊ SÁU', {x: 21.008954, y: 105.854686});

graph.addLink('BẠCH MAI', 'NGÕ QUỲNH');
graph.addLink('BẠCH MAI', 'VÕ THỊ SÁU');
graph.addLink('NGÕ QUỲNH', 'Thanh Nhàn');
graph.addLink('KIM NGƯU', 'Thanh Nhàn');
graph.addLink('KIM NGƯU', 'TRẦN KHÁT CHÂN');
graph.addLink('VÕ THỊ SÁU', 'TRẦN KHÁT CHÂN');
graph.addLink('VÕ THỊ SÁU', 'Thanh Nhàn', {x: 21.002838, y: 105.854950});

// Path
let path = require('ngraph.path');
let pathFinder = path.aStar(graph, {
    distance(fromNode, toNode) {
      let dx = fromNode.data.x - toNode.data.x;
      let dy = fromNode.data.y - toNode.data.y;

      return Math.sqrt(dx * dx + dy * dy);
    }
});

let from = '', to = '';
const prompt = require('prompt-sync')();
 
while (!listLocation.includes(from)) {
    from = prompt('Nhập điểm xuất phát: ').toUpperCase();
    if (!listLocation.includes(from)) console.log('Điểm xuất phát không có trên bản đồ');
}
while (!listLocation.includes(to)) {
    to = prompt('Nhập điểm đến: ').toUpperCase();
    if (!listLocation.includes(to)) console.log('Điểm đến không có trên bản đồ');
}

let route = pathFinder.find(from, to);
console.log('Đường đi: ' + route.reverse().map(item => item.id).join(' -> '));