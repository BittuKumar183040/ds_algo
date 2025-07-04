export interface GraphNode {
  id: string;
  distance: number;
  previous: string | null;
  visited: boolean;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight: number;
}

export interface DijkstraStep {
  type: 'INIT' | 'SELECT_NODE' | 'UPDATE_NEIGHBOR' | 'MARK_VISITED' | 'COMPLETE';
  currentNode?: string;
  neighbor?: string;
  distances: Record<string, number>;
  visited: Record<string, boolean>;
  previous: Record<string, string | null>;
  queue: string[];
  description: string;
}

export class DijkstraVisualizer {
  private nodes: Record<string, GraphNode> = {};
  private edges: GraphEdge[] = [];
  private steps: DijkstraStep[] = [];
  private startNode: string = '';

  constructor(nodeIds: string[], edges: GraphEdge[], startNode: string) {
    this.startNode = startNode;
    this.edges = edges;
    
    // Initialize nodes
    nodeIds.forEach(id => {
      this.nodes[id] = {
        id,
        distance: id === startNode ? 0 : Infinity,
        previous: null,
        visited: false
      };
    });
  }

  private getAdjacencyList(): Record<string, { node: string; weight: number }[]> {
    const adjacencyList: Record<string, { node: string; weight: number }[]> = {};
    
    Object.keys(this.nodes).forEach(nodeId => {
      adjacencyList[nodeId] = [];
    });

    this.edges.forEach(edge => {
      adjacencyList[edge.from].push({ node: edge.to, weight: edge.weight });
      adjacencyList[edge.to].push({ node: edge.from, weight: edge.weight });
    });

    return adjacencyList;
  }

  public generateSteps(): DijkstraStep[] {
    const adjacencyList = this.getAdjacencyList();
    const queue = Object.keys(this.nodes);
    
    // Reset for fresh calculation
    Object.values(this.nodes).forEach(node => {
      if (node.id !== this.startNode) {
        node.distance = Infinity;
      }
      node.visited = false;
      node.previous = null;
    });
    
    this.steps = [];

    // Initial step
    this.steps.push({
      type: 'INIT',
      distances: this.getDistances(),
      visited: this.getVisited(),
      previous: this.getPrevious(),
      queue: [...queue],
      description: `Initialize: Start node ${this.startNode} has distance 0, all others have distance ∞`
    });

    while (queue.length > 0) {
      // Find node with minimum distance in queue
      let minNode = queue[0];
      for (const nodeId of queue) {
        if (this.nodes[nodeId].distance < this.nodes[minNode].distance) {
          minNode = nodeId;
        }
      }

      // Remove from queue
      const currentIndex = queue.indexOf(minNode);
      queue.splice(currentIndex, 1);

      // If distance is infinity, remaining nodes are unreachable
      if (this.nodes[minNode].distance === Infinity) {
        break;
      }

      this.steps.push({
        type: 'SELECT_NODE',
        currentNode: minNode,
        distances: this.getDistances(),
        visited: this.getVisited(),
        previous: this.getPrevious(),
        queue: [...queue],
        description: `Select node ${minNode} with minimum distance ${this.nodes[minNode].distance}`
      });

      // Mark as visited
      this.nodes[minNode].visited = true;

      this.steps.push({
        type: 'MARK_VISITED',
        currentNode: minNode,
        distances: this.getDistances(),
        visited: this.getVisited(),
        previous: this.getPrevious(),
        queue: [...queue],
        description: `Mark node ${minNode} as visited`
      });

      // Check all neighbors
      for (const neighbor of adjacencyList[minNode]) {
        if (!this.nodes[neighbor.node].visited) {
          const newDistance = this.nodes[minNode].distance + neighbor.weight;
          
          if (newDistance < this.nodes[neighbor.node].distance) {
            this.nodes[neighbor.node].distance = newDistance;
            this.nodes[neighbor.node].previous = minNode;

            this.steps.push({
              type: 'UPDATE_NEIGHBOR',
              currentNode: minNode,
              neighbor: neighbor.node,
              distances: this.getDistances(),
              visited: this.getVisited(),
              previous: this.getPrevious(),
              queue: [...queue],
              description: `Update distance to ${neighbor.node}: ${newDistance} (via ${minNode})`
            });
          }
        }
      }
    }

    this.steps.push({
      type: 'COMPLETE',
      distances: this.getDistances(),
      visited: this.getVisited(),
      previous: this.getPrevious(),
      queue: [],
      description: 'Algorithm complete! All reachable nodes have been processed.'
    });

    return this.steps;
  }

  private getDistances(): Record<string, number> {
    const distances: Record<string, number> = {};
    Object.values(this.nodes).forEach(node => {
      distances[node.id] = node.distance;
    });
    return distances;
  }

  private getVisited(): Record<string, boolean> {
    const visited: Record<string, boolean> = {};
    Object.values(this.nodes).forEach(node => {
      visited[node.id] = node.visited;
    });
    return visited;
  }

  private getPrevious(): Record<string, string | null> {
    const previous: Record<string, string | null> = {};
    Object.values(this.nodes).forEach(node => {
      previous[node.id] = node.previous;
    });
    return previous;
  }

  public getShortestPath(targetNode: string): string[] {
    const path: string[] = [];
    let current: string | null = targetNode;

    while (current !== null) {
      path.unshift(current);
      current = this.nodes[current].previous;
    }

    return this.nodes[targetNode].distance === Infinity ? [] : path;
  }
}