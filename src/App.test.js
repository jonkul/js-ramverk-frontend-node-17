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

        //sleep(3000);
    });



    test('clicks New button', async () => {
        const {rerender} = render(<App />);

        var mhm = await screen.findByText('New');

        await act(async () => {
            userEvent.click(mhm);
        });
        
        rerender(<App />)

        await (waitFor(() => expect(screen.getByText('New document')).toBeInTheDocument(),{timeout:3000}));
    });



    test('renders App component, finds expected static elements', async () => {
        render(<App />);

        expect(screen.getByText('My little React/Trix text editor')).toBeInTheDocument();
        expect(screen.getByText('Active document:')).toBeInTheDocument();
        expect(screen.getByText('Documents:')).toBeInTheDocument();
        
        sleep(3000);
        //expect(await screen.findByText('Dokument1')).toBeInTheDocument();
    });



    test('edits the "text editor", finds state driven <p> in DOM', async () => {
        render(<App />);

        expect(screen.queryByText('test input2')).toBeNull();

        await act(async () => {
            fireEvent.change(screen.getByRole('textbox'), {
                target: { value: 'test input2' },
            });
        });

        expect(await screen.findByText('test input2')).toBeInTheDocument();
        sleep(3000);
    });



    test('edits "active document input", finds state driven <p> in DOM', async () => {
        render(<App />);

        expect(screen.queryByText('test input')).toBeNull();

        await act(async () => {
            fireEvent.change(screen.getByRole('textbox'), {
                target: { value: 'test input' },
            });
        });

        expect(await screen.findByText('test input')).toBeInTheDocument();
        sleep(3000);
    });



    /* test('finds "New document"', async () => {
        render(<App />);

        expect(await screen.findByText('New document')).toBeInTheDocument();
        //screen.debug();
        sleep(3000);
    }); */


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



    /* test('renders App component, finds expected DB elements', async () => {
        render(<App />);

        sleep(3000);
        expect(await screen.findByText('Dokument1')).toBeInTheDocument();
    }); */
});
