import React from 'react';
import Visual from './sections/Visual';
import HBar from '@/components/HBar';

const page = () => {
  return (
    <div className="flex-1 p-6 w-full">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Path-Finding Visualizer
      </h1>
      <p className="text-lg mb-8 text-gray-700 leading-relaxed">
        Explore how Dijkstra's Algorithm finds the shortest path between nodes in a weighted graph through 
        interactive step-by-step visualization. Watch as the algorithm explores nodes, updates distances, and 
        discovers the optimal path.
      </p>

      {/* Algorithm Overview */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">🚀 Dijkstra's Algorithm</h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Dijkstra's Algorithm</strong> is a graph search algorithm that finds the shortest path between 
            nodes in a weighted graph with non-negative edge weights. It was conceived by computer scientist 
            <strong> Edsger W. Dijkstra</strong> in 1956 and is widely used in routing protocols, GPS navigation 
            systems, and network analysis.
          </p>
        </div>

        {/* Key Properties */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-green-800 mb-3">✅ Guarantees</h3>
            <ul className="space-y-2 text-green-700">
              <li>• <strong>Optimal Solution:</strong> Always finds the shortest path</li>
              <li>• <strong>Completeness:</strong> Will find a path if one exists</li>
              <li>• <strong>Non-negative weights:</strong> Works with zero or positive edge weights</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-orange-800 mb-3">⚠️ Limitations</h3>
            <ul className="space-y-2 text-orange-700">
              <li>• <strong>No negative weights:</strong> Cannot handle negative edge weights</li>
              <li>• <strong>Single source:</strong> Finds paths from one source to all nodes</li>
              <li>• <strong>Memory intensive:</strong> Stores distance to all nodes</li>
            </ul>
          </div>
        </div>

        {/* Algorithm Steps */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">🔄 Algorithm Steps</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h4 className="font-semibold text-blue-900">Initialize</h4>
                <p className="text-blue-800">Set distance to start node as 0, all others as infinity (∞). Mark all nodes as unvisited.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h4 className="font-semibold text-purple-900">Select Minimum</h4>
                <p className="text-purple-800">Choose the unvisited node with the smallest known distance from the start.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h4 className="font-semibold text-green-900">Update Neighbors</h4>
                <p className="text-green-800">For each unvisited neighbor, calculate distance through current node. Update if shorter.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h4 className="font-semibold text-yellow-900">Mark Visited</h4>
                <p className="text-yellow-800">Mark current node as visited (won't be checked again). Repeat until all nodes processed.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Complexity Analysis */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">⚡ Complexity Analysis</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Time Complexity</h4>
              <div className="space-y-2 text-gray-600">
                <p><code className="bg-gray-200 px-2 py-1 rounded">O((V + E) log V)</code> - Using binary heap</p>
                <p><code className="bg-gray-200 px-2 py-1 rounded">O(V²)</code> - Using simple array</p>
                <p><code className="bg-gray-200 px-2 py-1 rounded">O(E + V log V)</code> - Using Fibonacci heap</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Space Complexity</h4>
              <div className="space-y-2 text-gray-600">
                <p><code className="bg-gray-200 px-2 py-1 rounded">O(V)</code> - Distance array</p>
                <p><code className="bg-gray-200 px-2 py-1 rounded">O(V)</code> - Priority queue</p>
                <p><code className="bg-gray-200 px-2 py-1 rounded">O(V)</code> - Previous node tracking</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>V</strong> = number of vertices, <strong>E</strong> = number of edges</p>
          </div>
        </div>

        {/* Real-world Applications */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-800">🌍 Real-World Applications</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-indigo-100">
              <h4 className="font-semibold text-indigo-700 mb-2">🗺️ GPS Navigation</h4>
              <p className="text-indigo-600 text-sm">Finding shortest routes between locations on road networks</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-100">
              <h4 className="font-semibold text-indigo-700 mb-2">🌐 Network Routing</h4>
              <p className="text-indigo-600 text-sm">Internet protocols like OSPF use Dijkstra for packet routing</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-100">
              <h4 className="font-semibold text-indigo-700 mb-2">🎮 Game AI</h4>
              <p className="text-indigo-600 text-sm">Pathfinding for NPCs and optimal route planning in games</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-100">
              <h4 className="font-semibold text-indigo-700 mb-2">📱 Social Networks</h4>
              <p className="text-indigo-600 text-sm">Finding shortest paths between users, friend suggestions</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-100">
              <h4 className="font-semibold text-indigo-700 mb-2">✈️ Flight Planning</h4>
              <p className="text-indigo-600 text-sm">Calculating optimal flight routes considering fuel costs</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-100">
              <h4 className="font-semibold text-indigo-700 mb-2">🏥 Emergency Services</h4>
              <p className="text-indigo-600 text-sm">Finding fastest routes for ambulances and fire trucks</p>
            </div>
          </div>
        </div>
      </section>

      <HBar />
      
      {/* Interactive Visualization */}
      <section>
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">🎯 Interactive Visualization</h2>
        <p className="text-gray-600 mb-6">
          Use the controls below to step through the algorithm execution. Watch how nodes are selected, 
          distances are updated, and the shortest path is discovered. The visualization shows:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
          <div className="space-y-2">
            <p>• <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span><strong>Green nodes:</strong> Start node</p>
            <p>• <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span><strong>Red nodes:</strong> Target node</p>
            <p>• <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span><strong>Blue nodes:</strong> Currently processing</p>
          </div>
          <div className="space-y-2">
            <p>• <span className="inline-block w-3 h-3 bg-gray-400 rounded-full mr-2"></span><strong>Gray nodes:</strong> Already visited</p>
            <p>• <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-2"></span><strong>Yellow nodes:</strong> Final shortest path</p>
            <p>• <strong>Numbers on nodes:</strong> Current shortest distance from start</p>
          </div>
        </div>
        
        <Visual />
      </section>
    </div>
  );
}

export default page;
