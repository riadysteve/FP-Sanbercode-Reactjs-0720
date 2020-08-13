import React, { useContext } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { MovieContext } from "../context/MovieContext";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

function Movies() {
  const { movies, isLoading } = useContext(MovieContext);

  return (
    <>
      <div>
        <Container>
          <Row className="flex-column">
            <h1 className="mt-5 border-bottom pb-3">Movie Page</h1>

            <div className="mt-3">
              {isLoading ? (
                <Loader />
              ) : (
                movies !== null &&
                movies.map((movie) => (
                  <Card key={movie.id} className="mb-3">
                    <Card.Body>
                      <a href=".">
                        <h3>{movie.title}</h3>
                      </a>
                      <p>
                        <b>
                          Rating {movie.rating === null ? "-" : movie.rating}
                        </b>
                      </p>
                      <p>
                        <b>
                          Durasi :{" "}
                          {movie.duration === null ? "-" : movie.duration / 60}
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
                          {movie.description === null ? "-" : movie.description}
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

export default Movies;
