import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const EndNode = ({ data }) => {
  return (
    <div className="bg-red-500 p-2 rounded text-white">
      End Node
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default EndNode;
