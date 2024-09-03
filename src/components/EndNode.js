import React, { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const EndNode = ({ data, id, onNameChange }) => {
  const [label, setLabel] = useState(data.label || 'End Node');

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    if (onNameChange) {
      onNameChange(id, e.target.value);
    }
  };

  return (
    <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center text-white">
      <input
        className="bg-transparent text-white outline-none text-center text-sm p-1 w-full max-w-full"
        value={label}
        onChange={handleLabelChange}
        style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
      />
      <Handle type="target" position={Position.Left} />
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

export default EndNode;
