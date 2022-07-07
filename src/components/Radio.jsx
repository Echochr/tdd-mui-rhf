import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

export default function ControlledRadioGroup({
  label,
  options,
  row,
  required,
  ...props
}) {
  const { control } = useFormContext();

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" required={required}>{label}</FormLabel>
      <Controller
        control={control}
        rules={{ required }}
        defaultValue=""
        {...props}
        render={({ field }) => (
          <RadioGroup {...field} row={!!row}>
            {options.map(({ value, name, disabled }) => (
              <FormControlLabel
                control={<Radio required color="primary" />}
                label={name}
                value={value}
                key={value}
                disabled={!!disabled}
              />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
}

ControlledRadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  row: PropTypes.bool,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    disabled: PropTypes.bool,
  })).isRequired,
};

ControlledRadioGroup.defaultProps = {
  row: false,
  required: false,
};
