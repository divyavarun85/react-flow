import React, { useState } from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';
import avatarone from './assets/Mask Group (2).svg'

const initialNodes = [
  {
    id: '1',
    position: { x: -100, y: 0 },
    data: { label: 'Node 1', img: avatarone },
  },
  {
    id: '2',
    position: { x: 100, y: 0 },
    data: { label: 'Node 2', img: avatarone },
  },
  {
    id: '3',
    position: { x: -250, y: 100 },
    data: { label: 'Node 3', img: avatarone },
  },
  {
    id: '4',
    position: { x: 250, y: 100 },
    data: { label: 'Node 4', img: avatarone },
  },
  {
    id: '5',
    position: { x: -500, y: 200 },
    data: { label: 'Node 5', img: avatarone },
  },
  
];

const initialEdges = [
  { id: 'e1-1', source: '1', target: '3', type: 'smoothstep' },
  { id: 'e1-2', source: '2', target: '3', type: 'smoothstep' },
  { id: 'e1-3', source: '2', target: '3', type: 'smoothstep' },
  { id: 'e1-4', source: '1', target: '4', type: 'smoothstep' },
  { id: 'e1-5', source: '2', target: '4', type: 'smoothstep' },
  { id: 'e1-6', source: '1', target: '2', type: 'simplebezier' },

  

];

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
        data: { label: `Node ${id}`, img: 'https://via.placeholder.com/30' },
      };
      setNodes([...nodes, newNode]);
      const newEdge = { id: `e1-${id}`, source: '1', target: id, type: 'smoothstep' };
      setEdges([...edges, newEdge]);
    }
  };

  const nodeStyle = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#fff',
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={{
        special: ({ data }) => (
          <div style={nodeStyle}>
            <img src={data.img} alt={data.label} style={{ marginRight: 10 }} />
            {data.label}
            <button
              style={{ marginLeft: 10 }}
              onClick={() => toggleNode(data.label.split(' ')[1])}
            >
              Toggle
            </button>
          </div>
        ),
      }}>
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
}
