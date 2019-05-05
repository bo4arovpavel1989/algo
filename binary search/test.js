const chai = require('chai');
const { expect } = chai;
const binarySearch = require('./binary-search');


describe('binarySearch', () => {
  it('should find item in array', () => {
    const arr = [1,2,3,4,5,6,7,8,9,10,11];
    const item = 3;
    const result = binarySearch(arr, item);

    expect(result).to.eql(2);
  })

  it('should find item in array', () => {
    const arr = [1,2];
    const item = 2;
    const result = binarySearch(arr, item);

    expect(result).to.eql(1);
  })

  it('should return -1', () => {
    const arr = [1,2,3,4,5,6,7,8,9,10];
    const item = 11;
    const result = binarySearch(arr, item);

    expect(result).to.eql(-1);
  })

  it('should return -1 for empty array', () => {
    const arr = [];
    const item = 11;
    const result = binarySearch(arr, item);

    expect(result).to.eql(-1);
  })
});
