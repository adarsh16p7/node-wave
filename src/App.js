import React, { useState } from 'react';
import ReactFlow, { ReactFlowProvider, MiniMap, Controls, Background } from 'react-flow-renderer';
import { useDiagram } from './hooks/useDiagram';
import Toolbar from './components/Toolbar';
import { exportDiagram, importDiagram } from './utils/fileOperations';
import StartNode from './components/StartNode';
import MiddleNode from './components/MiddleNode';
import EndNode from './components/EndNode';

const nodeTypes = {
  start: StartNode,
  middle: MiddleNode,
  end: EndNode
};

function App() {
  const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect, addNode } = useDiagram();
  const [isPanning, setIsPanning] = useState(false);

  const handleStartPanning = () => {
    setIsPanning(true);
  };

  const handleEndPanning = () => {
    setIsPanning(false);
  };

  return (
    <ReactFlowProvider>
      <div className="h-screen w-screen overflow-hidden flex flex-col">
        <Toolbar
          addNode={addNode}
          onExport={() => exportDiagram(nodes, edges)}
          onImport={(event) => importDiagram(event, setNodes, setEdges)}
        />
        <div
          className={`flex-grow relative ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            panOnScroll={false}
            fitView
            deleteKeyCode={46}
            onPaneMouseDown={handleStartPanning}
            onPaneMouseUp={handleEndPanning}
            onPaneMouseLeave={handleEndPanning}
            panOnDrag
          >
            <MiniMap className="absolute bottom-0 right-0 m-2" />
            <Controls className="absolute bottom-0 left-0 m-2" />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;