import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const EndNode = () => {
  return (
    <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center">
      End
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default EndNode;
