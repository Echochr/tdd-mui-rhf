import React from 'react';
import { useForm } from 'react-hook-form';
import Form from './Form';
import Grid from '@mui/material/Grid';
import AddressSection from './AddressSection';
import TextField from './TextField';
import Radio from './Radio';
import Button from '@mui/material/Button';

export default function CustomerForm({ onSubmit }) {
    const methods = useForm({
        mode: 'onBlur',
        defaultValues: {
            address: [{}]
        }
    });
    const onCustomerFormSubmit = React.useCallback((form) => {
        const resultForm = {
            ...form,
            address: form.address.map(({ address }) => address)
        }
        onSubmit(resultForm);
    }, [onSubmit]);

    const radioOptions = [
        { name: 'HK', value: 'HK' },
        { name: 'UK', value: 'UK' },
    ]

    return (
        <Form methods={methods} onSubmit={onCustomerFormSubmit}>
            <Grid><TextField name="firstName" label="First Name" required /></Grid>
            <Grid><TextField name="lastName" label="Last Name" required /></Grid>
            <Grid><TextField
                name="age"
                label="Age"
                type="number"
                rules={{
                    min: { value: 18, message: 'Age must be at least 18' }
                }}
                required
            /></Grid>
            <Grid><Radio
                label="Location"
                name="location"
                id="location"
                options={radioOptions}
                required
            /></Grid>
            <Grid><AddressSection /></Grid>
            <Grid><Button variant="contained" type="submit">Submit</Button></Grid>
        </Form>
    );
}