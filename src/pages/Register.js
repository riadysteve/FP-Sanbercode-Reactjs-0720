import React, { useState, useContext } from "react";
import { Card, Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import eye_icon from "../assets/eye.svg";
import eye_slash from "../assets/eye-slash.svg";
import { useHistory, Route, Switch, Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Login from "./Login";

function Register() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const { users, setUsers } = useContext(GlobalContext);
  const history = useHistory();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const createAccount = (e) => {
    e.preventDefault();
    setLoading(true);
    let username = input.username;
    let password = input.password;

    if (
      username.replace(/\s/g, "") !== "" &&
      password.replace(/\s/g, "") !== ""
    ) {
      axios
        .post(`https://backendexample.sanbersy.com/api/users`, {
          username: username,
          password: password,
        })
        .then((res) => {
          setUsers([
            ...users,
            {
              id: res.data.id,
              username: username,
              password: password,
            },
          ]);
        });
      setLoading(false);
      history.push("/login");
    } else {
      setLoading(false);
      setError("invalid username or password");
    }
  };
  return (
    <>
      <Container className="mt-5">
        <h2 className="mb-4">Daftar Akunmu</h2>
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
            </Form>
            <Form.Group className="my-3">
              <Form.Label>
                Sudah mempunyai akun? <Link to="/login">Login disini</Link>
              </Form.Label>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              onClick={createAccount}
            >
              {loading ? "Loading..." : "Daftar"}
            </Button>
          </Card.Body>
        </Card>
      </Container>
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
    </>
  );
}

export default Register;
