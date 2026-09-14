import {
  AlgorithmStep,
  ArrayElement,
  BSTNode,
  BSTOperationId,
  BSTTreeData,
  PseudocodeLine,
} from '../types';

// ==========================================
// CLRS 4th Edition Chapter 12 Pseudocodes
// ==========================================

export const CLRS_TREE_INSERT_PSEUDOCODE: PseudocodeLine[] = [
  // TREE-INSERT(T, z)
  { lineNum: 1, procedure: 'TREE-INSERT', code: 'y = NIL' },
  { lineNum: 2, procedure: 'TREE-INSERT', code: 'x = T.root' },
  { lineNum: 3, procedure: 'TREE-INSERT', code: 'while x != NIL' },
  { lineNum: 4, procedure: 'TREE-INSERT', code: '    y = x' },
  { lineNum: 5, procedure: 'TREE-INSERT', code: '    if z.key < x.key' },
  { lineNum: 6, procedure: 'TREE-INSERT', code: '        x = x.left' },
  { lineNum: 7, procedure: 'TREE-INSERT', code: '    else x = x.right' },
  { lineNum: 8, procedure: 'TREE-INSERT', code: 'z.p = y' },
  { lineNum: 9, procedure: 'TREE-INSERT', code: 'if y == NIL' },
  { lineNum: 10, procedure: 'TREE-INSERT', code: '    T.root = z                        // tree T was empty' },
  { lineNum: 11, procedure: 'TREE-INSERT', code: 'elseif z.key < y.key' },
  { lineNum: 12, procedure: 'TREE-INSERT', code: '    y.left = z' },
  { lineNum: 13, procedure: 'TREE-INSERT', code: 'else y.right = z' },
];

export const CLRS_TREE_SEARCH_PSEUDOCODE: PseudocodeLine[] = [
  // TREE-SEARCH(x, k)
  { lineNum: 1, procedure: 'TREE-SEARCH', code: 'if x == NIL or k == x.key' },
  { lineNum: 2, procedure: 'TREE-SEARCH', code: '    return x' },
  { lineNum: 3, procedure: 'TREE-SEARCH', code: 'if k < x.key' },
  { lineNum: 4, procedure: 'TREE-SEARCH', code: '    return TREE-SEARCH(x.left, k)' },
  { lineNum: 5, procedure: 'TREE-SEARCH', code: 'else return TREE-SEARCH(x.right, k)' },
];

export const CLRS_ITERATIVE_TREE_SEARCH_PSEUDOCODE: PseudocodeLine[] = [
  // ITERATIVE-TREE-SEARCH(x, k)
  { lineNum: 1, procedure: 'ITERATIVE-TREE-SEARCH', code: 'while x != NIL and k != x.key' },
  { lineNum: 2, procedure: 'ITERATIVE-TREE-SEARCH', code: '    if k < x.key' },
  { lineNum: 3, procedure: 'ITERATIVE-TREE-SEARCH', code: '        x = x.left' },
  { lineNum: 4, procedure: 'ITERATIVE-TREE-SEARCH', code: '    else x = x.right' },
  { lineNum: 5, procedure: 'ITERATIVE-TREE-SEARCH', code: 'return x' },
];

export const CLRS_TREE_MINIMUM_PSEUDOCODE: PseudocodeLine[] = [
  // TREE-MINIMUM(x)
  { lineNum: 1, procedure: 'TREE-MINIMUM', code: 'while x.left != NIL' },
  { lineNum: 2, procedure: 'TREE-MINIMUM', code: '    x = x.left' },
  { lineNum: 3, procedure: 'TREE-MINIMUM', code: 'return x' },
];

export const CLRS_TREE_MAXIMUM_PSEUDOCODE: PseudocodeLine[] = [
  // TREE-MAXIMUM(x)
  { lineNum: 1, procedure: 'TREE-MAXIMUM', code: 'while x.right != NIL' },
  { lineNum: 2, procedure: 'TREE-MAXIMUM', code: '    x = x.right' },
  { lineNum: 3, procedure: 'TREE-MAXIMUM', code: 'return x' },
];

export const CLRS_TREE_SUCCESSOR_PSEUDOCODE: PseudocodeLine[] = [
  // TREE-SUCCESSOR(x)
  { lineNum: 1, procedure: 'TREE-SUCCESSOR', code: 'if x.right != NIL' },
  { lineNum: 2, procedure: 'TREE-SUCCESSOR', code: '    return TREE-MINIMUM(x.right)' },
  { lineNum: 3, procedure: 'TREE-SUCCESSOR', code: 'y = x.p' },
  { lineNum: 4, procedure: 'TREE-SUCCESSOR', code: 'while y != NIL and x == y.right' },
  { lineNum: 5, procedure: 'TREE-SUCCESSOR', code: '    x = y' },
  { lineNum: 6, procedure: 'TREE-SUCCESSOR', code: '    y = y.p' },
  { lineNum: 7, procedure: 'TREE-SUCCESSOR', code: 'return y' },

  // TREE-MINIMUM(x) subroutine
  { lineNum: 1, procedure: 'TREE-MINIMUM', code: 'while x.left != NIL' },
  { lineNum: 2, procedure: 'TREE-MINIMUM', code: '    x = x.left' },
  { lineNum: 3, procedure: 'TREE-MINIMUM', code: 'return x' },
];

export const CLRS_TREE_PREDECESSOR_PSEUDOCODE: PseudocodeLine[] = [
  // TREE-PREDECESSOR(x)
  { lineNum: 1, procedure: 'TREE-PREDECESSOR', code: 'if x.left != NIL' },
  { lineNum: 2, procedure: 'TREE-PREDECESSOR', code: '    return TREE-MAXIMUM(x.left)' },
  { lineNum: 3, procedure: 'TREE-PREDECESSOR', code: 'y = x.p' },
  { lineNum: 4, procedure: 'TREE-PREDECESSOR', code: 'while y != NIL and x == y.left' },
  { lineNum: 5, procedure: 'TREE-PREDECESSOR', code: '    x = y' },
  { lineNum: 6, procedure: 'TREE-PREDECESSOR', code: '    y = y.p' },
  { lineNum: 7, procedure: 'TREE-PREDECESSOR', code: 'return y' },

  // TREE-MAXIMUM(x) subroutine
  { lineNum: 1, procedure: 'TREE-MAXIMUM', code: 'while x.right != NIL' },
  { lineNum: 2, procedure: 'TREE-MAXIMUM', code: '    x = x.right' },
  { lineNum: 3, procedure: 'TREE-MAXIMUM', code: 'return x' },
];

export const CLRS_TREE_DELETE_PSEUDOCODE: PseudocodeLine[] = [
  // TREE-DELETE(T, z)
  { lineNum: 1, procedure: 'TREE-DELETE', code: 'if z.left == NIL' },
  { lineNum: 2, procedure: 'TREE-DELETE', code: '    TRANSPLANT(T, z, z.right)' },
  { lineNum: 3, procedure: 'TREE-DELETE', code: 'elseif z.right == NIL' },
  { lineNum: 4, procedure: 'TREE-DELETE', code: '    TRANSPLANT(T, z, z.left)' },
  { lineNum: 5, procedure: 'TREE-DELETE', code: 'else y = TREE-MINIMUM(z.right)' },
  { lineNum: 6, procedure: 'TREE-DELETE', code: '    if y != z.right' },
  { lineNum: 7, procedure: 'TREE-DELETE', code: '        TRANSPLANT(T, y, y.right)' },
  { lineNum: 8, procedure: 'TREE-DELETE', code: '        y.right = z.right' },
  { lineNum: 9, procedure: 'TREE-DELETE', code: '        y.right.p = y' },
  { lineNum: 10, procedure: 'TREE-DELETE', code: '    TRANSPLANT(T, z, y)' },
  { lineNum: 11, procedure: 'TREE-DELETE', code: '    y.left = z.left' },
  { lineNum: 12, procedure: 'TREE-DELETE', code: '    y.left.p = y' },

  // TRANSPLANT(T, u, v)
  { lineNum: 1, procedure: 'TRANSPLANT', code: 'if u.p == NIL' },
  { lineNum: 2, procedure: 'TRANSPLANT', code: '    T.root = v' },
  { lineNum: 3, procedure: 'TRANSPLANT', code: 'elseif u == u.p.left' },
  { lineNum: 4, procedure: 'TRANSPLANT', code: '    u.p.left = v' },
  { lineNum: 5, procedure: 'TRANSPLANT', code: 'else u.p.right = v' },
  { lineNum: 6, procedure: 'TRANSPLANT', code: 'if v != NIL' },
  { lineNum: 7, procedure: 'TRANSPLANT', code: '    v.p = u.p' },
];

