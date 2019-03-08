/**
 * Function executes binary search on sorted array
 * @param {Array} arr - array to make seacrh in
 * @param item - target to be searched
 * @returns {Number} - index of target in array. -1 if not any
 */
const binarySearch = function (arr, item) {
  let min = 0;
  let max = arr.length - 1;
  let guess = Math.floor((min + max) / 2)
  let result = -1;

  while (guess !== min && min < max) {
    if (arr[guess] === item) {
      result = guess;
      break;
    } else if (arr[guess] < item){
      min = guess;
      guess = Math.floor((min + max) / 2);
    } else {
      max = guess;
      guess = Math.floor((min + max) / 2);
    }
  }

  return result;
}

module.exports = binarySearch;
