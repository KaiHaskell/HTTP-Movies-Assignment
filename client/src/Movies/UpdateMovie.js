import React, { useState } from "react";
import axios from "axios";

const UpdateMovie = props => {
  const [movie, setMovie] = useState({ id: props.match.params.id });

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
    console.log(movie);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const movieFormatter = {
      ...movie,
      stars: movie.stars.split(", ")
    };
    // make a PUT request to edit the movie
    axios
      .put(
        `http://localhost:5000/api/movies/${props.match.params.id}`,
        movieFormatter
      )
      .then(res => {
        console.log(res);
        document.querySelector("form").reset();
        props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="movie-card">
      <p>Edit the Movies</p>
      <form onSubmit={handleSubmit}>
        <input placeholder="Movie Name" name="title" onChange={handleChange} />
        <input placeholder="Director" name="director" onChange={handleChange} />
        <input
          placeholder="Metascore"
          name="metascore"
          onChange={handleChange}
        />
        <input placeholder="Stars" name="stars" onChange={handleChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const initialMovie = {
//   id: "",
//   title: "",
//   director: "",
//   metascore: "",
//   stars: []
// };

// // const UpdateMovie = props => {
// //   const [movie, setMovie] = useState(initialMovie);
// //   const { id } = useParams();

// //   console.log(props);

// //   useEffect(() => {
// //     const movieToUpdate = props.movie.find(thing => `${thing.id}` === id);

// //     if (movieToUpdate) {
// //       setMovie(movieToUpdate);
// //     }
// //   }, [props.movie, id]);

// //   const changeHandler = e => {
// //     e.preventDefault();
// //     setMovie({
// //       ...movie,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   const handleSubmit = e => {
// //     e.preventDefault();
// //     axios
// //       .put(`http://localhost:5000/api/movies/${id}`)
// //       .then(res => {
// //         props.setMovie(res.data);
// //         props.history.push(`/movies/${id}`);
// //       })
// //       .catch(err => {
// //         console.log("From UpdateMovie.js", err);
// //       });
// //   };

// //   const handleStar = index => e => {
// //     setMovie({
// //       ...movie,
// //       stars: movie.stars.map((star, starIndex) => {
// //         return starIndex === index ? e.target.value : star;
// //       })
// //     });
// //   };

// //   const addStar = e => {
// //     e.preventDefault();
// //     setMovie({ ...movie, stars: [movie.stars, ""] });
// //   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label for="exampleInputEmail1">Title</label>
//         <input
//           type="text"
//           className="form-control"
//           name="title"
//           placeholder="Title"
//           value={movie.title}
//           onChange={changeHandler}
//         />
//       </div>
//       <div className="form-group">
//         <label for="exampleInputEmail1">Director</label>
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Director"
//           name="director"
//           value={movie.director}
//           onChange={changeHandler}
//         />
//       </div>
//       <div className="form-group">
//         <label for="exampleInputEmail1">Metascore</label>
//         <input
//           type="text"
//           className="form-control"
//           name="metascore"
//           placeholder="Metascore"
//           value={movie.metascore}
//           onChange={changeHandler}
//         />
//       </div>
//       <div className="form-group">
//         <label for="exampleInputEmail1">Stars</label>
//         {movie.stars.map((starName, index) => {
//           return (
//             <input
//               type="text"
//               className="form-control"
//               name="stars"
//               placeholder="Stars"
//               value={starName}
//               onChange={handleStar(index)}
//             />
//           );
//         })}
//       </div>
//       <button onClick={addStar}>Add Star</button>
//       <button type="submit" className="btn btn-primary">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default UpdateMovie;