export const CLRS_INORDER_TREE_WALK_PSEUDOCODE: PseudocodeLine[] = [
  // INORDER-TREE-WALK(x)
  { lineNum: 1, procedure: 'INORDER-TREE-WALK', code: 'if x != NIL' },
  { lineNum: 2, procedure: 'INORDER-TREE-WALK', code: '    INORDER-TREE-WALK(x.left)' },
  { lineNum: 3, procedure: 'INORDER-TREE-WALK', code: '    print x.key' },
  { lineNum: 4, procedure: 'INORDER-TREE-WALK', code: '    INORDER-TREE-WALK(x.right)' },
];

export const CLRS_PREORDER_TREE_WALK_PSEUDOCODE: PseudocodeLine[] = [
  // PREORDER-TREE-WALK(x)
  { lineNum: 1, procedure: 'PREORDER-TREE-WALK', code: 'if x != NIL' },
  { lineNum: 2, procedure: 'PREORDER-TREE-WALK', code: '    print x.key' },
  { lineNum: 3, procedure: 'PREORDER-TREE-WALK', code: '    PREORDER-TREE-WALK(x.left)' },
  { lineNum: 4, procedure: 'PREORDER-TREE-WALK', code: '    PREORDER-TREE-WALK(x.right)' },
];

export const CLRS_POSTORDER_TREE_WALK_PSEUDOCODE: PseudocodeLine[] = [
  // POSTORDER-TREE-WALK(x)
  { lineNum: 1, procedure: 'POSTORDER-TREE-WALK', code: 'if x != NIL' },
  { lineNum: 2, procedure: 'POSTORDER-TREE-WALK', code: '    POSTORDER-TREE-WALK(x.left)' },
  { lineNum: 3, procedure: 'POSTORDER-TREE-WALK', code: '    POSTORDER-TREE-WALK(x.right)' },
  { lineNum: 4, procedure: 'POSTORDER-TREE-WALK', code: '    print x.key' },
];

// Helper to get pseudocode for an operation
export function getBSTPseudocode(op: BSTOperationId): PseudocodeLine[] {
  switch (op) {
    case 'insert':
      return CLRS_TREE_INSERT_PSEUDOCODE;
    case 'search':
      return CLRS_TREE_SEARCH_PSEUDOCODE;
    case 'iterative-search':
      return CLRS_ITERATIVE_TREE_SEARCH_PSEUDOCODE;
    case 'minimum':
      return CLRS_TREE_MINIMUM_PSEUDOCODE;
    case 'maximum':
      return CLRS_TREE_MAXIMUM_PSEUDOCODE;
    case 'successor':
      return CLRS_TREE_SUCCESSOR_PSEUDOCODE;
    case 'predecessor':
      return CLRS_TREE_PREDECESSOR_PSEUDOCODE;
    case 'delete':
      return CLRS_TREE_DELETE_PSEUDOCODE;
    case 'inorder':
      return CLRS_INORDER_TREE_WALK_PSEUDOCODE;
    case 'preorder':
      return CLRS_PREORDER_TREE_WALK_PSEUDOCODE;
    case 'postorder':
      return CLRS_POSTORDER_TREE_WALK_PSEUDOCODE;
  }
}

// Compute tree layout coordinates based on Inorder X-positioning and depth Y
export function computeBSTLayout(
  nodes: Record<string, BSTNode>,
  rootId: string | null
): Record<string, BSTNode> {
  const updatedNodes: Record<string, BSTNode> = {};
  for (const id in nodes) {
    updatedNodes[id] = { ...nodes[id] };
  }

  if (!rootId || !updatedNodes[rootId]) {
    return updatedNodes;
  }

  // Calculate depths
  const setDepth = (currId: string | null, depth: number) => {
    if (!currId || !updatedNodes[currId]) return;
    updatedNodes[currId].depth = depth;
    setDepth(updatedNodes[currId].left, depth + 1);
    setDepth(updatedNodes[currId].right, depth + 1);
  };
  setDepth(rootId, 0);

  // Inorder list to assign horizontal spacing
  const inorderList: string[] = [];
  const inorderCollect = (currId: string | null) => {
    if (!currId || !updatedNodes[currId]) return;
    inorderCollect(updatedNodes[currId].left);
    inorderList.push(currId);
    inorderCollect(updatedNodes[currId].right);
  };
  inorderCollect(rootId);

  const total = inorderList.length;
  inorderList.forEach((nodeId, idx) => {
    const node = updatedNodes[nodeId];
    if (total === 1) {
      node.xPercent = 50;
    } else {
      const margin = 8;
      const span = 84;
      node.xPercent = margin + (idx / (total - 1)) * span;
    }
    node.yPx = (node.depth || 0) * 64 + 40;
  });

  return updatedNodes;
}

// Convert BST to ArrayElement[] for array view compatibility
export function bstToArray(nodes: Record<string, BSTNode>, rootId: string | null): ArrayElement[] {
  const elements: ArrayElement[] = [];
  const traverse = (currId: string | null) => {
    if (!currId || !nodes[currId]) return;
    traverse(nodes[currId].left);
    const n = nodes[currId];
    elements.push({
      id: n.id,
      value: n.key,
      state: n.state || 'default',
    });
    traverse(nodes[currId].right);
  };
  traverse(rootId);
  return elements;
}

// Deep clone BSTTreeData
function cloneTreeData(tree: BSTTreeData): BSTTreeData {
  const newNodes: Record<string, BSTNode> = {};
  for (const k in tree.nodes) {
    newNodes[k] = { ...tree.nodes[k] };
  }
  return {
    ...tree,
    nodes: newNodes,
    traversalOutput: tree.traversalOutput ? [...tree.traversalOutput] : undefined,
    transplantInfo: tree.transplantInfo ? { ...tree.transplantInfo } : undefined,
  };
}

