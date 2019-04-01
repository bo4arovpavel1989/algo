/**
  * Class defining dykstra find way algo.
  */
class Dykstra {
  /**
    * Accepts graph to manipulate with
    * @param {Object} graph - {a: {b: val, c: val}, ...etc}
    */
  constructor (graph) {
    this.graph = graph;
  }

  /**
    * Method accepts initial params of start and finish and executes finding
    * @param {String} start
    * @param {String} finish
    * @returns {Function call}
    */
  findWay (start, finish) {
    this.start = start;
    this.finish = finish;
    this.init();

    return this.takeNextNode();
  }

  /**
    * Method defines basics values
    */
  init () {
    const start = this.start;

    this.labels = {};
    this.parents = {};
    this.labels[start] = 0;
    this.way = 0;
    this.visited = [];

    for (let node in this.graph) {
      if (node !== start) this.labels[node] = Infinity
    }
  }

  /**
    * Method takes minimal not visited node and calculates all its children labels
    */
  takeNextNode () {
    let currentNode = this.getMinNotVisitedNode();

    if (currentNode === this.finish) return this.getFullWay(this.labels[currentNode])
    else if (currentNode === undefined) return false;

    let children = this.graph[currentNode];

    for (let childNode in children) {
      this.parents[childNode] = this.parents[childNode] || [];
      this.parents[childNode].push(currentNode);
      this.refreshLabel(currentNode, childNode);
    }

    this.visited.push(currentNode);

    return this.takeNextNode();
  }

  /**
    * Method loops through all labeled nodes and choose min not visited yet one
    * @returns {String} name of min node
    */
  getMinNotVisitedNode () {
    let minValue, minNode;

    for (let node in this.labels) {
      if (this.visited.includes(node)) continue;

      if (minValue === undefined || this.labels[node] < minValue) {
        minValue = this.labels[node];
        minNode = node;
      }
    }

    return minNode;
  }

  /**
    * Method checks if the way from current node to childNode is shorter,
    * than its own (child) label.
    * If is - childNode labels becomes currentNode label plus way from currentNode to childNode
    * @param {String} currentNode - name of current node
    * @param {String} childNode
    * @returns {void}
    */
  refreshLabel (currentNode, childNode) {
    const wayToChild = this.labels[currentNode] + this.graph[currentNode][childNode];
    const childsOwnWay = this.labels[childNode]

    if (wayToChild < childsOwnWay) {
      this.labels[childNode] = wayToChild;
    }
  }

  /**
    * Method collects all possible shortest ways.
    * It starts from end and according to label values choose parent nodes
    * @param {Number} shortestWay
    * @returns {Object} - way params {way: val, paths: [path1, path2,...]}
    */
  getFullWay (shortestWay) {
    if (shortestWay === Infinity) return false;

    // As it begins from end - first currentNode is finish node
    let currentNodes = [this.finish];
    this.paths = [[this.finish]];
    let goon = true;

    while (goon) {
      let nextCurrentNodes = [];

      // Nodes that are part of possible shortest way
      currentNodes.forEach(currentNode => {
        // If one of possible ways is over we pass it
        if (currentNode === this.start) return;

        let parents = this.getParents(currentNode);
        let left = this.labels[currentNode];
        let possibleWayPoints = [];

        // It checks if parent node is part of possible way.
        // it doesnt duplicate if several nodes have mutual parent
        parents.forEach(parent => {
          if (this.labels[parent] + this.graph[parent][currentNode] === left) {
              possibleWayPoints.push(parent);

              if (!nextCurrentNodes.includes(parent)) {
                nextCurrentNodes.push(parent)
              }
          }
        });

        this.addPossibleWayPoints(currentNode, possibleWayPoints);
      });

      currentNodes = nextCurrentNodes;
      goon = !currentNodes.every(node => node === this.start)
    }

    let rightPaths = this.paths.map(path => path.reverse())

    return { way: shortestWay, paths: rightPaths };
  }

  /**
    * Method prolongates paths adding new wai point if it is connected with last
    * way point of existed path
    * @param {String} currentNode
    * @param {Array} possibleWayPoints
    * @returns {void}
    */
  addPossibleWayPoints (currentNode, possibleWayPoints) {
    let newPaths = [];

    // Add possibleWayPoints only to paths that include currentNode
    possibleWayPoints.forEach(point => {
      this.paths.forEach(path => {
        if (path[path.length - 1] === currentNode) newPaths.push([...path, point])
        else if (!newPaths.includes(path)) newPaths.push(path)
      })
    })

    this.paths = newPaths;
  }

  /**
    * Method get parent nodes
    * @param {String} currentNode
    * @returns {Array} - parents
    */
  getParents (currentNode) {
    return this.parents[currentNode];
  }
}

module.exports = Dykstra;
