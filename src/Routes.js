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
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import GameDetails from "./pages/GameDetails";

function Routes() {
  return (
    <>
      <Header />

      <Switch>
        <Route path="/daftar" component={Register} />
        <Route path="/movies" component={Movies} />
        <Route path="/games" component={Games} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/movie/:id" component={MovieDetails} />
        <Route path="/game/:id" component={GameDetails} />
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
}

export default Routes;