// =========================================================================
// 1. TREE-INSERT: Builds BST from numbers or inserts a single key into tree
// =========================================================================
export function generateBSTInsertSteps(values: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  let treeState: BSTTreeData = {
    nodes: {},
    rootId: null,
    activeOperation: 'insert',
    traversalOutput: [],
  };

  steps.push({
    array: [],
    line: 0,
    procedure: 'TREE-INSERT',
    description: `Initialize binary search tree T with T.root = NIL. Preparing to insert ${values.length} keys sequentially: [${values.join(', ')}] using CLRS TREE-INSERT(T, z).`,
    variables: { 'T.root': 'NIL', 'keys to insert': values.join(', ') },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  let nodeCounter = 0;

  for (let valIdx = 0; valIdx < values.length; valIdx++) {
    const key = values[valIdx];
    nodeCounter++;
    const zId = `node-${nodeCounter}-${key}`;
    const zNode: BSTNode = {
      id: zId,
      key,
      left: null,
      right: null,
      p: null,
      state: 'bst-z',
    };

    treeState.nodes[zId] = zNode;
    treeState.nodes = computeBSTLayout(treeState.nodes, treeState.rootId);
    treeState.zPointerId = zId;
    treeState.xPointerId = null;
    treeState.yPointerId = null;

    // Line 1: y = NIL
    let yId: string | null = null;
    treeState.yPointerId = null;
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 1,
      procedure: 'TREE-INSERT',
      description: `TREE-INSERT(T, z) with z.key = ${key}. Line 1: Initialize trailing pointer y = NIL.`,
      variables: { 'z.key': key, 'y': 'NIL', 'T.root': treeState.rootId ? treeState.nodes[treeState.rootId]?.key : 'NIL' },
      indices: { keyIndex: valIdx },
      bst: cloneTreeData(treeState),
    });

    // Line 2: x = T.root
    let xId: string | null = treeState.rootId;
    treeState.xPointerId = xId;
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 2,
      procedure: 'TREE-INSERT',
      description: `Line 2: Set pointer x = T.root (${xId ? `key ${treeState.nodes[xId].key}` : 'NIL'}). x will descend through the tree.`,
      variables: { 'z.key': key, 'x': xId ? treeState.nodes[xId].key : 'NIL', 'y': 'NIL' },
      indices: { keyIndex: valIdx },
      bst: cloneTreeData(treeState),
    });

    // Line 3: while x != NIL
    while (xId !== null) {
      const xNode = treeState.nodes[xId];
      treeState.nodes[xId].state = 'bst-x';

      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 3,
        procedure: 'TREE-INSERT',
        description: `Line 3: while x != NIL. Currently inspecting node x with key ${xNode.key}.`,
        variables: { 'z.key': key, 'x.key': xNode.key, 'y': yId ? treeState.nodes[yId].key : 'NIL' },
        indices: { keyIndex: valIdx },
        bst: cloneTreeData(treeState),
      });

      // Line 4: y = x
      yId = xId;
      treeState.yPointerId = yId;
      if (treeState.nodes[yId]) treeState.nodes[yId].state = 'bst-y';

      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 4,
        procedure: 'TREE-INSERT',
        description: `Line 4: Set trailing parent pointer y = x (node with key ${xNode.key}).`,
        variables: { 'z.key': key, 'y.key': xNode.key, 'x.key': xNode.key },
        indices: { keyIndex: valIdx },
        bst: cloneTreeData(treeState),
      });

      // Line 5: if z.key < x.key
      if (key < xNode.key) {
        steps.push({
          array: bstToArray(treeState.nodes, treeState.rootId),
          line: 5,
          procedure: 'TREE-INSERT',
          description: `Line 5: Compare z.key (${key}) < x.key (${xNode.key}) is TRUE. Branch left.`,
          variables: { 'z.key': key, 'x.key': xNode.key, 'comparison': `${key} < ${xNode.key}` },
          indices: { keyIndex: valIdx },
          bst: cloneTreeData(treeState),
        });

        // Line 6: x = x.left
        xId = xNode.left;
        treeState.xPointerId = xId;
        steps.push({
          array: bstToArray(treeState.nodes, treeState.rootId),
          line: 6,
          procedure: 'TREE-INSERT',
          description: `Line 6: Advance x to x.left (${xId ? `key ${treeState.nodes[xId].key}` : 'NIL'}).`,
          variables: { 'z.key': key, 'x': xId ? treeState.nodes[xId].key : 'NIL', 'y.key': treeState.nodes[yId].key },
          indices: { keyIndex: valIdx },
          bst: cloneTreeData(treeState),
        });
      } else {
        steps.push({
          array: bstToArray(treeState.nodes, treeState.rootId),
          line: 5,
          procedure: 'TREE-INSERT',
          description: `Line 5: Compare z.key (${key}) < x.key (${xNode.key}) is FALSE. Branch right.`,
          variables: { 'z.key': key, 'x.key': xNode.key, 'comparison': `${key} >= ${xNode.key}` },
          indices: { keyIndex: valIdx },
          bst: cloneTreeData(treeState),
        });

        // Line 7: x = x.right
        xId = xNode.right;
        treeState.xPointerId = xId;
        steps.push({
          array: bstToArray(treeState.nodes, treeState.rootId),
          line: 7,
          procedure: 'TREE-INSERT',
          description: `Line 7: Advance x to x.right (${xId ? `key ${treeState.nodes[xId].key}` : 'NIL'}).`,
          variables: { 'z.key': key, 'x': xId ? treeState.nodes[xId].key : 'NIL', 'y.key': treeState.nodes[yId].key },
          indices: { keyIndex: valIdx },
          bst: cloneTreeData(treeState),
        });
      }

      // Reset node highlights
      if (treeState.nodes[yId]) treeState.nodes[yId].state = 'default';
    }

    // Line 8: z.p = y
    treeState.nodes[zId].p = yId;
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 8,
      procedure: 'TREE-INSERT',
      description: `Line 8: Found insert position. Set parent pointer z.p = y (${yId ? `key ${treeState.nodes[yId].key}` : 'NIL'}).`,
      variables: { 'z.key': key, 'z.p': yId ? treeState.nodes[yId].key : 'NIL' },
      indices: { keyIndex: valIdx },
      bst: cloneTreeData(treeState),
    });

    // Line 9: if y == NIL
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 9,
      procedure: 'TREE-INSERT',
      description: `Line 9: Check if y == NIL (${yId === null ? 'TRUE, tree was empty' : 'FALSE, tree has root'}).`,
      variables: { 'y': yId ? treeState.nodes[yId].key : 'NIL' },
      indices: { keyIndex: valIdx },
      bst: cloneTreeData(treeState),
    });

    if (yId === null) {
      // Line 10: T.root = z
      treeState.rootId = zId;
      treeState.nodes = computeBSTLayout(treeState.nodes, treeState.rootId);
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 10,
        procedure: 'TREE-INSERT',
        description: `Line 10: Tree T was empty. Set T.root = z (key ${key}).`,
        variables: { 'T.root': key },
        indices: { keyIndex: valIdx },
        bst: cloneTreeData(treeState),
      });
    } else {
      const yNode = treeState.nodes[yId];
      // Line 11: elseif z.key < y.key
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 11,
        procedure: 'TREE-INSERT',
        description: `Line 11: Check if z.key (${key}) < y.key (${yNode.key}).`,
        variables: { 'z.key': key, 'y.key': yNode.key },
        indices: { keyIndex: valIdx },
        bst: cloneTreeData(treeState),
      });

      if (key < yNode.key) {
        // Line 12: y.left = z
        yNode.left = zId;
        treeState.nodes = computeBSTLayout(treeState.nodes, treeState.rootId);
        steps.push({
          array: bstToArray(treeState.nodes, treeState.rootId),
          line: 12,
          procedure: 'TREE-INSERT',
          description: `Line 12: Set y.left = z. Node ${key} is now the left child of node ${yNode.key}.`,
          variables: { 'y.left': key, 'parent': yNode.key },
          indices: { keyIndex: valIdx },
          bst: cloneTreeData(treeState),
        });
      } else {
        // Line 13: else y.right = z
        yNode.right = zId;
        treeState.nodes = computeBSTLayout(treeState.nodes, treeState.rootId);
        steps.push({
          array: bstToArray(treeState.nodes, treeState.rootId),
          line: 13,
          procedure: 'TREE-INSERT',
          description: `Line 13: Set y.right = z. Node ${key} is now the right child of node ${yNode.key}.`,
          variables: { 'y.right': key, 'parent': yNode.key },
          indices: { keyIndex: valIdx },
          bst: cloneTreeData(treeState),
        });
      }
    }

    treeState.nodes[zId].state = 'default';
    treeState.zPointerId = null;
    treeState.xPointerId = null;
    treeState.yPointerId = null;
  }

  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 0,
    procedure: 'TREE-INSERT',
    description: `All ${values.length} keys successfully inserted into Binary Search Tree satisfying the CLRS BST property: left subtree <= root <= right subtree.`,
    variables: { 'Total Nodes': Object.keys(treeState.nodes).length, 'T.root': treeState.rootId ? treeState.nodes[treeState.rootId].key : 'NIL' },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  return steps;
}

// Build initial tree state from values
export function buildBSTStateFromValues(values: number[]): BSTTreeData {
  const treeState: BSTTreeData = {
    nodes: {},
    rootId: null,
    activeOperation: 'insert',
    traversalOutput: [],
  };

  let nodeCounter = 0;
  for (const key of values) {
    nodeCounter++;
    const zId = `node-${nodeCounter}-${key}`;
    const zNode: BSTNode = {
      id: zId,
      key,
      left: null,
      right: null,
      p: null,
      state: 'default',
    };
    treeState.nodes[zId] = zNode;

    let yId: string | null = null;
    let xId: string | null = treeState.rootId;

    while (xId !== null) {
      yId = xId;
      const xNode = treeState.nodes[xId];
      if (key < xNode.key) {
        xId = xNode.left;
      } else {
        xId = xNode.right;
      }
    }

    zNode.p = yId;
    if (yId === null) {
      treeState.rootId = zId;
    } else if (key < treeState.nodes[yId].key) {
      treeState.nodes[yId].left = zId;
    } else {
      treeState.nodes[yId].right = zId;
    }
  }

  treeState.nodes = computeBSTLayout(treeState.nodes, treeState.rootId);
  return treeState;
}

