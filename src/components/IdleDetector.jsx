import React, { useState, useEffect } from 'react';

export default function IdleDetector () {
    const [ isIdle, setIsIdle ] = useState( false );

    useEffect( () => {
        let timeoutId;

        const resetTimer = () => {
            setIsIdle( false );
            clearTimeout( timeoutId );
            timeoutId = setTimeout( () => setIsIdle( true ), 3000 );
        };

        window.addEventListener( 'mousemove', resetTimer );
        window.addEventListener( 'keydown', resetTimer );

        resetTimer(); // Initialize

        return () => {
            clearTimeout( timeoutId );
            window.removeEventListener( 'mousemove', resetTimer );
            window.removeEventListener( 'keydown', resetTimer );
        };
    }, [] );

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
            <h3>User Status</h3>
            <p>{ isIdle ? 'You are idle.' : 'You are active.' }</p>
        </div>
    );
}