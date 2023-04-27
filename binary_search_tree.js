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

  const root = buildTree(array, 0, array.lengh - 1)

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
}

const thing = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const newTree = tree(thing)

console.log('----------------')

const unorderedThing = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const unorderedTree = tree(unorderedThing)
