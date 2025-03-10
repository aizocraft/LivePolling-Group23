const express = require("express");
const router = express.Router();
const Poll = require("../models/Poll");

// Create a new poll
router.post("/create", async (req, res) => {
  try {
    const { question, options } = req.body;
    if (!question || !options || options.length < 2) {
      return res.status(400).json({ error: "Provide a question and at least two options." });
    }

    const formattedOptions = options.map(option => ({ text: option, votes: 0 }));
    const newPoll = new Poll({ question, options: formattedOptions });

    await newPoll.save();

    // Emit event to all connected clients
    const io = req.app.get("socketio");
    io.emit("newPoll", newPoll);

    res.status(201).json(newPoll);
  } catch (error) {
    console.error("❌ Error creating poll:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all polls
router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.json(polls);
  } catch (error) {
    console.error("❌ Error fetching polls:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Vote on a poll
router.post("/vote/:pollId/:optionIndex", async (req, res) => {
  try {
    const { pollId, optionIndex } = req.params;
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ error: "Invalid option index" });
    }

    poll.options[optionIndex].votes += 1;
    await poll.save();

    // Emit vote update to all clients
    const io = req.app.get("socketio");
    io.emit("voteUpdate", { pollId, options: poll.options });

    res.json(poll);
  } catch (error) {
    console.error("❌ Error voting:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