// =========================================================================
// 2. TREE-SEARCH(x, k) - Recursive
// =========================================================================
export function generateBSTSearchSteps(
  initialTree: BSTTreeData,
  targetKey: number
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const treeState = cloneTreeData(initialTree);
  treeState.activeOperation = 'search';
  treeState.targetKey = targetKey;

  const callStack: string[] = [];

  const searchRecursive = (currId: string | null): string | null => {
    const frameName = currId ? `TREE-SEARCH(${treeState.nodes[currId]?.key}, ${targetKey})` : `TREE-SEARCH(NIL, ${targetKey})`;
    callStack.push(frameName);

    treeState.xPointerId = currId;
    if (currId && treeState.nodes[currId]) {
      treeState.nodes[currId].state = 'bst-x';
    }

    // Line 1: if x == NIL or k == x.key
    const currKey = currId ? treeState.nodes[currId]?.key : null;
    const isNil = currId === null;
    const isMatch = currKey === targetKey;

    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 1,
      procedure: 'TREE-SEARCH',
      description: `TREE-SEARCH(x, k) with k = ${targetKey}. Line 1: Check if x == NIL (${isNil}) or k == x.key (${isMatch}). Current x = ${currKey !== null ? currKey : 'NIL'}.`,
      variables: { 'k (target)': targetKey, 'x': currKey !== null ? currKey : 'NIL', 'condition': isNil || isMatch ? 'TRUE' : 'FALSE' },
      indices: { k: targetKey },
      bst: cloneTreeData(treeState),
      callStack: [...callStack],
    });

    // Line 2: return x
    if (isNil || isMatch) {
      if (currId && treeState.nodes[currId]) {
        treeState.nodes[currId].state = 'bst-found';
      }
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 2,
        procedure: 'TREE-SEARCH',
        description: isMatch
          ? `Line 2: Target key ${targetKey} FOUND at node ${currKey}! Returning node reference x.`
          : `Line 2: Reached NIL without finding key ${targetKey}. Returning NIL (not found).`,
        variables: { 'return': currKey !== null ? `Node(${currKey})` : 'NIL', 'Status': isMatch ? 'FOUND' : 'NOT FOUND' },
        indices: { k: targetKey },
        bst: cloneTreeData(treeState),
        callStack: [...callStack],
      });
      callStack.pop();
      return currId;
    }

    // Line 3: if k < x.key
    const goLeft = targetKey < (currKey as number);
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 3,
      procedure: 'TREE-SEARCH',
      description: `Line 3: Check if k (${targetKey}) < x.key (${currKey}) is ${goLeft ? 'TRUE (descend into left subtree)' : 'FALSE (descend into right subtree)'}.`,
      variables: { 'k': targetKey, 'x.key': currKey, 'k < x.key': goLeft },
      indices: { k: targetKey },
      bst: cloneTreeData(treeState),
      callStack: [...callStack],
    });

    if (currId && treeState.nodes[currId]) {
      treeState.nodes[currId].state = 'default';
    }

    let result: string | null;
    if (goLeft) {
      // Line 4: return TREE-SEARCH(x.left, k)
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 4,
        procedure: 'TREE-SEARCH',
        description: `Line 4: Recursive call: return TREE-SEARCH(x.left, ${targetKey}).`,
        variables: { 'next call': `TREE-SEARCH(x.left, ${targetKey})`, 'x.left': treeState.nodes[currId!].left ? treeState.nodes[treeState.nodes[currId!].left!].key : 'NIL' },
        indices: { k: targetKey },
        bst: cloneTreeData(treeState),
        callStack: [...callStack],
      });
      result = searchRecursive(treeState.nodes[currId!].left);
    } else {
      // Line 5: return TREE-SEARCH(x.right, k)
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 5,
        procedure: 'TREE-SEARCH',
        description: `Line 5: Recursive call: return TREE-SEARCH(x.right, ${targetKey}).`,
        variables: { 'next call': `TREE-SEARCH(x.right, ${targetKey})`, 'x.right': treeState.nodes[currId!].right ? treeState.nodes[treeState.nodes[currId!].right!].key : 'NIL' },
        indices: { k: targetKey },
        bst: cloneTreeData(treeState),
        callStack: [...callStack],
      });
      result = searchRecursive(treeState.nodes[currId!].right);
    }

    callStack.pop();
    return result;
  };

  searchRecursive(treeState.rootId);
  return steps;
}

// =========================================================================
// 3. ITERATIVE-TREE-SEARCH(x, k)
// =========================================================================
export function generateBSTIterativeSearchSteps(
  initialTree: BSTTreeData,
  targetKey: number
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const treeState = cloneTreeData(initialTree);
  treeState.activeOperation = 'iterative-search';
  treeState.targetKey = targetKey;

  let xId: string | null = treeState.rootId;
  treeState.xPointerId = xId;

  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 0,
    procedure: 'ITERATIVE-TREE-SEARCH',
    description: `Start ITERATIVE-TREE-SEARCH(x, k) for k = ${targetKey} starting at root x = ${xId ? treeState.nodes[xId].key : 'NIL'}.`,
    variables: { 'k': targetKey, 'x': xId ? treeState.nodes[xId].key : 'NIL' },
    indices: { k: targetKey },
    bst: cloneTreeData(treeState),
  });

  // Line 1: while x != NIL and k != x.key
  while (xId !== null && treeState.nodes[xId].key !== targetKey) {
    const xNode = treeState.nodes[xId];
    xNode.state = 'bst-x';

    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 1,
      procedure: 'ITERATIVE-TREE-SEARCH',
      description: `Line 1: while x != NIL and k != x.key. Currently x = ${xNode.key}, target k = ${targetKey}. Condition is TRUE.`,
      variables: { 'k': targetKey, 'x.key': xNode.key, 'x != NIL': true, 'k != x.key': true },
      indices: { k: targetKey },
      bst: cloneTreeData(treeState),
    });

    // Line 2: if k < x.key
    if (targetKey < xNode.key) {
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 2,
        procedure: 'ITERATIVE-TREE-SEARCH',
        description: `Line 2: k (${targetKey}) < x.key (${xNode.key}) is TRUE.`,
        variables: { 'k': targetKey, 'x.key': xNode.key, 'comparison': `${targetKey} < ${xNode.key}` },
        indices: { k: targetKey },
        bst: cloneTreeData(treeState),
      });

      // Line 3: x = x.left
      xNode.state = 'default';
      xId = xNode.left;
      treeState.xPointerId = xId;
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 3,
        procedure: 'ITERATIVE-TREE-SEARCH',
        description: `Line 3: Set x = x.left (${xId ? `key ${treeState.nodes[xId].key}` : 'NIL'}).`,
        variables: { 'x': xId ? treeState.nodes[xId].key : 'NIL' },
        indices: { k: targetKey },
        bst: cloneTreeData(treeState),
      });
    } else {
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 2,
        procedure: 'ITERATIVE-TREE-SEARCH',
        description: `Line 2: k (${targetKey}) < x.key (${xNode.key}) is FALSE.`,
        variables: { 'k': targetKey, 'x.key': xNode.key, 'comparison': `${targetKey} >= ${xNode.key}` },
        indices: { k: targetKey },
        bst: cloneTreeData(treeState),
      });

      // Line 4: else x = x.right
      xNode.state = 'default';
      xId = xNode.right;
      treeState.xPointerId = xId;
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 4,
        procedure: 'ITERATIVE-TREE-SEARCH',
        description: `Line 4: Set x = x.right (${xId ? `key ${treeState.nodes[xId].key}` : 'NIL'}).`,
        variables: { 'x': xId ? treeState.nodes[xId].key : 'NIL' },
        indices: { k: targetKey },
        bst: cloneTreeData(treeState),
      });
    }
  }

  // Line 5: return x
  const found = xId !== null;
  if (found && treeState.nodes[xId]) {
    treeState.nodes[xId].state = 'bst-found';
  }

  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 5,
    procedure: 'ITERATIVE-TREE-SEARCH',
    description: found
      ? `Line 5: Loop terminated. Return node x with key ${treeState.nodes[xId!].key} (Search successful!).`
      : `Line 5: Loop terminated with x == NIL. Return NIL (key ${targetKey} not found in tree).`,
    variables: { 'return': found ? `Node(${treeState.nodes[xId!].key})` : 'NIL', 'Status': found ? 'FOUND' : 'NOT FOUND' },
    indices: { k: targetKey },
    bst: cloneTreeData(treeState),
  });

  return steps;
}

