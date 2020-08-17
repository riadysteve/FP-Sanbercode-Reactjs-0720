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
import CreateMovie from "./pages/CreateMovie";

function Routes() {
  return (
    <>
      <Header />

      <Switch>
        <Route exact path="/daftar" component={Register} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/games" component={Games} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/create/movie" component={CreateMovie} />
        <Route path="/movie/:id" component={MovieDetails} />
        <Route path="/game/:id" component={GameDetails} />
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
}

export default Routes;
