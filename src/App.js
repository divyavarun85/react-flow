import React, { useState } from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';
import avatarone from './assets/Mask Group (2).svg';

const initialNodes = [
  {
    id: '1',
    position: { x: -200, y: -20 },
    data: { label: 'Node 1', img: avatarone },
    style: { width: 150, height: 100 },
    type: 'special',
  },
  {
    id: '2',
    position: { x: 200, y: -20 },
    data: { label: 'Node 2', img: avatarone },
    style: { width: 150, height: 100 },
    type: 'special',
  },
  {
    id: '3',
    position: { x: -300, y: 120 },
    data: { label: 'Node 3', img: avatarone },
    style: { width: 150, height: 100 },
    type: 'special',
  },
  {
    id: '4',
    position: { x: 300, y: 120 },
    data: { label: 'Node 4', img: avatarone },
    style: { width: 150, height: 100 },
    type: 'special',
  },
  {
    id: '5',
    position: { x: -500, y: 120 },
    data: { label: 'Node 3.3', img: avatarone },
    style: { width: 150, height: 100 },
    type: 'special',
  },
  {
    id: '6',
    position: { x: -400, y: 250 },
    data: { label: 'Node 3.33', img: avatarone },
    style: { width: 150, height: 100 },
    type: 'special',
  },
  {
    id: '7',
    position: { x: 500, y: 120 },
    data: { label: 'Node 4.4', img: avatarone },
    style: { width: 150, height: 100 },
    type: 'special',
  },
  {
    id: '8',
    position: { x: 400, y: 250 },
    data: { label: 'Node 4.5', img: avatarone },
    style: { width: 150, height: 100 },
    type: 'special',
  },
  {
    id: '9',
    position: { x: 200, y: 250 },
    data: { label: 'Node 4.6', img: avatarone },
    style: { width: 150, height: 100 },
    type: 'special',
  },
  {
    id: '10',
    position: { x: 600, y: 250 },
    data: { label: 'Node 4.7', img: avatarone },
    style: { width: 150, height: 100 },
    type: 'special',
  },
];

const initialEdges = [
  { id: 'e1-1', source: '1', target: '2', type: 'custom', sourceHandle: 'bottom', targetHandle: 'bottom' },
  { id: 'e1-2', source: '3', target: '4', type: '', sourceHandle: 'top', targetHandle: 'top' },
  { id: 'e1-3', source: '3', target: '5', type: 'custom', sourceHandle: 'bottom', targetHandle: 'bottom' },
  { id: 'e1-4', source: '4', target: '7', type: 'custom', sourceHandle: 'bottom', targetHandle: 'bottom' },
  { id: 'e1-5', source: '8', target: '10', type: '', sourceHandle: 'top', targetHandle: 'top' },
  { id: 'e1-6', source: '9', target: '8', type: '', sourceHandle: 'top', targetHandle: 'top' },




];

// Custom Edge Component to draw an additional vertical line from the middle
const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  const lineLength = 56; // Approx. 2cm in pixels

  // Calculate the end point of the vertical line
  const lineEndY = midY + lineLength;

  return (
    <g>
      {/* Original straight edge */}
      <line x1={sourceX} y1={sourceY} x2={targetX} y2={targetY} stroke="#000" strokeWidth={2} />

      {/* Additional vertical line from the midpoint */}
      <line x1={midX} y1={midY} x2={midX} y2={lineEndY} stroke="red" strokeWidth={2} />
    </g>
  );
};

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const toggleNode = (id) => {
    const nodeExists = nodes.find(node => node.id === id);
    if (nodeExists) {
      setNodes(nodes.filter(node => node.id !== id));
    } else {
      const newNode = {
        id,
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: { label: `Node ${id}`, img: avatarone },
        style: { width: 150, height: 100 },
        type: 'special',
      };
      setNodes([...nodes, newNode]);
      const newEdge = { id: `e1-${id}`, source: '1', target: id, type: 'custom', sourceHandle: 'bottom', targetHandle: 'bottom' };
      setEdges([...edges, newEdge]);
    }
  };

  const nodeStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    position: 'relative',
  };

  const CustomNode = ({ data }) => (
    <div style={nodeStyle}>
      <img src={data.img} alt={data.label} style={{ marginRight: 10 }} />
      {data.label}
      <Handle
        type="source"
        position="bottom"
        id="bottom"
        style={{ bottom: '-8px', background: '#555' }}
      />
      <Handle
        type="target"
        position="bottom"
        id="bottom"
        style={{ bottom: '-8px', background: '#555' }}
      />
      <Handle
        type="source"
        position="top"
        id="top"
        style={{ top: '-8px', background: '#555' }}
      />
      <Handle
        type="target"
        position="top"
        id="top"
        style={{ top: '-8px', background: '#555' }}
      />
      <button
        style={{ marginLeft: 10, position: 'absolute', top: 0, right: 0 }}
        onClick={() => toggleNode(data.label.split(' ')[1])}
      >
        Toggle
      </button>
    </div>
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{ special: CustomNode }}
        edgeTypes={{ custom: CustomEdge }}
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
}
