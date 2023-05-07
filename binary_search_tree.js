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

  const deleteNode = (toDelete) => {
    root = deleteNodeRec(toDelete)
  }

  const deleteNodeRec = (toDelete, node = root) => {
    if (node === null) return node
    else if (toDelete < node.data) node.left = deleteNodeRec(toDelete, node.left)
    else if (toDelete > node.data) node.right = deleteNodeRec(toDelete, node.right)
    else {
      if (!node.left && !node.right) return null
      if (!node.right) return node.left
      else if (!node.left) return node.right

      node.data = find(inOrder(null, node.right)[0]).data
      node.right = deleteNodeRec(node.data, node.right)
    }
    return node
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
    depth,
    isBalanced,
    deleteNode
  }
}

const generateNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const driver = () => {
  const treeArr = []
  for (let i = 0; i < 9; i++) {
    treeArr.push(generateNumber(0, 10))
  }
  const testTree = tree(treeArr)
  testTree.prettyPrint(testTree.root)
  console.log('Tree is balanced: ', testTree.isBalanced())
  console.log('levelOrder of tree: ', testTree.levelOrder())
  console.log('preOrder of tree: ', testTree.preOrder())
  console.log('postOrder of tree: ', testTree.postOrder())
  console.log('inOrder of tree: ', testTree.inOrder())
  console.log()
  console.log('Numbers >100 added to tree')
  testTree.insert(generateNumber(100, 200))
  testTree.insert(generateNumber(100, 200))
  testTree.insert(generateNumber(100, 200))
  testTree.insert(generateNumber(100, 200))
  console.log('Tree is balanced: ', testTree.isBalanced())
  console.log()
  console.log('Rebalancing tree')
  console.log()
  testTree.rebalance()
  console.log('Tree is balanced: ', testTree.isBalanced())
  console.log('levelOrder of tree: ', testTree.levelOrder())
  console.log('preOrder of tree: ', testTree.preOrder())
  console.log('postOrder of tree: ', testTree.postOrder())
  console.log('inOrder of tree: ', testTree.inOrder())
}

driver()
