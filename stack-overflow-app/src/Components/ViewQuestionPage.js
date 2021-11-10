import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Axios from 'axios';

const ViewQuestionPage = () => {
    const { state } = useLocation();

    const [answer, setAnswer] = useState('');

    const [answerList, setAnswerList] = useState([]);

    const [bestAnswer, setBest] = useState([]);

    const addAnswer = () => {
        Axios.post("http://localhost:5001/ans", {
          answer: answer,
        }).then(() => {
          setAnswerList([
            ...answerList,
            {
                answer: answer,
            },
          ]);
        });
      };

      const best = () =>{ 
          setBest([
        ...bestAnswer,
        {
            answer: answer,
        } 
        ])
      };

      const [counter, setCounter] = useState(0);
      const incrementCounter = () => setCounter(counter + 1);

    return (
        <div>
            <h1 style={{fontFamily:'Teko',fontSize:'30px', paddingTop:'40px', paddingLeft:'40px'}}>View Question</h1>
            <div>
                <h3 style={{fontSize:'15px', fontFamily:'sans-serif', paddingTop:'10px', paddingLeft:'60px'}}> Title: {state.question.title} </h3>
                <h3 style={{fontSize:'15px', fontFamily:'sans-serif', paddingTop:'10px', paddingLeft:'60px'}}> Content: {state.question.content} </h3>
            </div>

            <div className="App">
                {bestAnswer.map((value) => {
                    return (
                    <div className="answer">
                        <div style={{fontSize:'10px', fontFamily:'sans-serif', paddingTop:'40px', paddingLeft:'40px'}}>
                            <h1 style={{fontFamily:'Teko',fontSize:'30px'}}>Best Answer</h1>
                            <h3 style={{fontSize:'15px', paddingLeft:'20px'}}> Answer: {value.answer}</h3>
                        </div>
                    </div>
                    );}
                )}
                <div className="answers">
                <h1 style={{fontFamily:'Teko',fontSize:'30px', paddingTop:'40px', paddingLeft:'40px'}}>Answers</h1>
                    {answerList.map((val) => {
                        return (
                        <div className="answer">
                            <div style={{fontSize:'10px', fontFamily:'sans-serif', paddingTop:'10px', paddingLeft:'60px'}}>
                                <h3 style={{fontSize:'15px'}}>Answer: {val.answer}</h3>
                                <button onClick={best}>Best Answer</button>
                                <button style={{marginLeft:'10px'}} onClick={incrementCounter}>Vote</button>
                                <text style={{marginLeft:'10px'}}>{counter}</text>
                            </div>
                        </div>
                        );}
                    )}
                </div>
                <div className="information">
                    <div>
                        <label style={{fontSize:'15px', fontFamily:'sans-serif', paddingTop:'30px', paddingLeft:'60px', fontWeight: 'bold'}}>Answer:</label>
                    </div>
                    <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center', paddingLeft:'80px', paddingBottom:'20px', paddingTop:'15px'}}>
                        <input
                            type="text"
                            style={{paddingLeft:'10px', paddingBottom:'50px', paddingRight:'200px'}}
                            placeholder="Enter answer..."
                            onChange={(event) => {
                            setAnswer(event.target.value);
                            }}
                        />
                    </div>
                    <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center',  paddingLeft:'60px', paddingBottom:'60px'}}>
                        <button onClick={addAnswer}>Add Answer</button>
                    </div>
                </div>
                
            </div>
        </div>

            

    )
}

export default ViewQuestionPage