import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";


const AnswersPage = () => {
    
    const [answer, setAnswer] = useState(''); 
    const [answerSubmitted, setAnswerSubmittedFlag] = useState(false); 
  
    const submitAnswer = () => {
        setAnswerSubmittedFlag(true);
    };

    //Styling to modify

    const Askquestion ={
      fontSize: 30,
      textAlign: "left",
      paddingTop: "100px",
      paddingLeft: "0px",
      fontFamily: "Arial",

    }
    const container = {
        paddingLeft: "20px",
        paddingRight: "20px",
        PaddingTop: "20px",
        PaddingBotton:"20px",
      }
    
    const title = {
      fontSize: 30,
      textAlign: "left",
      paddingTop: "10px",
      paddingLeft: "0px",
      fontFamily: "Ubuntu",
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
       <h3 style={title}> Answer </h3> {answerSubmitted && 
        <div>
       {answer}
</div>
        }
{!answerSubmitted && 
       <div>  
        
        
          <div >
            <form onSubmit={submitAnswer}>
              <div style={{display: 'flex', alignSelf: 'left', textAlign: 'left', width: '70%'}}>
              <textarea 
           type="text"
           rows='5'
           border='0px'
           outline='0px'
           placeholder="Explain your question..."
           style={inputStyle1}
                placeholder="E.g How to connect MySQL database to react app"
                onChange={(e) => {
                    setAnswer(e.target.value);
                }}
              />
              </div>
              
              <div style={{ display: 'flex', alignSelf: 'right', textAlign: 'right', position: 'absolute',
    bottom: '0px'}}>
              <button  style={buttonStyle1}>Submit Answer</button>
              </div>
            </form>

          
          </div>
        </div>}
      </div>
    );
    
}






export default AnswersPage