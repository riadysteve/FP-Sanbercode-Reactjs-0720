import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [movies, setMovies] = useState(null);
  const [games, setGames] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      const result = await axios.get(
        `https://backendexample.sanbersy.com/api/movies`
      );
      setMovies(result.data);
      setIsLoading(false);
      console.log(result.data);
    };
    if (movies === null) {
      fetchMovieData();
    }
  }, [movies]);

  useEffect(() => {
    const fetchGamesData = async () => {
      setIsLoading(true);
      const result = await axios.get(
        `https://backendexample.sanbersy.com/api/games`
      );
      setGames(result.data);
      setIsLoading(false);
      console.log(result.data);
    };
    if (games === null) {
      fetchGamesData();
    }
  }, [games]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        isLoading,
        games,
        setGames,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