// =========================================================================
// 4. TREE-MINIMUM(x)
// =========================================================================
export function generateBSTMinimumSteps(
  initialTree: BSTTreeData,
  startNodeId?: string | null
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const treeState = cloneTreeData(initialTree);
  treeState.activeOperation = 'minimum';

  let xId: string | null = startNodeId || treeState.rootId;
  treeState.xPointerId = xId;

  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 0,
    procedure: 'TREE-MINIMUM',
    description: `Start TREE-MINIMUM(x) starting from node x = ${xId ? treeState.nodes[xId].key : 'NIL'}. By BST property, minimum key is in leftmost node.`,
    variables: { 'x': xId ? treeState.nodes[xId].key : 'NIL' },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  if (!xId || !treeState.nodes[xId]) {
    steps.push({
      array: [],
      line: 3,
      procedure: 'TREE-MINIMUM',
      description: 'Tree is empty. Return NIL.',
      variables: { return: 'NIL' },
      indices: {},
      bst: cloneTreeData(treeState),
    });
    return steps;
  }

  // Line 1: while x.left != NIL
  while (treeState.nodes[xId].left !== null) {
    const xNode = treeState.nodes[xId];
    xNode.state = 'bst-x';

    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 1,
      procedure: 'TREE-MINIMUM',
      description: `Line 1: while x.left != NIL. Current x = ${xNode.key} has left child ${treeState.nodes[xNode.left!].key}.`,
      variables: { 'x.key': xNode.key, 'x.left': treeState.nodes[xNode.left!].key },
      indices: {},
      bst: cloneTreeData(treeState),
    });

    // Line 2: x = x.left
    xNode.state = 'default';
    xId = xNode.left;
    treeState.xPointerId = xId;

    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 2,
      procedure: 'TREE-MINIMUM',
      description: `Line 2: Move left: x = x.left (now pointing to node ${treeState.nodes[xId!].key}).`,
      variables: { 'x.key': treeState.nodes[xId!].key },
      indices: {},
      bst: cloneTreeData(treeState),
    });
  }

  // Line 3: return x
  treeState.nodes[xId].state = 'bst-found';
  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 3,
    procedure: 'TREE-MINIMUM',
    description: `Line 3: x.left == NIL. Leftmost node reached! Return node x with minimum key ${treeState.nodes[xId].key}.`,
    variables: { 'return x.key': treeState.nodes[xId].key },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  return steps;
}

// =========================================================================
// 5. TREE-MAXIMUM(x)
// =========================================================================
export function generateBSTMaximumSteps(
  initialTree: BSTTreeData,
  startNodeId?: string | null
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const treeState = cloneTreeData(initialTree);
  treeState.activeOperation = 'maximum';

  let xId: string | null = startNodeId || treeState.rootId;
  treeState.xPointerId = xId;

  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 0,
    procedure: 'TREE-MAXIMUM',
    description: `Start TREE-MAXIMUM(x) starting from node x = ${xId ? treeState.nodes[xId].key : 'NIL'}. By BST property, maximum key is in rightmost node.`,
    variables: { 'x': xId ? treeState.nodes[xId].key : 'NIL' },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  if (!xId || !treeState.nodes[xId]) {
    steps.push({
      array: [],
      line: 3,
      procedure: 'TREE-MAXIMUM',
      description: 'Tree is empty. Return NIL.',
      variables: { return: 'NIL' },
      indices: {},
      bst: cloneTreeData(treeState),
    });
    return steps;
  }

  // Line 1: while x.right != NIL
  while (treeState.nodes[xId].right !== null) {
    const xNode = treeState.nodes[xId];
    xNode.state = 'bst-x';

    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 1,
      procedure: 'TREE-MAXIMUM',
      description: `Line 1: while x.right != NIL. Current x = ${xNode.key} has right child ${treeState.nodes[xNode.right!].key}.`,
      variables: { 'x.key': xNode.key, 'x.right': treeState.nodes[xNode.right!].key },
      indices: {},
      bst: cloneTreeData(treeState),
    });

    // Line 2: x = x.right
    xNode.state = 'default';
    xId = xNode.right;
    treeState.xPointerId = xId;

    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 2,
      procedure: 'TREE-MAXIMUM',
      description: `Line 2: Move right: x = x.right (now pointing to node ${treeState.nodes[xId!].key}).`,
      variables: { 'x.key': treeState.nodes[xId!].key },
      indices: {},
      bst: cloneTreeData(treeState),
    });
  }

  // Line 3: return x
  treeState.nodes[xId].state = 'bst-found';
  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 3,
    procedure: 'TREE-MAXIMUM',
    description: `Line 3: x.right == NIL. Rightmost node reached! Return node x with maximum key ${treeState.nodes[xId].key}.`,
    variables: { 'return x.key': treeState.nodes[xId].key },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  return steps;
}

// =========================================================================
// 6. TREE-SUCCESSOR(x)
// =========================================================================
export function generateBSTSuccessorSteps(
  initialTree: BSTTreeData,
  nodeKey: number
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const treeState = cloneTreeData(initialTree);
  treeState.activeOperation = 'successor';

  // Find node with key
  let startId: string | null = null;
  for (const id in treeState.nodes) {
    if (treeState.nodes[id].key === nodeKey) {
      startId = id;
      break;
    }
  }

  if (!startId) {
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 0,
      procedure: 'TREE-SUCCESSOR',
      description: `Node with key ${nodeKey} not found in tree.`,
      variables: { error: `Key ${nodeKey} not found` },
      indices: {},
      bst: cloneTreeData(treeState),
    });
    return steps;
  }

  let xId: string | null = startId;
  treeState.xPointerId = xId;
  treeState.nodes[xId].state = 'bst-x';

  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 0,
    procedure: 'TREE-SUCCESSOR',
    description: `Start TREE-SUCCESSOR(x) on node with key ${nodeKey}. The successor is the node with the smallest key greater than x.key.`,
    variables: { 'x.key': nodeKey },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  const xNode = treeState.nodes[xId];

  // Line 1: if x.right != NIL
  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 1,
    procedure: 'TREE-SUCCESSOR',
    description: `Line 1: Check if x.right != NIL (${xNode.right !== null ? `TRUE, right child is ${treeState.nodes[xNode.right].key}` : 'FALSE, x has no right subtree'}).`,
    variables: { 'x.key': xNode.key, 'x.right': xNode.right ? treeState.nodes[xNode.right].key : 'NIL' },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  if (xNode.right !== null) {
    // Line 2: return TREE-MINIMUM(x.right)
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 2,
      procedure: 'TREE-SUCCESSOR',
      description: `Line 2: Since x has a right subtree, its successor is the minimum node in x.right. Call TREE-MINIMUM(x.right).`,
      variables: { 'Subroutine': `TREE-MINIMUM(${treeState.nodes[xNode.right].key})` },
      indices: {},
      bst: cloneTreeData(treeState),
    });

    let minId: string = xNode.right;
    treeState.xPointerId = minId;
    treeState.nodes[minId].state = 'bst-x';

    while (treeState.nodes[minId].left !== null) {
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 1,
        procedure: 'TREE-MINIMUM',
        description: `TREE-MINIMUM: while x.left != NIL. Descending left to find successor.`,
        variables: { 'x.key': treeState.nodes[minId].key, 'x.left': treeState.nodes[treeState.nodes[minId].left!].key },
        indices: {},
        bst: cloneTreeData(treeState),
      });

      treeState.nodes[minId].state = 'default';
      minId = treeState.nodes[minId].left!;
      treeState.xPointerId = minId;
      treeState.nodes[minId].state = 'bst-x';
    }

    treeState.nodes[minId].state = 'bst-found';
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 3,
      procedure: 'TREE-MINIMUM',
      description: `TREE-MINIMUM found successor node with key ${treeState.nodes[minId].key}! Return x.`,
      variables: { 'Successor': treeState.nodes[minId].key },
      indices: {},
      bst: cloneTreeData(treeState),
    });
    return steps;
  }

  // Line 3: y = x.p
  let yId: string | null = xNode.p;
  treeState.yPointerId = yId;
  if (yId) treeState.nodes[yId].state = 'bst-y';

  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 3,
    procedure: 'TREE-SUCCESSOR',
    description: `Line 3: x has no right child. Successor is the lowest ancestor of x whose left child is also an ancestor of x. Set y = x.p (${yId ? `key ${treeState.nodes[yId].key}` : 'NIL'}).`,
    variables: { 'x.key': xNode.key, 'y = x.p': yId ? treeState.nodes[yId].key : 'NIL' },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  // Line 4: while y != NIL and x == y.right
  while (yId !== null && xId === treeState.nodes[yId].right) {
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 4,
      procedure: 'TREE-SUCCESSOR',
      description: `Line 4: while y != NIL and x == y.right. x (${treeState.nodes[xId].key}) is the RIGHT child of y (${treeState.nodes[yId].key}). Keep ascending.`,
      variables: { 'x.key': treeState.nodes[xId].key, 'y.key': treeState.nodes[yId].key },
      indices: {},
      bst: cloneTreeData(treeState),
    });

    // Line 5: x = y
    xId = yId;
    treeState.xPointerId = xId;

    // Line 6: y = y.p
    yId = treeState.nodes[yId].p;
    treeState.yPointerId = yId;

    if (yId) treeState.nodes[yId].state = 'bst-y';

    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 5,
      procedure: 'TREE-SUCCESSOR',
      description: `Lines 5-6: Ascend pointers: x = y, y = y.p (${yId ? `key ${treeState.nodes[yId].key}` : 'NIL'}).`,
      variables: { 'x.key': treeState.nodes[xId].key, 'y': yId ? treeState.nodes[yId].key : 'NIL' },
      indices: {},
      bst: cloneTreeData(treeState),
    });
  }

  // Line 7: return y
  if (yId) {
    treeState.nodes[yId].state = 'bst-found';
  }

  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 7,
    procedure: 'TREE-SUCCESSOR',
    description: yId
      ? `Line 7: Loop finished (x is left child of y). Successor of ${nodeKey} is node ${treeState.nodes[yId].key}!`
      : `Line 7: Loop finished with y == NIL. Node ${nodeKey} is the maximum element in the tree and has no successor.`,
    variables: { 'Successor': yId ? treeState.nodes[yId].key : 'NIL (None)' },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  return steps;
}

