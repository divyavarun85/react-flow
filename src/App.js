import React, { useState, useRef } from 'react';
import avatarone from './assets/Mask Group (1).svg';
import avatrtwo from './assets/Group 763930 (1).svg';
import avatarthree from './assets/Mask Group (3).svg';
import avatarfour from './assets/Mask Group (4).svg';
import avatarfive from './assets/Group 763930 (1).svg';
import avatarsix from './assets/Group 763930 (2).svg';
import avatarseven from './assets/Group 763930 (3).svg';

// TreeNode Component
const TreeNode = ({ node }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li className={node.children ? "parent" : ""}>
            <a href="javascript:void(0);" onClick={handleClick}>
                <div className=''>
                    <div className='bg-[#DCDCDC] px-10'>
                        <img src={node.imageUrl} alt={node.name} className='max-w-[50%] w-[50%] mx-auto' />
                        <div className="">
                            <h3 className='text-[16px] p-2 font-semibold'>{node.name}</h3>
                        </div>
                    </div>
                </div>
            </a>
            {node.children && (
                <ul style={{ display: isOpen ? 'block' : 'none' }}>
                    {node.children.map((child, index) => (
                        <TreeNode key={index} node={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};

// App Component
const App = () => {
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const treeContainerRef = useRef(null);

    const zoomIn = () => {
        setZoom(prevZoom => Math.min(prevZoom + 0.1, 2)); 
    };

    const zoomOut = () => {
        setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5)); 
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX - scrollLeft);
        setStartY(e.clientY - scrollTop);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (isDragging && treeContainerRef.current) {
            const newScrollLeft = e.clientX - startX;
            const newScrollTop = e.clientY - startY;
            setScrollLeft(newScrollLeft);
            setScrollTop(newScrollTop);
            treeContainerRef.current.scrollLeft = newScrollLeft;
            treeContainerRef.current.scrollTop = newScrollTop;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const treeData = {
        name: 'Adam Roa',
        imageUrl: avatarseven,
        children: [
            {
                name: 'Henry Rossier',
                imageUrl: avatrtwo,
                children: [
                    {
                        name: 'Henry Rossier',
                        imageUrl: avatarthree,
                    },
                    {
                        name: 'Henry Rossier',
                        imageUrl: avatarfour,
                    },
                ]
            },
            {
                name: 'Mira Rossier',
                imageUrl: avatarfive,
                children: [
                    {
                        name: 'Henry Rossier',
                        imageUrl: avatarsix,
                    },
                    {
                        name: 'Henry Rossier',
                        imageUrl: avatarseven,
                        children: [
                            {
                                name: 'Antony Francis',
                                imageUrl: avatarseven,
                                children: [
                                    {
                                        name: 'Henry Rossier',
                                        imageUrl: avatrtwo,
                                    },
                                    {
                                        name: 'Henry Rossier',
                                        imageUrl: avatrtwo,
                                    },
                                    {
                                        name: 'Henry Rossier',
                                        imageUrl: avatrtwo,
                                    },
                                    
                                ]
                            }
                        ]
                    },
                ]
            },
        ],
    };

    const treeDataOne = {
        name: 'Jassie Ava',
        imageUrl: avatarfive,
    };

    return (
        <div className="body genealogy-body genealogy-scroll" onMouseDown={handleMouseDown}>
            <div className="relative overflow-scroll">
                <div
                    className="genealogy-tree"
                    style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: 'top left',
                        transition: 'transform 0.2s ease-in-out',
                        position: 'relative',
                        cursor: isDragging ? 'grabbing' : 'grab',
                    }}
                    ref={treeContainerRef}
                >
                    <ul>
                        <TreeNode node={treeData} />
                        <TreeNode node={treeDataOne} />
                    </ul>
                    
                </div>
                <div className="zoom-controls" style={{ position: 'fixed', bottom: '10px', right: '10px', display: 'flex', gap: '10px' }}>
                    <button onClick={zoomIn} className="bg-blue-500 text-white p-2 rounded">Zoom In</button>
                    <button onClick={zoomOut} className="bg-red-500 text-white p-2 rounded ml-2">Zoom Out</button>
                </div>
            </div>
        </div>
    );
};

export default App;
