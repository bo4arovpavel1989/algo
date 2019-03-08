const chai = require('chai'),
	{expect} = chai;
const sortByChoice = require('./sortByChoice');


describe('sortByChoice', () => {
  it('should sort number array in ascending order', () => {
    const arr = [3,5,2,6,1,8,0,4,1,7];
    const result = sortByChoice(arr, 1);

    expect(result).to.eql([0,1,1,2,3,4,5,6,7,8]);
  })

  it('should sort number array in descending order', () => {
    const arr = [3,5,2,6,1,8,0,4,1,7];
    const result = sortByChoice(arr, -1);

    expect(result).to.eql([8,7,6,5,4,3,2,1,1,0]);
  })

  it('should sort string array in ascending order', () => {
    const arr = ['asc', 'Dev', 'ab', 'Edv', 'yrw', 'Av'];
    const result = sortByChoice(arr, 1);

    expect(result).to.eql(arr.sort());
  })

  it('should sort string array in descending order', () => {
    const arr = ['asc', 'Dev', 'ab', 'Edv', 'yrw', 'Av'];
    const result = sortByChoice(arr, -1);

    expect(result).to.eql(['yrw', 'asc', 'ab', 'Edv', 'Dev', 'Av']);
  })

  it('should return empty array', () => {
    const arr = [];
    const result = sortByChoice(arr, 1);

    expect(result).to.eql([]);
  })

  it('should throw error', () => {
    const arr = [1,4,2];
    const result = sortByChoice.bind(null, arr, 'wrong');

    expect(result).to.throw(TypeError);
  })
});
