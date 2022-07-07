import React from 'react';
import { useFieldArray } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from './TextField';

function AddressSection() {
  const { fields, append, remove } = useFieldArray({ name: 'address' });
  const onAddAddress = React.useCallback(() => {
    append({ address: '' });
  }, [append]);

  return (
    <>
      <Button color="primary" onClick={onAddAddress}>
        Add Address
      </Button>
      {fields.map((item, idx) => (
        <Grid key={item.id} index={idx}>
          <TextField
            required
            label="Address"
            id={`${idx}-address`}
            name={`address.${idx}.address`}
          />
          <Button color="primary" onClick={() => remove(idx)}>Remove</Button>
        </Grid>
      ))}
    </>
  );
}

export default AddressSection;
