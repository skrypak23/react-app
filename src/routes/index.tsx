import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Spin from '../components/Spinner'
import * as PATHS from './routes';

const AsyncCustomer = lazy(() => import('../components/Customer'));
const AsyncProduct = lazy(() => import('../components/Product'));
const AsyncInvoice = lazy(() => import('../components/Invoice'));
const AsyncInvoiceItem = lazy(() => import('../components/InvoiceItem'));

const routes = [
  {
    path: PATHS.CUSTOMER,
    Component: AsyncCustomer
  },
  {
    path: PATHS.PRODUCT,
    Component: AsyncProduct
  },
  {
    path: PATHS.INVOICE,
    Component: AsyncInvoice
  },
  {
    path: PATHS.INVOICE_ITEM,
    Component: AsyncInvoiceItem
  }
];

const RootRoutes = () => (
  <Suspense fallback={<Spin />}>
    <Switch>
      {routes.map(({path, Component}) => (
        <Route exact key={path} path={path} render={() => <Component />} />
      ))}
    </Switch>
  </Suspense>
);

export default RootRoutes;
