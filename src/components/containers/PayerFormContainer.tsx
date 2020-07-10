import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Environment } from '../../config/Environment';

const { useEffect, useState } = React;

export interface PayerFormProps {
  plans: {
    id: number;
    name: string;
  }[];
}

/**
 * Higher Order Component that connects purely presentational component to state/business logic
 * @param Screen PayerFormScreen
 * @returns Connected Component
 */
export const payerFormContainer = (
  Screen: React.ComponentType<PayerFormProps>
) => () => {
  const { api } = Environment.current;

  const [loading, setLoading] = useState(false);

  const [masterPlans, setMasterPlans] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    // make API calls
    setLoading(true);
    api
      .getMasterPlans()
      .then(setMasterPlans)
      .catch(error => {
        // ALERT
      })
      .finally(() => setLoading(false));
  }, [api]);

  return loading ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <Screen plans={masterPlans} />
  );
};
