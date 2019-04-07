const chai = require('chai');
const { expect } = chai;
const Greedy = require('./greedy');

describe('Greedy', () => {
  const params = {
    coverage: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    stations: {
      'a': [1, 2, 3],
      'b': [1, 2],
      'c': [1, 2, 4],
      'd': [5, 6],
      'e': [7, 8, 9],
      'f': [7],
      'g': [8],
      'h': [9]
    }
  };

  const brokenParams = {
    coverage: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    stations: {
      'a': [1, 2, 3],
      'b': [1, 2],
      'c': [1, 2, 4],
      'd': [5, 6]
    }
  }

  it ('should find optimal radio station coverage', () => {
    const greedy = new Greedy(params);
    const result = greedy.getStations();

    expect(result).to.include.deep.members(['a', 'c', 'd', 'e']);
  })

  it ('should throw because of insufficient stations coverage', () => {
    const greedy = new Greedy(brokenParams);
    const result = greedy.getStations.bind(greedy);

    expect(result).to.throw('Full coverage is unavailable!');
  })
});
