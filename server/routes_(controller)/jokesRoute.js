import express from "express";
//util js file
import util from "../utils/util.js";
//middleware
import { validateJoke } from "../middleware/validator.js";
//db
import Joke from "../db_(model)/mongoDB/joke.js";
const router = express.Router();
router.get("/", validateJoke, async (req, res) => {
  try {
    const jokes = await Joke.find();
    res.json(jokes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", validateJoke, getJoke, (req, res) => {
  res.json(res.joke);
});

async function getJoke(req, res, next) {
  let joke;
  try {
    joke = await Joke.findById(req.params.id);
    if (joke == null) {
      return res.status(404).json({ message: "Joke not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.joke = joke;
  next();
}

router.post("/", validateJoke, async (req, res) => {
  const joke = new Joke({
    setup: req.body.setup,
    punchline: req.body.punchline,
    createdBy: req.body.createdBy,
  });
  try {
    const newJoke = await joke.save();
    res.status(201).json(newJoke);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", validateJoke, getJoke, async (req, res) => {
  if (req.body.setup != null) {
    res.joke.setup = req.body.setup;
  }
  if (req.body.punchline != null) {
    res.joke.punchline = req.body.punchline;
  }

  try {
    const updatedJoke = await res.joke.save();
    res.json(updatedJoke);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", validateJoke, getJoke, async (req, res) => {
  try {
    await res.joke.remove();
    res.json({ message: "Deleted Joke" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/byUser", async (req, res) => {
  try {
    const userId = req.query.userId;
    const jokes = userId
      ? await Joke.find({ createdBy: userId }).populate(
          "createdBy",
          "username email"
        )
      : await Joke.find().populate("createdBy", "username email");

    res.json(jokes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching jokes" });
  }
});

export default router;
