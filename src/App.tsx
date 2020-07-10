import * as React from 'react';
import { payerFormContainer } from './components/containers/PayerFormContainer';
import { PayerFormScreen } from './components/screens/PayerFormScreen';

const Containers = {
  PayerForm: payerFormContainer(PayerFormScreen),
};

export const App = () => {
  return <Containers.PayerForm />;
};
