import React, { useContext } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { MovieContext } from "../context/MovieContext";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

function Games() {
  const { games, isLoading } = useContext(MovieContext);

  return (
    <>
      <div>
        <Container>
          <Row className="flex-column">
            <h1 className="mt-5 border-bottom pb-3">Games Page</h1>

            <div className="mt-3">
              {isLoading ? (
                <Loader />
              ) : (
                games !== null &&
                games.map((game) => (
                  <Card key={game.id} className="mb-3">
                    <Card.Body>
                      <a href=".">
                        <h3>{game.name}</h3>
                      </a>
                      <p>
                        <b>Genre : {game.genre === null ? "-" : game.genre}</b>
                      </p>
                      <p>
                        <b>
                          Release : {game.release === null ? "-" : game.release}
                        </b>
                      </p>
                      <p>
                        <b>
                          Platform :{" "}
                          {game.platform === null ? "-" : game.platform}
                        </b>
                      </p>
                      <br />
                      <div>
                        <p>
                          Single Player :{" "}
                          {game.singlePlayer === null ? "-" : game.singlePlayer}
                        </p>
                        <p>
                          Multi Player :{" "}
                          {game.multiplayer === null ? "-" : game.multiplayer}
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              )}
            </div>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Games;
