import React from 'react';
import CustomerForm from './components/CustomerForm';

function App() {
  const onCustomerFormSubmit = React.useCallback((form) => {
    console.log(form);
  }, []);

  return (
    <CustomerForm onSubmit={onCustomerFormSubmit} />
  );
}

export default App;
