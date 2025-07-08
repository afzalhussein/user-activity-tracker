import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MouseTracker from './MouseTracker';

describe( 'MouseTracker', () => {
    beforeEach( () => {
        jest.spyOn( window, 'addEventListener' ).mockImplementation( () => { } );
        jest.spyOn( window, 'removeEventListener' ).mockImplementation( () => { } );
    } );

    afterEach( () => {
        jest.restoreAllMocks();
    } );

    test( 'renders with initial mouse position (0, 0)', () => {
        render( <MouseTracker /> );
        expect( screen.getByText( /Mouse Position: X: 0, Y: 0/i ) ).toBeInTheDocument();
        expect( screen.getByText( /Mouse Tracker/i ) ).toBeInTheDocument();
    } );

    test( 'updates mouse position on mousemove event', () => {
        // Clear the mock to allow the real event listener to work
        jest.spyOn( window, 'addEventListener' ).mockRestore();
        render( <MouseTracker /> );
        fireEvent.mouseMove( window, { clientX: 150, clientY: 250 } );
        // Use a custom matcher to handle fragmented text
        expect(
            screen.getByText( ( content, element ) =>
                element.tagName === 'P' && /Mouse Position: X: 150, Y: 250/i.test( content )
            )
        ).toBeInTheDocument();
    } );

    test( 'adds and removes mousemove event listener', () => {
        const addEventListenerSpy = jest.spyOn( window, 'addEventListener' );
        const removeEventListenerSpy = jest.spyOn( window, 'removeEventListener' );
        const { unmount } = render( <MouseTracker /> );

        expect( addEventListenerSpy ).toHaveBeenCalledWith( 'mousemove', expect.any( Function ) );

        unmount();
        expect( removeEventListenerSpy ).toHaveBeenCalledWith( 'mousemove', expect.any( Function ) );
    } );

    test( 'applies dark mode classes when dark class is present', () => {
        document.documentElement.classList.add( 'dark' );
        const { container } = render( <MouseTracker /> );
        const trackerDiv = container.firstChild;

        expect( trackerDiv ).toHaveClass( 'dark:bg-gray-800' );
        expect( trackerDiv ).toHaveClass( 'dark:text-white' );
        document.documentElement.classList.remove( 'dark' );
    } );

    test( 'applies light mode classes by default', () => {
        const { container } = render( <MouseTracker /> );
        const trackerDiv = container.firstChild;

        expect( trackerDiv ).toHaveClass( 'bg-gray-100' );
        expect( trackerDiv ).toHaveClass( 'text-black' );
    } );
} );