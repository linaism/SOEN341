import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";

const ViewQuestionPage = () => {
  const { state } = useLocation();

  const [questionUsername, setQuestionUsername] = useState("");
  const [currentUserId, setUserId] = useState(0);
  const [currentUsername, setUsername] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerList, setAnswerList] = useState([]);
  const [bestAnswer, setBest] = useState("");
  const [bestSubmitted, setBestSubmitted] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    fetch();
    answerList.map((val) => {
      if (val.answer_id === state.question.best_answer_id) {
        setBest(val.answer);
        setBestSubmitted(true);
      }
      return true;
    });
  });

  const fetch = () => {
    const request1 = Axios.get("http://localhost:5001/ansGet");
    const request2 = Axios.get(
      `http://localhost:5001/user/${state.question.user_id}`
    );
    const request3 = Axios.get("http://localhost:5001/login");
    Axios.all([request1, request2, request3])
      .then(
        Axios.spread((...responses) => {
          const r1 = responses[0];
          const r2 = responses[1];
          const r3 = responses[2];
          setAnswerList(r1.data);
          setQuestionUsername(r2.data[0].username);
          if (r3.data.loggedIn === true) {
            setLoginStatus(r3.data.loggedIn);
            setUserId(r3.data.user[0].id);
            setUsername(r3.data.user[0].username);
          }
        })
      )
      .catch((err) => {
        console.error(err);
      });
  };

  const onClickHandler = () => {
    if (loginStatus) {
      addAnswer();
    } else {
      window.alert(
        "Unable to submit. You must be logged in to answer a question."
      );
    }
  };

  const addAnswer = () => {
    Axios.post("http://localhost:5001/ans", {
      answer: answer,
      question_id: state.question.question_id,
      user_id: currentUserId,
    }).then(() => {
      setAnswerList([
        ...answerList,
        {
          answer: answer,
          question_id: state.question.question_id,
          user_id: currentUserId,
        },
      ]);
    });
  };

  const best = (id, answer) => {
    if (currentUsername === questionUsername) {
      Axios.put("http://localhost:5001/update-best", {
        question_id: state.question.question_id,
        best_answer_id: id,
      }).then((response) => {
        setBest(answer);
        setBestSubmitted(true);
      });
    }
  };

  const addNewVote = (id, count, type) => {
    const request1 = Axios.put("http://localhost:5001/update-vote", {
      vote_count: count,
      answer_id: id,
    });
    const request2 = Axios.post("http://localhost:5001/vote", {
      answer_id: id,
      question_id: state.question.question_id,
      user_id: currentUserId,
      type: type,
    });
    Axios.all([request1, request2])
      .then(
        Axios.spread(() => {
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
        })
      )
      .catch((err) => {
        console.error(err);
      });
  };

  const incrementVoteCount = (id, count) => {
    if (loginStatus) {
      Axios.get("http://localhost:5001/vote", {
        params: {
          answer_id: id,
          question_id: state.question.question_id,
          user_id: currentUserId,
        },
      }).then((response) => {
        if (!response.data.length) {
          // Increment vote count by 1 if user hasn't voted yet
          addNewVote(id, count + 1, 1);
        } else if (response.data[0].type === 0) {
          // Increment vote count by 2 if user previously downvoted
          addNewVote(id, count + 2, 1);
        }
      });
    }
  };

  const decrementVoteCount = (id, count) => {
    if (loginStatus) {
      Axios.get("http://localhost:5001/vote", {
        params: {
          answer_id: id,
          question_id: state.question.question_id,
          user_id: currentUserId,
        },
      }).then((response) => {
        if (!response.data.length) {
          addNewVote(id, count - 1, 0);
        } else if (response.data[0].type === 1) {
          addNewVote(id, count - 2, 0);
        }
      });
    }
  };

  const upVote= {
    backgroundColor: "#04AA6D",
    color: "white",
    fontFamily: 'Source Sans Pro,sans-serif',
    borderRadius: "5px",
    border:'0',
    Width: "60px",
    marginLeft:'10px'
};
const downVote= {
    backgroundColor: "#E55B13",
    color: "white",
    fontFamily: 'Source Sans Pro,sans-serif',
    borderRadius: "5px",
    border:'0',
    Width: "60px",
    marginLeft:'10px'
};
const BlueButton = {
    backgroundColor: "#00868B",
    color: "white",
    fontFamily: 'Source Sans Pro,sans-serif',
    borderRadius: "5px",
    border:'0',
    Width: "60px",
    marginLeft:'10px'
};

