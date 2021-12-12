import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Axios from "axios";

const QuestionsPage = () => {
  const [questionList, setQuestionList] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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
      },
    }).then((response) => {
      console.log(response);
      setSearchResults(response.data);
      setSearchTriggered(true);
    });
  };

  const searchStyle = {
    padding: "7px",
    width: "85%",
    display: "inline",
    marginRight: 7,
    borderColor: "#EBEEF3",
  };

  const viewButtonStyle = {
    borderRadius: "5px",
    color: "#5663A6",
    padding: "7px",
    backgroundColor: "#EBEEF3",
    borderColor: "#EBEEF3",
  };

  const questionBlockStyle = {
    position: "center",
    margin: "5px 20px 20px 20px",
    backgroundColor: "#F9FAFD",
    borderRadius: "11px",
    padding: "20px 50px 20px 50px",
  };

  return (
    <div className="container">
      <div
        style={{ padding: "50px", paddingBottom: "0px", textAlign: "center" }}
      >
        <input
          style={searchStyle}
          type="text"
          placeholder='Keyword, [Tag], "isAccepted"'
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        ></input>
        <button
          style={{
            display: "inline",
            borderRadius: "5px",
            color: "#5663A6",
            padding: "7px",
            backgroundColor: "#EBEEF3",
            borderColor: "#EBEEF3",
          }}
          onClick={search}
        >
          Enter
        </button>
      </div>
      <h1
        style={{
          fontSize: 40,
          textAlign: "left",
          paddingTop: "30px",
          fontFamily: "Teko",
          margin: "20px",
        }}
      >
        Questions
      </h1>
      {searchTriggered &&
        searchResults.map((question) => {
          return (
            <div key={question.question_id}>
              <div>
                <p
                  style={{
                    fontSize: "15px",
                    paddingLeft: "60px",
                  }}
                >
                  {question.title}
                </p>
                <p style={{ textOverflow: "ellipsis" }}>{question.content}</p>
                <Link
                  style={{ textDecoration: "none" }}
                  to={{
                    pathname: `/view-question/${question.question_id}`,
                    state: { question: question },
                  }}
                >
                  <div
                    style={{
                      alignSelf: "right",
                      textAlign: "right",
                      bottom: "0px",
                    }}
                  >
                    <Button>
                      <h3
                        style={{
                          fontSize: "15px",
                          fontFamily: "sans-serif",
                          paddingTop: "5px",
                        }}
                      >
                        View Question
                      </h3>
                    </Button>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      {!searchTriggered &&
        questionList.map((question) => {
          return (
            <div key={question.question_id} style={questionBlockStyle}>
              <p
                style={{
                  fontSize: "20px",
                  borderBottom: "solid 1px #c9cad1",
                }}
              >
                {question.title}
              </p>
              <p
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {question.content}
              </p>
              <div
                style={{
                  alignSelf: "right",
                  textAlign: "right",
                  bottom: "0px",
                }}
              >
                <Button style={viewButtonStyle}>
                  <Link
                    style={{ textDecoration: "none", color: "#5663A6" }}
                    to={{
                      pathname: `/view-question/${question.question_id}`,
                      state: { question: question },
                    }}
                  >
                    View Question
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default QuestionsPage;
