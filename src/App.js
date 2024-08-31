import React, { useState, useEffect } from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import avatarone from './assets/Mask Group (2).svg';
import CustomNode from './components/CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

// Initial JSON data structure
const initialData = {
  nodes: [
    { id: '1', label: 'Adam Rossier', img: avatarone, position: { x: 230, y: 0 } },
    { id: '2', label: 'Jessie Ava', img: avatarone, position: { x: 500, y: 0 } },
    { id: '3', label: 'Mira Rossier', img: avatarone, position: { x: 190, y: 150 } },
    { id: '4', label: 'Henry Rossier', img: avatarone, position: { x: 560, y: 150 } },
    { id: '5', label: 'Zain Korsgaard', img: avatarone, position: { x: -90, y: 150 } },
    { id: '6', label: 'Jack Korsgaard', img: avatarone, position: { x: 40, y: 300 } },
    { id: '7', label: 'Grace Charlie', img: avatarone, position: { x: 830, y: 150 } },
    { id: '8', label: 'Lily Rossier', img: avatarone, position: { x: 700, y: 300 } },
    { id: '9', label: 'Lucas Rossier', img: avatarone, position: { x: 400, y: 300 } },
    { id: '10', label: 'Oliver Rossier', img: avatarone, position: { x: 970, y: 300 } },
  ],
  edges: [
    { id: 'e1-1', source: '1', target: '3', type: 'smoothstep' },
    { id: 'e1-2', source: '2', target: '3', type: 'smoothstep' },
    { id: 'e1-4', source: '1', target: '4', type: 'smoothstep' },
    { id: 'e1-5', source: '2', target: '4', type: 'smoothstep' },
    { id: 'e3-6', source: '3', target: '6', type: 'smoothstep' },
    { id: 'e5-6', source: '5', target: '6', type: 'smoothstep' },
    { id: 'e4-8', source: '4', target: '8', type: 'smoothstep' },
    { id: 'e7-8', source: '7', target: '8', type: 'smoothstep' },
    { id: 'e4-9', source: '4', target: '9', type: 'smoothstep' },
    { id: 'e7-9', source: '7', target: '9', type: 'smoothstep' },
    { id: 'e4-10', source: '4', target: '10', type: 'smoothstep' },
    { id: 'e7-10', source: '7', target: '10', type: 'smoothstep' },
  ],
};

export default function App() {
  const [data, setData] = useState(initialData);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState('1');
  const [newLabel, setNewLabel] = useState('');
  const [sourceNodeId, setSourceNodeId] = useState('1');
  const [targetNodeId, setTargetNodeId] = useState('3');

  // Function to transform JSON data to nodes and edges
  const transformDataToFlow = (data) => {
    const nodes = data.nodes.map((node) => ({
      id: node.id,
      position: node.position,
      type: 'custom',
      data: { label: node.label, img: node.img, id: node.id },
    }));

    const edges = data.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type,
    }));

    return { nodes, edges };
  };

  // Effect to update nodes and edges when data changes
  useEffect(() => {
    const { nodes, edges } = transformDataToFlow(data);
    setNodes(nodes);
    setEdges(edges);
  }, [data]);

  // Function to update node label/name
  const updateNodeName = () => {
    const newData = {
      ...data,
      nodes: data.nodes.map((node) =>
        node.id === selectedNodeId ? { ...node, label: newLabel } : node
      ),
    };
    setData(newData);
    setNewLabel(''); // Clear input after update
  };

  // Function to update edge connections
  const updateEdgeConnection = () => {
    const newData = {
      ...data,
      edges: data.edges.map((edge) =>
        edge.id === `e${sourceNodeId}-${targetNodeId}`
          ? { ...edge, source: sourceNodeId, target: targetNodeId }
          : edge
      ),
    };
    setData(newData);
  };

  // Function to add a new edge
  const addNewEdge = () => {
    const newEdge = {
      id: `e${sourceNodeId}-${targetNodeId}`,
      source: sourceNodeId,
      target: targetNodeId,
      type: 'smoothstep',
    };
    const newData = {
      ...data,
      edges: [...data.edges, newEdge],
    };
    setData(newData);
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

      {/* Form to Update Node Name */}
      <div className=''>
        <p className='absolute top-1 text-center w-full mx-auto'>
          Click and drag to position your node
        </p>
        <div style={{ position: 'absolute', right: 10, top: 50, zIndex: 10 }}>
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
          <button
            className='bg-[#DCDCDC] rounded-md w-full mt-2 p-1'
            onClick={updateNodeName}
          >
            Update Node
          </button>
        </div>
      </div>

      {/* Form to Update/Add Edge Connections */}
      <div className=''>
        <div style={{ position: 'absolute', right: 10, top: 200, zIndex: 10 }}>
          <p className='mt-5 font-semibold'>connect Node lines </p>
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
          <button
            className='bg-[#DCDCDC] rounded-md w-full mt-2 p-1'
            onClick={updateEdgeConnection}
          >
            Update Edge
          </button>
          <button
            className='bg-[#DCDCDC] rounded-md w-full mt-2 p-1'
            onClick={addNewEdge}
          >
            Add Edge
          </button>
        </div>
      </div>
    </div>
  );
}
