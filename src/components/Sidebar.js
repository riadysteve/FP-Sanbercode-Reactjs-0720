import React from "react";
import { Col, ListGroup } from "react-bootstrap";

function Sidebar() {
  return (
    <Col sm={4} className="pl-0">
      <ListGroup>
        <ListGroup.Item action href="#movies" variant="secondary">
          Movies
        </ListGroup.Item>
        <ListGroup.Item action href="#games" variant="secondary">
          Games
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
}

export default Sidebar;
