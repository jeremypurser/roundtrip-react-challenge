import * as React from 'react';
import Container from 'react-bootstrap/Container';
import { payerFormContainer } from './components/containers/PayerFormContainer';
import { PayerFormScreen } from './components/screens/PayerFormScreen';

const Containers = {
  PayerForm: payerFormContainer(PayerFormScreen),
};

export const App = () => {
  return (
    <Container style={{ marginTop: '2rem' }}>
      <Containers.PayerForm />
    </Container>
  );
};
