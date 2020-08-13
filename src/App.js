import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { MovieProvider } from "./context/MovieContext";
import { ThemeProvider } from "./context/ThemeContext";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <ThemeProvider>
            <MovieProvider>
              <Routes />
            </MovieProvider>
          </ThemeProvider>
        </Router>
      </>
    );
  }
}

export default App;
