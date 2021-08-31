import React from 'react';
import Mapframe from './Mapframe';
import Sidebar from './Sidebar';

export default function App() {
    return (
        <div className='root'>
            <Mapframe />
            <Sidebar />
        </div>
    )
}