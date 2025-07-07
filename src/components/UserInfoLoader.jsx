// src/components/UserInfoLoader.jsx
import React, { useState, useEffect } from 'react';

export default function UserInfoLoader () {
    const [ user, setUser ] = useState( null );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        console.log( 'Fetching user data...' );
        fetch( 'https://jsonplaceholder.typicode.com/users/1 ' )
            .then( res => res.json() )
            .then( data => {
                setUser( data );
                setLoading( false );
            } );
    }, [] );

    if ( loading ) return <p>Loading user info...</p>;

    return (
        <div>
            <h3>User Info</h3>
            <p><strong>Name:</strong> { user.name }</p>
            <p><strong>Email:</strong> { user.email }</p>
        </div>
    );
}