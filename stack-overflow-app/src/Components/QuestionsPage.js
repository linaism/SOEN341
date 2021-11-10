import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react';
import Axios from 'axios';

// Leaving the existing implementation here for now to avoid big merge conflicts. 
// This page should be renamed "QuestionsPage" or "CurrentQuestions" and contain the list of questions 
// submitted by any user. 

const QuestionsPage = () => {

  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5001/questions-get").then((response) => {
        setQuestionList(response.data);
    });
  });

  return (
    <div>
      {questionList.map((question) => {
          return (
            <div key={question.id}>
              <p>Title: {question.title}</p>
              <p>Content: {question.content}</p>
              <Link to={{
                pathname: `/view-question/${question.id}`,
                state: { question: question }
              }}>
                  <Button>
                      <p>View Question</p>
                  </Button>
              </Link>
            </div>
          );
        })}
    </div>
  )
}

export default QuestionsPage
