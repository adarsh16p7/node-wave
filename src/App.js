import React, { useState, useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, MiniMap, Controls, Background } from 'react-flow-renderer';
import { useDiagram } from './hooks/useDiagram';
import Toolbar from './components/Toolbar';
import { exportDiagram, importDiagram } from './utils/fileOperations';
import StartNode from './components/StartNode';
import MiddleNode from './components/MiddleNode';
import EndNode from './components/EndNode';
import EditableEdge from './components/EditableEdge'; // Import EditableEdge

const nodeTypes = {
  start: StartNode,
  middle: MiddleNode,
  end: EndNode,
};

const edgeTypes = {
  'editable-edge': EditableEdge, // Use the editable edge type
};

function App() {
  const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect, addNode } = useDiagram();
  const [isPanning, setIsPanning] = useState(false);

  const handlePaneClick = () => {
    if (isPanning) {
      setIsPanning(false);
    }
  };

  const handlePaneMouseDown = () => {
    setIsPanning(true);
  };

  const handlePaneMouseUp = () => {
    setIsPanning(false);
  };

  const handlePaneMouseLeave = () => {
    setIsPanning(false);
  };

  // const handleNameChange = useCallback((id, newLabel) => {
  //   setNodes((nds) =>
  //     nds.map((node) =>
  //       node.id === id ? { ...node, data: { ...node.data, label: newLabel } } : node
  //     )
  //   );
  // }, [setNodes]);

  const handleDeleteNode = useCallback((id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  }, [setNodes, setEdges]);

  const handleDeleteEdge = useCallback((id) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  }, [setEdges]);

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
            nodes={nodes.map((node) => ({
              ...node,
              data: {
                ...node.data,
                onDelete: () => handleDeleteNode(node.id),
              },
            }))}
            edges={edges.map((edge) => ({
              ...edge,
              type: 'editable-edge', // Ensure editable-edge type is used
              data: { onDelete: handleDeleteEdge }, // Pass onDelete function to the edge data
            }))}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            panOnScroll={false}
            fitView
            deleteKeyCode={46}
            onPaneClick={handlePaneClick}
            onPaneMouseDown={handlePaneMouseDown}
            onPaneMouseUp={handlePaneMouseUp}
            onPaneMouseLeave={handlePaneMouseLeave}
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
