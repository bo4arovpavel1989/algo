/**
  * Greedy algo. The task is to provide full coverage of points by the least number of stations
  */

class Greedy {
  /**
    * Creates greedy instance
    * @param {Object} params - { coverage: [], stations: { name: [covers], ... }}
    */
  constructor (params) {
    this.coverage = params.coverage;
    this.stations = params.stations;
    this.left = this.coverage.slice();
    this.stationsAvailable = Object.keys(this.stations);
  }

  /**
    * Function recursively get optimal coverage station until this.left is empty;
    * @returns {Array} - station providing optimal coverage
    */
  getStations () {
    if (this.left.length === 0) return [];

    let station = this.getOptimalStation();

    if (station === undefined) throw new Error('Full coverage is unavailable!');

    return [station].concat(this.getStations());
  }

  /**
   * Method gets station from list of available and choose one that provides most
   * coverage of points in this.left
   * @returns {String} - station name
   */
  getOptimalStation () {
    let currentCoverage = [];
    let currentStation;

    for (let station of this.stationsAvailable) {
      if (currentCoverage.length === 0) {
        currentCoverage = this.getPossibleCoverage(station);

        if (currentCoverage.length > 0) currentStation = station;

        continue;
      }

      if (currentCoverage.length < this.getPossibleCoverage(station).length) {
        currentCoverage = this.getPossibleCoverage(station);
        currentStation = station;
      }
    }

    this.refreshLeft(currentCoverage);
    this.refreshAvailable(currentStation);

    return currentStation;
  }

  /**
   * Method checks how many points in this.left could be provided by current station
   * @returns {Array} - points from left covered by the stattion
   */
  getPossibleCoverage (station) {
    let coverage = [];

    this.stations[station].forEach(point => {
      if (this.left.includes(point)) coverage.push(point);
    })

    return coverage;
  }

  /**
   * Method removes covered points from this.left
   * @returns {void}
   */
  refreshLeft (currentCoverage) {
    currentCoverage.forEach(point => {
      let index = this.left.indexOf(point);

      this.left.splice(index, 1);
    })
  }

  /**
   * Method removes station from list of available
   * @returns {void}
   */
  refreshAvailable (currentStation) {
    let index = this.stationsAvailable.indexOf(currentStation);

    this.stationsAvailable.splice(index, 1);
  }
}

module.exports = Greedy;
