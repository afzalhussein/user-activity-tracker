import React, { useState, useEffect } from 'react';

const UserInfoLoader = () => {
    const [ user, setUser ] = useState( null );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        const fetchUser = async () => {
            try {
                const response = await fetch( 'https://jsonplaceholder.typicode.com/users/1' );
                const data = await response.json();
                setUser( data );
                setLoading( false );
            } catch ( error ) {
                console.error( 'Error fetching user:', error );
                setLoading( false );
            }
        };
        fetchUser();
    }, [] );

    if ( loading ) {
        return (
            <div className="p-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
                <h3>User Info</h3>
                <p>Loading user info...</p>
            </div>
        );
    }

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
            <h3>User Info</h3>
            <p>
                <strong>Name:</strong> { user.name }
            </p>
            <p>
                <strong>Email:</strong> { user.email }
            </p>
        </div>
    );
};

export default UserInfoLoader;