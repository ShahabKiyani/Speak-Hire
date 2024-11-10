import React from "react";


const QuestionNumber = ({ questionNumberGetter }) => {
 return <h2>{"Question Number " + questionNumberGetter()}</h2>;
};


export default QuestionNumber;



