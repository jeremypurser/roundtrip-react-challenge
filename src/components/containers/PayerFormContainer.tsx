import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Environment } from '../../config/Environment';

const { useEffect, useState } = React;

export interface PayerFormProps {
  /** populates select options */
  masterPlans: {
    id: number;
    name: string;
  }[];

  /** select value state */
  selectedMatch: string;

  /** button state */
  matchDisabled: boolean;

  /** Change handler */
  handleSelectMatch: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  /** match click handler */
  handleClickMatch: (e: React.MouseEvent<HTMLButtonElement>) => void;
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

  const [selectedMatch, setSelectedMatch] = useState('');

  const [masterPlans, setMasterPlans] = useState<
    { id: number; name: string }[]
  >([]);

  const [matchDisabled, setMatchDisable] = useState(false);

  useEffect(() => {
    setLoading(true);

    // make API calls
    api
      .getMasterPlans()
      .then(setMasterPlans)
      .catch(error => {
        // ALERT
      })
      .finally(() => setLoading(false));
  }, [api]);

  // Disable button until option is selected
  useEffect(() => {
    setMatchDisable(selectedMatch === '');
  }, [selectedMatch]);

  return loading ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <Screen
      masterPlans={masterPlans}
      matchDisabled={matchDisabled}
      selectedMatch={selectedMatch}
      handleSelectMatch={e => setSelectedMatch(e.target.value)}
      handleClickMatch={e => {}}
    />
  );
};
