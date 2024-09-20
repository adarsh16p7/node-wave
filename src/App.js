import React, { useState, useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, MiniMap, Controls, Background } from 'react-flow-renderer';
import { useDiagram } from './hooks/useDiagram';
import Toolbar from './components/Toolbar';
import { exportDiagram, importDiagram } from './utils/fileOperations';
import StartNode from './components/StartNode';
import MiddleNode from './components/MiddleNode';
import EndNode from './components/EndNode';
import EditableEdge from './components/EditableEdge';

const nodeTypes = {
  start: StartNode,
  middle: MiddleNode,
  end: EndNode,
};

const edgeTypes = {
  'editable-edge': EditableEdge, 
};

function App() {
  const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect, addNode } = useDiagram();
  const [isPanning, setIsPanning] = useState(false);

  // Function to pass the output from a node to its parent
  const handleOutputPass = (sourceNodeId, outputValue) => {
    setNodes((nodes) => 
      nodes.map((node) => {
        if (node.id === sourceNodeId) {
          console.log(`Updating Source Node ${sourceNodeId} Output to: ${outputValue}`);
          return {
            ...node,
            data: {
              ...node.data,
              output: outputValue, // Dynamically add or update the output property in the node's data
            },
          };
        }
        return node;
      })
    );
  };

  // Handle connections and update target nodes with the output of source nodes
  const handleConnect = useCallback((connection) => {
    const { source, target } = connection;
  
    setTimeout(() => {
      const sourceNode = nodes.find((node) => node.id === source);
  
      if (sourceNode && sourceNode.data && sourceNode.data.output != null) {
        const outputValue = sourceNode.data.output;
  
        console.log(`Source Node Output: ${outputValue}`);
  
        // Update the target node's inputs with the output from the source node
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === target) {
              console.log(`Updating Target Node ${target} with Output Value: ${outputValue}`);
              return {
                ...node,
                data: {
                  ...node.data,
                  input1: outputValue, // Dynamically add or update the input1 property in the node's data
                },
              };
            }
            return node;
          })
        );
      } else {
        console.error('Source node output is undefined or null');
      }
  
      // Proceed with the standard connect operation
      onConnect(connection);
    }, 100); // Delay by 100ms to allow state to propagate
  }, [nodes, onConnect, setNodes]);
  
  const handleClick = () => {
    if (isPanning) {
      setIsPanning(false);
    }
  };

  const handleMouseDown = () => {
    setIsPanning(true);
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleMouseLeave = () => {
    setIsPanning(false);
  };

  // Handle deletion of nodes and edges
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
                onPassOutput: handleOutputPass,  // Pass the output handling function
              },
            }))}
            edges={edges.map((edge) => ({
              ...edge,
              type: 'editable-edge', // Ensure editable-edge type is used
              data: { onDelete: handleDeleteEdge }, // Pass onDelete function to the edge data
              onPassOutput: handleOutputPass, // Ensure this is passed down
            }))}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={handleConnect} // Use the updated handleConnect
            panOnScroll={false}
            fitView
            deleteKeyCode={46}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
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
