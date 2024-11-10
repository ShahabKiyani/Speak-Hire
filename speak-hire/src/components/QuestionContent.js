import React from "react";


const QuestionContent = ({ QuestionContentGetter }) => {
 return <p>{QuestionContentGetter()}</p>;
};


export default QuestionContent;



