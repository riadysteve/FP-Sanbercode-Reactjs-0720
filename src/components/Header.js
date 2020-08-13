import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      active: "Home",
    };
  }

  handleLogin = () => {
    this.setState((prevState) => {
      return {
        isLoggedIn: !prevState.isLoggedIn,
      };
    });
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link className="navbar-brand mb-0 h1" to="/">
            F-Project
          </Link>
          <Nav className="ml-auto">
            {this.state.active === "Home" && <Redirect to="/" />}
            <Link
              className={
                this.state.active === "Home"
                  ? "nav-link active font-weight-bold"
                  : "nav-link"
              }
              onClick={() => this.setState({ ...this.state, active: "Home" })}
              to="/"
            >
              Home
            </Link>
            <Link
              className={
                this.state.active === "Movies"
                  ? "nav-link active font-weight-bold"
                  : "nav-link"
              }
              onClick={() => this.setState({ ...this.state, active: "Movies" })}
              to="/movies"
            >
              Movies
            </Link>
            <Link
              className={
                this.state.active === "Games"
                  ? "nav-link active font-weight-bold"
                  : "nav-link"
              }
              onClick={() => this.setState({ ...this.state, active: "Games" })}
              to="/games"
            >
              Games
            </Link>
            {this.state.isLoggedIn ? (
              <>
                <NavDropdown title="Admin" id="basic-nav-dropdown">
                  <Link className="dropdown-item" to="/admin">
                    Dashboard
                  </Link>

                  <NavDropdown.Divider />
                  <Link className="dropdown-item" onClick={this.handleLogin}>
                    Logout
                  </Link>
                </NavDropdown>
                {/* <Link className="nav-link" to="/admin">
                  Admin
                </Link>
                <Link className="nav-link" onClick={this.handleLogin}>
                  Logout
                </Link> */}
              </>
            ) : (
              <Link className="nav-link" onClick={this.handleLogin}>
                Login
              </Link>
              // <Link
              //   className={
              //     this.state.active === "Login"
              //       ? "nav-link active font-weight-bold"
              //       : "nav-link"
              //   }
              //   onClick={() =>
              //     this.setState({ ...this.state, active: "Login" })
              //   }
              //   to="/login"
              //   handleLogin={this.handleLogin}
              //   isLoggedIn={this.state.isLoggedIn}
              // >
              //   Login
              // </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    );
  }
}
