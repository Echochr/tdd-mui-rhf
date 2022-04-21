import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { render } from '@testing-library/react';

export default function renderWithReactHookFormProvider(ui) {
  const Wrapper = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  return render(<Wrapper>{ui}</Wrapper>);
}
