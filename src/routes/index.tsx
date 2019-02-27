import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Spin from '../components/Spinner';
import * as PATHS from './routes';

const AsyncCustomer = lazy(() => import('../pages/Customer'));
const AsyncProduct = lazy(() => import('../pages/Product'));
const AsyncInvoice = lazy(() => import('../pages/Invoice'));
const AsyncNotFound = lazy(() => import('../pages/NotFound'));

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
    path: PATHS.NOT_FOUND,
    Component: AsyncNotFound
  }
];

const RootRoutes = () => (
  <Suspense fallback={<Spin />}>
    <Switch>
      <Redirect exact from="/" to="/customer" />
      {routes.map(({ path, Component }) => (
        <Route exact key={path} path={path} render={() => <Component />} />
      ))}
    </Switch>
  </Suspense>
);

export default RootRoutes;
