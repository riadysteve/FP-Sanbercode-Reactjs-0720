import React, { useState, useContext } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalContext";

const Header = () => {
  const [active, setActive] = useState("Home");
  const history = useHistory();
  const { isLoggedIn, setIsLoggedIn } = useContext(GlobalContext);

  const handleLogout = () => {
    setIsLoggedIn(!isLoggedIn);
    history.push("/login");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link className="navbar-brand mb-0 h1" to="/">
          F-Project
        </Link>
        <Nav className="ml-auto">
          {active === "Home" && <Redirect to="/" />}
          <Link
            className={
              active === "Home"
                ? "nav-link active font-weight-bold"
                : "nav-link"
            }
            onClick={() => setActive("Home")}
            to="/"
          >
            Home
          </Link>
          <Link
            className={
              active === "Movies"
                ? "nav-link active font-weight-bold"
                : "nav-link"
            }
            onClick={() => setActive("Movies")}
            to="/movies"
          >
            Movies
          </Link>
          <Link
            className={
              active === "Games"
                ? "nav-link active font-weight-bold"
                : "nav-link"
            }
            onClick={() => setActive("Games")}
            to="/games"
          >
            Games
          </Link>
          {isLoggedIn ? (
            <>
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <Link className="dropdown-item" to="/admin">
                  Dashboard
                </Link>

                <NavDropdown.Divider />
                <span
                  className="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </NavDropdown>
              {/* <Link className="nav-link" to="/admin">
                  Admin
                </Link>
                <Link className="nav-link" onClick={this.handleLogin}>
                  Logout
                </Link> */}
            </>
          ) : (
            // <Link className="nav-link" onClick={this.handleLogin}>
            //   Login
            // </Link>
            <>
              <Link
                className={
                  active === "Login"
                    ? "nav-link active font-weight-bold"
                    : "nav-link"
                }
                onClick={() => setActive("Login")}
                to="/login"
              >
                Login
              </Link>
              <Link
                className={
                  active === "Daftar"
                    ? "nav-link active font-weight-bold"
                    : "nav-link"
                }
                onClick={() => setActive("Daftar")}
                to="/daftar"
              >
                Daftar
              </Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
