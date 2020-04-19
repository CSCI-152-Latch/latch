import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./GlobalComponents/layout/Navbar";
import Landing from "./GlobalComponents/layout/Landing";
import Login from "./GlobalComponents/auth/Login";
import Register from "./GlobalComponents/auth/Register";
import Alert from "./GlobalComponents/layout/Alert";
import Setting from './setting/scene';
import Social from './social/scene';
import Dashboard from "./GlobalComponents/dashboard/Dashboard";
import CreateProfile from "./GlobalComponents/profile-forms/CreateProfile";
import EditProfile from "./GlobalComponents/profile-forms/EditProfile";
import AddExperience from "./GlobalComponents/profile-forms/AddExperience";
import AddEducation from "./GlobalComponents/profile-forms/AddEducation";
import Profiles from "./GlobalComponents/p-forms/Profiles";
import Profile from "./GlobalComponents/p-form/Profile";
//route to add hobbies
//route to add job postings
//route to add coupanies not private route
//route to upload files.
import PrivateRoute from "./GlobalComponents/routing/PrivateRoute";
import CommmunityBoard from './community-board/scene';

//redux stuff
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path= "/profile/:id" component={Profile} />
              <Route exact path='/setting' component={Setting} />
              <Route exact path='/social' component={Social} />
              <Route exact path='/communityboard' component={CommmunityBoard} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
