import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Table, Button, Form } from "react-bootstrap";
import Loader from "../../components/Loader";
import { ThemeContext } from "../../context/ThemeContext";
import axios from "axios";

function UserTable() {
  const { users, setUsers, isLoading } = useContext(GlobalContext);
  const [darkTheme, setDarkTheme] = useContext(ThemeContext);
  const [indexofForm, setIndexofForm] = useState(0);
  const [statusForm, setStatusForm] = useState("create");
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleEdit = (e) => {
    let index = parseInt(e.target.value);
    console.log(users);
    let dataEdit = users.find((user) => user.id === index);
    console.log(dataEdit);
    // console.log(data.find((item) => item.id === index));
    // console.log(index);
    setInput({
      ...input,
      username: dataEdit.username,
      password: dataEdit.password,
    });
    setIndexofForm(index);
    setStatusForm("edit");
  };

  const handleChange = (event) => {
    let typeOfInput = event.target.name;
    switch (typeOfInput) {
      case "username": {
        setInput({ ...input, username: event.target.value });
        break;
      }
      case "password": {
        setInput({ ...input, password: event.target.value });
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
    let username = input.username;
    let password = input.password;

    if (
      username.replace(/\s/g, "") !== "" &&
      password.replace(/\s/g, "") !== ""
    ) {
      if (statusForm === "create") {
        axios
          .post(`https://backendexample.sanbersy.com/api/users`, {
            username: username,
            password: password,
          })
          .then((res) => {
            setUsers([
              ...users,
              {
                id: res.data.id,
                username: username,
                password: password,
              },
            ]);
            // console.log(foodData);
          });
      } else if (statusForm === "edit") {
        axios
          .put(`https://backendexample.sanbersy.com/api/users/${index}`, {
            username: username,
            password: password,
          })
          .then((res) => {
            let updatedData = users.find((user) => user.id === index);
            console.log(updatedData);
            updatedData.username = input.username;
            updatedData.password = input.password;
            setUsers([...users]);
          });
      }
    }

    setStatusForm("create");
    setIndexofForm(0);
    setInput({
      username: "",
      password: "",
    });
  };
  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
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
            <th>#</th>
            <th>Username</th>
            <th>Password</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : (
            users !== null &&
            users.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="info"
                      className="mr-2"
                      value={user.id}
                      onClick={handleEdit}
                    >
                      Edit
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
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username Anda"
            name="username"
            onChange={handleChange}
            value={input.username}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password Anda"
            value={input.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Data
        </Button>
      </Form>
    </>
  );
}

export default UserTable;
