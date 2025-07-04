'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

interface CustomNodeData {
  label: string;
  distance?: number;
  visited?: boolean;
  isCurrentNode?: boolean;
  isStartNode?: boolean;
  isTargetNode?: boolean;
  inShortestPath?: boolean;
}

interface CustomNodeProps {
  data: CustomNodeData;
  isConnectable?: boolean;
}

const CustomNode = ({ data, isConnectable = true }: CustomNodeProps) => {
  const getNodeStyles = () => {
    let baseClasses = "rounded-full border-2 shadow-lg text-sm relative w-20 h-20 flex flex-col items-center justify-center transition-all duration-300 font-semibold";
    
    if (data.isStartNode) {
      return `${baseClasses} bg-green-500 text-white border-green-600 shadow-green-200`;
    }
    
    if (data.isTargetNode) {
      return `${baseClasses} bg-red-500 text-white border-red-600 shadow-red-200`;
    }
    
    if (data.inShortestPath) {
      return `${baseClasses} bg-yellow-400 text-black border-yellow-500 shadow-yellow-200 animate-pulse`;
    }
    
    if (data.isCurrentNode) {
      return `${baseClasses} bg-blue-500 text-white border-blue-600 shadow-blue-200 animate-pulse scale-110`;
    }
    
    if (data.visited) {
      return `${baseClasses} bg-gray-400 text-white border-gray-500`;
    }
    
    return `${baseClasses} bg-white text-black border-gray-300`;
  };

  const formatDistance = (distance?: number) => {
    if (distance === undefined) return '';
    if (distance === Infinity) return '∞';
    return distance.toString();
  };

  return (
    <div className={getNodeStyles()}>
      {/* Left side handles */}
      <Handle
        type="target"
        className="w-3 h-3 border-2 border-gray-400 bg-white"
        position={Position.Left}
        id="left-target"
        style={{ top: '30%' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        className="w-3 h-3 border-2 border-gray-400 bg-white"
        position={Position.Left}
        id="left-source"
        style={{ top: '70%' }}
        isConnectable={isConnectable}
      />

      {/* Node content */}
      <div className="text-lg font-bold">{data.label}</div>
      {data.distance !== undefined && (
        <div className="text-xs opacity-90">
          d: {formatDistance(data.distance)}
        </div>
      )}

      {/* Right side handles */}
      <Handle
        type="target"
        className="w-3 h-3 border-2 border-gray-400 bg-white"
        position={Position.Right}
        id="right-target"
        style={{ top: '30%' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        className="w-3 h-3 border-2 border-gray-400 bg-white"
        position={Position.Right}
        id="right-source"
        style={{ top: '70%' }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default CustomNode;

