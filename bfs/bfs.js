/**
  * Class defining method of finding target node in graph
  * it determines whether it's possible to reach finish from start or not
  * it returns all shortest ways (one ore more) if there are or false
  */
class BFS {
  /**
    * Create instance of BFS seeker.
    * @param {Object} graph - {node: [children], node2:[children] ...}
    */
  constructor (graph) {
    this.graph = graph;
    this.queue = [];
    this.way = [];
    this.checked = [];
  }

  /**
    * Method adds not empty nodeList to queue to be checked
    * @param {Array} nodeList
    * @returns {void}
    */
  addToQueue (nodeList) {
    if (nodeList && nodeList.length > 0) this.queue.push(nodeList)
  }

  /**
    * Method gets first member (nodeList) in queue
    * @returns {Array} - nodeList to be checked
    */
  getFromQueue () {
    return this.queue.shift();
  }

  /**
    * Method sets startpoint of graph to perform further seeking
    * @param {String} node - name of start point
    * @returns {Object} - current BFS instance
    */
  setStart (node) {
    this.start = node;

    this.steps = 1;
    this.queue = [this.getUncheckedChildren([node])];
    this.checked = [];

    return this;
  }

  /**
    * Method collects all children of nodes in nodelist
    * and gatheres all previously not checked children in mutual array
    * @param {Array} nodeList - nodes to find children of
    * @returns {Array} next nodeList to put in queue
    */
  getUncheckedChildren (nodeList) {
    const list = [];

    for (let i of nodeList) {
      const children = this.graph[i];

      if (children && children.length > 0) {
        children.forEach(node => {
          if (this.checked.includes(node)) return false;

          list.push(node);
        })
      }
    }

    return list;
  }

  /**
    * Method checks every node in nodeList to be target one
    * @param {String} node - target node
    * @param {Array} nodeList - to be checked
    * @returns {Boolean} representing whether target node is in nodeList
    */
  checkNodeList (node, nodeList) {
    for (let i of nodeList) {
      if (i === node) return true;

      this.checked.push(i);
    }

    return false;
  }

  /**
    * Method recursively goes through queue and performs search of target node
    * if queue becomes empty before target found - it means target is not reachable
    * @param {String} node - target node to be found
    * @returns {Function/Boolean/Number} - recursive call, number of steps or false if target is not reachable
    */
  findNode (node) {
    const nodeList = this.getFromQueue();

    if (nodeList === undefined) return false;

    const check = this.checkNodeList(node, nodeList);

    if (check) return this.restoreWay(node);
    else {
      const children = this.getUncheckedChildren(nodeList);

      this.addToQueue(children)
    }

    this.steps++;

    return this.findNode(node)
  }

  /**
    * Method generates shortest way based on calculated steps from start to finish
    * it combines all possible combinates, but not more than steps and choose all that fit
    * @param {String} node - target to reach
    * @returns {Array} - all shortest way [[way], [way], ...]
    */
  restoreWay (node) {
    const current = this.start;
    let ways = [[current]];
    const shortestWays = [];
    let steps = this.steps;

    while (steps > 0) {
      const newWays = [];

      ways.forEach(way => {
        const currentNode = way[way.length - 1];
        const children = this.graph[currentNode];

        if (children && children.length > 0) {
          children.forEach(child => {
            if (child === node) shortestWays.push([...way, child])

            newWays.push([...way, child])
          })
        }
      })

      ways = newWays;
      steps--;
    }

    return shortestWays;
  }
 }

 module.exports = BFS;
