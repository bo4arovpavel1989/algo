/**
 * Class generates instance of object calculating optimal collection of most expensive staff
 */
class Dynamic {
  constructor (collection, total) {
    this.collection = collection;
    this.total = total;

    this.generateTable();
  }

  /**
   * Method generates table of elements to fill optimal collection table
   */
  generateTable () {
    this.getAllSub();
    this.table = {};

    this.collection.forEach((item, i) => {
      this.table[item.name] = {
        name: item.name,
        price: item.price,
        weight: item.weight,
        index: i,
        subs: this.subs
      }
    })
  }

  /**
   * Method loops through item collection and performs dynamic programming
   * @returns {Object} representing total max cost and collection;
   */
  getOptimal () {
    let optimals = [];

    for (let itemName in this.table) {
      optimals.push([]);

      let item = this.table[itemName];

      item.subs.forEach((maxWeight, i) => {
        // Prevmax - prev optimal collection for previous item if any
        let prevMax = optimals[item.index - 1] ? optimals[item.index - 1][i].total : 0;
        // Possible optimal collection for  current item
        let possibleMax;
        let current = item.price;
        let leftWeight = maxWeight - item.weight;
        let subIndex = this.subs.indexOf(leftWeight);

        if (leftWeight < 0) possibleMax = 0;
        else if (leftWeight === 0) possibleMax = current;
        else {
          // If there is some more space left,
          // we get current item + optimal collection for previous item
          // and left weight(i.e. subIndex) if any
          possibleMax = current;
          possibleMax += optimals[item.index - 1] && optimals[item.index - 1][subIndex] ?
              optimals[item.index - 1][subIndex].total
            :
              0;
        }

        if (prevMax >= possibleMax) {
          // If optimal collection for previous item is more we keep it
          // if it doesnt exist yet we just push total of zero
          let valToPush = optimals[item.index - 1] ?
              optimals[item.index - 1][i]
            :
              { total: 0, staff: [] };

          optimals[item.index].push(valToPush);
        } else {
          // We concat current item + optimal collection for previous item
          // amd left weight (subindex) if any
          let staff = [{ name: item.name, price: item.price, weight: item.weight }];
          let left = optimals[item.index - 1] && optimals[item.index - 1][subIndex] ?
              optimals[item.index - 1][subIndex].staff
            :
              [];

          optimals[item.index].push({ total: possibleMax, staff: staff.concat(left) });
        }
      });
    }

    return optimals[optimals.length - 1][this.subs.length - 1];
  }

  /**
   * Method gets lowest size of step and generates total chain
   * @returns {void}
   */
  getAllSub () {
    let min = Infinity;

    this.collection.forEach(item => {
      if (item.weight < min) min = item.weight;
    })

    this.subs = [];

    for (let i = min; i < this.total; i += min) this.subs.push(i);

    this.subs.push(this.total);
  }
}

module.exports = Dynamic;
