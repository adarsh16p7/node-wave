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
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const addNode = (type) => {
    const newNode = {
      id: uuidv4(),
      data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      type,
      style: {
        border: 'none',
        padding: 0,
      },
    };
    setNodes((nds) => nds.concat(newNode));
    console.log('New Node Added: ', newNode.id);
  };

  const deleteNode = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
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

