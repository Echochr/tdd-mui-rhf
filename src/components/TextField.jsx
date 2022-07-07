import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

export default function ControlledTextField({ label, type, disabled, required, rules, ...props }) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            defaultValue=""
            {...props}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    variant="filled"
                    label={label}
                    type={type}
                    disabled={disabled}
                    required={required}
                    error={!!error}
                    helperText={error ? error.message : null}
                />
            )}
        />
    );
}

ControlledTextField.propTypes = {
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
}

ControlledTextField.defaultProps = {
    required: false,
    type: 'text',
}