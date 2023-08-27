const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
const url = process.env.MONGO_URL;

app.use(express.json()); 
app.use(express.urlencoded());
app.use(cors({ origin: "https://moviereview-site.vercel.app" }));
app.use(express.json());
const ReviewModel = require("./model/ReviewModel.js");
const MoviesModel = require("./model/MoviesModel.js");

app.get("/movies", async (req, res) => {
  try {
    const movie = await MoviesModel.find({});
    res.status(500).json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
app.get("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await MoviesModel.find({ imdbId: id });

    if (movie.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const posterUrl = movie[0].poster;
    res.status(200).json({ posterUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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

app.get("/reviews/:ibd", async (req, res) => {
  try {
    const { ibd } = req.params;
    const review = await ReviewModel.find({ iid: ibd });
    res.send(review);
    // console.log(review.revtext);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/reviews", async (req, res) => {
  try {
    const newReview = await ReviewModel.create(req.body);
    res.send("Review added successfully!");
    // console.log(newReview);
  } catch (error) {
    res.status(422).json({ error: "Invalid Request" });
  }
});

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
