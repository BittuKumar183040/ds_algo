import React from 'react';
import Visual from './sections/Visual';
import HBar from '@/components/HBar';

const page = () => {
  return (
    <div className="flex-1 p-6 w-full ">
      <h1 className="text-4xl font-bold mb-4">Path-Finding Visualizer</h1>
      <p className="text-lg mb-8">
        Explore how various pathfinding algorithms work step by step. Starting with Dijkstra's Algorithm.
      </p>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Dijkstra's Algorithm</h2>
        <p className=" mb-4">
          Dijkstra's Algorithm is a graph search algorithm that finds the shortest path between nodes in a weighted graph. 
          It guarantees the shortest path in graphs without negative weights.
        </p>

        <ul className="list-disc list-inside space-y-2">
          <li>Guarantees the shortest path in weighted graphs</li>
          <li>Works only with non-negative edge weights</li>
          <li>Uses a priority queue to determine the next node to visit</li>
          <li>Time Complexity: O((V + E) log V) using a min-priority queue</li>
          <li>Widely used in routing and navigation systems</li>
        </ul>
      </section>
      <HBar />
      <Visual />

    </div>
  );
}

export default page;
