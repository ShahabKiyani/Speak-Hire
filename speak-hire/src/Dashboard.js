import React, { useState } from "react";
import axios from "axios";
import "./styles/Dashboard.css"; // Import the CSS file


import Dictaphone from "./AudioRecorder";
import QuestionNumber from "./components/QuestionNumber";
import QuestionContent from "./components/QuestionContent";


const Dashboard = () => {
 const [transcript, setTranscript] = useState("");
 const [responseMessage, setResponseMessage] = useState("");
 const [counter, setCounter] = useState(0);
 const [currentQuestion, setCurrentQuestion] = useState("");



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


 const increment = () => {
    if (counter+1 > 4){
      setCounter(0)
    }
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
     setResponseMessage(transcriptResponse.data.message);
     console.log(transcriptResponse.data.message);
   } catch (error) {
     setResponseMessage("Error submitting data");
     console.error("Error:", error);
   }
 };


 const refresh = () => {
   getQuestion(counter);
   increment();
  //  sendTranscript(transcript);
 };

 const submit =()=>{
  sendTranscript(transcript)
 }


 return (
   <div className="dashboard-container">
     <QuestionNumber
       questionNumberGetter={() => counter}
       className="question-number"
     />
     <QuestionContent
       QuestionContentGetter={() => {
         if (counter === 0) {
           return "Please check to make sure your mic works before continuing with the interview";
         }
         return currentQuestion;
       }}
       className="question-content"
     />
     <Dictaphone setTranscript={setTranscript} />
     <button
       className="dashboard-button"
       onClick={() => {
        if (counter === 4){
          submit();
        }
        else{
          refresh();
        }
       }}
     >
       Next
     </button>
   </div>
 );
};


export default Dashboard;












