import React, { useState } from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './components/CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newImageFile, setNewImageFile] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [selectedEdgeId, setSelectedEdgeId] = useState('');
  const [sourceNodeId, setSourceNodeId] = useState('');
  const [targetNodeId, setTargetNodeId] = useState('');

  // Function to convert the uploaded file to a data URL
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setNewImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImageUrl(reader.result); // Data URL of the uploaded image
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Function to add a new node
  const addNewNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      type: 'custom',
      data: { label: `Node ${nodes.length + 1}`, img: newImageUrl || '', id: (nodes.length + 1).toString() },
    };
    setNodes((nds) => [...nds, newNode]);
    setNewImageFile(null);
    setNewImageUrl('');
  };
  

  // Function to update node label/name and image
  const updateNodeNameAndImage = () => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, label: newLabel, img: newImageUrl || node.data.img } }
          : node
      )
    );
    setNewLabel('');
    setNewImageFile(null);
    setNewImageUrl('');
  };

  // Function to add a new edge
  const addNewEdge = () => {
    const newEdge = {
      id: `e${sourceNodeId}-${targetNodeId}`,
      source: sourceNodeId,
      target: targetNodeId,
      type: 'smoothstep',
    };
    setEdges((eds) => [...eds, newEdge]);
  };

  // Function to update edge connection
  const updateEdgeConnection = () => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === selectedEdgeId
          ? { ...edge, source: sourceNodeId, target: targetNodeId }
          : edge
      )
    );
  };

  // Function to delete an edge
  const deleteEdge = () => {
    setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdgeId));
  };

  // Function to delete a node and its associated edges
  const deleteNode = () => {
    setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId));
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
    <ReactFlow
  nodes={nodes}
  edges={edges}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  nodeTypes={nodeTypes}
>
  <Controls />
  <MiniMap />
  <Background />
</ReactFlow>


      <div style={{ position: 'absolute', right: 10, top: 50, zIndex: 10 }}>
        {/* Add Node Button */}
        <button className='bg-[#DCDCDC] rounded-md w-full mt-2 p-1' onClick={addNewNode}>
          Add Node
        </button>
        <br />

        {/* Update Node Label and Image */}
        <label>
          Node ID: <br />
          <input
            className='border-[1px] border-[#DCDCDC] p-1 rounded-lg'
            type='text'
            value={selectedNodeId}
            onChange={(e) => setSelectedNodeId(e.target.value)}
          />
        </label>
        <br />
        <label>
          New Label: <br />
          <input
            className='border-[1px] border-[#DCDCDC] p-1 rounded-lg'
            type='text'
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
        </label>
        <br />
        <label>
          Upload Image: <br />
          <input
            className='border-[1px] border-[#DCDCDC] p-1 rounded-lg'
            type='file'
            onChange={handleImageUpload}
          />
        </label>
        <br />
        <button className='bg-[#DCDCDC] rounded-md w-full mt-2 p-1' onClick={updateNodeNameAndImage}>
          Update Node
        </button>
        <br />
        <button className='bg-red-500 text-white rounded-md w-full mt-2 p-1' onClick={deleteNode}>
          Delete Node
        </button>
        <br />

        {/* Edge Management */}
        <label>
          Edge ID: <br />
          <input
            className='border-[1px] border-[#DCDCDC] p-1 rounded-lg'
            type='text'
            value={selectedEdgeId}
            onChange={(e) => setSelectedEdgeId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Source Node ID: <br />
          <input
            className='border-[1px] border-[#DCDCDC] p-1 rounded-lg'
            type='text'
            value={sourceNodeId}
            onChange={(e) => setSourceNodeId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Target Node ID: <br />
          <input
            className='border-[1px] border-[#DCDCDC] p-1 rounded-lg'
            type='text'
            value={targetNodeId}
            onChange={(e) => setTargetNodeId(e.target.value)}
          />
        </label>
        <br />
        <button className='bg-[#DCDCDC] rounded-md w-full mt-2 p-1' onClick={addNewEdge}>
          Add Edge
        </button>
        <br />
        <button className='bg-[#DCDCDC] rounded-md w-full mt-2 p-1' onClick={updateEdgeConnection}>
          Update Edge
        </button>
        <br />
        <button className='bg-red-500 text-white rounded-md w-full mt-2 p-1' onClick={deleteEdge}>
          Delete Edge
        </button>
      </div>
    </div>
  );
}
