// components/CustomNode.tsx
'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

const CustomNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="bg-white text-black px-2 py-1 rounded border shadow text-center text-sm">
      <Handle type="target" position={Position.Left} id="left" />
      <div>{(data as { label?: React.ReactNode }).label}</div>
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  );
};

export default CustomNode;
