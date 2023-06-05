import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewform/ReviewForm";
import React from "react";
const Reviews = () => {
  const revText = useRef();
  const params = useParams();
  const movieId = params.movieId;
  const [movie, setMovie] = useState([]);
  const [review, setReview] = useState([]);
  useEffect(() => {
    fetchMovieData(movieId);
    // console.log(review);
  }, []);
  const fetchMovieData = async (movieId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/movies/${movieId}`
      );
      const json = await response.json();
      setMovie(json);
      console.log(json.title);

      const reviews = json.reviewIds;
      const reviewBodies = reviews.map((review) => ({ value: review.body }));
      console.log(reviewBodies);
      setReview(reviewBodies);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;

    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewBody: rev.value,
          imdbId: movieId,
        }),
      };

      const response = await fetch(
        "http://localhost:8080/api/v1/reviews",
        requestOptions
      );
      const data = await response.json();

      const updatedReviews = [...review, { value: rev.value }]; // Update the property name to "value"

      rev.value = "";

      setReview(updatedReviews);
    } catch (err) {
      console.error(err);
    }
    console.log(review);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          <>
            <Row>
              <Col>
                <ReviewForm
                  handleSubmit={addReview}
                  revText={revText}
                  labelText="Write a Review?"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
              </Col>
            </Row>
          </>
          {review.map((r, index) => (
            <React.Fragment key={index}>
              <Row>
                <Col>{r.value}</Col> {/* Access the value property */}
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </React.Fragment>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
