import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react';
import Axios from 'axios';

const QuestionsPage = () => {

  const [questionList, setQuestionList] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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

  const search = () => {
    Axios.get("http://localhost:5001/search", {
      params: {
          searchStr: searchValue,
      }
    }).then((response) => {
      console.log(response);
      setSearchResults(response.data);
      setSearchTriggered(true);
    }); 
  }


  return (
    <div>
      <div style={{padding:'50px', paddingBottom:'0px'}}>
        <input style={{width:'300px'}} type="text" placeholder="Keyword, [Tag], &quot;isAccepted&quot;" onChange={event => {setSearchValue(event.target.value)}}></input>
        <button style={{marginLeft: 15}} onClick={search}>Enter</button>
      </div>
      {searchTriggered && searchResults.map((question) => {
          return (
            <div key={question.question_id}>
              <h1 style={{fontFamily:'Teko',fontSize:'30px', paddingTop:'40px', paddingLeft:'40px'}}>Question</h1>
              <div>
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
      {!searchTriggered && questionList.map((question) => {
          return (
            <div key={question.question_id}>
              <h1 style={{fontFamily:'Teko',fontSize:'30px', paddingTop:'40px', paddingLeft:'40px'}}>Question</h1>
              <div>
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