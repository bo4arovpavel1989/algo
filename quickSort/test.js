const chai = require('chai');
const { expect } = chai;
const arraySum = require('./arraySum');
const quickSort = require('./quickSort');


describe('arraySum', () => {
  it('should return sum of all elements of array', () => {
    const arr = [1,2,3];
    const result = arraySum(arr);

    expect(result).to.eql(6);
  })

  it('should return undefined for empty array', () => {
    const arr = [];
    const result = arraySum(arr);

    expect(result).to.eql(undefined);
  })

  it('should throw error for non array element', () => {
    const arr = {};
    const result = arraySum.bind(null, arr);

    expect(result).to.throw(TypeError);
  })
});

describe('quickSort', () => {
  it('should return sorted array', () => {
    const arr = [3,2,5,6,1,6,11,1,0,2,7];
    const result = quickSort(arr);

    expect(result).to.eql([0,1,1,2,2,3,5,6,6,7,11]);
  })

  it('should return descending sorted array', () => {
    const arr = [3,2,5,6,1,6,11,1,0,2,7];
    const result = quickSort(arr, -1);

    expect(result).to.eql([11,7,6,6,5,3,2,2,1,1,0]);
  })

  it('should return sorted array of 2 elements', () => {
    const arr = [3,2];
    const result = quickSort(arr);

    expect(result).to.eql([2,3]);
  })

  it('should return empty array', () => {
    const arr = [];
    const result = quickSort(arr);

    expect(result).to.eql([]);
  })

  it('should throw error for non array element', () => {
    const arr = {};
    const result = quickSort.bind(null, arr);

    expect(result).to.throw(TypeError);
  })
});
