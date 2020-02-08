import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute';

import HomePage from './HomePage';
import UserPage from './UserPage';
import LoginPage from './LoginPage';

export default function RouterPage(props) {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/user">User</Link>
      </nav>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/user" component={UserPage} />
      </Switch>
    </BrowserRouter>
  );
}
