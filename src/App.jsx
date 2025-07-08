import React, { useEffect, useState } from 'react';
import UserInfoLoader from './components/UserInfoLoader';
import MouseTracker from './components/MouseTracker';
import ActivityLogger from './components/ActivityLogger';
import IdleDetector from './components/IdleDetector';

export default function App () {
    const [ isDark, setIsDark ] = useState( () => {
        return localStorage.getItem( 'darkMode' ) === 'true';
    } );

    useEffect( () => {
        if ( isDark ) {
            document.documentElement.classList.add( 'dark' );
            localStorage.setItem( 'darkMode', 'true' );
        } else {
            document.documentElement.classList.remove( 'dark' );
            localStorage.setItem( 'darkMode', 'false' );
        }
    }, [ isDark ] );

    return (
        <div className="App p-4 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
            <button
                onClick={ () => setIsDark( ( prev ) => !prev ) }
                className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-700"
            >
                Toggle Dark Mode
            </button>
            <h1 className="text-2xl font-bold">React Hooks Examples: useEffect</h1>
            <UserInfoLoader />
            <ActivityLogger />
            <IdleDetector />
            <MouseTracker />
        </div>
    );
}