import React, { useState, useContext } from "react";
import { Container, Form, Button, Breadcrumb } from "react-bootstrap";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";
import Footer from "../components/Footer";
import BreadNav from "../components/BreadNav";
import { Link } from "react-router-dom";

function CreateMovie() {
  const { movies, setMovies } = useContext(GlobalContext);
  const [input, setInput] = useState({
    title: "",
    description: "",
    year: 0,
    duration: 0,
    genre: "",
    review: "",
    rating: 0,
    image_url: "",
  });
  const handleChange = (event) => {
    let typeOfInput = event.target.name;
    switch (typeOfInput) {
      case "title": {
        setInput({ ...input, title: event.target.value });
        break;
      }
      case "description": {
        setInput({ ...input, description: event.target.value });
        break;
      }
      case "year": {
        setInput({ ...input, year: event.target.value });
        break;
      }
      case "duration": {
        setInput({ ...input, duration: event.target.value });
        break;
      }
      case "genre": {
        setInput({ ...input, genre: event.target.value });
        break;
      }
      case "rating": {
        setInput({ ...input, rating: event.target.value });
        break;
      }
      case "review": {
        setInput({ ...input, review: event.target.value });
        break;
      }
      case "image_url": {
        setInput({ ...input, image_url: event.target.value });
        break;
      }

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // let index = indexofForm;
    // console.log(index);
    let title = input.title;
    let description = input.description;
    let year = parseInt(input.year);
    let duration = parseInt(input.duration);
    let genre = input.genre;
    let review = input.review;
    let rating = parseInt(input.rating);
    let image_url = input.image_url;

    if (
      title.replace(/\s/g, "") !== "" &&
      description.replace(/\s/g, "") !== ""
    ) {
      axios
        .post(`https://backendexample.sanbersy.com/api/movies`, {
          title: title,
          description: description,
          year: year,
          duration: duration,
          genre: genre,
          review: review,
          rating: rating,
          image_url: image_url,
        })
        .then((res) => {
          alert("Done");
          console.log(res);
          setMovies([
            ...movies,
            {
              id: res.data.id,
              title: title,
              description: description,
              year: year,
              duration: duration,
              genre: genre,
              review: review,
              rating: rating,
              image_url: image_url,
            },
          ]);
        });
    }

    setInput({
      title: "",
      description: "",
      year: 0,
      duration: 0,
      genre: "",
      review: "",
      rating: 0,
      image_url: "",
    });
  };
  return (
    <>
      <Container>
        <BreadNav>
          <Link to="/admin" className="breadcrumb-item">
            Home
          </Link>
          <Breadcrumb.Item active>Tambah Data</Breadcrumb.Item>
        </BreadNav>
        <h2 className="mt-5 border-top pt-5 mb-4">Tambah Data</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Masukkan Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={input.title}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Masukkan Tahun Film</Form.Label>
            <Form.Control
              type="text"
              name="year"
              placeholder="Tahun Rilis Film"
              value={input.year}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Masukkan Durasi Film</Form.Label>
            <Form.Control
              type="text"
              name="duration"
              placeholder="Durasi Film"
              value={input.duration}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Masukkan Genre Film</Form.Label>
            <Form.Control
              type="text"
              name="genre"
              placeholder="Genre Film"
              value={input.genre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Masukkan Rating Film</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              min="0"
              max="10"
              placeholder="Rating Film"
              value={input.rating}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Masukkan Deskripsi Film</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="description"
              placeholder="Deskripsi Film"
              value={input.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Masukkan Review Film</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="review"
              placeholder="Review Film"
              value={input.review}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Masukkan Url Poster</Form.Label>
            <Form.Control
              type="text"
              name="image_url"
              placeholder="URL Poster Film"
              value={input.image_url}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Data
          </Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
}

export default CreateMovie;
