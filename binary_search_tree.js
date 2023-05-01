const node = (data) => {
  return {
    data,
    left: null,
    right: null
  }
}

const tree = (array) => {
  const buildTree = (array) => {
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

  let root = buildTree(array)

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

  const find = (toFind, root) => {
    if (!root) return null
    while (root) {
      if (root && root.data === toFind) { return root }
      if (toFind < root.data && root.left) root = root.left
      else if (toFind > root.data && root.right) root = root.right
      else root = null
    }
    return root
  }

  const levelOrder = (root, fn) => {
    if (!root) return []

    const queue = [root]
    const values = []

    while (queue.length) {
      const nextNode = queue.shift()

      if (fn) fn(nextNode.data)
      else values.push(nextNode.data)

      if (nextNode.left) queue.push(nextNode.left)
      if (nextNode.right) queue.push(nextNode.right)
    }
    return values
  }

  const inOrder = (root, fn) => {
    if (!root) return []

    const values = []

    if (root.left) values.push(inOrder(root.left, fn))
    if (fn) fn(root.data)
    else values.push(root.data)
    if (root.right) values.push(inOrder(root.right, fn))

    return [...values].flat()
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
    get root() {
      return root
    },
    insert,
    prettyPrint,
    find,
    levelOrder
    levelOrder,
    inOrder,
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
newTree.insert(newTree.root, 4.2)
newTree.insert(newTree.root, 4.3)
newTree.insert(newTree.root, 4.1)
newTree.prettyPrint(newTree.root)

console.log('----------------')

console.log(newTree.find(-5, newTree.root))
console.log(newTree.find(9, newTree.root))
console.log(newTree.find(5, newTree.root))
console.log(newTree.find(-10501, newTree.root))

console.log('----------------')

let count = 0
const testFunc = (val) => {
  if (Math.round(val) % 2 === 0) count *= val
  else count += val
}
newTree.levelOrder(newTree.root, testFunc)
console.log(count)
console.log(newTree.levelOrder(newTree.root))
