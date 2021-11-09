import React, { useState } from 'react'
import Axios from 'axios';

const AskQuestionPage = () => {

  const [title, setTitle] = useState(''); 
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
  };

  return (
    <div >
      <h1>Ask Question</h1>
      <form onSubmit={ask}>
        <h3>Title </h3>
        <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center'}}>
          <input 
            type="text"
            placeholder="Enter title"
            onChange={(e) => {
              setTitle(e.target.value);
            }} 
          />
        </div>
        <h3>Content</h3>
        <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center'}}>
          <input 
            type="text"
            placeholder="Enter content"
            onChange={(e) => {
              setContent(e.target.value);
            }} 
          />
        </div>
        <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center'}}>
          <button>Submit Question</button>
        </div>
      </form>
    </div>
  );

}

export default AskQuestionPage
