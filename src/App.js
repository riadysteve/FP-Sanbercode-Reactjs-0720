import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { GlobalProvider } from "./context/GlobalContext";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <>
      <Router>
        <UserProvider>
          <ThemeProvider>
            <GlobalProvider>
              <Routes />
            </GlobalProvider>
          </ThemeProvider>
        </UserProvider>
      </Router>
    </>
  );
};

export default App;
