import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe( 'App', () => {
    beforeEach( () => {
        localStorage.clear();
        document.documentElement.classList.remove( 'dark' );
        global.fetch = jest.fn( () =>
            Promise.resolve( {
                json: () => Promise.resolve( { name: 'John Doe', email: 'john@example.com' } ),
            } )
        );
    } );

    afterEach( () => {
        jest.clearAllMocks();
    } );

    test( 'renders all components', async () => {
        render( <App /> );
        await waitFor( () => {
            expect(
                screen.getByText( ( content, element ) =>
                    element.tagName === 'P' && element.textContent.match( /Name:.*John Doe/i )
                )
            ).toBeInTheDocument();
        } );
        expect( screen.getByText( /React Hooks Examples: useEffect/i ) ).toBeInTheDocument();
        expect( screen.getByText( /Toggle Dark Mode/i ) ).toBeInTheDocument();
        expect( screen.getByRole( 'heading', { name: /User Info/i } ) ).toBeInTheDocument();
        expect( screen.getByText( /Mouse Position/i ) ).toBeInTheDocument();
        expect( screen.getByRole( 'heading', { name: /User Status/i } ) ).toBeInTheDocument();
        expect( screen.getByRole( 'heading', { name: /Activity Logger/i } ) ).toBeInTheDocument();
    } );

    test( 'toggles dark mode and updates localStorage', () => {
        render( <App /> );
        const toggleButton = screen.getByText( /Toggle Dark Mode/i );
        fireEvent.click( toggleButton );
        expect( document.documentElement.classList.contains( 'dark' ) ).toBe( true );
        expect( localStorage.getItem( 'darkMode' ) ).toBe( 'true' );
        fireEvent.click( toggleButton );
        expect( document.documentElement.classList.contains( 'dark' ) ).toBe( false );
        expect( localStorage.getItem( 'darkMode' ) ).toBe( 'false' );
    } );

    test( 'restores dark mode from localStorage', () => {
        localStorage.setItem( 'darkMode', 'true' );
        render( <App /> );
        expect( document.documentElement.classList.contains( 'dark' ) ).toBe( true );
    } );
} );