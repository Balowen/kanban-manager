import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import App from "../../App";
import { AuthProvider } from "../../context/AuthContext";
import Logout from "./Logout";
import PrivateRoute from "./PrivateRoute";
import SignIn from "./SignIn";

export const CustomRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={App} />
          <Route path="/signin" component={SignIn} />
          <Route path="/logout" component={Logout}></Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default CustomRouter;
