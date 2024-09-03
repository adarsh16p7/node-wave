import React, { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const StartNode = ({ data, id, onNameChange }) => {
  const [label, setLabel] = useState(data.label || 'Start Node');

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    if (onNameChange) {
      onNameChange(id, e.target.value);
    }
  };

  return (
    <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-green-500 text-white">
      <input
        className="bg-transparent text-white outline-none text-center text-sm p-1 w-full max-w-full"
        value={label}
        onChange={handleLabelChange}
        style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
      />
      <Handle type="source" position={Position.Right} />
      <button
        onClick={data.onDelete}  // Call the onDelete function from data
        className="absolute top-1 right-1 bg-slate-700 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs border-none"
        style={{ fontSize: '12px', lineHeight: '12px', cursor: 'pointer' }}
        title="Delete"
      >
        -
      </button>
    </div>
  );
};

export default StartNode;
