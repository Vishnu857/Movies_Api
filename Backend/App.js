const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
const ReviewModel = require("./model/ReviewModel.js");
const MoviesModel = require("./model/MoviesModel.js");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/movies", async (req, res) => {
  try {
    const movie = await MoviesModel.find({});
    res.status(500).json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/movies/add", async (req, res) => {
  try {
    const movie = await MoviesModel.create(req.body);
    res.status(200).json(movie);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/v1/movies/:imdbId", async (req, res) => {
  try {
    const { imdbId } = req.params;
    const movie = await MoviesModel.findOne({ imdbId: imdbId });

    if (!movie) {
      // If no movie is found with the given IMDb ID, send a 404 Not Found response.
      return res.status(404).json({ message: "Movie not found" });
    }

    const rev = movie.reviewIds;
    const review = await ReviewModel.findOne({ _id: rev }); // Use _id instead of id
    // res.send(review.body);
    res.send(rev);
    console.log(JSON.stringify(rev));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const review = await ReviewModel.findOne({ _id: id });

    if (!review) {
      // If no review is found with the given ID, send a 404 Not Found response.
      return res.status(404).json({ message: "Review not found" });
    }

    res.send(review.body);
    console.log(review.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/v1/reviews", async (req, res) => {
  try {
    let newReview = await ReviewModel.create(req.body);
    res.send("form submitted");
    console.log(newReview);
  } catch (error) {
    res.status(422).json({ error: "Invalid Request" });
  }
});
app.get("/api/v1/reviews", async (req, res) => {
  try {
    let newReview = await ReviewModel.find({});
    res.send(newReview);
  } catch (error) {
    res.status(422).json({ error: "Invalid Request" });
  }
});

mongoose
  .connect(
    "mongodb+srv://vishnu:VueU5Brp66byGA@cluster0.xar7ngm.mongodb.net/MovieApi?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongodb");
    app.listen(5000, () => {
      console.log("server started");
    });
  });
