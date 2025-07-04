import React from 'react';
import Visual from './sections/Visual';
import HBar from '@/components/HBar';

const page = () => {
  return (
    <section className="flex-1 p-6 w-full">
      <h1 className="text-4xl font-bold mb-4">Path-Finding Visualizer</h1>
      <p className="mb-4">
        Explore how Dijkstra's Algorithm finds the shortest path between nodes in a weighted graph through 
        interactive step-by-step visualization. Watch as the algorithm explores nodes, updates distances, and 
        discovers the optimal path.
      </p>

      <h2 className="text-xl font-semibold text-blue-600">Dijkstra's Algorithm</h2>
      <div className="space-y-4 mt-2 mb-6">
        <p>
          <strong>Dijkstra's Algorithm</strong> is a graph search algorithm that finds the shortest path between 
          nodes in a weighted graph with non-negative edge weights. It was conceived by computer scientist 
          Edsger W. Dijkstra in 1956 and is widely used in routing protocols, GPS navigation systems, and network analysis.
        </p>
        
        <p>Key properties of Dijkstra's Algorithm:</p>
        <ul className="space-y-1">
          <li>• Always finds the shortest path (optimal solution)</li>
          <li>• Works only with non-negative edge weights</li>
          <li>• Uses a priority queue to determine the next node to visit</li>
          <li>• Time Complexity: O((V + E) log V) using a min-priority queue</li>
          <li>• Space Complexity: O(V) for distance and previous node arrays</li>
          <li>• Widely used in routing and navigation systems</li>
        </ul>
      </div>

      <h2 className="text-xl font-semibold text-green-600">Algorithm Steps</h2>
      <div className="space-y-4 mt-2 mb-6">
        <p>The algorithm follows these main steps:</p>
        <ul className="space-y-1">
          <li>• <strong>Initialize:</strong> Set distance to start node as 0, all others as infinity (∞)</li>
          <li>• <strong>Select Minimum:</strong> Choose the unvisited node with smallest known distance</li>
          <li>• <strong>Update Neighbors:</strong> Calculate distance through current node, update if shorter</li>
          <li>• <strong>Mark Visited:</strong> Mark current node as visited and repeat until all nodes processed</li>
        </ul>
      </div>

      <h2 className="text-xl font-semibold text-purple-600">Real-World Applications</h2>
      <div className="space-y-4 mt-2 mb-6">
        <p>Dijkstra's Algorithm is used in many practical applications:</p>
        <ul className="space-y-1">
          <li>• <strong>GPS Navigation:</strong> Finding shortest routes between locations on road networks</li>
          <li>• <strong>Network Routing:</strong> Internet protocols like OSPF use Dijkstra for packet routing</li>
          <li>• <strong>Game AI:</strong> Pathfinding for NPCs and optimal route planning in games</li>
          <li>• <strong>Social Networks:</strong> Finding shortest paths between users, friend suggestions</li>
          <li>• <strong>Flight Planning:</strong> Calculating optimal flight routes considering fuel costs</li>
          <li>• <strong>Emergency Services:</strong> Finding fastest routes for ambulances and fire trucks</li>
        </ul>
      </div>

      <HBar />
      
      <h2 className="text-xl font-semibold text-red-600">Interactive Visualization</h2>
      <p className="mt-2 mb-6">
        Use the controls below to step through the algorithm execution. Watch how nodes are selected, 
        distances are updated, and the shortest path is discovered. The visualization shows:
      </p>
      
      <ul className="mb-6 space-y-1">
        <li>• <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span><strong>Green nodes:</strong> Start node</li>
        <li>• <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span><strong>Red nodes:</strong> Target node</li>
        <li>• <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span><strong>Blue nodes:</strong> Currently processing</li>
        <li>• <span className="inline-block w-3 h-3 bg-gray-400 rounded-full mr-2"></span><strong>Gray nodes:</strong> Already visited</li>
        <li>• <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-2"></span><strong>Yellow nodes:</strong> Final shortest path</li>
        <li>• <strong>Numbers on nodes:</strong> Current shortest distance from start</li>
      </ul>
      
      <Visual />
    </section>
  );
}

export default page;
