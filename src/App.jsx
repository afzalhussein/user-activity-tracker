import React from 'react';
import UserInfoLoader from './components/UserInfoLoader';
import MouseTracker from './components/MouseTracker';
import ActivityLogger from './components/ActivityLogger';
import IdleDetector from './components/IdleDetector';

export default function App () {
    return (
        <div style={ { padding: '20px' } }>
            <h1>React Hooks Examples: useEffect</h1>
            <UserInfoLoader />
            <ActivityLogger />
            <IdleDetector />
            <MouseTracker />
        </div>
    );
}