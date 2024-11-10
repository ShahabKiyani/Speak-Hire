import React, { useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css"; // Import the CSS file


import Dictaphone from "../components/AudioRecorder";
import QuestionNumber from "../components/QuestionNumber";
import QuestionContent from "../components/QuestionContent";


const Dashboard = () => {
 const [transcript, setTranscript] = useState("");
 const [responseMessage, setResponseMessage] = useState("");
 const [counter, setCounter] = useState(1);
 const [showInterviewElement, setShowInterviewElement] = useState(true)
 const [showInterviewButton, setShowInterviewButton] = useState(true)
 const [showNextButton, setShowNextButton] = useState(true)
 
 const getQuestion = async (index) => {
  try {
   const indexDict = {index:index} 

    const response = await axios.post("/get_question", indexDict);
    setCurrentQuestion(response.data.data);
    console.log(response.data.data);
  } catch (error) {
    setCurrentQuestion("Error fetching question");
    console.error("Error:", error);
  }
};

 const [currentQuestion, setCurrentQuestion] = useState("");

 const increment = () => {
    if (counter+1 ===5){
      setCounter(counter + 1);
      setShowInterviewButton(false)
      setShowNextButton(false)
    }
    // if (counter+1 > 5){
    //   setCounter(1)
    // }
    else{
      setCounter(counter + 1);


    }
 };


 const sendTranscript = async (transcript) => {
   try {
     const transcriptDict = { transcript: transcript };
     const transcriptResponse = await axios.post(
       "/proccess_audio",
       transcriptDict
     );
     setResponseMessage(transcriptResponse.data.data); //gives back transcript string
     console.log(transcriptResponse.data.message);
   } catch (error) {
     setResponseMessage("Error submitting data");
     console.error("Error:", error);
   }
 };

 const  showResult = ()=>{

 }

 const refresh = () => {
   getQuestion(counter-1);
   increment();
  //  sendTranscript(transcript);
 };


 const submit =()=>{
  sendTranscript(transcript)
  setShowInterviewElement(false)
  setShowInterviewButton(true)
 }


 return (
   <div className="dashboard-container">
    <h1 className="speakhire-title">SpeakHire</h1>
     {showInterviewElement && <QuestionNumber
       questionNumberGetter={() => counter}
       className="question-number"
     />}
     {showInterviewElement && <QuestionContent
       QuestionContentGetter={() => {
        //  if (counter === 0) {
        //    return "Please check to make sure your mic works before continuing with the interview";
        //  }
        getQuestion(counter-1)
         return currentQuestion;
       }}
       className="question-content"
     />}
     {showInterviewElement && < Dictaphone setTranscript={setTranscript} />}
     {showNextButton && <button
       className="dashboard-button"
       onClick={() => {
          refresh();
       }}
     >
       Next
     </button>}
    {!showInterviewButton && <button className="dashboard-button" onClick={submit}>Submit</button>}
    {!showInterviewElement && <p className="border-margin">{responseMessage}</p>}
   </div>
 );
};


export default Dashboard;












