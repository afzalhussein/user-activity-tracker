import React, { useEffect, useState } from 'react';

export default function ActivityLogger () {
    const [ clicks, setClicks ] = useState( 0 );
    
    useEffect( () => {
        console.log('User clicked '+ clicks + ' times.');
    }, [ clicks ] );
    
    const handleClick = () => {
        setClicks( prevClicks => prevClicks + 1 );
    };
    return (
        <div onClick={handleClick} style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
            <h3>Activity Logger</h3>
            <p>User has clicked { clicks } times.</p>
            <p><em>(Click anywhere in this box)</em></p>
        </div>
    );
}