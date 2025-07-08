import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserInfoLoader from './UserInfoLoader';

describe( 'UserInfoLoader', () => {
    beforeEach( () => {
        global.fetch = jest.fn( () =>
            Promise.resolve( {
                json: () => Promise.resolve( { name: 'John Doe', email: 'john@example.com' } ),
            } )
        );
    } );

    afterEach( () => {
        jest.resetAllMocks();
    } );

    test( 'renders loading state initially', () => {
        render( <UserInfoLoader /> );
        expect( screen.getByText( /Loading user info/i ) ).toBeInTheDocument();
    } );

    test( 'fetches and displays user data', async () => {
        render( <UserInfoLoader /> );

        await waitFor( () => {
            expect(
                screen.getByText( ( content, element ) =>
                    element.tagName === 'P' && element.textContent.match( /Name:.*John Doe/i )
                )
            ).toBeInTheDocument();

            expect(
                screen.getByText( ( content, element ) =>
                    element.tagName === 'P' && element.textContent.match( /Email:.*john@example.com/i )
                )
            ).toBeInTheDocument();
        } );

        expect( fetch ).toHaveBeenCalledWith( 'https://jsonplaceholder.typicode.com/users/1' );
    } );
    
} );