import React from 'react';
import { screen } from '@testing-library/react';
import renderWithReactHookFormProvider from '../test/utils/renderWithReactHookFormProvider';
import TextField from '../components/TextField';

describe('TextField', () => {
    const setup = () => renderWithReactHookFormProvider(<TextField name="lastName" label="Last Name" />);

    it('renders correctly', () => {
        setup();
        const lastNameInput = screen.getByRole('textbox', { name: /last name/i });
        expect(lastNameInput).toBeInTheDocument();
    });
});