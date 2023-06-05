import React, { useEffect, useState } from "react";
// const [movie, setMovie] = useState([]);
// const [reviews, setReviews] = useState([]);
// useEffect(() => {
//   fetchMovieData();
// }, []);
// const fetchMovieData = async (movieId) => {
//   try {
//     const response = await fetch(
//       `http://localhost:8080/api/v1/movies/${movieId}`
//     );
//     const json = await response.json();
//     setMovie(json);
//     console.log("movie", movie);

//     if (json && json.reviewIds) {
//       const reviewBodies = json.reviewIds.map((review) => review.body);
//       setReviews(reviewBodies);
//       console.log("Reviews", reviews);
//     } else {
//       setReviews([]);
//     }
//   } catch (error) {
//     console.log("Error fetching data:", error);
//   }
// };
const Newc = () => {
  return (
    <>
      <h2>hllo</h2>
    </>
  );
};

export default Newc;
