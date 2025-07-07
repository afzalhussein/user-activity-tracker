// src/components/IdleDetector.jsx
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
        <div>
            <h3>User Status</h3>
            <p>{ isIdle ? 'You are idle.' : 'You are active.' }</p>
        </div>
    );
}