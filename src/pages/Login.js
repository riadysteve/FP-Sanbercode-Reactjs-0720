import React, { useState, useContext } from "react";
import { Card, Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import eye_icon from "../assets/eye.svg";
import eye_slash from "../assets/eye-slash.svg";
import { useHistory, Link, Route, Switch } from "react-router-dom";
import Register from "./Register";

function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();
  const [, setUser] = useContext(UserContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // handle button click of login form
  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let username = input.username;
    let password = input.password;

    if (username === "" || password === "") {
      setError("Username or Password required");
      setLoading(false);
    } else {
      axios
        .post("https://backendexample.sanbersy.com/api/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          setLoading(false);
          // console.log(response);
          // history.push("/");

          // // props.history.push("/");
          if (response.data === "invalid username or password") {
            setError(response.data);
          } else {
            setUser({ username: username });
            localStorage.setItem(
              "user",
              JSON.stringify({ username: username, password: password })
            );
            history.push("/");
          }
        })
        .catch((error) => {
          setLoading(false);
          setError(error.data);
        });
    }
  };

  const handleChange = (event) => {
    let typeOfInput = event.target.name;
    switch (typeOfInput) {
      case "username": {
        setInput({ ...input, username: event.target.value });
        break;
      }
      case "password": {
        setInput({ ...input, password: event.target.value });
        break;
      }

      default:
        break;
    }
  };

  return (
    <>
      <Container className="mt-5">
        <h2 className="mb-4">Login</h2>
        <Card>
          <Card.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username Anda"
                  name="username"
                  onChange={handleChange}
                  value={input.username}
                  className={error && "is-invalid"}
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicPassword"
                style={{ position: "relative" }}
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={input.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  autoComplete="new-password"
                  className={error && "border-danger"}
                />
                <img
                  src={showPassword ? eye_slash : eye_icon}
                  style={{
                    cursor: "pointer",
                    height: "20px",
                    width: "20px",
                    position: "absolute",
                    bottom: "8px",
                    right: "14px",
                    opacity: ".3",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                  alt="show-password"
                />
              </Form.Group>
              <Form.Group>
                {error && (
                  <>
                    <small style={{ color: "red", marginTop: "10px" }}>
                      {error}
                    </small>
                    <br />
                  </>
                )}
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>
                  Belum mempunyai akun? <Link to="/daftar">Yuk Daftar</Link>
                </Form.Label>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                onClick={handleLogin}
              >
                {loading ? "Loading..." : "Login"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Switch>
        <Route path="/daftar" component={Register} />
      </Switch>
    </>
  );
}

export default Login;
