import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import {
  Container,
  Row,
  Jumbotron,
  Col,
  Tab,
  Card,
  ListGroupItem,
  ListGroup,
} from "react-bootstrap";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

function Home() {
  const { movies, games, isLoading } = useContext(GlobalContext);

  return (
    <>
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
      <Container>
        <Row>
          <Tab.Container
            id="list-group-tabs-example"
            defaultActiveKey="#movies"
          >
            <Sidebar />
            <Col sm={8} className="pr-0">
              <Tab.Content>
                <Tab.Pane eventKey="#movies">
                  <h3>Movies</h3>
                  <hr />
                  <Row>
                    {isLoading ? (
                      <Loader />
                    ) : movies === null ? (
                      <div
                        style={{
                          display: "flex",
                          height: "600px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h1>Maaf, Belum ada data</h1>
                      </div>
                    ) : (
                      movies.map((movie) => (
                        <Col sm={6} key={movie.id}>
                          <Card key={movie.id} className="mb-3">
                            <Card.Img
                              variant="top"
                              className="img-fluid"
                              style={{ objectFit: "cover", height: "300px" }}
                              src={
                                movie.image_url === "" ||
                                movie.image_url === null
                                  ? "https://sisterhoodofstyle.com/wp-content/uploads/2018/02/no-image-1.jpg"
                                  : movie.image_url
                              }
                            />
                            <Card.Body>
                              <Card.Title>{movie.title}</Card.Title>
                              <Card.Text>
                                Description : <br /> {movie.description}
                              </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                              <ListGroupItem>
                                Rating : {movie.rating}
                              </ListGroupItem>
                              <ListGroupItem>
                                Genre : {movie.genre}
                              </ListGroupItem>
                              <ListGroupItem>
                                Durasi : {movie.duration}
                              </ListGroupItem>
                              <ListGroupItem>
                                Tahun Rilis : {movie.year}
                              </ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                              <Link
                                to={"/movie/" + movie.id}
                                className="card-link"
                              >
                                Lihat Detail
                              </Link>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))
                    )}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="#games">
                  <h3>Games</h3>
                  <hr />
                  <Row>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      games !== null &&
                      games.map((game) => (
                        <Col sm={6} key={game.id}>
                          <Card key={game.id} className="mb-3">
                            {/* <Card.Img variant="top" src={game.image_url} /> */}
                            <Card.Body>
                              <Card.Title>{game.name}</Card.Title>
                              <Card.Text>{game.platform}</Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                              <ListGroupItem>{game.genre}</ListGroupItem>
                              <ListGroupItem>{game.release}</ListGroupItem>
                              <ListGroupItem>{game.singlePlayer}</ListGroupItem>
                              <ListGroupItem>{game.multiplayer}</ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                              <Link
                                to={"/game/" + game.id}
                                className="card-link"
                              >
                                Lihat Detail
                              </Link>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))
                    )}
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Tab.Container>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
