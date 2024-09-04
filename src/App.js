import React, { useState, useEffect } from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import avatarone from './assets/Mask Group (2).svg';
import CustomNode from './components/CustomNode'; // Make sure the path is correct

const nodeTypes = {
  custom: CustomNode,
};

// Your JSON Data
const jsonData = {
  "name": "Mukesh Ambani",
  "spouse": "Nita Ambani",
  "image": avatarone,
  "spouseimage": avatarone,
  "children": [
    {
      "name": "Akash Ambani",
      "spouse": "Shloka Mehta",
      "image": avatarone,
      "spouseimage": avatarone,
      "children": [
        {
          "name": "Prithvi Ambani",
          "image": avatarone
        }
      ]
    },
  ]
};

function generateNodesAndEdges(data, parentId = null, nodes = [], edges = [], position = { x: 0, y: 0 }) {
  const xSpacing = 300; // Horizontal spacing between nodes
  const ySpacing = 200; // Vertical spacing between levels

  const currentId = nodes.length + 1;

  nodes.push({
    id: `${currentId}`,
    position: { ...position },
    type: 'custom',
    data: { label: data.name, img: data.image },
  });

  if (parentId) {
    edges.push({
      id: `e${parentId}-${currentId}`,
      source: `${parentId}`,
      target: `${currentId}`,
      type: 'smoothstep', // Use the smoothstep edge type
  
    });
  }

  if (data.spouse) {
    const spouseId = nodes.length + 1;
    nodes.push({
      id: `${spouseId}`,
      position: { x: position.x + xSpacing, y: position.y }, // Place spouse node to the right
      type: 'custom',
      data: { label: data.spouse, img: data.spouseimage },
      
    });

    edges.push({
      id: `e${currentId}-${spouseId}`,
      source: `${currentId}`,
      target: `${spouseId}`,
      type: 'smoothstep', // Use the smoothstep edge type
    
    });
  }

  if (data.children && data.children.length > 0) {
    const childXOffset = -(xSpacing * (data.children.length - 1)) / 2; // Center children under the parent
    data.children.forEach((child, index) => {
      generateNodesAndEdges(
        child,
        currentId,
        nodes,
        edges,
        { x: position.x + childXOffset + index * xSpacing, y: position.y + ySpacing }
      );
    });
  }

  return { nodes, edges };
}


export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const { nodes, edges } = generateNodesAndEdges(jsonData);
    setNodes(nodes);
    setEdges(edges);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
}
