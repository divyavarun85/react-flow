import React from 'react';
import { Handle, Position } from 'reactflow';
import EllipsisButton from './MenuButton';

const handleStyle = { left: 10, background: '#555' };

export default function CustomNode({ data }) {
  return (
    <div style={{ 
      padding: '25px 70px',
      border: '1px solid #ddd', 
      borderRadius: '5px', 
      backgroundColor: '#DCDCDC', // Gray background
      display: 'flex', 
      flexDirection:'column',
      alignItems: 'center' 
    }}>
      <EllipsisButton style={{position:'absolute',right: '0 ' }}/>
      <Handle type="target" position={Position.Top}  />
      <img src={data.img} alt={data.label} style={{position:'absolute',top: '-25px ' }} />
      <span>{data.label}({data.id})</span>
      <Handle type="source" position={Position.Bottom} style={handleStyle} />
    </div>
  );
}