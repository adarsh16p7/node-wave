import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "react-flow-renderer";

export const useDiagram = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((connection) => {
    const { source, target } = connection;

    setNodes((nds) => {
      const sourceNode = nds.find((node) => node.id === source);
      const targetNode = nds.find((node) => node.id === target);

      if (sourceNode && targetNode) {
        const updatedNodes = nds.map((node) => {
          if (node.id === target) {
            return {
              ...node,
              data: {
                ...node.data,
                input1: sourceNode.data.output || 0, // Assign source node's output to target node's input1
              },
            };
          }
          return node;
        });
        console.log('Nodes after connect:', updatedNodes);
        return updatedNodes;
      }
      return nds;
    });

    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const addNode = (type) => {
    const newNode = {
      id: uuidv4(),
      data: {
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
        input1: 0, // Initial input1 value for MiddleNode
        input2: 0, // Initial input2 value for MiddleNode
        output: 0, // Initial output for all nodes
      },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      type,
      style: {
        border: 'none',
        padding: 0,
      },
    };

    setNodes((nds) => {
      const updatedNodes = [...nds, newNode];
      console.log('Updated Nodes Array after Adding:', updatedNodes);
      return updatedNodes;
    });
  };

  const deleteNode = (id) => {
    setNodes((nds) => {
      const updatedNodes = nds.filter((node) => node.id !== id);
      console.log('Updated Nodes Array after Deleting:', updatedNodes);
      return updatedNodes;
    });
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  };

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    deleteNode,
  };
};
