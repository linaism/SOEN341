import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import {Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

const AskQuestionPage = () => {

  const [question, setQuestion] = useState(''); 
  const [content, setContent] = useState(''); 
  const [userId, setUserId] = useState(0);

  const [questionList, setQuestionList] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;

  const [questionSubmitted, setQuestionSubmittedFlag] = useState(false);

  const ask = () => {
    if (loginStatus) {
      Axios.post("http://localhost:5001/ask", {
        title: title,
        content: content,
        user_id: userId,
      }).then(() => {
        setQuestionList([
          ...questionList,
          {
            title: title,
            content: content,
            user_id: userId,
          },
        ]);
      });
    } 
  };

  const submit = () => {
    if (!loginStatus) {
      window.alert('Unable to submit. You must be logged in to ask question.');
    }
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

  useEffect(() => {
    Axios.get("http://localhost:5001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.loggedIn);
        setUserId(response.data.user[0].id);
      }  
    });
  }, []);

  return (
<<<<<<< HEAD
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
=======
    <div >
      <h1 style={{fontFamily:'Teko',fontSize:'30px', paddingTop:'40px', paddingLeft:'40px'}}>Ask Question</h1>
      <form onSubmit={ask}>
        <h3 style={{fontSize:'15px', fontFamily:'sans-serif', paddingTop:'10px', paddingLeft:'60px'}}>Title </h3>
        <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center', paddingLeft:'60px'}}>
          <input style={{paddingLeft:'10px'}}
            type="text"
            placeholder="Enter title"
>>>>>>> 344f888f1b2651c0c42ce261f184fe4fd208f5b8
            onChange={(e) => {
              setQuestion(e.target.value);
              
            }} 
          />
<<<<<<< HEAD

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
=======
        </div>
        <h3 style={{fontSize:'15px', fontFamily:'sans-serif', paddingTop:'10px', paddingLeft:'60px'}}>Question</h3>
        <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center', paddingLeft:'60px', paddingBottom:'20px'}}>
          <input style={{paddingLeft:'10px', paddingBottom:'50px', paddingRight:'200px'}}
            type="text"
            placeholder="Enter content"
            onChange={(e) => {
              setContent(e.target.value);
            }} 
          />
        </div>
        <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center',  paddingLeft:'60px'}}>
        <button style={{fontSize:'15px', fontFamily:'sans-serif'}} onClick={submit}>Submit Question</button>
        </div>
      </form>
>>>>>>> 344f888f1b2651c0c42ce261f184fe4fd208f5b8
    </div>
  );

}

export default AskQuestionPage