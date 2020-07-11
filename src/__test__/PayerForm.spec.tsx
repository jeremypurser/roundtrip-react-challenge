import React from 'react';
import renderer from 'react-test-renderer';
import { mockAPIClient } from '../api/mockAPI';
import { payerFormContainer } from '../components/containers/PayerFormContainer';
import { PayerFormScreen } from '../components/screens/PayerFormScreen';
import { Environment } from '../config/Environment';

Environment.set({
  api: mockAPIClient,
});

const PayerForm = payerFormContainer(PayerFormScreen);

describe('PayerForm', () => {
  const { api } = Environment.current;

  it('should render correctly', () => {
    const tree = renderer.create(<PayerForm />).toJSON();

    Promise.all([api.getMasterPlans(), api.getUnmatchedPlan(1)]).then(() => {
      expect(tree).toMatchSnapshot();
    });
  });
});
