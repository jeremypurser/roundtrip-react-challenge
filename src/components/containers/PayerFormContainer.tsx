import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Environment } from '../../config/Environment';

const { useEffect, useState } = React;

interface UnmatchedPlan {
  id: number;
  plan_name: string;
  carrier_name: string;
  company_id: string;
  company_street_address: string;
  company_city: string;
  company_state: string;
  company_zip: string;
  company_country: string;
  effective_date: string;
  display_name: string;
}

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

  /** unmatched plan from API */
  unmatchedPlan: UnmatchedPlan | undefined;

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
  const unmatchedPlanId = 2;

  const { api } = Environment.current;

  const [loading, setLoading] = useState(false);

  const [selectedMatch, setSelectedMatch] = useState('');

  const [masterPlans, setMasterPlans] = useState<
    { id: number; name: string }[]
  >([]);

  const [unmatchedPlan, setUnmatchedPlan] = useState<
    UnmatchedPlan | undefined
  >();

  const [matchDisabled, setMatchDisable] = useState(false);

  // fetch data needed for screen
  useEffect(() => {
    setLoading(true);

    // make API calls concurrently
    Promise.all([api.getMasterPlans(), api.getUnmatchedPlan(unmatchedPlanId)])
      .then(([resMasterPlans, resUnmatchedPlan]) => {
        setMasterPlans(resMasterPlans);
        setUnmatchedPlan(resUnmatchedPlan);
        // ALERT success
      })
      .catch(error => {
        // ALERT
      })
      .finally(() => setLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Disable button until option is selected
  useEffect(() => {
    setMatchDisable(selectedMatch === '');
  }, [selectedMatch]);

  // TODO: handleClickMatch

  return loading ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <Screen
      masterPlans={masterPlans}
      matchDisabled={matchDisabled}
      unmatchedPlan={unmatchedPlan}
      selectedMatch={selectedMatch}
      handleSelectMatch={e => setSelectedMatch(e.target.value)}
      handleClickMatch={e => {}}
    />
  );
};
