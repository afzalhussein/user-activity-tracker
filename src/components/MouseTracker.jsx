// src/components/MouseTracker.jsx
import React, { useState, useEffect } from 'react';

export default function MouseTracker () {
    const [ position, setPosition ] = useState( { x: 0, y: 0 } );

    useEffect( () => {
        const handleMouseMove = ( event ) => {
            setPosition( { x: event.clientX, y: event.clientY } );
        };

        window.addEventListener( 'mousemove', handleMouseMove );
// cleanup function to remove the event listener
        return () => {
            window.removeEventListener( 'mousemove', handleMouseMove );
        };
    }, [] );

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
            <h3>Mouse Tracker</h3>
            <p>Mouse Position: X: { position.x }, Y: { position.y }</p>
        </div>
    );
}