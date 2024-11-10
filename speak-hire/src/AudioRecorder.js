import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = ({setTranscript}) => {
  const {
    finalTranscript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={()=>{SpeechRecognition.startListening({continuous:true})}}>Start</button>
      <button onClick={()=>{SpeechRecognition.stopListening()
        console.log(finalTranscript)
        setTranscript(finalTranscript)
      }}>Stop</button>
      {/* <button onClick={resetTranscript}>Reset</button> */}
      <p>{finalTranscript}</p>
    </div>
  );
};
export default Dictaphone;