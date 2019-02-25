import React, { Component } from 'react';
import { BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import Layout from './components/Layout';
import store from './redux/store';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Routes />
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
