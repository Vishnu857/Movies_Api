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
  const [url,setUrl]=useState("")
  useEffect(() => {
    fetchMovieData(movieId);
  }, []);
  const fetchMovieData = async (movieId) => {
    try {
      const img=await fetch(`http://localhost:5000/movies/${movieId}`)
      const imjs=await img.json()
      setUrl(imjs.posterUrl);
      const response = await fetch(`http://localhost:5000/reviews/${movieId}`);
      const json = await response.json();
      setMovie(json);
      const reviewBodies = json.map((review) => (review.revtext));
      
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
          revtext: rev.value,
          iid: movieId,
        }),
      };

      const response = await fetch(
        "http://localhost:5000/reviews",
        requestOptions
      );
      
      const updatedReviews = [...review, rev.value];
      setReview(updatedReviews);
      rev.value = "";
    } catch (err) {
      console.error(err);
    }
    // console.log(review);
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
          <img src={url} alt="" />
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
                <Col>{r}</Col> {/* Access the value property */}
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
