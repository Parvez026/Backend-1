/**
 * Sample battle data conforming strictly to the user's schema:
 * {
 *   "problem": "string",
 *   "solution_1": "string",
 *   "solution_2": "string",
 *   "judge": {
 *     "solution_1_score": number,
 *     "solution_2_score": number,
 *     "solution_1_reasoning": "string",
 *     "solution_2_reasoning": "string"
 *   }
 * }
 */
// export const SAMPLE_BATTLE = {
//   problem: "Implement an LRU (Least Recently Used) Cache with O(1) get and put operations in TypeScript.",
//   solution_1: `A concise implementation using JavaScript's ordered \`Map\` object, which maintains insertion order:

// \`\`\`typescript
// export class LRUCache<K, V> {
//   private capacity: number;
//   private cache: Map<K, V>;

//   constructor(capacity: number) {
//     if (capacity <= 0) throw new Error("Capacity must be > 0");
//     this.capacity = capacity;
//     this.cache = new Map<K, V>();
//   }

//   get(key: K): V | undefined {
//     if (!this.cache.has(key)) return undefined;
//     const value = this.cache.get(key)!;
//     // Move to most-recent position
//     this.cache.delete(key);
//     this.cache.set(key, value);
//     return value;
//   }

//   put(key: K, value: V): void {
//     if (this.cache.has(key)) {
//       this.cache.delete(key);
//     } else if (this.cache.size >= this.capacity) {
//       // Evict least-recently-used (first key)
//       const lruKey = this.cache.keys().next().value;
//       if (lruKey !== undefined) this.cache.delete(lruKey);
//     }
//     this.cache.set(key, value);
//   }
// }
// \`\`\`

// - **get/put**: O(1) average
// - **Space**: O(capacity)`,
//   solution_2: `Production-grade implementation using a Doubly Linked List + HashMap for deterministic O(1) without Map rehashing:

// \`\`\`typescript
// class DNode<K, V> {
//   constructor(
//     public key: K,
//     public value: V,
//     public prev: DNode<K, V> | null = null,
//     public next: DNode<K, V> | null = null
//   ) {}
// }

// export class LRUCache<K, V> {
//   private readonly map = new Map<K, DNode<K, V>>();
//   private readonly head: DNode<K, V>;
//   private readonly tail: DNode<K, V>;

//   constructor(private readonly capacity: number) {
//     if (capacity <= 0) throw new Error("Capacity must be positive");
//     // Sentinel nodes — eliminates null-checks at boundaries
//     this.head = new DNode<K, V>(null as any, null as any);
//     this.tail = new DNode<K, V>(null as any, null as any);
//     this.head.next = this.tail;
//     this.tail.prev = this.head;
//   }

//   get(key: K): V | undefined {
//     const node = this.map.get(key);
//     if (!node) return undefined;
//     this.moveToHead(node);
//     return node.value;
//   }

//   put(key: K, value: V): void {
//     const existing = this.map.get(key);
//     if (existing) {
//       existing.value = value;
//       this.moveToHead(existing);
//       return;
//     }
//     if (this.map.size >= this.capacity) {
//       const lru = this.tail.prev!;
//       this.removeNode(lru);
//       this.map.delete(lru.key);
//     }
//     const node = new DNode(key, value);
//     this.addToHead(node);
//     this.map.set(key, node);
//   }

//   private addToHead(node: DNode<K, V>) {
//     node.prev = this.head;
//     node.next = this.head.next;
//     this.head.next!.prev = node;
//     this.head.next = node;
//   }

//   private removeNode(node: DNode<K, V>) {
//     node.prev!.next = node.next;
//     node.next!.prev = node.prev;
//   }

//   private moveToHead(node: DNode<K, V>) {
//     this.removeNode(node);
//     this.addToHead(node);
//   }
// }
// \`\`\`

// **Key advantages over Map-only approach:**
// 1. **No Map rehashing** on delete+reinsert cycles under high eviction load
// 2. **Sentinel nodes** eliminate boundary null-checks
// 3. **Pointer manipulation** is deterministic — no iterator allocations`,
//   judge: {
//     solution_1_score: 9.0,
//     solution_2_score: 9.8,
//     solution_1_reasoning: "Clean and concise. Leverages JavaScript Map's ordered iteration. However, frequent delete+reinsert causes V8 hash table rehashing under sustained high-throughput eviction, creating unpredictable GC pauses.",
//     solution_2_reasoning: "Canonical gold-standard implementation. Sentinel nodes eliminate edge-case null guards, pointer swaps are O(1) with zero allocations, and behavior is predictable at any throughput level. Preferred in systems design interviews and production caches."
//   }
// };
