import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Environment } from '../../config/Environment';
import { randomNumberFromRange } from '../../util/randomNumberFromRange';
import { Alert, AlertProps } from '../shared/Alert';

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
  company_phone: string;
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
  /** match button state */
  matchDisabled: boolean;
  matchLoading: boolean;
  /** create insurance button state */
  createInsuranceLoading: boolean;
  /** unmatched plan from API */
  unmatchedPlan: UnmatchedPlan | undefined;
  /** Change handler */
  handleSelectMatch: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** match click handler */
  handleClickMatch: () => void;
  /** create insurance click handler */
  handleClickCreateInsurance: () => void;
}

/**
 * Higher Order Component that connects purely presentational component to state/business logic
 * @param Screen PayerFormScreen
 * @returns Connected Component
 */
export const payerFormContainer = (
  Screen: React.ComponentType<PayerFormProps>
) => () => {
  // Generate unmatched plan id to fetch from random number
  const unmatchedPlanId = randomNumberFromRange(1, 4);

  const { api } = Environment.current;

  // initial data fetch state
  const [loading, setLoading] = useState(false);

  // select dropdown state
  const [selectedMatch, setSelectedMatch] = useState('');

  // options from API
  const [masterPlans, setMasterPlans] = useState<
    { id: number; name: string }[]
  >([]);

  // current user state
  const [unmatchedPlan, setUnmatchedPlan] = useState<
    UnmatchedPlan | undefined
  >();

  // match button state
  const [matchDisabled, setMatchDisable] = useState(false);
  const [matchLoading, setMatchLoading] = useState(false);

  // create insurance button state
  const [createInsuranceLoading, setCreateInsuranceLoading] = useState(false);

  // Alert
  const [alertProps, setAlertProps] = useState<AlertProps>({
    type: undefined,
    message: undefined,
    show: false,
    onClose: () => {
      setAlertProps({
        ...alertProps,
        show: false,
      });
    },
  });

  // fetch data needed for screen
  useEffect(() => {
    setLoading(true);

    // make API calls concurrently
    Promise.all([api.getMasterPlans(), api.getUnmatchedPlan(unmatchedPlanId)])
      .then(([resMasterPlans, resUnmatchedPlan]) => {
        setMasterPlans(resMasterPlans);
        setUnmatchedPlan(resUnmatchedPlan);
      })
      .catch(error => {
        // show Alert
        setAlertProps({
          ...alertProps,
          type: 'Error',
          message: error,
          show: true,
        });
      })
      .finally(() => setLoading(false));

    // Only fetch once when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Disable button until option is selected
  useEffect(() => {
    setMatchDisable(selectedMatch === '');
  }, [selectedMatch]);

  // POST new alias
  const handleClickMatch = () => {
    setMatchLoading(true);
    // assert unmatchedPlan !== undefined because clickHandler
    // is only available if it is defined
    api
      .addAlias({
        plan_name: unmatchedPlan?.plan_name!,
        carrier_name: unmatchedPlan?.carrier_name!,
        unmatched_plan_id: unmatchedPlan?.id!,
        master_plan_id: Number(selectedMatch),
      })
      .then(() => {
        // Alert
        setAlertProps({
          ...alertProps,
          type: 'Success',
          message: 'Your match has been submitted.',
          show: true,
        });
      })
      .catch(error => {
        // show Alert
        setAlertProps({
          ...alertProps,
          type: 'Error',
          message: error,
          show: true,
        });
      })
      .finally(() => {
        setMatchLoading(false);
      });
  };

  // POST new master plan
  const handleClickCreateInsurance = () => {
    setCreateInsuranceLoading(true);

    if (unmatchedPlan) {
      api
        .addMasterPlan({
          name: `${unmatchedPlan?.carrier_name} ${unmatchedPlan?.plan_name}`,
        })
        .then(() => {
          // show Alert success
          setAlertProps({
            ...alertProps,
            type: 'Success',
            message: 'Insurance successfully created.',
            show: true,
          });
        })
        .catch(error => {
          // ALERT error
          setAlertProps({
            ...alertProps,
            type: 'Error',
            message: error,
            show: true,
          });
        })
        .finally(() => {
          setCreateInsuranceLoading(false);
        });
    } else {
      // Alert
      setAlertProps({
        ...alertProps,
        type: 'Error',
        message: 'The form is incomplete',
        show: true,
      });
    }
  };

  return loading ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <>
      <Alert {...alertProps} />
      <Screen
        masterPlans={masterPlans}
        matchDisabled={matchDisabled}
        matchLoading={matchLoading}
        createInsuranceLoading={createInsuranceLoading}
        unmatchedPlan={unmatchedPlan}
        selectedMatch={selectedMatch}
        handleSelectMatch={e => setSelectedMatch(e.target.value)}
        handleClickMatch={handleClickMatch}
        handleClickCreateInsurance={handleClickCreateInsurance}
      />
    </>
  );
};
