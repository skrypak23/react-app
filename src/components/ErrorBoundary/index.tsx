import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store/types';
import { Alert, notification } from 'antd';
import { setFailureAlert } from '../../redux/alert/actions';

type Props = {
  alert: {
    failure: boolean | null;
    message: string | null;
  };
  setFailureAlert: (success: boolean | null, message: string | null) => void;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidUpdate() {
    const { alert, setFailureAlert } = this.props;
    if (alert.failure) {
      notification.open({
        type: 'error',
        message: alert.message,
        onClick: () => setFailureAlert(null, null)
      });
    }
  }

  render() {
    return this.props.children;
  }
}

export default connect(
  (state: RootState) => ({ alert: state.alert }),
  { setFailureAlert }
)(ErrorBoundary);
