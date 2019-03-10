/**
 * Function executes quick sort algorythm
 * based on dividing array on smaller arrays by some anchor element of array
 * and then sorting smaller arrays by quick sort algorythm either
 * @param {Array} arr - array to be sorted
 * @param {Number} direction - direciton of sort
 * @returns {Array} sorted array
 */
module.exports = function quickSort (arr, direction) {
  if (direction === undefined) direction = 1;
  if (typeof (direction) !== 'number') throw new TypeError('Direction must be a number!');
  if (!arr.pop) throw new TypeError('Argument must be array!')

  if (arr.length < 2) return arr;

  direction = direction >= 0 ? 1 : -1;

  const randomIndex = randomArrayIndex(arr);
  const anchEl = arr[randomIndex];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (i !== randomIndex) {
      const compare = Number(arr[i] <= anchEl);
      const result = compare + direction;

      if (result === 2 || result === -1) left.push(arr[i]);
      if (result === 1 || result === 0) right.push(arr[i]);
    }
  }

  return quickSort(left, direction).concat([anchEl])
                                   .concat(quickSort(right, direction));
}

/**
 * Function generates random index of array
 * @param {Array} arr
 * @returns {Number} - random integer index of array
 */
function randomArrayIndex (arr) {
    let rand = Math.random() * arr.length;

    rand = Math.floor(rand);

    return rand;
  }
