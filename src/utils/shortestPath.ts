/**
 * This is implementation for Djikstra algorithm to find shortest path
 * @param {[string, string][]} edges Array of arrays containing Id + parentId
 * @param start Start ID
 * @param end End ID
 * @returns Array with the path
 */
export function findShortestPath(edges: [string, string][], start: string, end: string): string[] {
    if (start === end) return [start];

    const graph = new Map<string, Set<string>>();
    edges.forEach(([a, b]) => {
        if (!graph.has(a)) graph.set(a, new Set());
        if (!graph.has(b)) graph.set(b, new Set());
        graph.get(a)!.add(b);
        graph.get(b)!.add(a);
    });

    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();
    const queue = new Set<string>();

    for (const node of graph.keys()) {
        distances.set(node, Infinity);
        previous.set(node, null);
        queue.add(node);
    }
    distances.set(start, 0);

    while (queue.size > 0) {
        const current = [...queue].reduce((a, b) => (
            (distances.get(a) ?? Infinity) < (distances.get(b) ?? Infinity) ? a : b
        ));

        queue.delete(current);

        if (current === end) break;

        for (const neighbor of graph.get(current) || []) {
            if (!queue.has(neighbor)) continue;

            const alt = (distances.get(current) ?? Infinity) + 1;
            if (alt < (distances.get(neighbor) ?? Infinity)) {
                distances.set(neighbor, alt);
                previous.set(neighbor, current);
            }
        }
    }

    const path: string[] = [];
    let currentNode: string | null = end;
    while (currentNode) {
        path.unshift(currentNode);
        currentNode = previous.get(currentNode) ?? null;
    }

    return path[0] === start ? path : [];
}