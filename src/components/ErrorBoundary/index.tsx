import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store/types';
import { fetchErrors } from '../../shared/utils';
import { Alert } from 'antd';

type Props = {
  customerErrors: Array<Error | null>;
  productErrors: Array<Error | null>;
  invoiceErrors: Array<Error | null>;
  invoiceItemErrors: Array<Error | null>;
};

class ErrorBoundary extends React.Component<Props> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  renderAlert = () => {
    const {
      customerErrors,
      productErrors,
      invoiceErrors,
      invoiceItemErrors
    } = this.props;
    return [
      ...customerErrors,
      ...productErrors,
      ...invoiceErrors,
      ...invoiceItemErrors,
      this.state.error
    ]
      .filter(Boolean)
      .map((error, idx) => (
        <Alert
          message={error!.message}
          type="error"
          closable
          style={{ position: 'absolute' }}
          key={idx}
        />
      ));
  };

  render() {
    return (
      <div>
        {this.renderAlert()}
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  customerErrors: fetchErrors('customer', state),
  productErrors: fetchErrors('product', state),
  invoiceErrors: fetchErrors('invoice', state),
  invoiceItemErrors: fetchErrors('invoiceItem', state)
});

export default connect(mapStateToProps)(ErrorBoundary);
