import React from "react";

const Toolbar = ({ addNode, onExport, onImport }) => {
    const fileInputRef = React.createRef();
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          onImport(JSON.parse(e.target.result));
        };
        reader.readAsText(file);
      }
    };
  
    return (
        <div className="p-2 pl-5 bg-gray-800 text-white flex justify-between items-center">
          <h1 className="italic text-lg">DiagramFlow</h1>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={addNode}
            >
              Add Node
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={onExport}
            >
              Export
            </button>
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => fileInputRef.current.click()}
            >
              Import
            </button>
          </div>
        </div>
      );
    };

export default Toolbar;
