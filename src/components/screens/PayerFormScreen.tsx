import * as React from 'react';
import { PayerFormProps } from '../containers/PayerFormContainer';

export const PayerFormScreen = (props: PayerFormProps) => {
  return (
    <form id="payer-form">
      {/* Carrier and plan name */}
      <label htmlFor="fname">First name:</label>
      <input type="text" id="fname" name="fname" />

      {/* Company Id */}
      <label htmlFor="company-id">Company Id:</label>
      <input type="number" id="company-id" name="company-id" />

      {/* Phone number */}
      <label htmlFor="phone">Phone number:</label>
      <input type="tel" id="phone" name="phone" />

      {/* Match */}
      <select name="match" id="match" form="payer-form" defaultValue="">
        <option value="">Select</option>
        {/* Plans from API */}
        {props.masterPlans.map(plan => (
          <option key={plan.id} value={plan.name}>
            {plan.name}
          </option>
        ))}
      </select>

      <button type="button">Match</button>
      <button type="button">Create Insurance</button>
    </form>
  );
};
