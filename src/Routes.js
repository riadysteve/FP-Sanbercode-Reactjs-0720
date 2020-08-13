import React from "react";
import { Route, Switch } from "react-router-dom";

// Component
import Header from "./components/Header";

// Page
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Games from "./pages/Games";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

function Routes() {
  return (
    <>
      <Header />

      <Switch>
        <Route path="/movies" component={Movies} />
        <Route path="/games" component={Games} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
}

export default Routes;
