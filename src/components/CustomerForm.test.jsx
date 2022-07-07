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
        const locationRadioGroup =
            screen.getByRole('group', { name: /location/i })
            && screen.getByRole('radio', { name: /hk/i })
            && screen.getByRole('radio', { name: /uk/i });
        const addressSection =
            screen.getByRole('textbox', { name: /address/i })
            && screen.getByRole('button', { name: /add address/i })
            && screen.getByRole('button', { name: /remove/i });
        const submitButton = screen.getByRole('button', { name: /submit/i });

        expect(firstNameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
        expect(ageInput).toBeInTheDocument();
        expect(locationRadioGroup).toBeInTheDocument();
        expect(addressSection).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it('changes textfield values', async () => {
        renderForm();
        const user = userEvent.setup();
        const firstNameInput = screen.getByRole('textbox', { name: /first name/i });
        const lastNameInput = screen.getByRole('textbox', { name: /last name/i });
        const ageInput = screen.getByRole('spinbutton', { name: /age/i });
        const addressInput = screen.getByRole('textbox', { name: /address/i });

        await user.type(firstNameInput, 'John');
        await user.type(lastNameInput, 'Doe');
        await user.type(ageInput, '40');
        await user.type(addressInput, 'Address 1');

        expect(firstNameInput).toHaveValue('John');
        expect(lastNameInput).toHaveValue('Doe');
        expect(ageInput).toHaveValue(40);
        expect(addressInput).toHaveValue('Address 1');

        await user.clear(firstNameInput);
        await user.clear(lastNameInput);
        await user.clear(ageInput);
        await user.clear(addressInput);
        await user.type(firstNameInput, 'Jackie');
        await user.type(lastNameInput, 'Chan');
        await user.type(ageInput, '20');
        await user.type(addressInput, 'Address 2');

        expect(firstNameInput).toHaveValue('Jackie');
        expect(lastNameInput).toHaveValue('Chan');
        expect(ageInput).toHaveValue(20);
        expect(addressInput).toHaveValue('Address 2');
    });

    it('validates textfield values', async () => {
        renderForm();
        const user = userEvent.setup();
        const ageInput = screen.getByRole('spinbutton', { name: /age/i });

        await user.type(ageInput, '16');
        await user.tab()

        expect(await screen.findByText(/age must be at least 18/i)).toBeVisible();
    });

    it('does not submit if textfield is empty', async () => {
        renderForm();
        const user = userEvent.setup();
        const submitButton = screen.getByRole('button', { name: /submit/i });

        await user.click(submitButton);

        expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('changes radio button value', async () => {
        renderForm();
        const user = userEvent.setup();
        const radioBtn1 = screen.getByRole('radio', { name: /hk/i });
        const radioBtn2 = screen.getByRole('radio', { name: /uk/i });

        expect(radioBtn1).not.toBeChecked();
        expect(radioBtn2).not.toBeChecked();

        await user.click(radioBtn1);
        expect(radioBtn1).toBeChecked();
        expect(radioBtn2).not.toBeChecked();

        await user.click(radioBtn2);
        expect(radioBtn1).not.toBeChecked();
        expect(radioBtn2).toBeChecked();
    });

    it('address section fieldarray functions properly', async () => {
        renderForm();
        const user = userEvent.setup();
        const addButton = screen.getByRole('button', { name: /add address/i });
        const addressInput1 = screen.getAllByRole('textbox', { name: /address/i })[0];
        const removeButton1 = screen.getAllByRole('button', { name: /remove/i })[0];

        expect(addButton).toBeInTheDocument();
        expect(addressInput1).toBeInTheDocument();
        expect(removeButton1).toBeInTheDocument();

        await user.click(addButton);
        const addressInput2 = screen.getAllByRole('textbox', { name: /address/i })[1];
        const removeButton2 = screen.getAllByRole('button', { name: /remove/i })[1];
        expect(addressInput2).toBeInTheDocument();
        expect(removeButton2).toBeInTheDocument();

        await user.click(removeButton1);
        await user.click(removeButton2);
        expect(addressInput1).not.toBeInTheDocument();
        expect(removeButton1).not.toBeInTheDocument();
        expect(addressInput2).not.toBeInTheDocument();
        expect(removeButton2).not.toBeInTheDocument();
    });

    it('submits the form', async () => {
        renderForm();
        const user = userEvent.setup();
        const firstNameInput = screen.getByRole('textbox', { name: /first name/i });
        const lastNameInput = screen.getByRole('textbox', { name: /last name/i });
        const ageInput = screen.getByRole('spinbutton', { name: /age/i });
        const radioBtn1 = screen.getByRole('radio', { name: /hk/i });
        const addAddressBtn = screen.getByRole('button', { name: /add address/i });
        const addressInput1 = screen.getAllByRole('textbox', { name: /address/i })[0];
        const submitButton = screen.getByRole('button', { name: /submit/i });

        await user.type(firstNameInput, 'John');
        await user.type(lastNameInput, 'Doe');
        await user.type(ageInput, '20');
        await user.click(radioBtn1);
        await user.type(addressInput1, 'Address ABC');
        await user.click(addAddressBtn);
        const addressInput2 = screen.getAllByRole('textbox', { name: /address/i })[1];
        await user.type(addressInput2, 'Address XYZ');
        await user.click(submitButton);

        await waitFor(() => expect(mockSubmit).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(mockSubmit).toHaveBeenCalledWith({
            firstName: 'John',
            lastName: 'Doe',
            age: '20',
            location: 'HK',
            address: [
                'Address ABC',
                'Address XYZ',
            ],
        }));
    });
});