// =========================================================================
// 7. TREE-PREDECESSOR(x)
// =========================================================================
export function generateBSTPredecessorSteps(
  initialTree: BSTTreeData,
  nodeKey: number
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const treeState = cloneTreeData(initialTree);
  treeState.activeOperation = 'predecessor';

  let startId: string | null = null;
  for (const id in treeState.nodes) {
    if (treeState.nodes[id].key === nodeKey) {
      startId = id;
      break;
    }
  }

  if (!startId) {
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 0,
      procedure: 'TREE-PREDECESSOR',
      description: `Node with key ${nodeKey} not found in tree.`,
      variables: { error: `Key ${nodeKey} not found` },
      indices: {},
      bst: cloneTreeData(treeState),
    });
    return steps;
  }

  let xId: string | null = startId;
  treeState.xPointerId = xId;
  treeState.nodes[xId].state = 'bst-x';

  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 0,
    procedure: 'TREE-PREDECESSOR',
    description: `Start TREE-PREDECESSOR(x) on node with key ${nodeKey}. The predecessor is the node with the largest key smaller than x.key.`,
    variables: { 'x.key': nodeKey },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  const xNode = treeState.nodes[xId];

  // Line 1: if x.left != NIL
  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 1,
    procedure: 'TREE-PREDECESSOR',
    description: `Line 1: Check if x.left != NIL (${xNode.left !== null ? `TRUE, left child is ${treeState.nodes[xNode.left].key}` : 'FALSE, x has no left subtree'}).`,
    variables: { 'x.key': xNode.key, 'x.left': xNode.left ? treeState.nodes[xNode.left].key : 'NIL' },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  if (xNode.left !== null) {
    // Line 2: return TREE-MAXIMUM(x.left)
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 2,
      procedure: 'TREE-PREDECESSOR',
      description: `Line 2: Since x has a left subtree, its predecessor is the maximum node in x.left. Call TREE-MAXIMUM(x.left).`,
      variables: { 'Subroutine': `TREE-MAXIMUM(${treeState.nodes[xNode.left].key})` },
      indices: {},
      bst: cloneTreeData(treeState),
    });

    let maxId: string = xNode.left;
    treeState.xPointerId = maxId;
    treeState.nodes[maxId].state = 'bst-x';

    while (treeState.nodes[maxId].right !== null) {
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 1,
        procedure: 'TREE-MAXIMUM',
        description: `TREE-MAXIMUM: while x.right != NIL. Descending right to find predecessor.`,
        variables: { 'x.key': treeState.nodes[maxId].key, 'x.right': treeState.nodes[treeState.nodes[maxId].right!].key },
        indices: {},
        bst: cloneTreeData(treeState),
      });

      treeState.nodes[maxId].state = 'default';
      maxId = treeState.nodes[maxId].right!;
      treeState.xPointerId = maxId;
      treeState.nodes[maxId].state = 'bst-x';
    }

    treeState.nodes[maxId].state = 'bst-found';
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 3,
      procedure: 'TREE-MAXIMUM',
      description: `TREE-MAXIMUM found predecessor node with key ${treeState.nodes[maxId].key}! Return x.`,
      variables: { 'Predecessor': treeState.nodes[maxId].key },
      indices: {},
      bst: cloneTreeData(treeState),
    });
    return steps;
  }

  // Line 3: y = x.p
  let yId: string | null = xNode.p;
  treeState.yPointerId = yId;
  if (yId) treeState.nodes[yId].state = 'bst-y';

  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 3,
    procedure: 'TREE-PREDECESSOR',
    description: `Line 3: x has no left child. Predecessor is the lowest ancestor of x whose right child is also an ancestor of x. Set y = x.p (${yId ? `key ${treeState.nodes[yId].key}` : 'NIL'}).`,
    variables: { 'x.key': xNode.key, 'y = x.p': yId ? treeState.nodes[yId].key : 'NIL' },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  // Line 4: while y != NIL and x == y.left
  while (yId !== null && xId === treeState.nodes[yId].left) {
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 4,
      procedure: 'TREE-PREDECESSOR',
      description: `Line 4: while y != NIL and x == y.left. x (${treeState.nodes[xId].key}) is the LEFT child of y (${treeState.nodes[yId].key}). Keep ascending.`,
      variables: { 'x.key': treeState.nodes[xId].key, 'y.key': treeState.nodes[yId].key },
      indices: {},
      bst: cloneTreeData(treeState),
    });

    // Line 5: x = y
    xId = yId;
    treeState.xPointerId = xId;

    // Line 6: y = y.p
    yId = treeState.nodes[yId].p;
    treeState.yPointerId = yId;
    if (yId) treeState.nodes[yId].state = 'bst-y';

    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 5,
      procedure: 'TREE-PREDECESSOR',
      description: `Lines 5-6: Ascend pointers: x = y, y = y.p (${yId ? `key ${treeState.nodes[yId].key}` : 'NIL'}).`,
      variables: { 'x.key': treeState.nodes[xId].key, 'y': yId ? treeState.nodes[yId].key : 'NIL' },
      indices: {},
      bst: cloneTreeData(treeState),
    });
  }

  // Line 7: return y
  if (yId) {
    treeState.nodes[yId].state = 'bst-found';
  }

  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 7,
    procedure: 'TREE-PREDECESSOR',
    description: yId
      ? `Line 7: Loop finished (x is right child of y). Predecessor of ${nodeKey} is node ${treeState.nodes[yId].key}!`
      : `Line 7: Loop finished with y == NIL. Node ${nodeKey} is the minimum element in the tree and has no predecessor.`,
    variables: { 'Predecessor': yId ? treeState.nodes[yId].key : 'NIL (None)' },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  return steps;
}

