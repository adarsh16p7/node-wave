import React, { useState } from 'react';
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';

const initialElements = [
  { id: '1', type: 'input', data: { label: 'Start Node' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Step 1' }, position: { x: 250, y: 100 } },
  { id: '3', data: { label: 'Step 2' }, position: { x: 250, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
];

function App() {
  const [nodes, setNodes] = useState(initialElements.filter((el) => !el.source && !el.target));
  const [edges, setEdges] = useState(initialElements.filter((el) => el.source && el.target));

  const onNodesChange = (changes) => setNodes((nds) => applyNodeChanges(changes, nds));
  const onEdgesChange = (changes) => setEdges((eds) => applyEdgeChanges(changes, eds));
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        deleteKeyCode={46} /* 'delete'-key */
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default App;
