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
        <div onClick={ handleClick } className="p-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
            <h3>Activity Logger</h3>
            <p>User has clicked { clicks } times.</p>
            <p><em>(Click anywhere in this box)</em></p>
        </div>
    );
}