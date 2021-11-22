import React, { useEffect, useState } from 'react'
import Axios from 'axios';

const AskQuestionPage = () => {

  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState(''); 
  const [userId, setUserId] = useState(0);

  const [questionList, setQuestionList] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;

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

  useEffect(() => {
    Axios.get("http://localhost:5001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.loggedIn);
        setUserId(response.data.user[0].id);
      }  
    });
  }, []);

  return (
    <div >
      <h1 style={{fontFamily:'Teko',fontSize:'30px', paddingTop:'40px', paddingLeft:'40px'}}>Ask Question</h1>
      <form onSubmit={ask}>
        <h3 style={{fontSize:'15px', fontFamily:'sans-serif', paddingTop:'10px', paddingLeft:'60px'}}>Title </h3>
        <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center', paddingLeft:'60px'}}>
          <input style={{paddingLeft:'10px'}}
            type="text"
            placeholder="Enter title"
            onChange={(e) => {
              setTitle(e.target.value);
            }} 
          />
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
    </div>
  );

}

export default AskQuestionPage