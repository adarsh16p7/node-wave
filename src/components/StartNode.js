import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const StartNode = () => {
  return (
    <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center">
      Start
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default StartNode;
