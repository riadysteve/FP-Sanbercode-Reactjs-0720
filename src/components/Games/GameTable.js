import React, { useContext, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { ThemeContext } from "../../context/ThemeContext";
import Loader from "../../components/Loader";
import axios from "axios";
import { MovieContext } from "../../context/MovieContext";

function GameTable() {
  const { games, setGames, isLoading } = useContext(MovieContext);
  const [darkTheme, setDarkTheme] = useContext(ThemeContext);
  const [indexofForm, setIndexofForm] = useState(0);
  const [statusForm, setStatusForm] = useState("create");
  const [input, setInput] = useState({
    name: "",
    genre: "",
    release: 0,
    platform: "",
    singlePlayer: 0,
    multiplayer: 0,
  });

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleDelete = (e) => {
    let ID_GAMES = parseInt(e.target.value);
    let updatedData = games.filter((game) => game.id !== ID_GAMES);

    axios
      .delete(`https://backendexample.sanbersy.com/api/games/${ID_GAMES}`)
      .then((res) => {
        console.log(res.data);
      });

    setGames([...updatedData]);
  };

  const handleEdit = (e) => {
    let index = parseInt(e.target.value);
    console.log(games);
    let dataEdit = games.find((game) => game.id === index);
    console.log(dataEdit);
    // console.log(data.find((item) => item.id === index));
    // console.log(index);
    setInput({
      ...input,
      name: dataEdit.name,
      genre: dataEdit.genre,
      release: dataEdit.release,
      platform: dataEdit.platform,
      singlePlayer: dataEdit.singlePlayer,
      multiplayer: dataEdit.multiplayer,
    });
    setIndexofForm(index);
    setStatusForm("edit");
  };

  const handleChange = (event) => {
    let typeOfInput = event.target.name;
    switch (typeOfInput) {
      case "name": {
        setInput({ ...input, name: event.target.value });
        break;
      }
      case "genre": {
        setInput({ ...input, genre: event.target.value });
        break;
      }
      case "release": {
        setInput({ ...input, release: event.target.value });
        break;
      }
      case "platform": {
        setInput({ ...input, platform: event.target.value });
        break;
      }
      case "singlePlayer": {
        setInput({ ...input, singlePlayer: event.target.value });
        break;
      }
      case "multiplayer": {
        setInput({ ...input, multiplayer: event.target.value });
        break;
      }

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let index = indexofForm;
    // console.log(index);
    let name = input.name;
    let genre = input.genre;
    let release = parseInt(input.release);
    let platform = input.platform;
    let singlePlayer = parseInt(input.singlePlayer);
    let multiplayer = parseInt(input.multiplayer);

    if (name.replace(/\s/g, "") !== "" && genre.replace(/\s/g, "") !== "") {
      if (statusForm === "create") {
        axios
          .post(`https://backendexample.sanbersy.com/api/games`, {
            name: name,
            genre: genre,
            release: release,
            platform: platform,
            singlePlayer: singlePlayer,
            multiplayer: multiplayer,
          })
          .then((res) => {
            setGames([
              ...games,
              {
                id: res.data.id,
                name: name,
                genre: genre,
                release: release,
                platform: platform,
                singlePlayer: singlePlayer,
                multiplayer: multiplayer,
              },
            ]);
            // console.log(foodData);
          });
      } else if (statusForm === "edit") {
        axios
          .put(`https://backendexample.sanbersy.com/api/games/${index}`, {
            name: name,
            genre: genre,
            release: release,
            platform: platform,
            singlePlayer: singlePlayer,
            multiplayer: multiplayer,
          })
          .then((res) => {
            let updatedData = games.find((game) => game.id === index);
            console.log(updatedData);
            updatedData.name = input.name;
            updatedData.genre = input.genre;
            updatedData.release = parseInt(input.release);
            updatedData.platform = input.platform;
            updatedData.singlePlayer = parseInt(input.singlePlayer);
            updatedData.multiplayer = parseInt(input.multiplayer);
            setGames([...games]);
          });
      }
    }

    setStatusForm("create");
    setIndexofForm(0);
    setInput({
      name: "",
      genre: "",
      release: 0,
      platform: "",
      singlePlayer: 0,
      multiplayer: 0,
    });
  };

  return (
    <>
      <div className="mt-5 d-flex justify-content-end">
        <Button
          onClick={handleChangeTheme}
          variant={darkTheme ? "dark" : "light"}
          style={{ border: "1px solid #333" }}
        >
          {darkTheme ? "Change to Light Theme" : "Change to Dark Theme"}
        </Button>
      </div>

      <Table
        striped
        bordered
        hover
        variant={darkTheme ? "dark" : ""}
        className="mt-3"
      >
        <thead>
          <tr>
            <th>Nama Game</th>
            <th>Genre</th>
            <th>Tahun Rilis</th>
            <th>Platform</th>
            <th>SinglePlayer</th>
            <th>MultiPlayer</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : (
            games !== null &&
            games.map((game) => {
              return (
                <tr key={game.id}>
                  <td>{game.name}</td>
                  <td>{game.genre === null ? "-" : game.genre}</td>
                  <td>{game.release === null ? "-" : game.release}</td>
                  <td>{game.platform === null ? "-" : game.platform}</td>
                  <td>
                    {game.singlePlayer === null ? "-" : game.singlePlayer}
                  </td>
                  <td>{game.multiplayer === null ? "-" : game.multiplayer}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="info"
                      className="mr-2"
                      value={game.id}
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      className="del"
                      value={game.id}
                      onClick={handleDelete}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>

      <h2 className="mt-5 border-top pt-5 mb-4">Tambah Data</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Masukkan Nama Game</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nama Game"
            name="name"
            onChange={handleChange}
            value={input.name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Masukkan Genre Game</Form.Label>
          <Form.Control
            type="text"
            placeholder="Genre Game"
            name="genre"
            onChange={handleChange}
            value={input.genre}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Masukkan Tahun Rilis Game</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tahun Rilis Game"
            name="release"
            onChange={handleChange}
            value={input.release}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Platform</Form.Label>
          <Form.Control
            type="text"
            placeholder="Platform Game"
            name="platform"
            onChange={handleChange}
            value={input.platform}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Single Player</Form.Label>
          <Form.Control
            type="number"
            placeholder="Single Player"
            name="singlePlayer"
            onChange={handleChange}
            value={input.singlePlayer}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Multi Player</Form.Label>
          <Form.Control
            type="number"
            placeholder="Multi Player"
            name="multiplayer"
            onChange={handleChange}
            value={input.multiplayer}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Data
        </Button>
      </Form>
    </>
  );
}

export default GameTable;
