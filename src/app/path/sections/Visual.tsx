'use client'
import { addEdge, Background, Controls, ReactFlow, useEdgesState, useNodesState, BackgroundVariant } from '@xyflow/react';
import React, { useCallback, useEffect, useRef } from 'react'
import type { Node, Edge, NodeTypes } from '@xyflow/react';
import CustomNode from '../customComponent';


const edgesDig =  [[0, 1, 4], [0, 2, 8], [1, 4, 6], [2, 3, 2], [3, 4, 10]];
const Visual = () => {
  const container = useRef<HTMLDivElement | null>(null);

  const constructAdj = (edges:number[][], V:number) => {
    const adj: [number, number][][] = Array.from({ length: V }, () => []);
    for (const edge of edges) {
        const [start, end, weight] = edge;
        adj[start].push([end, weight]);
        adj[end].push([start, weight]); 
    }
    return adj;
  }

  const dijkstra = (V:number, edges:number[][], src:number) => {
    const adj = constructAdj(edges, V)
    console.log(adj, " -><- ", src)
  }

  useEffect(()=>{
    const V = 5;
    const result = dijkstra(V, edgesDig, 0)

    console.log("result", result)

  },[])

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const randomNodePostion = () => {
    return { x: Math.random() * 400, y: Math.random() * 200 }
  }
  const nodeTypes: NodeTypes = {
    custom: CustomNode,
  };

  useEffect(()=> {
    setNodes([
      { id: '0', type: 'custom', position: randomNodePostion(), data: { label: '0' } },
      { id: '1', type: 'custom', position: randomNodePostion(), data: { label: '1' } },
      { id: '2', type: 'custom', position: randomNodePostion(), data: { label: '2' } },
      { id: '3', type: 'custom', position: randomNodePostion(), data: { label: '3' } },
      { id: '4', type: 'custom', position: randomNodePostion(), data: { label: '4' } }
  ])
  setEdges([
    { id: '4', source: '0', target: '1' },
    { id: '8', source: '0', target: '2' },
    { id: '6', source: '1', target: '4' },
    { id: '2', source: '2', target: '3' },
    { id: '10', source: '3', target: '4' }
  ])
  },[])

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <section>
      <div>Visual</div>      
      <div ref={container} className=' border rounded-md my-2' style={{ width: '100%', height: '280px' }}>
        <ReactFlow 
          nodes={nodes} 
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
        </ReactFlow>
      </div>

    </section>
  )
}

export default Visual