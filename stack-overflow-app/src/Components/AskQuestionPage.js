import React, { useState } from 'react'
import Axios from 'axios';
import {Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

const AskQuestionPage = () => {

  const [question, setQuestion] = useState(''); 
  const [content, setContent] = useState(''); 

  const [questionList, setQuestionList] = useState([]);

  const ask = () => {
    Axios.post("http://localhost:5001/ask", {
      title: title,
      content: content,
    }).then(() => {
      setQuestionList([
        ...questionList,
        {
          title: title,
          content: content,
        },
      ]);
    });
    setQuestionSubmittedFlag(true);
  };
  const Askquestion ={
    fontSize: 30,
    textAlign: "left",
    paddingTop: "100px",
    paddingLeft: "0px",
    fontFamily: "Arial",

  }
  const title = {
    fontSize: 30,
    textAlign: "left",
    paddingTop: "10px",
    paddingLeft: "0px",
    fontFamily: "Ubuntu",
  }

  const container = {
    paddingLeft: "20px",
    paddingRight: "20px",
    PaddingTop: "20px",
    PaddingBotton:"20px",
  }

  
  const buttonStyle1 = {
    fontSize: 20,
    color: "white",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingRight: "10px",
    paddingLeft: "10px",
    marginLeft: "auto",
    marginRight: "auto", 
    backgroundColor: "#3E86C2",
    borderRadius: 5,
    borderColor: "#3E86C2",
    width: '270px', 
    marginBottom: 50
  }

  const inputStyle1 = {
    fontSize: 20,
    color: "black",
    padding: "0px",
    backgroundColor: "#F3EFEE",
    borderRadius: 5,
    borderColor: "#3E86C2",
    fontType: "Ubuntu",
    margin: "0 0 0 0",
    width: '100%',
    border:'0px',
    outline:'0px'

  }

  return (
    <div style = {container}>
{ !questionSubmitted && 
<div> <h2 style={Askquestion}> <b>Ask a question</b>  </h2> 
        <b><hr/> </b>
        <br/>
          <h3 style={title}> Question </h3>
          <p> Insert a title that displays your question </p>
          <div >
          <form onSubmit={ask}>
              <div style={{display: 'flex', alignSelf: 'left', textAlign: 'left', width: '70%'}}>
              <input 
           type="text"
                border='none'
                outline='none'
                placeholder="E.g How to connect MySQL database to react app"
                style={inputStyle1}
            onChange={(e) => {
              setQuestion(e.target.value);
              
            }} 
          />

              </div>
              <h3 style={title}> Content </h3>
              <p> Write your question here, you can go into as much detail as you want </p>              
            <div style={{display: 'flex', alignSelf: 'left', textAlign: 'left', width: '70%'}}>
             
          <textarea 
           type="text"
           rows='5'
           border='0px'
           outline='0px'
           placeholder="Explain your question..."
           style={inputStyle1}
            onChange={(e) => {
              setContent(e.target.value);
            }} />
              </div>
              
              <div style={{ display: 'flex', alignSelf: 'right', textAlign: 'right', position: 'absolute',
    bottom: '0px'}}>
           <button style={buttonStyle1}>Submit Question</button>
              </div>
            </form>
          </div>

      </div>
}
{questionSubmitted && 
<div> <div style={{alignSelf: 'center', textAlign: 'center'}}> <b>Question:</b> {question}</div>
<div style={{alignSelf: 'center', textAlign: 'center'}}> <b>Content:</b> {content}</div>
<h3 style={{alignSelf: 'center', textAlign: 'center', paddingTop: '50px', color: '#03AC13'}}> Thank you! Your question has been submitted successfully</h3>
<div style={{alignSelf: 'center', textAlign: 'center', paddingTop: '10px'}}> <Nav.Link href="http://localhost:3000/answer">To navigate to answer screen click here</Nav.Link> </div>
          </div>}
    </div>
  );

}

export default AskQuestionPage