const titleText = {
    fontFamily:'Teko',
    fontSize:'30px', 
    paddingTop:'40px', 
    color:'#008B8B', 
    paddingLeft:'40px'
};

const blueContainer = {
    backgroundColor:'#CCDCFD',
    borderRadius:'5px'
};

const paddingAttribute = {
    paddingTop: '10px',
    paddingRight: '20px',
    paddingBottom: '30px',
    paddingLeft: '40px',   
};

const marginAttribute = {

    marginTop: '10px',
    marginRight: '20px',
    marginBottom: '30px',
    marginLeft: '40px',   
};

const lightBlueContainer = {
    backgroundColor:'#E6E6FA',
    borderRadius:'5px',
    width:'50%'
};

  return (
    <div data-testid="viewQuestionPage">
      <h1 style={titleText}> View Question </h1>
      <div style={Object.assign({}, marginAttribute, blueContainer)}>
        <h3
          style={{
            fontSize: "15px",
            fontFamily: "sans-serif",
            paddingTop: "10px",
            paddingLeft: "60px",
          }}
        >
          {" "}
          Title: {state.question.title}{" "}
        </h3>
        <h3
          style={{
            fontSize: "15px",
            fontFamily: "sans-serif",
            paddingTop: "10px",
            paddingLeft: "60px",
          }}
        >
          {" "}
          Content: {state.question.content}{" "}
        </h3>
        <p
          style={{
            fontSize: "15px",
            fontFamily: "sans-serif",
            paddingTop: "5px",
            paddingLeft: "60px",
          }}
        >
          Submitted by: {questionUsername}
        </p>
      </div>

      <div className="App">
        {bestSubmitted && (
          <div className="answer">
            <div
              style={{
                fontSize: "10px",
                fontFamily: "sans-serif",
                paddingTop: "40px",
                paddingLeft: "40px",
              }}
            >
              <h1 style={titleText}>
                Best Answer
              </h1>
              <h3 style={{ fontSize: "15px", paddingLeft: "20px" }}>
                {" "}
                Answer: {bestAnswer}
              </h3>
            </div>
          </div>
        )}
        <div className="answers">
          <h1
            style={{
              fontFamily: "Teko",
              fontSize: "30px",
              paddingTop: "40px",
              paddingLeft: "40px",
            }}
          >
            Answers
          </h1>
          {answerList.map((val, key) => {
            return (
              val.question_id === state.question.question_id && (
                <div className="answer" key={val.answer_id}>
                  <div
                    style={{
                      fontSize: "10px",
                      fontFamily: "sans-serif",
                      paddingTop: "10px",
                      paddingLeft: "60px",
                    }}
                  >
                    <h3 style={{ fontSize: "15px" }}>Answer: {val.answer}</h3>
                    <button 
                      style= {BlueButton}
                      onClick={() => {
                        best(val.answer_id, val.answer);
                      }}
                    >
                      Best Answer
                    </button>
                    <button
                      style={upVote}
                      onClick={() => {
                        incrementVoteCount(val.answer_id, val.vote_count);
                      }}
                    >
                      Upvote
                    </button>
                    <button
                      style={downVote}
                      onClick={() => {
                        decrementVoteCount(val.answer_id, val.vote_count);
                      }}
                    >
                      Downvote
                    </button>
                    <text style={{ marginLeft: "10px" }}>{val.vote_count}</text>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="information">
          <div>
            <label
              style={{
                fontSize: "15px",
                fontFamily: "sans-serif",
                paddingTop: "30px",
                paddingLeft: "60px",
                fontWeight: "bold",
              }}
            >
              Answer:
            </label>
          </div>
          <div
            style={{
              display: "flex",
              alignSelf: "center",
              textAlign: "center",
              paddingLeft: "80px",
              paddingBottom: "20px",
              paddingTop: "15px",
            }}
          >
            <input
              type="text"
              style={{
                paddingLeft: "10px",
                paddingBottom: "50px",
                paddingRight: "200px",
              }}
              placeholder="Enter answer..."
              onChange={(event) => {
                setAnswer(event.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignSelf: "center",
              textAlign: "center",
              paddingLeft: "60px",
              paddingBottom: "60px",
            }}
          >
            <button onClick={onClickHandler}>Add Answer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuestionPage;
