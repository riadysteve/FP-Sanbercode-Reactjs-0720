import React from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import MovieTable from "../components/Movies/MovieTable";
import GameTable from "../components/Games/GameTable";
import Footer from "../components/Footer";

function Admin() {
  return (
    <>
      <Container className="mt-5">
        <h1>Welcome Admin</h1>
        <hr />

        <Tabs defaultActiveKey="movies" id="uncontrolled-tab-example">
          <Tab eventKey="movies" title="Movies">
            <MovieTable />
          </Tab>
          <Tab eventKey="games" title="Games">
            <GameTable />
          </Tab>
        </Tabs>
      </Container>
      <Footer />
    </>
  );
}

export default Admin;
