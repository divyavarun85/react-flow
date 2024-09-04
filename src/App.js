import React, { useState, useEffect } from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import avatarone from './assets/Mask Group (2).svg';
import CustomNode from './components/CustomNode'; // Make sure the path is correct
import avatartwo from './assets/Group 763930 (1).svg';
import avatarthree from './assets/Group 763930 (3).svg';
import avatarfour from './assets/Mask Group (1).svg';
import avatarfive from './assets/Mask Group (2).svg';
import avatarsix from './assets/Mask Group (3).svg';
import avatarseven from './assets/Mask Group (4).svg';
import avatareight from './assets/Mask Group.svg';
import avatarnine from './assets/image 153.svg';






const nodeTypes = {
  custom: CustomNode,
};

// Dynamic JSON Data
const jsonData = {
  "name": "Mukesh Ambani",
  "spouse": "Nita Ambani",
  "image": avatarone,
  "spouseimage": avatartwo,
  "children": [
    {
      "name": "Akash Ambani",
      "spouse": "Shloka Mehta",
      "image": avatarthree,
      "spouseimage": avatarfour,
      "children": [
        {
          "name": "Prithvi Ambani",
          "image": avatarfive
        },
        {
          "name": "Aadi Ambani",
          "image": avatarsix
        },
        {
          "name": "Aarav Ambani", // New child
          "image": avatarseven
        }
      ]
    },
    {
      "name": "Isha Ambani",
      "spouse": "Anand Piramal",
      "image": avatareight,
      "spouseimage": avatarnine,
      "children": [
        {
          "name": "Radhika Piramal", // New child
          "image": avatarone
        },
        {
          "name": "Kiran Piramal", // New child
          "image": avatartwo
        }
      ]
    },
    {
      "name": "Anshul Ambani",
      "spouse": "Priya Sharma",
      "image": avatarthree,
      "spouseimage": avatarfour,
      "children": [
        {
          "name": "Asha Ambani", // New child
          "image": avatarfive
        }
      ]
    },
    {
      "name": "Vikram Ambani", // New child
      "spouse": "Sneha Kapoor",
      "image": avatarsix,
      "spouseimage": avatarseven,
      "children": [
        {
          "name": "Vishal Ambani", // New child
          "image": avatareight
        },
        {
          "name": "Vanya Ambani", // New child
          "image": avatarnine
        }
      ]
    }
  ]
};


function generateNodesAndEdges(data, parentId = null, nodes = [], edges = [], position = { x: 0, y: 0 }) {
  const xSpacing = 580; // Horizontal spacing between nodes
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
      position: { x: position.x + xSpacing , y: position.y},
      type: 'smoothstep', // Use the smoothstep edge type
    });
  }

  if (data.spouse) {
    const spouseId = nodes.length + 1;
    nodes.push({
      id: `${spouseId}`,
      position: { x: position.x + xSpacing-300, y: position.y }, // Place spouse node to the right
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
    // Adjust vertical spacing and calculate positions for children
    const childCount = data.children.length;
    const childXOffset = -(xSpacing * (childCount - 1)) / 2; // Center children under the parent
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
