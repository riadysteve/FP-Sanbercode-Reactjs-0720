import React, { useContext, useState } from "react";
import { Container, Row, Card, Form, Col, Button } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalContext";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

function Games() {
  const { games, isLoading, setGames, setIsLoading } = useContext(
    GlobalContext
  );

  const [inputFilter, setInputFilter] = useState({
    yearStart: 0,
    yearEnd: 0,
  });
  const [showFilter, setShowFilter] = useState(false);

  const handleFilterChange = (e) => {
    switch (e.target.name) {
      case "yearStart":
        setInputFilter({ ...inputFilter, yearStart: e.target.value });
        break;

      case "yearEnd":
        setInputFilter({ ...inputFilter, yearEnd: e.target.value });
        break;

      default:
        break;
    }
  };

  const getGamesData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.get(`https://backendexample.sanbersy.com/api/games`).then((res) => {
      setIsLoading(false);
      setGames(res.data);
    });
  };

  const filterSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.get(`https://backendexample.sanbersy.com/api/games`).then((res) => {
      let resGames = res.data.map((el) => {
        return {
          id: el.id,
          name: el.name,
          genre: el.genre,
          release: el.release,
          platform: el.platform,
          singlePlayer: el.singlePlayer,
          multiplayer: el.multiplayer,
        };
      });
      let filteredGames = resGames.filter(
        (game) =>
          game.release >= inputFilter.yearStart &&
          game.release <= inputFilter.yearEnd
      );
      setIsLoading(false);
      setGames([...filteredGames]);
    });
  };

  return (
    <>
      <div>
        <Container>
          <Row className="flex-column">
            <h1 className="mt-5 border-bottom pb-3">Games Page</h1>

            <div className="d-flex flex-column">
              <div className="filter-top d-flex justify-content-between my-3">
                <h3>Filter</h3>
                <div className="d-flex">
                  <Button
                    onClick={() => setShowFilter(!showFilter)}
                    className="mr-2"
                  >
                    Filter by Year
                  </Button>
                  <Button onClick={getGamesData} variant="outline-primary">
                    Show All
                  </Button>
                </div>
              </div>
              {showFilter && (
                <div className="filter-input d-flex flex-column mb-3">
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                      From Year
                    </Form.Label>
                    <Col sm={4}>
                      <Form.Control
                        name="yearStart"
                        onChange={handleFilterChange}
                        value={inputFilter.yearStart}
                        type="number"
                        placeholder="Year Start"
                      />
                    </Col>
                    <Form.Label column sm={2}>
                      to
                    </Form.Label>
                    <Col sm={4}>
                      <Form.Control
                        name="yearEnd"
                        onChange={handleFilterChange}
                        value={inputFilter.yearEnd}
                        type="number"
                        placeholder="Year End"
                      />
                    </Col>
                  </Form.Group>
                  <Button onClick={filterSearch}>Filter</Button>
                </div>
              )}
            </div>

            <div className="mt-3">
              {isLoading ? (
                <Loader />
              ) : (
                games !== null &&
                games.map((game) => (
                  <Card key={game.id} className="mb-3">
                    <Card.Body>
                      <Link to={"/game/" + game.id}>
                        <h3>{game.name}</h3>
                      </Link>
                      <div>
                        <p>
                          <b>
                            Genre : {game.genre === null ? "-" : game.genre}
                          </b>
                        </p>
                        <p>
                          <b>
                            Release :{" "}
                            {game.release === null ? "-" : game.release}
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
                            {game.singlePlayer === null
                              ? "-"
                              : game.singlePlayer}
                          </p>
                          <p>
                            Multi Player :{" "}
                            {game.multiplayer === null ? "-" : game.multiplayer}
                          </p>
                        </div>
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
