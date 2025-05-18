'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

const CustomNode: React.FC<NodeProps> = ({ data, isConnectable = true }) => {
  return (
    <div className="bg-white text-black rounded border shadow text-sm relative w-16 h-16 flex items-center justify-center">
      {/* Left side handles */}
      <Handle
        type="target"
        className=' p-1.5 '
        position={Position.Left}
        id="left-target"
        style={{ top: '30%' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        className=' p-1.5'
        position={Position.Left}
        id="left-source"
        style={{ top: '70%' }}
        isConnectable={isConnectable}
      />

      <div className="absolute">{(data as { label?: React.ReactNode }).label}</div>

      {/* Right side handles */}
      <Handle
        type="target"
        className=' size-4 p-1.5'
        position={Position.Right}
        id="right-target"
        style={{ top: '30%' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        className=' size-4 p-1.5'
        position={Position.Right}
        id="right-source"
        style={{ top: '70%' }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default CustomNode;

