import React from 'react';
import App from './App';
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor
} from "@testing-library/react";
import userEvent from '@testing-library/user-event';

jest.setTimeout(50000);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



describe('App', () => {
    test('clicks Reset DB button', () => {
        render(<App />);

        expect(screen.queryByText('test input3')).toBeNull();

        var mhm = screen.getByText('Reset DB');
        act(() => {
            userEvent.click(mhm);
        });

        expect(screen.queryByText('New document')).toBeNull();

        sleep(3000);
    });



    test('clicks New button', () => {
        const {rerender} = render(<App />);

        var mhm = screen.getByText('New');

        act( () => {
            userEvent.click(mhm);
        });
        
        rerender(<App />);

        (waitFor(() => expect(screen.getByText('New document')).toBeInTheDocument(),{timeout:30000}));

        sleep(3000);
    });



    test('renders App component, finds expected static elements', () => {
        render(<App />);

        expect(screen.getByText('My little React/Trix text editor')).toBeInTheDocument();
        expect(screen.getByText('Active document:')).toBeInTheDocument();
        expect(screen.getByText('Documents:')).toBeInTheDocument();
        
        sleep(3000);
        //expect(await screen.findByText('Dokument1')).toBeInTheDocument();
    });



    test('edits the "text editor", finds state driven <p> in DOM', () => {
        render(<App />);

        expect(screen.queryByText('test input2')).toBeNull();

        act( () => {
            fireEvent.change(screen.getByRole('textbox'), {
                target: { value: 'test input2' },
            });
        });

        sleep(3000);
        //expect(screen.findByText('test input2')).toBeInTheDocument();
        (waitFor(() => expect(screen.getByText('test input2')).toBeInTheDocument(),{timeout:30000}));
        
    });



    test('edits "active document input", finds state driven <p> in DOM', () => {
        render(<App />);

        expect(screen.queryByText('test input')).toBeNull();

        act( () => {
            fireEvent.change(screen.getByRole('textbox'), {
                target: { value: 'test input' },
            });
        });

        (waitFor(() => expect(screen.getByText('test input')).toBeInTheDocument(),{timeout:30000}));
        //expect(await screen.findByText('test input')).toBeInTheDocument();
        sleep(3000);
    });



    test('clicks Reset DB button, doesnt find "New document"', () => {
        render(<App />);

        expect(screen.queryByText('test input3')).toBeNull();

        var mhm = screen.getByText('Reset DB');
        act(() => {
            userEvent.click(mhm);
        });

        expect(screen.queryByText('New document')).toBeNull();

        sleep(3000);
    });



    test('renders App component, finds expected DB elements', () => {
        const {rerender} = render(<App />);

        (waitFor(() => expect(screen.getByText('Dokument1')).toBeInTheDocument(),{timeout:30000}));

        sleep(3000);
    });



    test('clicks New button', () => {
        const {rerender} = render(<App />);

        var mhm = screen.getByText('New');

        act( () => {
            userEvent.click(mhm);
        });
        
        waitFor(() => rerender(<App />),{timeout:30000});

        /* await (waitFor(() => expect(screen.getByText('New document')).toBeInTheDocument(),{timeout:30000})); */

        sleep(3000);
    });
});
