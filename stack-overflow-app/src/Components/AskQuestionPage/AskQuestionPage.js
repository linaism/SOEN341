import React, { useEffect, useState } from "react";
import Axios from "axios";

const AskQuestionPage = () => {
  const [questionSubmitted, setQuestionSubmittedFlag] = useState(false);
  const [question, setQuestion] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(0);
  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:5001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.loggedIn);
        setUserId(response.data.user[0].id);
      }
    });
  }, []);

  const ask = () => {
    if (loginStatus) {
      Axios.post("http://localhost:5001/ask", {
        title: question,
        content: content,
        user_id: userId,
      })
        .then((response) => {
          const values = [];
          for (let tag of tags) {
            values.push([response.data.insertId, tag]);
          }
          Axios.post("http://localhost:5001/tags", {
            values: values,
          });
        })
        .catch((err) => {
          console.error(err);
        });
      setQuestionSubmittedFlag(true);
    }
  };

  const getTags = (e) => {
    var tagArr = e.split(",").map(function (item) {
      return item.trim();
    });
    setTags(tagArr);
  };

  const submit = () => {
    if (!loginStatus) {
      window.alert("Unable to submit. You must be logged in to ask question.");
    }
  };

  const Askquestion = {
    fontSize: 40,
    textAlign: "left",
    paddingTop: "100px",
    fontFamily: "Teko",
  };
  const titleStyle = {
    fontSize: 24,
    textAlign: "left",
    paddingTop: "5px",
  };

  const questionBox = {
    position: "center",
    margin: "5px 20px 20px 20px",
    backgroundColor: "#F9FAFD",
    borderRadius: "11px",
    padding: "20px",
  };

  const buttonStyle1 = {
    fontSize: 18,
    color: "white",
    padding: "10px",
    backgroundColor: "#8C98AF",
    borderRadius: 5,
    borderColor: "#8C98AF",
    width: "180px",
    margin: "10px 0px 10px 0px",
  };

  const inputStyle1 = {
    padding: "10px",
    backgroundColor: "white",
    width: "100%",
    border: "0px",
  };

  return (
    <div className="container" title="askQuestionPage">
      {!questionSubmitted && (
        <div>
          <div data-testid="askQuestionTitle">
            <h2 style={Askquestion}> Ask a question </h2>
          </div>
          <div style={questionBox}>
            <h3 style={titleStyle}> Title </h3>
            <p> Insert a title that describes your question </p>
            <div>
              <form onSubmit={ask}>
                <div>
                  <input
                    title="askTitle"
                    style={inputStyle1}
                    type="text"
                    border="none"
                    outline="none"
                    placeholder="E.g How to connect MySQL database to react app"
                    onChange={(e) => {
                      setQuestion(e.target.value);
                    }}
                  />
                </div>
                <h3 style={titleStyle}> Question </h3>
                <p>
                  {" "}
                  Write your question here. You can go into as much detail as
                  you want{" "}
                </p>
                <div>
                  <textarea
                    title="askContent"
                    type="text"
                    rows="5"
                    border="0px"
                    outline="0px"
                    placeholder="Explain your question..."
                    style={inputStyle1}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  />
                </div>
                <h3 style={titleStyle}> Tags </h3>
                <p> (Optional) Add tags that relate to your question </p>
                <div>
                  <input
                    style={inputStyle1}
                    type="text"
                    border="none"
                    outline="none"
                    placeholder="E.g JavaScript, React, Python"
                    onChange={(e) => {
                      getTags(e.target.value);
                    }}
                  />
                </div>
                <div
                  style={{
                    alignSelf: "left",
                    textAlign: "right",
                    bottom: "0px",
                  }}
                >
                  <button style={buttonStyle1} onClick={submit} title="submitButton">
                    Submit Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {questionSubmitted && (
        <div style={{ margin: "15%" }}>
          <h3 style={titleStyle}>Title</h3>
          <p style={{ fontSize: 20 }}> {question}</p>
          <h3 style={titleStyle}>Question</h3>
          <p style={{ fontSize: 20 }}> {content}</p>
          <h3
            style={{
              alignSelf: "center",
              textAlign: "center",
              paddingTop: "50px",
              color: "#03AC13",
            }}
          >
            Thank you! Your question has been submitted successfully
          </h3>
        </div>
      )}
    </div>
  );
};

export default AskQuestionPage;