// =========================================================================
// 8. TREE-DELETE(T, z) & TRANSPLANT(T, u, v)
// =========================================================================
export function generateBSTDeleteSteps(
  initialTree: BSTTreeData,
  deleteKey: number
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const treeState = cloneTreeData(initialTree);
  treeState.activeOperation = 'delete';

  // Locate node z to delete
  let zId: string | null = null;
  for (const id in treeState.nodes) {
    if (treeState.nodes[id].key === deleteKey) {
      zId = id;
      break;
    }
  }

  if (!zId) {
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 0,
      procedure: 'TREE-DELETE',
      description: `Key ${deleteKey} was not found in the tree. Nothing to delete.`,
      variables: { error: `Key ${deleteKey} not found` },
      indices: {},
      bst: cloneTreeData(treeState),
    });
    return steps;
  }

  treeState.zPointerId = zId;
  treeState.nodes[zId].state = 'bst-z';

  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 0,
    procedure: 'TREE-DELETE',
    description: `Start CLRS TREE-DELETE(T, z) on node z with key ${deleteKey}. We examine z's child configurations.`,
    variables: { 'z.key': deleteKey, 'z.left': treeState.nodes[zId].left ? treeState.nodes[treeState.nodes[zId].left!].key : 'NIL', 'z.right': treeState.nodes[zId].right ? treeState.nodes[treeState.nodes[zId].right!].key : 'NIL' },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  // Helper TRANSPLANT generator
  const runTransplant = (uId: string, vId: string | null) => {
    const uNode = treeState.nodes[uId];
    const vNode = vId ? treeState.nodes[vId] : null;
    const uParentId = uNode.p;
    const uParent = uParentId ? treeState.nodes[uParentId] : null;

    treeState.transplantInfo = { uId, vId };
    uNode.state = 'bst-transplant';
    if (vNode) vNode.state = 'bst-found';

    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 1,
      procedure: 'TRANSPLANT',
      description: `TRANSPLANT(T, u, v) with u = ${uNode.key}, v = ${vNode ? vNode.key : 'NIL'}. Line 1: Check if u.p == NIL.`,
      variables: { 'u.key': uNode.key, 'v': vNode ? vNode.key : 'NIL', 'u.p': uParent ? uParent.key : 'NIL' },
      indices: {},
      bst: cloneTreeData(treeState),
    });

    if (uParentId === null) {
      // Line 2: T.root = v
      treeState.rootId = vId;
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 2,
        procedure: 'TRANSPLANT',
        description: `Line 2: u was root (u.p == NIL). Set T.root = v (${vNode ? vNode.key : 'NIL'}).`,
        variables: { 'T.root': vNode ? vNode.key : 'NIL' },
        indices: {},
        bst: cloneTreeData(treeState),
      });
    } else if (uId === uParent!.left) {
      // Line 3-4: elseif u == u.p.left; u.p.left = v
      uParent!.left = vId;
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 4,
        procedure: 'TRANSPLANT',
        description: `Line 3-4: u is left child of its parent ${uParent!.key}. Set u.p.left = v (${vNode ? vNode.key : 'NIL'}).`,
        variables: { 'u.p.left': vNode ? vNode.key : 'NIL', 'parent': uParent!.key },
        indices: {},
        bst: cloneTreeData(treeState),
      });
    } else {
      // Line 5: else u.p.right = v
      uParent!.right = vId;
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 5,
        procedure: 'TRANSPLANT',
        description: `Line 5: u is right child of its parent ${uParent!.key}. Set u.p.right = v (${vNode ? vNode.key : 'NIL'}).`,
        variables: { 'u.p.right': vNode ? vNode.key : 'NIL', 'parent': uParent!.key },
        indices: {},
        bst: cloneTreeData(treeState),
      });
    }

    // Line 6-7: if v != NIL; v.p = u.p
    if (vNode !== null) {
      vNode.p = uParentId;
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 7,
        procedure: 'TRANSPLANT',
        description: `Line 6-7: v != NIL. Update parent pointer v.p = u.p (${uParent ? uParent.key : 'NIL'}).`,
        variables: { 'v.p': uParent ? uParent.key : 'NIL' },
        indices: {},
        bst: cloneTreeData(treeState),
      });
    }

    treeState.nodes = computeBSTLayout(treeState.nodes, treeState.rootId);
    treeState.transplantInfo = undefined;
  };

  const zNode = treeState.nodes[zId];

  // Case 1: z.left == NIL
  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 1,
    procedure: 'TREE-DELETE',
    description: `Line 1: if z.left == NIL (${zNode.left === null ? 'TRUE, z has no left child' : 'FALSE'}).`,
    variables: { 'z.key': zNode.key, 'z.left': zNode.left ? treeState.nodes[zNode.left].key : 'NIL' },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  if (zNode.left === null) {
    // Line 2: TRANSPLANT(T, z, z.right)
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 2,
      procedure: 'TREE-DELETE',
      description: `Line 2: Case 1: z has no left child. Replace z with its right child using TRANSPLANT(T, z, z.right).`,
      variables: { 'Action': 'TRANSPLANT(T, z, z.right)', 'z.right': zNode.right ? treeState.nodes[zNode.right].key : 'NIL' },
      indices: {},
      bst: cloneTreeData(treeState),
    });

    runTransplant(zId, zNode.right);
    delete treeState.nodes[zId];
  } else {
    // Line 3: elseif z.right == NIL
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 3,
      procedure: 'TREE-DELETE',
      description: `Line 3: elseif z.right == NIL (${zNode.right === null ? 'TRUE, z has no right child' : 'FALSE'}).`,
      variables: { 'z.key': zNode.key, 'z.right': zNode.right ? treeState.nodes[zNode.right].key : 'NIL' },
      indices: {},
      bst: cloneTreeData(treeState),
    });

    if (zNode.right === null) {
      // Line 4: TRANSPLANT(T, z, z.left)
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 4,
        procedure: 'TREE-DELETE',
        description: `Line 4: Case 2: z has a left child but no right child. Replace z with z.left via TRANSPLANT(T, z, z.left).`,
        variables: { 'Action': 'TRANSPLANT(T, z, z.left)', 'z.left': treeState.nodes[zNode.left].key },
        indices: {},
        bst: cloneTreeData(treeState),
      });

      runTransplant(zId, zNode.left);
      delete treeState.nodes[zId];
    } else {
      // Case 3: z has two children!
      // Line 5: else y = TREE-MINIMUM(z.right)
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 5,
        procedure: 'TREE-DELETE',
        description: `Line 5: Case 3: z has TWO children (${treeState.nodes[zNode.left].key} and ${treeState.nodes[zNode.right].key}). Find successor y = TREE-MINIMUM(z.right).`,
        variables: { 'z.left': treeState.nodes[zNode.left].key, 'z.right': treeState.nodes[zNode.right].key },
        indices: {},
        bst: cloneTreeData(treeState),
      });

      // Find successor y
      let yId: string = zNode.right;
      while (treeState.nodes[yId].left !== null) {
        yId = treeState.nodes[yId].left!;
      }
      const yNode = treeState.nodes[yId];
      treeState.yPointerId = yId;
      yNode.state = 'bst-y';

      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 5,
        procedure: 'TREE-DELETE',
        description: `Successor found: y = node ${yNode.key}. It will take z's place in the tree.`,
        variables: { 'y (successor)': yNode.key, 'z (to delete)': zNode.key },
        indices: {},
        bst: cloneTreeData(treeState),
      });

      // Line 6: if y != z.right
      const yIsNotRightChild = yId !== zNode.right;
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 6,
        procedure: 'TREE-DELETE',
        description: `Line 6: Check if y != z.right (${yIsNotRightChild ? `TRUE, y (${yNode.key}) is deeper in z.right` : `FALSE, y (${yNode.key}) is direct right child of z`}).`,
        variables: { 'y != z.right': yIsNotRightChild },
        indices: {},
        bst: cloneTreeData(treeState),
      });

      if (yIsNotRightChild) {
        // Line 7: TRANSPLANT(T, y, y.right)
        steps.push({
          array: bstToArray(treeState.nodes, treeState.rootId),
          line: 7,
          procedure: 'TREE-DELETE',
          description: `Line 7: Replace y with y.right using TRANSPLANT(T, y, y.right).`,
          variables: { 'Action': 'TRANSPLANT(T, y, y.right)', 'y.right': yNode.right ? treeState.nodes[yNode.right].key : 'NIL' },
          indices: {},
          bst: cloneTreeData(treeState),
        });
        runTransplant(yId, yNode.right);

        // Line 8: y.right = z.right
        yNode.right = zNode.right;
        // Line 9: y.right.p = y
        if (zNode.right) {
          treeState.nodes[zNode.right].p = yId;
        }
        steps.push({
          array: bstToArray(treeState.nodes, treeState.rootId),
          line: 8,
          procedure: 'TREE-DELETE',
          description: `Lines 8-9: Attach z's right subtree to y: y.right = z.right, y.right.p = y.`,
          variables: { 'y.right': treeState.nodes[yNode.right].key, 'y.right.p': yNode.key },
          indices: {},
          bst: cloneTreeData(treeState),
        });
      }

      // Line 10: TRANSPLANT(T, z, y)
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 10,
        procedure: 'TREE-DELETE',
        description: `Line 10: Replace z with successor y using TRANSPLANT(T, z, y).`,
        variables: { 'Action': 'TRANSPLANT(T, z, y)', 'z': zNode.key, 'y': yNode.key },
        indices: {},
        bst: cloneTreeData(treeState),
      });
      runTransplant(zId, yId);

      // Line 11: y.left = z.left
      yNode.left = zNode.left;
      // Line 12: y.left.p = y
      if (zNode.left) {
        treeState.nodes[zNode.left].p = yId;
      }
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 11,
        procedure: 'TREE-DELETE',
        description: `Lines 11-12: Attach z's left subtree to y: y.left = z.left, y.left.p = y.`,
        variables: { 'y.left': treeState.nodes[yNode.left].key, 'y.left.p': yNode.key },
        indices: {},
        bst: cloneTreeData(treeState),
      });

      delete treeState.nodes[zId];
    }
  }

  treeState.nodes = computeBSTLayout(treeState.nodes, treeState.rootId);
  treeState.zPointerId = null;
  treeState.yPointerId = null;
  treeState.xPointerId = null;

  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 0,
    procedure: 'TREE-DELETE',
    description: `Node with key ${deleteKey} deleted successfully! Binary search tree property preserved.`,
    variables: { 'Status': `Key ${deleteKey} Deleted`, 'Remaining Nodes': Object.keys(treeState.nodes).length },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  return steps;
}

