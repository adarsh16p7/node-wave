import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const MiddleNode = ({ data, id, onNameChange, onPassOutput }) => {
  const [label, setLabel] = useState(data.label || 'Middle Node');
  const [input1, setInput1] = useState(data.input1 || 0);
  const [input2, setInput2] = useState(data.input2 || 0);
  const [operation, setOperation] = useState(data.operation || 'add');
  const [output, setOutput] = useState(data.output || 0);

  useEffect(() => {
    let result;
    switch (operation) {
      case 'add':
        result = input1 + input2;
        break;
      case 'subtract':
        result = input1 - input2;
        break;
      case 'multiply':
        result = input1 * input2;
        break;
      case 'divide':
        result = input2 !== 0 ? input1 / input2 : 0; // Prevent divide by zero
        break;
      default:
        result = 0;
    }
    setOutput(result);
    console.log(`Node ${id} Output: ${result}`);

    // Notify parent about the output change
    if (onPassOutput) {
      console.log(`Passing output ${result} from node ${id}`);
      onPassOutput(id, result); // Pass the output to the parent (App)
    }
  }, [input1, input2, operation, id, onPassOutput]);

  useEffect(() => {
    // Update the node's data with the new input/output values
    data.input1 = input1;
    data.input2 = input2;
    data.output = output;
  }, [input1, input2, output, data]);

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    if (onNameChange) {
      onNameChange(id, e.target.value);
    }
  };

  const handleInputChange = (e, setInput) => {
    const value = Number(e.target.value);
    setInput(isNaN(value) ? 0 : value);
  };

  return (
    <div className="w-40 h-40 bg-yellow-600 p-2 flex flex-col items-center justify-center text-white relative">
      <input
        className="bg-transparent text-white outline-none text-center text-sm p-1 w-full max-w-full"
        value={label}
        onChange={handleLabelChange}
        style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
      />
      <input
        type="number"
        value={input1}
        onChange={(e) => handleInputChange(e, setInput1)}
        className="bg-gray-200 text-black text-center w-full mt-2"
        placeholder="Input 1"
        step="1"
      />
      <input
        type="number"
        value={input2}
        onChange={(e) => handleInputChange(e, setInput2)}
        className="bg-gray-200 text-black text-center w-full mt-2"
        placeholder="Input 2"
        step="1"
      />
      <select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        className="bg-gray-200 text-black w-full mt-2"
      >
        <option value="add">Add</option>
        <option value="subtract">Subtract</option>
        <option value="multiply">Multiply</option>
        <option value="divide">Divide</option>
      </select>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <button
        onClick={data.onDelete}
        className="absolute top-1 right-1 bg-slate-700 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs border-none"
        style={{ fontSize: '12px', lineHeight: '12px', cursor: 'pointer' }}
        title="Delete"
      >
        -
      </button>
      <div className="text-sm mt-2">Output: {output}</div>
    </div>
  );
};

export default MiddleNode;
