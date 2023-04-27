const node = (data) => {
  return {
    data,
    left: null,
    right: null
  }
}

const tree = (array) => {
  const buildTree = (array, start, end) => {
    const sorted = array.sort((a, b) => a - b).filter((item, i) => array.indexOf(item) === i)

    const buildBranch = (start, end) => {
      if (start > end) { return null }

      const mid = Math.ceil((start + end) / 2)
      const treeRoot = node(sorted[mid])

      treeRoot.left = buildBranch(start, mid - 1)
      treeRoot.right = buildBranch(mid + 1, end)

      return treeRoot
    }
    return buildBranch(0, sorted.length - 1)
  }

  const root = buildTree(array, 0, array.length - 1)

  const insert = (root, newData) => {
    if (root === null) {
      return node(newData)
    }

    if (newData < root.data) {
      root.left = insert(root.left, newData)
    } else if (newData > root.data) {
      root.right = insert(root.right, newData)
    }

    return root
  }

  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) { return }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '|   ' : '    '}`, false)
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
    }
  }
  prettyPrint(root)

  return {
    root,
    insert,
    prettyPrint
  }
}

const thing = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const newTree = tree(thing)

console.log('----------------')

newTree.insert(newTree.root, 5.5)
newTree.insert(newTree.root, -5)
newTree.insert(newTree.root, 3.75)
newTree.insert(newTree.root, 3.8)
newTree.insert(newTree.root, 25)
newTree.insert(newTree.root, 25)
newTree.prettyPrint(newTree.root)
