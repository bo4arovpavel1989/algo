/**
 * Function executes sort by choice of array
 * @param {Array} arr - array to be sorted
 * @param {Number} direction - direction of sort. 1 - ascending, -1 - descending
 * @returns {Array} - sorted array
 */
module.exports = function sortByChoice (arr, direction = 1) {
  const sortedArray = [];
  const targetLength = arr.length;
  const skipArray = new Array(targetLength);

  if (arr == null) return null;
  if (typeof (direction) !== 'number') throw new TypeError('Direction must be a number!');

  direction = direction >= 0 ? 1 : -1;

  while (sortedArray.length !== targetLength) {
    const extreme = getLastExtreme(arr, direction, skipArray);

    sortedArray.push(extreme);
  }

  return sortedArray;

  /**
   * Function gets extreme (max or min) item from array
   * skipping items, defined in skip array
   * @param {Array} arr - array to search through
   * @param {Number} direction - number defining search max (1) ot min (-1)
   * @param {Array} skip - array, defining which items should be scipped
   * @returns extreme item
   */
  function getLastExtreme (arr, direction = 1, skip) {
    let extreme, extremeIndex;

    arr.forEach((item, i) => {
      if (!skip[i] && extreme !== item) {
        if (extreme === undefined) {
          extreme = item;
          extremeIndex = i;
        }

        const compare = Number(item < extreme);
        const result = compare + direction;

        /**
         * Result === 2 - means item is
         * less than the extreme value and direction is ascending
         * - so thats target value
         * Result === -1 - means item is
         * more or equal than the extreme and direction is descending
         * - so that is also target value
         */
        if (result === 2 || result === -1) {
          extreme = item;
          extremeIndex = i;
        }
      }
    })

    skip[extremeIndex] = true;

    return extreme;
  }
}
