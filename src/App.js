import React from 'react';
import Mapframe from './components/map/Mapframe';
import Sidebar from './components/sidebar/Sidebar';

export default function App() {
    return (
        <div className='root'>
            <Mapframe />
            <Sidebar />
        </div>
    )
}