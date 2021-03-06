import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing';
import  Navbar from './components/layout/Navbar';
import  Login from './components/auth/Login';
import  Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import Profiles from './components/profiles/Profiles';
//Redux
import setAuthToken from './utils/setAuthToken';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth'
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import EditProfile from './components/profile-forms/EditProfile';

if(localStorage.token) {
  setAuthToken(localStorage.token)}
 

const App = () =>{
  useEffect(() => {
    store.dispatch(loadUser())
  }, []);
   return (
   <Provider store={ store }>
    <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={ Landing } />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={ Register } />
          <Route exact path="/login" component={ Login }/>
          <Route exact path="/profiles" component={ Profiles }/>
          <PrivateRoute exact path="/dashboard" component={ Dashboard }/>
          <PrivateRoute exact path="/create-profile" component={ CreateProfile }/>
          <PrivateRoute exact path="/edit-profile" component={ EditProfile }/>
        </Switch>
      </section>
   
    
    </Fragment>
  </Router>
</Provider>
  )}
export default App;
