import React from "react";
import { Container, Row, Jumbotron } from "react-bootstrap";

function Home() {
  return (
    <div>
      <Jumbotron>
        <Container>
          <Row className="flex-column">
            <h1>Welcome</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default Home;
