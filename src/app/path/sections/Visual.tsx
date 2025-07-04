'use client';
import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  BackgroundVariant,
} from '@xyflow/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { Node, Edge, NodeTypes } from '@xyflow/react';
import CustomNode from '../customComponent';
import { gridNodePosition } from '../methods/common';
import { DijkstraVisualizer, GraphEdge, DijkstraStep } from '../methods/dijkstra';

// Sample graph with weighted edges
const sampleEdges: GraphEdge[] = [
  { from: '0', to: '1', weight: 4 },
  { from: '0', to: '2', weight: 2 },
  { from: '1', to: '2', weight: 1 },
  { from: '1', to: '3', weight: 5 },
  { from: '2', to: '3', weight: 8 },
  { from: '2', to: '4', weight: 10 },
  { from: '3', to: '4', weight: 2 },
];

const Visual = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [steps, setSteps] = useState<DijkstraStep[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [startNode] = useState<string>('0');
  const [targetNode] = useState<string>('4');
  const [shortestPath, setShortestPath] = useState<string[]>([]);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nodeTypes: NodeTypes = {
    custom: CustomNode,
  };

  const nodeIds = ['0', '1', '2', '3', '4'];

  const initializeGraph = useCallback(() => {
    // Initialize nodes
    const initialNodes = nodeIds.map((id, index) => ({
      id,
      type: 'custom',
      position: gridNodePosition(index, 3),
      data: { 
        label: id,
        distance: id === startNode ? 0 : undefined,
        isStartNode: id === startNode,
        isTargetNode: id === targetNode,
      },
      draggable: true,
      connectable: true,
    }));

    // Initialize edges with weights
    const initialEdges = sampleEdges.map(edge => ({
      id: `${edge.from}-${edge.to}`,
      source: edge.from,
      target: edge.to,
      label: edge.weight.toString(),
      style: { 
        stroke: '#666',
        strokeWidth: 2
      },
      labelStyle: { 
        fill: '#000',
        fontWeight: 600,
        fontSize: 14,
        backgroundColor: 'white',
        padding: '2px 4px',
        borderRadius: '4px'
      },
      sourceHandle: 'right-source',
      targetHandle: 'left-target',
    }));

    setNodes(initialNodes);
    setEdges(initialEdges);

    // Generate algorithm steps
    const visualizer = new DijkstraVisualizer(nodeIds, sampleEdges, startNode);
    const algorithmSteps = visualizer.generateSteps();
         setSteps(algorithmSteps);
     setShortestPath(visualizer.getShortestPath(targetNode));
     setCurrentStep(0);
   }, [startNode, targetNode]);

  const updateVisualization = useCallback(() => {
    if (currentStep >= steps.length) return;

    const step = steps[currentStep];
    
    // Update nodes based on current step
    setNodes(prevNodes => 
      prevNodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          distance: step.distances[node.id],
          visited: step.visited[node.id],
          isCurrentNode: node.id === step.currentNode,
          isStartNode: node.id === startNode,
          isTargetNode: node.id === targetNode,
          inShortestPath: step.type === 'COMPLETE' && shortestPath.includes(node.id),
        }
      }))
    );

    // Update edges to highlight current operation
    setEdges(prevEdges => 
      prevEdges.map(edge => {
        let edgeStyle = { stroke: '#666', strokeWidth: 2 };
        
        if (step.type === 'UPDATE_NEIGHBOR' && 
            ((edge.source === step.currentNode && edge.target === step.neighbor) ||
             (edge.target === step.currentNode && edge.source === step.neighbor))) {
          edgeStyle = { stroke: '#3b82f6', strokeWidth: 4 };
        }
        
        if (step.type === 'COMPLETE' && shortestPath.length > 1) {
          for (let i = 0; i < shortestPath.length - 1; i++) {
            if ((edge.source === shortestPath[i] && edge.target === shortestPath[i + 1]) ||
                (edge.target === shortestPath[i] && edge.source === shortestPath[i + 1])) {
              edgeStyle = { stroke: '#fbbf24', strokeWidth: 4 };
              break;
            }
          }
        }

        return {
          ...edge,
          style: edgeStyle,
        };
      })
    );
  }, [currentStep, steps, startNode, targetNode, shortestPath, setNodes, setEdges]);

  useEffect(() => {
    initializeGraph();
  }, [initializeGraph]);

  useEffect(() => {
    if (steps.length > 0) {
      updateVisualization();
    }
  }, [updateVisualization, steps]);

  const playAlgorithm = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const pauseAlgorithm = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetAlgorithm = () => {
    pauseAlgorithm();
    setCurrentStep(0);
  };

  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onConnect = useCallback((params: any) => {
    // Allow manual edge connections for experimentation
    setEdges((prev) =>
      addEdge(
        {
          ...params,
          label: '1', // Default weight
          style: { stroke: '#666', strokeWidth: 2 },
        },
        prev
      )
    );
  }, [setEdges]);

  const getCurrentStepInfo = () => {
    if (currentStep >= steps.length) return null;
    return steps[currentStep];
  };

  const currentStepInfo = getCurrentStepInfo();

  return (
    <section>
      
      {/* Algorithm Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={playAlgorithm}
          disabled={isPlaying || currentStep >= steps.length - 1}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          ▶ Play
        </button>
        <button
          onClick={pauseAlgorithm}
          disabled={!isPlaying}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          ⏸ Pause
        </button>
        <button
          onClick={resetAlgorithm}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          ⏹ Reset
        </button>
        <button
          onClick={stepBackward}
          disabled={currentStep <= 0}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          ⏮ Step Back
        </button>
        <button
          onClick={stepForward}
          disabled={currentStep >= steps.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          ⏭ Step Forward
        </button>
      </div>
      
      <div className="text-sm text-gray-600 mb-4">
        Step {currentStep + 1} of {steps.length}
      </div>

      {/* Current Step Information */}
      {currentStepInfo && (
        <div className="mb-4">
          <p className="font-semibold mb-2">Current Step: {currentStepInfo.description}</p>
          
          {currentStepInfo.type !== 'INIT' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Distances: </span>
                {Object.entries(currentStepInfo.distances).map(([node, distance]) => (
                  <span key={node} className="mr-3">
                    {node}:{distance === Infinity ? '∞' : distance}
                  </span>
                ))}
              </div>
              <div>
                <span className="font-medium">Queue: </span>
                [{currentStepInfo.queue.join(', ')}]
              </div>
            </div>
          )}
        </div>
      )}

      {/* Graph Visualization */}
      <div className="w-full flex justify-center mb-4">
        <div
          ref={container}
          className="bg-gray-100 dark:bg-gray-800 rounded-md shadow"
          style={{ width: '100%', height: '400px' }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>

      {/* Algorithm Summary */}
      {currentStep === steps.length - 1 && shortestPath.length > 0 && (
        <div className="text-center py-4">
          <p className="font-semibold text-green-600 mb-2">🎉 Algorithm Complete!</p>
          <p>
            Shortest path from {startNode} to {targetNode}: {' '}
            <strong>{shortestPath.join(' → ')}</strong>
          </p>
          <p>
            Total distance: <strong>{steps[currentStep].distances[targetNode]}</strong>
          </p>
        </div>
      )}
    </section>
  );
};

export default Visual;