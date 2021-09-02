import React from 'react';
import Region from './Region';
import Period from './Period';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className='filter'>Filter</h2>
            <div className='filter-content'>
                <Region />
                <Period />
            </div>
        </div>
    )
}