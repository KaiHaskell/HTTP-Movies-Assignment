import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateMovie = props => {
  const [movie, setMovie] = useState({
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  const movieId = props.match.params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${movieId}`)
      .then(res => {
        setMovie(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const changeHandler = e => {
    e.preventDefault();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const submitChanges = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        setMovie(res.data);
        setTimeout(() => {
          props.history.push(`/movies/${movie.id}`);
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleStar = index => e => {
    setMovie({
      ...movie,
      stars: movie.stars.map((star, starIndex) => {
        return starIndex === index ? e.target.value : star;
      })
    });
  };

  const addStar = e => {
    e.preventDefault();
    setMovie({ ...movie, stars: [movie.stars, ""] });
  };

  return (
    <form onSubmit={submitChanges}>
      <div className="form-group">
        <label for="exampleInputEmail1">Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          placeholder="Title"
          value={movie.title}
          onChange={changeHandler}
        />
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1">Director</label>
        <input
          type="text"
          className="form-control"
          placeholder="Director"
          name="director"
          value={movie.director}
          onChange={changeHandler}
        />
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1">Metascore</label>
        <input
          type="text"
          className="form-control"
          name="metascore"
          placeholder="Metascore"
          value={movie.metascore}
          onChange={changeHandler}
        />
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1">Stars</label>
        {movie.stars.map((starName, index) => {
          return (
            <input
              type="text"
              className="form-control"
              name="stars"
              placeholder="Stars"
              value={starName}
              onChange={handleStar(index)}
            />
          );
        })}
      </div>
      <button onClick={addStar}>Add Star</button>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default UpdateMovie;
