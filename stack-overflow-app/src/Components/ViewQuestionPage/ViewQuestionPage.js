import React, { useEffect, useState, useCallback } from "react";
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
  const [tags, setTags] = useState([]);

  Axios.defaults.withCredentials = true;

  const fetch = useCallback(() => {
    const request1 = Axios.get("http://localhost:5001/ansGet");
    const request2 = Axios.get(
      `http://localhost:5001/user/${state.question.user_id}`
    );
    const request3 = Axios.get("http://localhost:5001/login");
    const request4 = Axios.get(
      `http://localhost:5001/tags/${state.question.question_id}`
    );
    Axios.all([request1, request2, request3, request4])
      .then(
        Axios.spread((...responses) => {
          const r1 = responses[0];
          const r2 = responses[1];
          const r3 = responses[2];
          const r4 = responses[3];
          setAnswerList(r1.data);
          setQuestionUsername(r2.data[0].username);
          setTags(r4.data);
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
  }, [state.question.user_id, state.question.question_id]);

  useEffect(() => {
    fetch();
    answerList.map((val) => {
      if (val.answer_id === state.question.best_answer_id) {
        setBest(val.answer);
        setBestSubmitted(true);
      }
      return true;
    });
  }, [fetch, answerList, state.question.best_answer_id]);

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

  const upVote = {
    backgroundColor: "#8cd992",
    color: "white",
    borderRadius: "5px",
    border: "0",
    marginLeft: "10px",
    padding: "5px",
    fontSize: "12px",
  };
  const downVote = {
    backgroundColor: "#d98c94",
    color: "white",
    borderRadius: "5px",
    border: "0",
    marginLeft: "10px",
    padding: "5px",
    fontSize: "12px",
  };
  const blueButton = {
    backgroundColor: "#8c9fd9",
    color: "white",
    borderRadius: "5px",
    border: "0",
    marginLeft: "10px",
    padding: "5px",
    fontSize: "12px",
  };

  const titleText = {
    fontSize: 40,
    textAlign: "left",
    paddingTop: "50px",
    fontFamily: "Teko",
    margin: "20px",
  };

  const questionTitleStyle = {
    borderBottom: "solid 1px #c9cad1",
    fontSize: "24px",
    fontFamily: "Roboto",
    paddingBottom: "3px",
    margin: "15px 15px 5px 15px",
  };

  const contentStyle = {
    fontSize: "16px",
    fontFamily: "Roboto",
    margin: 15,
  };

  const containerStyle = {
    position: "center",
    margin: "5px 20px 20px 20px",
  };

  const questionBox = {
    backgroundColor: "#f7f8fd",
    borderRadius: "11px",
    padding: "15px",
    marginBottom: "20px",
  };

  const bestAnswerBox = {
    backgroundColor: "#f7f8fd",
    border: "solid 1px #c6cfec",
    borderRadius: "11px",
    padding: "15px",
    marginBottom: "20px",
  };

  const answerTitle = {
    fontSize: "20px",
    fontWeight: "bold",
    fontFamily: "Roboto",
    margin: "15px 15px 5px 15px",
  };

  const answerBox = {
    border: "solid 2px #c6cfec",
    borderRadius: "11px",
    padding: "15px",
    marginBottom: "20px",
  };

  const submitButtonStyle = {
    fontSize: 18,
    color: "white",
    padding: "7px",
    backgroundColor: "#798fd2",
    borderRadius: 5,
    borderColor: "#798fd2",
    width: "130px",
    margin: "10px 0px 10px 0px",
  };

  const tagsStyle = {
    display: "inline",
    fontSize: "14px",
    marginRight: "10px",
    borderRadius: "5px",
    padding: "7px",
    backgroundColor: "#9fafdf",
    fontWeight: "bold",
    color: "white",
  };

  return (
    <div className="container" data-testid="viewQuestionPage">
      <h1 style={titleText}> Question </h1>
      <div style={containerStyle}>
        <div style={questionBox}>
          <h3 style={questionTitleStyle}> {state.question.title} </h3>
          <p style={contentStyle}> {state.question.content} </p>
          <div style={{ margin: 15 }}>
            {tags.map((val, key) => {
              return (
                <div key={val.tag_id} style={{ display: "inline" }}>
                  <p style={tagsStyle}> {val.tag} </p>
                </div>
              );
            })}
          </div>
          <div style={contentStyle}>
            Submitted by{" "}
            <p
              style={{
                color: "#3956ac",
                display: "inline",
                fontWeight: "bold",
              }}
            >
              {" "}
              {questionUsername}{" "}
            </p>
          </div>
        </div>
        <h1
          style={{
            fontSize: 40,
            textAlign: "left",
            fontFamily: "Teko",
            margin: "20px 20px 10px 0px",
          }}
        >
          Answers
        </h1>

        <div className="App">
          {bestSubmitted && (
            <div className="answer" style={bestAnswerBox}>
              <h1 style={answerTitle}>Best Answer</h1>
              <p style={contentStyle}>{bestAnswer}</p>
            </div>
          )}
          <div className="answers">
            {answerList.map((val, key) => {
              return (
                val.question_id === state.question.question_id && (
                  <div className="answer" key={val.answer_id} style={answerBox}>
                    <p style={contentStyle}> {val.answer}</p>
                    <button
                      style={blueButton}
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
                    <p style={{ marginLeft: "10px", display: "inline" }}>
                      {val.vote_count}
                    </p>
                  </div>
                )
              );
            })}
          </div>
          <div className="information">
            <div>
              <label
                style={{
                  fontSize: 40,
                  textAlign: "left",
                  fontFamily: "Teko",
                  margin: "20px 20px 0px 5px",
                }}
              >
                Add Answer
              </label>
            </div>
            <div>
              <input
                type="text"
                style={{
                  padding: "10px 0px 50px 10px",
                  width: "100%",
                  border: "solid 1px #c6cfec",
                }}
                placeholder="Enter answer..."
                onChange={(event) => {
                  setAnswer(event.target.value);
                }}
              />
            </div>
            <div
              style={{
                textAlign: "right",
                bottom: "0px",
              }}
            >
              <button style={submitButtonStyle} onClick={onClickHandler}>
                Add Answer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuestionPage;
