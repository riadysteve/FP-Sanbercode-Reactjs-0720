import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Context
import { UserContext } from "./context/UserContext";

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
  const [user] = useContext(UserContext);

  const PrivateRoute = ({ user, ...props }) => {
    if (user) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({ user, ...props }) =>
    user ? <Redirect to="/" /> : <Route {...props} />;

  return (
    <>
      <Header />

      <Switch>
        <Route exact user={user} path="/daftar" component={Register} />
        <Route exact user={user} path="/movies" component={Movies} />
        <Route exact user={user} path="/games" component={Games} />
        <LoginRoute exact user={user} path="/login" component={Login} />
        <PrivateRoute exact user={user} path="/admin" component={Admin} />
        <PrivateRoute
          exact
          user={user}
          path="/create/movie"
          component={CreateMovie}
        />
        <PrivateRoute user={user} path="/movie/:id" component={MovieDetails} />
        <PrivateRoute user={user} path="/game/:id" component={GameDetails} />
        <Route exact user={user} path="/" component={Home} />
      </Switch>
    </>
  );
}

export default Routes;
