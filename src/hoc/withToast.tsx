import React, { ComponentType } from 'react';
import { notification } from 'antd';
import { connect } from 'react-redux';
import { RootState } from '../redux/store/types';
import { setSuccessAlert } from '../redux/alert/actions';

type Props = {
  alert: {
    success: boolean | null;
    message: string | null;
  };
  setSuccessAlert: (success: boolean | null, message: string | null) => void;
};

const withToast = (Component: ComponentType<any>) => {
  class Toast extends React.Component<Props> {
    componentDidUpdate() {
      const { alert, setSuccessAlert } = this.props;
      if (this.props.alert.success) {
        notification.open({
          message: alert.message,
          onClick: () => setSuccessAlert(null, null)
        });
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return connect(
    (state: RootState) => ({ alert: state.alert }),
    { setSuccessAlert }
  )(Toast);
};

export default withToast;
