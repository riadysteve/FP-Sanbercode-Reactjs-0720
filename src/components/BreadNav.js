import React, { Component } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

class BreadNav extends Component {
  render() {
    return (
      <Breadcrumb className="mt-3">
        <Link to="/" className="breadcrumb-item">
          Home
        </Link>
        <Breadcrumb.Item active>{this.props.children}</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

export default BreadNav;
