const node = (data) => {
  return {
    data,
    left: null,
    right: null
  }
}

const tree = (array) => {
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
}

const thing = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const newTree = tree(thing)

console.log('----------------')

const unorderedThing = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const unorderedTree = tree(unorderedThing)
