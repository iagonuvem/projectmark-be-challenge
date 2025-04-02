import { findShortestPath } from '../../utils/shortestPath';

describe('findShortestPath - Dijkstra', () => {
  const edges: [string, string][] = [
    ['A', 'B'],
    ['B', 'C'],
    ['C', 'D'],
    ['A', 'E'],
    ['E', 'D'],
    ['D', 'F'],
    ['C', 'F']
  ];

  it('should return the shortest path from A to F', () => {
    const path = findShortestPath(edges, 'A', 'F');
    expect(path).toEqual(['A', 'E', 'D', 'F']);
  });

  it('should return the shortest path from A to C', () => {
    const path = findShortestPath(edges, 'A', 'C');
    expect(path).toEqual(['A', 'B', 'C']);
  });

  it('should return an empty path if no connection exists', () => {
    const disconnectedEdges: [string, string][] = [['A', 'B'], ['C', 'D']];
    const path = findShortestPath(disconnectedEdges, 'A', 'D');
    expect(path).toEqual([]);
  });

  it('should return only the start node if start === end', () => {
    const path = findShortestPath(edges, 'A', 'A');
    expect(path).toEqual(['A']);
  });
});