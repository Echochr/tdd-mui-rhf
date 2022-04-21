import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomerForm from './CustomerForm';
import renderWithReactHookFormProvider from '../test/utils/renderWithReactHookFormProvider';

describe('CustomerForm', () => {
    const mockSubmit = jest.fn();
    const renderForm = () => renderWithReactHookFormProvider(<CustomerForm onSubmit={mockSubmit} />);

    it('renders the form', () => {
        renderForm();
        const firstNameInput = screen.getByRole('textbox', { name: /first name/i });
        const lastNameInput = screen.getByRole('textbox', { name: /last name/i });
        const ageInput = screen.getByRole('spinbutton', { name: /age/i });
        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(firstNameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
        expect(ageInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it('changes textfield values', () => {
        renderForm();
        const firstNameInput = screen.getByRole('textbox', { name: /first name/i });
        const lastNameInput = screen.getByRole('textbox', { name: /last name/i });
        const ageInput = screen.getByRole('spinbutton', { name: /age/i });
        userEvent.type(firstNameInput, 'John');
        userEvent.type(lastNameInput, 'Doe');
        userEvent.type(ageInput, '40');
        expect(firstNameInput).toHaveValue('John');
        expect(lastNameInput).toHaveValue('Doe');
        expect(ageInput).toHaveValue(40);
        userEvent.clear(firstNameInput);
        userEvent.clear(lastNameInput);
        userEvent.clear(ageInput);
        userEvent.type(firstNameInput, 'Jackie');
        userEvent.type(lastNameInput, 'Chan');
        userEvent.type(ageInput, '20');
        expect(firstNameInput).toHaveValue('Jackie');
        expect(lastNameInput).toHaveValue('Chan');
        expect(ageInput).toHaveValue(20);
    });

    it('validates textfield values', async () => {
        renderForm();
        const ageInput = screen.getByRole('spinbutton', { name: /age/i });
        userEvent.type(ageInput, '16');
        userEvent.tab()
        expect(await screen.findByText(/age must be at least 18/i)).toBeVisible();
    });

    it('does not submit if textfield is empty', () => {
        renderForm();
        const submitButton = screen.getByRole('button', { name: /submit/i });
        userEvent.click(submitButton);
        expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('submits the form', async () => {
        renderForm();
        const firstNameInput = screen.getByRole('textbox', { name: /first name/i });
        const lastNameInput = screen.getByRole('textbox', { name: /last name/i });
        const ageInput = screen.getByRole('spinbutton', { name: /age/i });
        const submitButton = screen.getByRole('button', { name: /submit/i });
        userEvent.type(firstNameInput, 'John');
        userEvent.type(lastNameInput, 'Doe');
        userEvent.type(ageInput, '20');
        userEvent.click(submitButton);
        await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
        await waitFor(() => expect(mockSubmit).toHaveBeenCalledWith({
            firstName: 'John',
            lastName: 'Doe',
            age: '20'
        }));
    });
});