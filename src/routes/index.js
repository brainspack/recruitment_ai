import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {isLoggedIn} from 'recruitment-utils/Service.js';
import Login from 'recruitment-pages/Authentication/Login';
import ForgotPassword from 'recruitment-pages/Authentication/ForgotPassword';
import ResetPassword from 'recruitment-pages/Authentication/ResetPassword';
import Dashboard from 'recruitment-pages/Admin/Dashboard';
import AdminLayout from 'recruitment-pages/Admin/AdminLayout';
import Clients from 'recruitment-pages/Admin/Clients/Clients';
import ManageClients from 'recruitment-pages/Admin/Clients/ManageClients';
import Profile from 'recruitment-pages/Admin/Profile.js';

/*import Register from 'recruitment-pages/Authentication/Register';
import ResetPassword from 'recruitment-pages/Authentication/ResetPassword';*/

function auth() {
  return isLoggedIn();
}

//import {} from 'recruitment-constants';
const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    !auth() ? (
      <Component {...props} />
    ) :
      <Redirect to={{
        pathname: '/dashboard',
        state: { from: props.location }
      }} />

  )} />
)

//console.log(this.props);
const Routes = () => {
  return (
    <Switch>
      <PublicRoute path={"/login"} component={Login} exact />
      <PublicRoute path={"/forgot-password"} component={ForgotPassword} exact />
      <PublicRoute path={"/reset-password/:token"} component={ResetPassword} exact />
      <Route path={"/dashboard"} component={(AdminLayout([]))(Dashboard)} exact />
      <Route path={"/clients"} component={(AdminLayout([false]))(Clients)} exact />
      <Route path={"/add-client"} component={(AdminLayout([]))(ManageClients)} exact />
      <Route path={"/client/edit/:id"} component={(AdminLayout([]))(ManageClients)} exact />
      <Route path={"/profile"} component={(AdminLayout([]))(Profile)} exact />


      <Route path="/" render={() => <Redirect to="/login" />} exact />
    </Switch>
  );
};

export default Routes;