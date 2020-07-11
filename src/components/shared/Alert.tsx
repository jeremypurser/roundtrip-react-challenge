import * as React from 'react';
import Toast from 'react-bootstrap/Toast';

export type AlertProps = {
  type: string | undefined;
  message: string | undefined;
  show: boolean;
  onClose: () => void | undefined;
};

export const Alert = (props: AlertProps) => {
  return (
    <Toast
      show={props.show}
      onClose={props.onClose}
      delay={3000}
      autohide={true}
    >
      <Toast.Header>
        <strong className="mr-auto">{props.type}</strong>
      </Toast.Header>
      <Toast.Body>{props.message}</Toast.Body>
    </Toast>
  );
};
