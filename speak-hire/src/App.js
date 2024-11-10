import React, { useState } from 'react';
import axios from 'axios';
import Dictaphone from './components/AudioRecorder';

function App() {
  const [responseMessage, setResponseMessage] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [count, setCount] = useState(0);

  // Button click handler to increment count and send a new request
  const handleClick = async () =>  {
    // Increment the count
    setCount(prevCount => prevCount + 1);
    if (count >= 4){ setCount(0)};

    // Send a POST request to fetch a new question
    const index = { index: count };  // Send the updated `count` as the index
    try {
      const response = await axios.post('/get_question', index);
      setCurrentQuestion(response.data.data);  // Update the question based on response
      console.log(response.data.data);  // Log the response for debugging
    } catch (error) {
      setCurrentQuestion('Error fetching question');
      console.error('Error:', error);
    }

    // Optionally, send the transcript to Flask if needed
    const transcript = { transcript: "My string transcript" };
    try {
      const transcriptResponse = await axios.post('/proccess_audio', transcript);
      setResponseMessage(transcriptResponse.data.message);  // Update message based on response
      console.log(transcriptResponse.data.message);  // Log the transcript response
    } catch (error) {
      setResponseMessage('Error submitting data');
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Sending Hardcoded Data to Flask</h1>
      <div>
        <h3>{currentQuestion || "Loading question..."}</h3>
        <button onClick={handleClick}>Click Me!</button>
        <p>You clicked the button {count} times.</p>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    </div>
  );
}

export default App;
