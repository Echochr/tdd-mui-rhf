import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function Form({ children, onSubmit, methods, ...props }) {
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}

export function TestForm(props) {
  const methods = useForm();
  return <Form methods={methods} {...props} />;
}
