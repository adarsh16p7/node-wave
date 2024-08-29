import React from 'react';
import { Handle } from 'react-flow-renderer';

const CustomNode = ({ data }) => {
  return (
    <div style={{ padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5, border: '1px solid #ddd' }}>
      <Handle type="target" position="top" style={{ borderRadius: 0 }} />
      <div>{data.label}</div>
      <Handle type="source" position="bottom" style={{ borderRadius: 0 }} />
    </div>
  );
};

export default CustomNode;
