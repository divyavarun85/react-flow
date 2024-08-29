import React, { useState } from 'react';

// TreeNode Component
const TreeNode = ({ node }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li className="tree-node">
            <a href="javascript:void(0);" onClick={handleClick}>
                <div className="member-view-box">
                    <div className="member-image">
                        <img src="https://image.flaticon.com/icons/svg/145/145867.svg" alt="Member" />
                        <div className="member-details">
                            <h3>{node.name}</h3>
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

export default TreeNode;
