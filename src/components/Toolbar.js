import React, { useState, useRef } from 'react';

const Toolbar = ({ addNode, onExport, onImport }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleAddNode = (type) => {
    addNode(type);
    setDropdownOpen(false); // Close dropdown after selecting a node type
  };

  return (
    <div className="p-2 bg-gray-800 text-white flex items-center justify-between">
      <h1 className="italic text-lg">NodeWave</h1>
      <div className="flex items-center">
        <div className="relative">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={toggleDropdown}
          >
            Add Node
          </button>
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg z-20"
            >
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => handleAddNode('start')}
              >
                Start Node
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => handleAddNode('middle')}
              >
                Middle Node
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => handleAddNode('end')}
              >
                End Node
              </button>
            </div>
          )}
        </div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={onExport}
        >
          Export
        </button>
        <input
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={onImport}
          id="import-file"
        />
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={() => document.getElementById('import-file').click()}
        >
          Import
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
