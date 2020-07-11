import React from 'react';
import renderer from 'react-test-renderer';
import { Alert } from '../components/shared/Alert';

describe('Alert', () => {
  it('should render correctly given valid props', () => {
    const tree = renderer
      .create(
        <Alert
          type="Success"
          message="Request completed"
          show={true}
          onClose={() => {}}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
