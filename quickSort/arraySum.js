/**
 * Function that sums all elements of array
 * @param {Array} arr - array to sum through
 * @return sum of elements
 */
module.exports = function arraySum (arr) {
  let sum = arguments[1];

  if (!arr.pop) throw new TypeError('Argument must be array!');
  if (arr.length === 0) return sum;
  if (sum === undefined) sum = 0;

  const element = arr.pop();

  sum += element;

  return arraySum(arr, sum);
};
