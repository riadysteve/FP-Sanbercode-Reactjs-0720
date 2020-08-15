import React, { useContext, useState } from "react";
import { Container, Row, Card, Button, Col, Form } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalContext";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

function Movies() {
  const { movies, setMovies, isLoading, setIsLoading } = useContext(
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

  const getMovieData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.get(`https://backendexample.sanbersy.com/api/movies`).then((res) => {
      let resMovie = res.data.map((el) => {
        return {
          id: el.id,
          title: el.title,
          description: el.description,
          year: el.year,
          duration: el.duration,
          genre: el.genre,
          rating: el.rating,
          image_url: el.image_url,
        };
      });
      setIsLoading(false);
      setMovies(resMovie);
    });
  };

  const filterSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.get(`https://backendexample.sanbersy.com/api/movies`).then((res) => {
      let resMovie = res.data.map((el) => {
        return {
          id: el.id,
          title: el.title,
          description: el.description,
          year: el.year,
          duration: el.duration,
          genre: el.genre,
          rating: el.rating,
          image_url: el.image_url,
        };
      });
      let filteredMovies = resMovie.filter(
        (movie) =>
          movie.year >= inputFilter.yearStart &&
          movie.year <= inputFilter.yearEnd
      );
      setIsLoading(false);
      setMovies([...filteredMovies]);
    });
  };

  return (
    <>
      <div>
        <Container>
          <Row className="flex-column">
            <h1 className="mt-5 border-bottom pb-3">Movie Page</h1>

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
                  <Button onClick={getMovieData} variant="outline-primary">
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
              <Row>
                {isLoading ? (
                  <Loader />
                ) : (
                  movies !== null &&
                  movies.map((movie) => (
                    <Col sm={4}>
                      <Card key={movie.id} className="mb-3">
                        <Card.Img
                          variant="top"
                          className="img-fluid"
                          src={
                            movie.image_url === "" || movie.image_url === null
                              ? "https://sisterhoodofstyle.com/wp-content/uploads/2018/02/no-image-1.jpg"
                              : movie.image_url
                          }
                          alt={movie.title}
                          style={{
                            width: "100%",
                            height: "400px",
                            objectFit: "cover",
                          }}
                        />
                        <Card.Body>
                          <Link to={"/movie/" + movie.id}>
                            <h3>{movie.title}</h3>
                          </Link>
                          <p>
                            <b>Year {movie.year === null ? "-" : movie.year}</b>
                          </p>
                          <p>
                            <b>
                              Rating{" "}
                              {movie.rating === null ? "-" : movie.rating}
                            </b>
                          </p>
                          <p>
                            <b>
                              Durasi :{" "}
                              {movie.duration === null
                                ? "-"
                                : movie.duration / 60}
                            </b>
                          </p>
                          <p>
                            <b>
                              Genre : {movie.genre === null ? "-" : movie.genre}
                            </b>
                          </p>
                          <br />
                          <div>
                            <p>
                              Deskripsi :{" "}
                              {movie.description === null
                                ? "-"
                                : movie.description}
                            </p>
                          </div>
                          <div>
                            <p>
                              Review :{" "}
                              {movie.review === null ? "-" : movie.review}
                            </p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            </div>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Movies;
