import React, { Component } from "react";
import { Breadcrumb } from "react-bootstrap";

class BreadNav extends Component {
  render() {
    return <Breadcrumb className="mt-3">{this.props.children}</Breadcrumb>;
  }
}

export default BreadNav;
