import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateMovie = props => {
  const [movie, setMovie] = useState({
    id: "",
    title: "",
    director: "",
    metascor: "",
    stars: []
  });

  const movieId = props.match.params.id 

  const handleSubmit = e =
    axios.put(`http://localhost:5000/api/movies/${movieId}`)
    .then(res => )
 

  return <></>;
};

export default UpdateMovie;
