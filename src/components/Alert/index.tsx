import React, { FC } from 'react';
import { Alert } from 'antd';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store/types';
import * as AlertAction from '../../redux/alert/actions';

type Props = {
  alert: {
    success: boolean | null;
    message: string | null;
  };
  resetAlert: (success: boolean | null, message: string | null) => void;
};

const AlertComp: FC<Props> = ({ alert, resetAlert, children }) => (
  <>
    {!alert.success ? null : (
      <Alert
        message={<h3>{alert.message}</h3>}
        type="success"
        closable
        style={{
          position: 'absolute',
          left: '50%',
          right: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
          width: 150,
          height: 100
        }}
        onClose={() => resetAlert(null, null)}
      />
    )}
    {children}
  </>
);

export default connect(
  (state: RootState) => ({ alert: state.alert }),
  { resetAlert: AlertAction.setSuccessAlert }
)(AlertComp);
