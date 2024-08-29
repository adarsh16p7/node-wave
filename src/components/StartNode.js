import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const StartNode = ({ data }) => {
  return (
    <div className="bg-green-500 p-2 rounded text-white">
      Start Node
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default StartNode;
