import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react';
import Axios from 'axios';

const QuestionsPage = () => {

  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    getQuestions();
    return () => {
      setQuestionList([]); 
    };
  }, []);

  const getQuestions = () => {
    Axios.get("http://localhost:5001/questions-get").then((response) => {
      setQuestionList(response.data);
    });
  };

  return (
    <div>
      {questionList.map((question) => {
          return (
            <div key={question.question_id}>
              <h1 style={{fontFamily:'Teko',fontSize:'30px', paddingTop:'40px', paddingLeft:'40px'}}>Question</h1>
              <div >
              <p style={{fontSize:'15px', fontFamily:'sans-serif', paddingLeft:'60px'}}>Title: {question.title}</p>
              <Link  style={{textDecoration:'none'}} to={{
                pathname: `/view-question/${question.question_id}`,
                state: { question: question }
              }}>
                <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center',  paddingLeft:'60px'}}>
                  <Button>
                    <h3 style={{fontSize:'15px', fontFamily:'sans-serif', paddingTop:'5px'}}>View Question</h3>
                  </Button>
                </div>
              </Link>
            </div>
            </div>
          );
        })}
    </div>
  )
}

export default QuestionsPage