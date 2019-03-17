const chai = require('chai');
const { expect } = chai;
const BFS = require('./bfs');


describe('bfs', () => {
  const graph = {
    a: ['b', 'c'],
    b: ['c'],
    c: ['d', 'e'],
    d: ['finish'],
    e: ['g', 'finish'],
    g: ['finish']
  };

  const cycledGraph = {
    a: ['b', 'c'],
    b: ['c'],
    c: ['d', 'e'],
    d: ['a'],
    e: ['g', 'a'],
    g: ['a']
  };

  it('should find way in graph', () => {
    const start = 'a';
    const finish = 'finish';
    const bfs = new BFS(graph);
    const result = bfs.setStart(start).findNode(finish);

    expect(result).to.include.deep.members([['a', 'c', 'e', 'finish'], ['a', 'c', 'd', 'finish']]);
  })

  it('should not find way in graph', () => {
    const start = 'd';
    const finish = 'a';
    const bfs = new BFS(graph);
    const result = bfs.setStart(start).findNode(finish);

    expect(result).to.eql(false);
  })

  it('should not find way in cycled graph and return false', () => {
    const start = 'a';
    const finish = 'finish';
    const bfs = new BFS(cycledGraph);
    const result = bfs.setStart(start).findNode(finish);

    expect(result).to.eql(false);
  })
});
