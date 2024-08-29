import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const MiddleNode = ({ data }) => {
  return (
    <div className="bg-yellow-500 p-2 rounded text-white">
      Middle Node
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default MiddleNode;
