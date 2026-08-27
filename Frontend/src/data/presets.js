export const PRESETS = [
  {
    id: "two-sum",
    name: "Two Sum (Optimal Lookup)",
    data: {
      problem: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
      solution_1: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
      solution_2: `def twoSum(nums: list[int], target: int) -> list[int]:
    lookup: dict[int, int] = {}
    for index, value in enumerate(nums):
        complement = target - value
        if complement in lookup:
            return [lookup[complement], index]
        lookup[value] = index
    return []`,
      judge: {
        solution_1_score: 91,
        solution_2_score: 98,
        solution_1_reasoning: "Correct single-pass hash map algorithm running in O(n) time and O(n) space. Variable names are concise but lacks type hinting.",
        solution_2_reasoning: "Optimal O(n) hash map implementation with complete Python type annotations (list[int], dict[int, int]), explicit descriptive naming (complement, lookup), and clean PEP8 styling."
      }
    }
  },
  {
    id: "lru-cache",
    name: "LRU Cache Design",
    data: {
      problem: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement LRUCache with get(key) and put(key, value) in O(1) average time complexity.",
      solution_1: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)`,
      solution_2: `class Node:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        self.head, self.tail = Node(), Node()
        self.head.next, self.tail.prev = self.tail, self.head

    def _remove(self, node: Node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add(self, node: Node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self._add(node)
        self.cache[key] = node
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]`,
      judge: {
        solution_1_score: 95,
        solution_2_score: 88,
        solution_1_reasoning: "Leverages standard library OrderedDict for concise, bug-free, and high-performance O(1) operations. Highly maintainable in production.",
        solution_2_reasoning: "Solid foundational doubly linked list + hash map implementation demonstrating raw algorithmic fundamentals, though slightly more verbose and prone to pointer edge-case bugs."
      }
    }
  },
  {
    id: "async-debounce",
    name: "Async Debounce Function (TypeScript)",
    data: {
      problem: "Implement a TypeScript debounce utility function with immediate execution option and cancellation support that works with generic async return types.",
      solution_1: `export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`,
      solution_2: `export function debounce<T extends (...args: any[]) => Promise<any> | any>(
  fn: T,
  delay: number,
  options: { leading?: boolean; trailing?: boolean } = { trailing: true }
): {
  (...args: Parameters<T>): Promise<ReturnType<T>>;
  cancel: () => void;
} {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  const debounced = (...args: Parameters<T>) => {
    return new Promise<ReturnType<T>>((resolve, reject) => {
      if (timer) clearTimeout(timer);
      const invoke = async () => {
        try {
          resolve(await fn(...args));
        } catch (err) {
          reject(err);
        }
      };
      if (options.leading && !timer) {
        invoke();
      }
      timer = setTimeout(invoke, delay);
    });
  };

  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };

  return debounced;
}`,
      judge: {
        solution_1_score: 75,
        solution_2_score: 96,
        solution_1_reasoning: "Standard vanilla debounce implementation. Does not support Promise returns, cancellation, or leading edge triggers.",
        solution_2_reasoning: "Full-featured implementation with typed Promises, leading/trailing execution flags, and a clean .cancel() teardown method."
      }
    }
  }
];

export const defaultBattleData = PRESETS[0].data;
