import React from 'react';
import ReactFlow, { ReactFlowProvider, MiniMap, Controls, Background } from 'react-flow-renderer';
import { useDiagram } from './hooks/useDiagram';
import Toolbar from './components/Toolbar';
import CustomNode from './components/CustomNode';
import { exportDiagram, importDiagram } from './utils/fileOperations';

const nodeTypes = {
  custom: CustomNode,
};

function App() {
  const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect, addNode } = useDiagram();

  return (
    <ReactFlowProvider>
      <div className="h-screen w-screen overflow-hidden flex flex-col">
        <Toolbar
          addNode={addNode}
          onExport={() => exportDiagram(nodes, edges)}
          onImport={(event) => importDiagram(event, setNodes, setEdges)}
        />
        <div className="flex-grow relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            panOnScroll={false}
            // panOnDrag={false}
            fitView
            deleteKeyCode={46}
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
