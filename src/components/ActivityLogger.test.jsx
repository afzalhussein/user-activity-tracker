import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import IdleDetector from './IdleDetector';

jest.useFakeTimers( 'modern' );

describe( 'IdleDetector', () => {
    afterEach( () => {
        jest.clearAllTimers();
    } );

    test( 'renders active state initially', () => {
        render( <IdleDetector /> );
        expect( screen.getByText( /You are active/i ) ).toBeInTheDocument();
    } );

    test( 'detects idle state after 3 seconds', () => {
        render( <IdleDetector /> );
        act( () => {
            jest.advanceTimersByTime( 3000 );
        } );
        expect( screen.getByText( /You are idle/i ) ).toBeInTheDocument();
    } );

    test( 'resets idle state on mousemove', () => {
        render( <IdleDetector /> );
        act( () => {
            jest.advanceTimersByTime( 3000 );
        } );
        expect( screen.getByText( /You are idle/i ) ).toBeInTheDocument();
        act( () => {
            fireEvent.mouseMove( window );
        } );
        expect( screen.getByText( /You are active/i ) ).toBeInTheDocument();
    } );

    test( 'cleans up timers and listeners on unmount', () => {
        const removeEventListener = jest.spyOn( window, 'removeEventListener' );
        const clearTimeout = jest.spyOn( global, 'clearTimeout' );
        const { unmount } = render( <IdleDetector /> );
        unmount();
        expect( clearTimeout ).toHaveBeenCalled();
        expect( removeEventListener ).toHaveBeenCalledWith( 'mousemove', expect.any( Function ) );
        expect( removeEventListener ).toHaveBeenCalledWith( 'keydown', expect.any( Function ) );
    } );
} );