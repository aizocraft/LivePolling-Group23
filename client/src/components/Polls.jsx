import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../utils/socket";

const Polls = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    // Fetch polls from the server
    axios.get(`${import.meta.env.VITE_SERVER_URL}/polls`)
      .then((res) => setPolls(res.data))
      .catch((err) => console.error("Error fetching polls:", err));

    // Listen for new polls
    socket.on("newPoll", (poll) => {
      setPolls((prev) => [poll, ...prev]); // Add new poll at the top
    });

    // Listen for vote updates
    socket.on("voteUpdate", ({ pollId, options }) => {
      setPolls((prev) =>
        prev.map((poll) =>
          poll._id === pollId ? { ...poll, options } : poll
        )
      );
    });

    // Cleanup event listeners on unmount
    return () => {
      socket.off("newPoll");
      socket.off("voteUpdate");
    };
  }, []);

  const vote = (pollId, optionIndex) => {
    axios.post(`${import.meta.env.VITE_SERVER_URL}/polls/vote/${pollId}/${optionIndex}`)
      .catch((err) => console.error("Error voting:", err));
  };

  return (
    <div className="container">
      <h2>Live Polls</h2>
      {polls.length === 0 ? <p>No polls yet...</p> : null}
      {polls.map((poll) => (
        <div key={poll._id} className="poll">
          <h3>{poll.question}</h3>
          {poll.options.map((option, index) => (
            <button key={index} onClick={() => vote(poll._id, index)}>
              {option.text} ({option.votes} votes)
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Polls;
