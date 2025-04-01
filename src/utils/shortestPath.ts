export function findShortestPath(edges: [string, string][], start: string, end: string): string[] {
    const graph = new Map<string, string[]>();
    for (const [a, b] of edges) {
        if (!graph.has(a)) graph.set(a, []);
        if (!graph.has(b)) graph.set(b, []);
        graph.get(a)!.push(b);
        graph.get(b)!.push(a);
    }

    const queue: string[][] = [[start]];
    const visited = new Set<string>();

    while (queue.length > 0) {
        const path = queue.shift()!;
        const node = path[path.length - 1];
        if (node === end) return path;

        if (!visited.has(node)) {
            visited.add(node);
            for (const neighbor of graph.get(node) || []) {
                queue.push([...path, neighbor]);
            }
        }
    }
    return [];
}