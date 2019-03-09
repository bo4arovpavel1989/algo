/**
 * Function takes chest - array of items: boxes, some staff and maybe key
 * and search through all to find the key`
 * @param {Array} chest - main array containing items
 * @returns {Boolean} representing if is any key
 */
module.exports.loopSearch = function (chest) {
  const boxPile = [];
  let keyFound = false;

  chest.forEach(item => {
    if (item.name === 'box') boxPile.push(item)
    else if (item.name === 'key') keyFound = true;
  });

  while (boxPile.length > 0 && !keyFound) {
    const item = boxPile.pop();

    if (item.contains.name === 'key') {
      keyFound = true;
      break;
    } else if (item.contains.name === 'box') {
      boxPile.push(item.contains)
    }
  }

  return keyFound;
};

/**
 * Function takes chest - array of items: boxes, some staff and maybe key
 * and search through all to find the key`
 * @param {Array} chest - array containing items
 * @returns {Boolean} representing if is any key
 */
module.exports.recursionSearch = function recursionSearch (chest) {
  if (chest.length === 0) return false;

  const item =  chest.pop();

  if (item.contains.name === 'key') return true;
  else if (item.contains.name === 'box')  chest.push(item.contains);

  return recursionSearch(chest);
}
