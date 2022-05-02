const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data, left = null, right = null) {
    this.data = data
    this.left = left
    this.right = right
  }
}

class BinarySearchTree {

  constructor() {
    this.treeRoot = null
  }

  root() {
    return this.treeRoot
  }

  add(data) {
    const node = this.treeRoot
    if (!node) {
      this.treeRoot = new Node(data)
    } else {
      const searchTree = (node) => {
        if (node.data > data) {
          if (node.left === null) {
            node.left = new Node(data)
          } else {
            return searchTree(node.left)
          }
        } else if (node.data < data) {
          if (node.right === null) {
            node.right = new Node(data)
            return
          } else {
            return searchTree(node.right)
          }
        } else {
          return null
        }
      }
      searchTree(node)
    }
  }

  has(data) {
    return this.find(data) ? true : false
  }

  find(data) {
    let currentTree = this.treeRoot

    while (currentTree.data !== data) {
      if (data < currentTree.data) {
        currentTree = currentTree.left
      } else {
        currentTree = currentTree.right
      }

      if (currentTree == null) {
        return null
      }
    }

    return currentTree
  }

  findParent(element) {
    let current = this.treeRoot
    let parent = this.treeRoot

    while (current !== element) {
      if (element.data < current.data) {
        current = current.left
      } else {
        current = current.right
      }

      if (current !== element) {
        parent = current
      } else {
        break
      }
    }

    return parent
  }

  remove(data) {
    if (this.has(data)) {
      let current = this.find(data)
      let parent = this.findParent(current)

      if (current.left === null && current.right === null) {
        if (parent.left === current) {
          parent.left = null
        } else {
          parent.right = null
        }
      } else if ((current.left === null && current.right !== null) || (current.left !== null && current.right === null)) {
        let temp = current.left ? current.left : current.right
        if (parent.left === current) {
          parent.left = temp
        } else {
          parent.right = temp
        }
      } else {
        if (current.data < this.root().data) {
          let maxNode = this.max(current.left)
          current.data = this.remove(maxNode.data)
        } else if (current.data === this.root().data) {
          this.treeRoot = current.right
          let minNode = this.find(this.min(this.root()))
          minNode.left = current.left
        } else {
          let minNode = this.min(current.right)
          current.data = this.remove(minNode.data)
        }
      }
    }

    return data
  }

  min(element = this.root()) {
    let current = element

    while (current.left) {
      current = current.left
    }

    return current.data
  }

  max(element = this.root()) {
    let current = element

    while (current.right) {
      current = current.right
    }

    return current.data
  }
}

module.exports = {
  BinarySearchTree
};





    //   while (current.data !== data) {
    //     if (data < current.data) {
    //       current = current.left
    //     } else {
    //       current = current.right
    //     }

    //     if (current.data !== data) {
    //       parent = current
    //     } else {
    //       break
    //     }
    //   }

    //   if (current.left == null && current.right == null) {
    //     if (parent.left === current) {
    //       parent.left = null
    //     } else {
    //       parent.right = null
    //     }
    //     return data
    //   }
    //   if (current.left !== null && current.right === null) {
    //     parent.left = current.left
    //     return data
    //   }
    //   if (current.left === null && current.right !== null) {
    //     parent.right = current.right
    //     return data
    //   }
    //   if (current.left !== null && current.right !== null) {
    //     if (this.treeRoot.data > current.data) {
    //       if (current.right === null) {
    //         let tpl = current.left
    //         current.data = this.remove(current.left.data)
    //       } else {
    //         let tplMax = current
    //         while (tplMax.right) {
    //           tplMax = tplMax.right
    //         }
    //         current.data = this.remove(tplMax.data)
    //       }
    //     } else {
    //       if (current.left === null) {
    //         let tpl = current.right
    //         current.data = this.remove(current.right.data)
    //       } else {
    //         let tplMax = current
    //         while (tplMax.left) {
    //           tplMax = tplMax.left
    //         }
    //         current.data = this.remove(tplMax.data)
    //       }
    //     }
    //   }
    // }