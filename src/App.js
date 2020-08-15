import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { GlobalProvider } from "./context/GlobalContext";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <>
      <Router>
        <ThemeProvider>
          <GlobalProvider>
            <Routes />
          </GlobalProvider>
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
