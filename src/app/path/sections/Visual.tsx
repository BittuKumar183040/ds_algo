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
import React, { useCallback, useEffect, useRef } from 'react';
import type { Node, Edge, NodeTypes } from '@xyflow/react';
import CustomNode from '../customComponent';
import { getRandomColor, gridNodePosition } from '../methods/common';

const edgesDig = [[0, 1, 1], [0, 2, 1], [1, 4, 1], [2, 3, 1], [3, 4, 1]];

const Visual = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const nodeTypes: NodeTypes = {
    custom: CustomNode,
  };

  useEffect(() => {

    setNodes(Array.from({ length: edgesDig.length }, (_, i) => ({
      id: `${i}`,
      type: 'custom',
      position: gridNodePosition(i),
      data: { label: `${i}` },
      draggable: true,
      connectable: true,
    })));

    setEdges([
      { id: '0-1', style: {stroke: getRandomColor()}, source: '0', target: '1', sourceHandle: 'right-source', targetHandle: 'left-target' },
      { id: '0-2', style: {stroke: getRandomColor()}, source: '0', target: '2', sourceHandle: 'right-source', targetHandle: 'left-target' },
      { id: '1-4', style: {stroke: getRandomColor()}, source: '1', target: '4', sourceHandle: 'right-source', targetHandle: 'left-target' },
      { id: '2-3', style: {stroke: getRandomColor()}, source: '2', target: '3', sourceHandle: 'right-source', targetHandle: 'left-target' },
      { id: '3-4', style: {stroke: getRandomColor()}, source: '3', target: '4', sourceHandle: 'right-source', targetHandle: 'left-target' }
    ]);

  }, []);

  const onConnect = useCallback((params: any) => {
    const sourceNode = nodes.find((n) => n.id === params.source);
    const targetNode = nodes.find((n) => n.id === params.target);

    if (!sourceNode || !targetNode) return;

    const dx = targetNode.position.x - sourceNode.position.x;
    const sourceHandle = dx > 0 ? 'right-source' : 'left-source';
    const targetHandle = dx > 0 ? 'left-target' : 'right-target';

    setEdges((prev) =>
      addEdge(
        {
          ...params,
          sourceHandle,
          targetHandle,
          style: { stroke: getRandomColor(), strokeWidth: 2},
        },
        prev
      )
    );
  }, [nodes, setEdges]);

  return (
    <section>
      <div>Visual</div>
      <div
        ref={container}
        className="border rounded-md my-2"
        style={{ width: '100%', height: '280px' }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </section>
  );
};

export default Visual;