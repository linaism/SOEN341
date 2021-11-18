import React, { useEffect, useState, useParams } from 'react';
import { useLocation } from "react-router-dom";
import Axios from 'axios';

const ViewQuestionPage = () => {
    const { state } = useLocation();

    // const [data, setData] = useState({ answers: [], user: '' });
    const [questionUser, setUsername] = useState('');

    const [answer, setAnswer] = useState('');
    const [answerList, setAnswerList] = useState([]);

    const [bestAnswer, setBest] = useState('');
    const [bestSubmitted, setBestSubmitted] = useState(false);

    // useEffect(() => {
    //     await Axios.get("http://localhost:5001/ansGet").then((response) => {
    //         setAnswerList(response.data);
    //     });
    //     await Axios.get(`http://localhost:5001/user/${state.question.user_id}`).then((response) => {
    //         setUsername(response.username);
    //         console.log(response);
    //     })
    // });

    // useEffect(() => {
    //     await Axios.get(`http://localhost:5001/user/${state.question.user_id}`).then((response) => {
    //         setUsername(response.username);
    //         console.log(response);
    //     })
    // });

    // useEffect(() => {
    //     const fetchData = async () => {
    //       const respGlobal = await axios(
    //         `https://api.github.com/users/${username}`
    //       );
    //       const respRepos = await axios(
    //         `https://api.github.com/users/${username}/repos`
    //       );
    
    //       setGitData({ data: respGlobal.data, repos: respGlobal.data });
    //     };
    
    //     fetchData();
    //   }, []);



    useEffect(() => {
        fetch();
      });

    const fetch = () => {
        const request1 = Axios.get("http://localhost:5001/ansGet");
        const request2 = Axios.get(`http://localhost:5001/user/${state.question.user_id}`);
        Axios.all([request1, request2]).then(Axios.spread((...responses) => {
            const r1 = responses[0]
            const r2 = responses[1]
            setAnswerList(r1.data);
            setUsername(r2.data[0].username);
          })).catch(err => {
            console.error(err);
          })
    };
    

    // useEffect(() => {
    //     const fetchData = async () => {
    //       const answers = await Axios.get("http://localhost:5001/ansGet");
    //       const username = await Axios.get(`http://localhost:5001/user/${state.question.user_id}`);
    //     setAnswerList(answers.data);
    //     setUsername(username.username);
    //     // setData({ answers: getAnswers.data, user: getUsername.data });
    //     };
    
    //     fetchData();
    //   }, []);

    const addAnswer = () => {
        Axios.post("http://localhost:5001/ans", {
          answer: answer,
          question_id: state.question.question_id,
        }).then(() => {
          setAnswerList([
            ...answerList,
            {
                answer: answer,
                question_id: state.question.question_id,
            },
          ]);
        });
    };
    
    const best = (answer) =>{ 
        Axios.put("http://localhost:5001/update-best", { answer: answer }).then(
            (response) => {
                setBest(answer);
                setBestSubmitted(true);
            }
        );
    };

    const incrementVoteCount = (id, count) => {
        Axios.put("http://localhost:5001/update-vote", { vote_count: count, answer_id: id }).then(
            (response) => {
            setAnswerList(
                answerList.map((val) => {
                return val.answer_id === id
                    ? {
                        answer_id: val.answer_id,
                        question_id: val.question_id,
                        answer: val.answer,
                        vote_count: count,
                    }
                    : val;
                })
            );
            }
        );
    };

    const decrementVoteCount = (id, count) => {
        Axios.put("http://localhost:5001/update-vote", { vote_count: count, answer_id: id }).then(
            (response) => {
            setAnswerList(
                answerList.map((val) => {
                return val.answer_id === id
                    ? {
                        answer_id: val.answer_id,
                        question_id: val.question_id,
                        answer: val.answer,
                        vote_count: count,
                    }
                    : val;
                })
            );
            }
        );
    };

    return (
        <div>
            <h1 style={{fontFamily:'Teko',fontSize:'30px', paddingTop:'40px', paddingLeft:'40px'}}>View Question</h1>
            <div>
                <h3 style={{fontSize:'15px', fontFamily:'sans-serif', paddingTop:'10px', paddingLeft:'60px'}}> Title: {state.question.title} </h3>
                <h3 style={{fontSize:'15px', fontFamily:'sans-serif', paddingTop:'10px', paddingLeft:'60px'}}> Content: {state.question.content} </h3>
                <p>Submitted by: {questionUser}</p>
            </div>

            <div className="App">
                {bestSubmitted &&
                    <div className="answer">
                        <div style={{fontSize:'10px', fontFamily:'sans-serif', paddingTop:'40px', paddingLeft:'40px'}}>
                            <h1 style={{fontFamily:'Teko',fontSize:'30px'}}>Best Answer</h1>
                            <h3 style={{fontSize:'15px', paddingLeft:'20px'}}> Answer: {bestAnswer}</h3>
                        </div>
                    </div>
                }
                <div className="answers">
                <h1 style={{fontFamily:'Teko',fontSize:'30px', paddingTop:'40px', paddingLeft:'40px'}}>Answers</h1>
                    {answerList.map((val, key) => {
                        return ((val.question_id === state.question.question_id) &&
                        <div className="answer" key={val.answer_id}>
                            <div style={{fontSize:'10px', fontFamily:'sans-serif', paddingTop:'10px', paddingLeft:'60px'}}>
                                <h3 style={{fontSize:'15px'}}>Answer: {val.answer}</h3>
                                <button onClick={() => {best(val.answer);}}>Best Answer</button>
                                <button style={{marginLeft:'10px'}} onClick={() => {incrementVoteCount(val.answer_id, val.vote_count+1);}}>Upvote</button>
                                <button style={{marginLeft:'10px'}} onClick={() => {decrementVoteCount(val.answer_id, val.vote_count-1);}}>Downvote</button>
                                <text style={{marginLeft:'10px'}}>{val.vote_count}</text>
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