// =========================================================================
// 9. TREE WALKS: Inorder, Preorder, Postorder
// =========================================================================
export function generateBSTWalkSteps(
  initialTree: BSTTreeData,
  walkType: 'inorder' | 'preorder' | 'postorder'
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const treeState = cloneTreeData(initialTree);
  treeState.activeOperation = walkType;
  treeState.traversalOutput = [];

  const callStack: string[] = [];

  const procName =
    walkType === 'inorder'
      ? 'INORDER-TREE-WALK'
      : walkType === 'preorder'
      ? 'PREORDER-TREE-WALK'
      : 'POSTORDER-TREE-WALK';

  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 0,
    procedure: procName,
    description: `Begin ${procName}(T.root). By Theorem 12.1 in CLRS, an inorder tree walk of an n-node binary search tree prints keys in monotonically nondecreasing sorted order in Θ(n) time.`,
    variables: { 'T.root': treeState.rootId ? treeState.nodes[treeState.rootId].key : 'NIL', 'Walk Type': walkType.toUpperCase() },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  const traverse = (currId: string | null) => {
    const currKey = currId ? treeState.nodes[currId].key : null;
    const frame = `${procName}(${currKey !== null ? currKey : 'NIL'})`;
    callStack.push(frame);

    treeState.xPointerId = currId;
    if (currId) treeState.nodes[currId].state = 'bst-x';

    // Line 1: if x != NIL
    const isNotNil = currId !== null;
    steps.push({
      array: bstToArray(treeState.nodes, treeState.rootId),
      line: 1,
      procedure: procName,
      description: `${procName}: Line 1: if x != NIL. Current x = ${currKey !== null ? currKey : 'NIL'} (${isNotNil ? 'TRUE' : 'FALSE, return'}).`,
      variables: { 'x': currKey !== null ? currKey : 'NIL', 'x != NIL': isNotNil },
      indices: {},
      bst: cloneTreeData(treeState),
      callStack: [...callStack],
    });

    if (!isNotNil) {
      callStack.pop();
      return;
    }

    const currNode = treeState.nodes[currId!];

    if (walkType === 'inorder') {
      // Line 2: INORDER-TREE-WALK(x.left)
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 2,
        procedure: procName,
        description: `Line 2: Recursive call: INORDER-TREE-WALK(x.left) on left child ${currNode.left ? treeState.nodes[currNode.left].key : 'NIL'}.`,
        variables: { 'x.key': currNode.key, 'x.left': currNode.left ? treeState.nodes[currNode.left].key : 'NIL' },
        indices: {},
        bst: cloneTreeData(treeState),
        callStack: [...callStack],
      });
      traverse(currNode.left);

      // Line 3: print x.key
      treeState.xPointerId = currId;
      currNode.state = 'bst-visited';
      treeState.traversalOutput!.push(currNode.key);
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 3,
        procedure: procName,
        description: `Line 3: print x.key -> ${currNode.key}. Output sequence now: [${treeState.traversalOutput!.join(', ')}].`,
        variables: { 'PRINTED': currNode.key, 'Output': treeState.traversalOutput!.join(', ') },
        indices: {},
        bst: cloneTreeData(treeState),
        callStack: [...callStack],
      });

      // Line 4: INORDER-TREE-WALK(x.right)
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 4,
        procedure: procName,
        description: `Line 4: Recursive call: INORDER-TREE-WALK(x.right) on right child ${currNode.right ? treeState.nodes[currNode.right].key : 'NIL'}.`,
        variables: { 'x.key': currNode.key, 'x.right': currNode.right ? treeState.nodes[currNode.right].key : 'NIL' },
        indices: {},
        bst: cloneTreeData(treeState),
        callStack: [...callStack],
      });
      traverse(currNode.right);
    } else if (walkType === 'preorder') {
      // Line 2: print x.key
      currNode.state = 'bst-visited';
      treeState.traversalOutput!.push(currNode.key);
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 2,
        procedure: procName,
        description: `Line 2: print x.key -> ${currNode.key}. Output sequence: [${treeState.traversalOutput!.join(', ')}].`,
        variables: { 'PRINTED': currNode.key, 'Output': treeState.traversalOutput!.join(', ') },
        indices: {},
        bst: cloneTreeData(treeState),
        callStack: [...callStack],
      });

      // Line 3: PREORDER-TREE-WALK(x.left)
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 3,
        procedure: procName,
        description: `Line 3: PREORDER-TREE-WALK(x.left) on left child ${currNode.left ? treeState.nodes[currNode.left].key : 'NIL'}.`,
        variables: { 'x.key': currNode.key, 'x.left': currNode.left ? treeState.nodes[currNode.left].key : 'NIL' },
        indices: {},
        bst: cloneTreeData(treeState),
        callStack: [...callStack],
      });
      traverse(currNode.left);

      // Line 4: PREORDER-TREE-WALK(x.right)
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 4,
        procedure: procName,
        description: `Line 4: PREORDER-TREE-WALK(x.right) on right child ${currNode.right ? treeState.nodes[currNode.right].key : 'NIL'}.`,
        variables: { 'x.key': currNode.key, 'x.right': currNode.right ? treeState.nodes[currNode.right].key : 'NIL' },
        indices: {},
        bst: cloneTreeData(treeState),
        callStack: [...callStack],
      });
      traverse(currNode.right);
    } else {
      // Postorder
      // Line 2: POSTORDER-TREE-WALK(x.left)
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 2,
        procedure: procName,
        description: `Line 2: POSTORDER-TREE-WALK(x.left) on left child ${currNode.left ? treeState.nodes[currNode.left].key : 'NIL'}.`,
        variables: { 'x.key': currNode.key, 'x.left': currNode.left ? treeState.nodes[currNode.left].key : 'NIL' },
        indices: {},
        bst: cloneTreeData(treeState),
        callStack: [...callStack],
      });
      traverse(currNode.left);

      // Line 3: POSTORDER-TREE-WALK(x.right)
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 3,
        procedure: procName,
        description: `Line 3: POSTORDER-TREE-WALK(x.right) on right child ${currNode.right ? treeState.nodes[currNode.right].key : 'NIL'}.`,
        variables: { 'x.key': currNode.key, 'x.right': currNode.right ? treeState.nodes[currNode.right].key : 'NIL' },
        indices: {},
        bst: cloneTreeData(treeState),
        callStack: [...callStack],
      });
      traverse(currNode.right);

      // Line 4: print x.key
      currNode.state = 'bst-visited';
      treeState.traversalOutput!.push(currNode.key);
      steps.push({
        array: bstToArray(treeState.nodes, treeState.rootId),
        line: 4,
        procedure: procName,
        description: `Line 4: print x.key -> ${currNode.key}. Output sequence: [${treeState.traversalOutput!.join(', ')}].`,
        variables: { 'PRINTED': currNode.key, 'Output': treeState.traversalOutput!.join(', ') },
        indices: {},
        bst: cloneTreeData(treeState),
        callStack: [...callStack],
      });
    }

    callStack.pop();
  };

  traverse(treeState.rootId);

  steps.push({
    array: bstToArray(treeState.nodes, treeState.rootId),
    line: 0,
    procedure: procName,
    description: `${procName} completed! Final output sequence: [${treeState.traversalOutput!.join(', ')}].`,
    variables: { 'Final Traversal': treeState.traversalOutput!.join(', ') },
    indices: {},
    bst: cloneTreeData(treeState),
  });

  return steps;
}
