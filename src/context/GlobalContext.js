import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [movies, setMovies] = useState(null);
  const [games, setGames] = useState(null);
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      const result = await axios.get(
        `https://backendexample.sanbersy.com/api/movies`
      );
      setMovies(result.data);
      setIsLoading(false);
      // console.log(result.data);
    };
    if (movies === null) {
      fetchMovieData();
    }
  }, [movies]);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const result = await axios.get(
        `https://backendexample.sanbersy.com/api/users`
      );
      setUsers(result.data);
      setIsLoading(false);
    };
    if (users === null) {
      fetchUserData();
    }
  }, [users]);

  useEffect(() => {
    const fetchGamesData = async () => {
      setIsLoading(true);
      const result = await axios.get(
        `https://backendexample.sanbersy.com/api/games`
      );
      setGames(result.data);
      setIsLoading(false);
      // console.log(result.data);
    };
    if (games === null) {
      fetchGamesData();
    }
  }, [games]);

  return (
    <GlobalContext.Provider
      value={{
        movies,
        setMovies,
        isLoading,
        games,
        setGames,
        users,
        isLoggedIn,
        setUsers,
        setIsLoading,
        setIsLoggedIn,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
