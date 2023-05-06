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

  const insert = (newData, insertAt = root) => {
    if (insertAt === null) {
      return node(newData)
    }

    if (newData < insertAt.data) {
      insertAt.left = insert(newData, insertAt.left)
    } else if (newData > insertAt.data) {
      insertAt.right = insert(newData, insertAt.right)
    }

    return insertAt
  }

  const find = (toFind, node = root) => {
    if (!node) return null
    while (node) {
      if (node && node.data === toFind) { return node }
      if (toFind < node.data && node.left) node = node.left
      else if (toFind > node.data && node.right) node = node.right
      else node = null
    }
    return node
  }

  const levelOrder = (fn, node = root) => {
    if (!node) return []

    const queue = [node]
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

  const inOrder = (fn, node = root) => {
    if (!node) return []

    const values = []

    if (node.left) values.push(inOrder(fn, node.left))
    if (fn) fn(node.data)
    else values.push(node.data)
    if (node.right) values.push(inOrder(fn, node.right))

    return [...values].flat()
  }

  const preOrder = (fn, node = root) => {
    if (!node) return []

    const values = []

    if (fn) fn(node.data)
    else values.push(node.data)
    if (node.left) values.push(preOrder(fn, node.left))
    if (node.right) values.push(preOrder(fn, node.right))

    return [...values].flat()
  }

  const postOrder = (fn, node = root) => {
    if (!node) return []

    const values = []

    if (node.left) values.push(postOrder(fn, node.left))
    if (node.right) values.push(postOrder(fn, node.right))
    if (fn) fn(node.data)
    else values.push(node.data)

    return [...values].flat()
  }

  const height = (node = root) => {
    if (node === null) return 0
    if (node.left === null && node.right === null) return 0
    const left = height(node.left)
    const right = height(node.right)
    return Math.max(left, right) + 1
  }

  const depth = (toFind, node = root, currDepth = 0) => {
    if (node === null) return 0
    if (toFind.data === node.data) return currDepth
    const left = depth(toFind, node.left, currDepth)
    const right = depth(toFind, node.right, currDepth)
    return Math.min(left, right) + 1
  }

  const isBalanced = (node = root) => {
    return isBalancedRec(node) > 0 ? true : false
  }

  const isBalancedRec = (node = root) => {
    if (node === null) return 0
    const left = isBalancedRec(node.left)
    const right = isBalancedRec(node.right)
    if (left === -1) return -1
    if (right === -1) return -1
    if ((left - right) > 1 || (left - right) < -1) return -1
    return Math.max(left, right) + 1
  }

  const rebalance = () => {
    root = buildTree(inOrder())
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
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    rebalance,
    height,
    depth
    depth,
    isBalanced,
  }
}

const thing = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const newTree = tree(thing)

console.log('----------------')

newTree.insert(5.5)
newTree.insert(-5)
newTree.insert(3.75)
newTree.insert(3.8)
newTree.insert(25)
newTree.insert(25)
newTree.insert(4.2)
newTree.insert(4.3)
newTree.insert(4.1)
newTree.prettyPrint(newTree.root)

console.log('----------------')

console.log(newTree.find(-5))
console.log(newTree.find(9))
console.log(newTree.find(5))
console.log(newTree.find(-10501))

console.log('----------------')

let count = 0
const testFunc = (val) => {
  if (Math.round(val) % 2 === 0) count *= val
  else count += val
}
newTree.levelOrder(testFunc)
console.log(count)
console.log(newTree.levelOrder())

console.log('----------------')

const logTest = (val) => console.log(val)
newTree.inOrder(logTest)
console.log(newTree.inOrder())

console.log('----------------')

newTree.preOrder(logTest)
console.log(newTree.preOrder())

console.log('----------------')

newTree.postOrder(logTest)
console.log(newTree.postOrder())

console.log('----------------')

newTree.rebalance()
newTree.prettyPrint(newTree.root)

console.log('----------------')

console.log(newTree.height())
console.log(newTree.height(newTree.find(3.75)))
console.log(newTree.height(newTree.find(2)))
console.log(newTree.height(newTree.find(1)))
console.log(newTree.height(newTree.find(-5)))

console.log('----------------')

console.log(newTree.depth(newTree.root))
console.log(newTree.depth(newTree.find(3.75)))
console.log(newTree.depth(newTree.find(1)))
console.log(newTree.depth(newTree.find(-5)))

console.log('----------------')

console.log(newTree.isBalanced())
newTree.insert(26)
newTree.insert(27)
newTree.insert(28)
newTree.insert(29)
newTree.insert(30)
console.log(newTree.isBalanced())
newTree.rebalance()
console.log(newTree.isBalanced())

console.log('----------------')

