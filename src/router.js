import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainLayout from "./components/mainLayout/mainLayout";
import Login from "./pages/Auth/login";
import ForgotPassword from "./pages/Auth/forgotPassword";
import ResetPassword from "./pages/Auth/resetPassword";
import Home from "./pages/Home/home";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route
          path="/"
          render={(props) => (
            <MainLayout {...props}>
              <Route exact path="/" component={Home} />
            </MainLayout>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
