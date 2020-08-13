import React from "react";
import { Card, Button, Container, Form } from "react-bootstrap";

function Login({ handleLogin }) {
  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            {/* <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
          </Form>
          <Button variant="primary" type="submit" onClick={handleLogin}>
            Submit
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
