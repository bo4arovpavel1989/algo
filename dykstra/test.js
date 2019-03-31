const chai = require('chai');
const { expect } = chai;
const Dykstra = require('./dykstra');


describe('Dykstra', () => {
  const graph = {
    a: { b: 10, c: 20, k: 20 },
    b: { c: 5, d: 30 },
    c: { d: 5 },
    d: { f: 5, g: 2, finish: 10 },
    f: { finish: 2 },
    g: { finish: 5 },
    k: { finish: 7 },
    finish: {}
  };

  const brokenGraph = {
    a: { b: 10, c: 20 },
    b: { c: 5, d: 30 },
    c: { d: 5 },
    d: { f: 5 },
    f: { },
    finish: {}
  };

  it ('should find shortest way', () => {
    const finder = new Dykstra(graph);
    const result = finder.findWay('a', 'finish');

    expect(result).to.eql({
      way: 27,
      paths: [
        ['a', 'b', 'c', 'd', 'f', 'finish'],
        ['a', 'b', 'c', 'd', 'g', 'finish'],
        ['a', 'k', 'finish']
      ]
    });
  })

  it ('should find shortest way and dont go through all graph', () => {
    const finder = new Dykstra(graph);
    const result = finder.findWay('a', 'c');

    expect(finder.labels.finish).to.eql(Infinity);
    expect(result).to.eql({
      way: 15,
      paths: [
        ['a', 'b', 'c']
      ]
    });
  })

  it ('should not find shortest way', () => {
    const finder = new Dykstra(graph);
    const result = finder.findWay('a', 'fakeFinish');

    expect(result).to.eql(false);
  })

  it ('should not find shortest way in broken graph', () => {
    const finder = new Dykstra(brokenGraph);
    const result = finder.findWay('a', 'finish');

    expect(result).to.eql(false);
  })
});
