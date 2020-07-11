import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { PayerFormProps } from '../containers/PayerFormContainer';

export const PayerFormScreen = (props: PayerFormProps) => {
  return (
    <>
      <h2>
        {props.unmatchedPlan?.carrier_name} {props.unmatchedPlan?.plan_name}
      </h2>
      <Form>
        {/* Carrier and plan name */}
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="carrier-and-plan-name">
              Carrier and plan name:
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Carrier and plan name"
            aria-describedby="carrier-and-plan-name"
            type="text"
            value={`${props.unmatchedPlan?.carrier_name} ${props.unmatchedPlan?.plan_name}`}
            readOnly={true}
          />
        </InputGroup>

        {/* Company Id */}
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="company-id">Company Id:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Company Id"
            aria-describedby="company-id"
            type="text"
            value={props.unmatchedPlan?.company_id}
            readOnly={true}
          />
        </InputGroup>

        {/* Phone number */}
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="company-phone">Phone number:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Phone number"
            aria-describedby="company-phone"
            type="text"
            value={props.unmatchedPlan?.company_phone}
            readOnly={true}
          />
        </InputGroup>

        {/* Match */}
        <Form.Group>
          <Form.Control
            as="select"
            value={props.selectedMatch}
            onChange={props.handleSelectMatch}
          >
            <option value="">Select</option>
            {/* Plans from API */}
            {props.masterPlans.map(plan => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button
          variant="light"
          disabled={props.matchDisabled || props.matchLoading}
          style={{ marginRight: '1rem' }}
          onClick={props.handleClickMatch}
        >
          {props.matchLoading ? 'Loading...' : 'Match'}
        </Button>
        <Button
          variant="primary"
          disabled={props.createInsuranceLoading}
          onClick={props.handleClickCreateInsurance}
        >
          {props.createInsuranceLoading ? 'Loading...' : 'Create Insurance'}
        </Button>
      </Form>
    </>
  );
};
