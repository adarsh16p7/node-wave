import React from 'react';
import { getBezierPath } from 'react-flow-renderer';

const EditableEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd, data }) => {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const handleDelete = () => {
    if (data && data.onDelete) {
      data.onDelete(id); // Call the onDelete function with the edge id
    }
  };

  return (
    <>
      {/* Edge line is drawn first */}
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      
      {/* Delete button is rendered after the edge */}
      <foreignObject
        width={20}
        height={20}
        x={(sourceX + targetX) / 2 - 10}
        y={(sourceY + targetY) / 2 - 10}
        style={{ zIndex: 1000 }}
      >
        <div className="absolute top-1 right-1 bg-slate-700 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs border-none"
             onClick={handleDelete}
             title="Delete"
             style={{ fontSize: '12px', lineHeight: '12px', cursor: 'pointer' }}
        >
          -
        </div>
      </foreignObject>
    </>
  );
};

export default EditableEdge;
