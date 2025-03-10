import { useState } from "react";
import axios from "axios";
import socket from "../utils/socket";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const createPoll = async () => {
    if (!question.trim() || options.some((opt) => !opt.trim())) {
      alert("Please enter a question and at least two valid options.");
      return;
    }

    const newPoll = { question, options: options.map((text) => text) };
    setLoading(true);

    try {
      console.log("🔹 Creating poll with data:", newPoll);
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/polls/create`, newPoll);
      
      console.log("✅ Poll created successfully:", response.data);
      socket.emit("newPoll", response.data);
      
      setQuestion("");
      setOptions(["", ""]);
      alert("Poll created successfully!");
    } catch (error) {
      console.error("❌ Error creating poll:", error);
      alert("Failed to create poll. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Create a Poll</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Poll Question"
        className="input-field"
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          placeholder={`Option ${index + 1}`}
          className="input-field"
        />
      ))}
      <button onClick={addOption} className="add-option-btn">Add Option</button>
      <button onClick={createPoll} disabled={loading}>
        {loading ? "Creating..." : "Create Poll"}
      </button>
    </div>
  );
};

export default CreatePoll;
