import React, { useEffect, useState } from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import BreadNav from "../components/BreadNav";

function GameDetails() {
  let { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const findGame = async () => {
      setLoading(true);

      const result = await axios.get(
        `https://backendexample.sanbersy.com/api/games/${id}`
      );
      setGame(result.data);
      setLoading(false);
    };

    if (game === null) {
      findGame();
    }
  });

  return (
    <Container>
      <BreadNav>
        <Link to="/" className="breadcrumb-item">
          Home
        </Link>
        <Breadcrumb.Item active>{game !== null && game.name}</Breadcrumb.Item>
      </BreadNav>
      <h1>Game Details</h1>
      <hr />

      {loading ? (
        <Loader />
      ) : (
        game !== null && (
          <div key={game.id}>
            <h2>{game.name}</h2>

            <div>
              <p>Platform : {game.platform}</p>
              <p>Tahun Rilis : {game.release}</p>
              <p>Genre : {game.genre}</p>
              <p>Single Player : {game.singlePlayer}</p>
              <p>Multi Player : {game.multiplayer}</p>
            </div>
          </div>
        )
      )}
    </Container>
  );
}

export default GameDetails;
