import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import BreadNav from "../components/BreadNav";

function MovieDetails() {
  let { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const findMovie = async () => {
      setLoading(true);

      const result = await axios.get(
        `https://backendexample.sanbersy.com/api/movies/${id}`
      );
      setMovie(result.data);
      setLoading(false);
    };

    if (movie === null) {
      findMovie();
    }
  });

  return (
    <Container>
      <BreadNav>{movie !== null && movie.title}</BreadNav>
      <h1>Movie Details</h1>
      <hr />
      <Row>
        {loading ? (
          <Loader />
        ) : (
          movie !== null && (
            <>
              <Col sm={9}>
                <div key={movie.id}>
                  <h2 className="mb-3">{movie.title}</h2>

                  <p>
                    Deskripsi : <br />
                    {movie.description}
                  </p>
                  <p>Tahun Rilis : {movie.year}</p>
                  <p>Durasi : {movie.duration}</p>
                  <p>Genre : {movie.genre}</p>
                  <p>Rating : {movie.rating}</p>
                  <p>
                    Review : <br />
                    {movie.review}
                  </p>
                </div>
              </Col>
              <Col sm={3}>
                <img src={movie.image_url} alt={movie.title} />
              </Col>
            </>
          )
        )}
      </Row>
    </Container>
  );
}

export default MovieDetails;
