export const exportDiagram = (nodes, edges) => {
    const flow = { nodes, edges };
    const blob = new Blob([JSON.stringify(flow)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  export const importDiagram = (event, setNodes, setEdges) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const importedFlow = JSON.parse(e.target.result);
        setNodes(importedFlow.nodes || []);
        setEdges(importedFlow.edges || []);
      };
      reader.readAsText(file);
    }
  };
  