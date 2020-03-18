import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./GlobalComponents/layout/Navbar";
import Landing from "./GlobalComponents/layout/Landing";
import Login from "./GlobalComponents/auth/Login";
import Register from "./GlobalComponents/auth/Register";
import Alert from "./GlobalComponents/layout/Alert";
import Dashboard from "./GlobalComponents/dashboard/Dashboard";
import PrivateRoute from "./GlobalComponents/routing/PrivateRoute";
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
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
