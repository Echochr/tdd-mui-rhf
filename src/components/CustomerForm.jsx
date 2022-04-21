import React from 'react';
import { useForm } from 'react-hook-form';
import Form from './Form';
import TextField from './TextField';
import Button from '@mui/material/Button';

export default function CustomerForm({ onSubmit }) {
    const methods = useForm({ mode: 'onBlur' });
    const onCustomerFormSubmit = React.useCallback((form) => {
        onSubmit(form);
    }, [onSubmit]);

    return (
        <Form methods={methods} onSubmit={onCustomerFormSubmit}>
            <TextField name="firstName" label="First Name" required />
            <TextField name="lastName" label="Last Name" required />
            <TextField
                name="age"
                label="Age"
                type="number"
                rules={{
                    min: { value: 18, message: 'Age must be at least 18' }
                }}
                required
            />
            <Button variant="contained" type="submit">Submit</Button>
        </Form>
    );
}