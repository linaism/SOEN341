import React, { useEffect, useState } from 'react'

class AnswerPage extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    answer: '',
    currentAnswer: '',
    showAnswer: false,
  }

  onAnswerChange =(e) => 
{
const currentAnswer = e.target.value;
this.setState(() => ({ currentAnswer}))

}

onSubmitAnswer = (e) => {
    e.preventDefault();
    let answer = this.state.currentAnswer;
    this.setState(() => ({ currentAnswer: '' }))
    this.setState(() => ({ answer }))
    this.setState(() => ({ showAnswer: true }))

  }
  render() {
    //Styling to modify

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
      <div className="container">
       <h3 style={title}> Answer </h3> {this.state.showAnswer && 
        <div>
       {this.state.answer}
</div>
        }
{!this.state.showAnswer && 
       <div>  
        
        
          <div >
            <form onSubmit={this.onSubmitAnswer}>
              <div style={{display: 'flex', alignSelf: 'left', textAlign: 'left', width: '70%'}}>
              <input
                type="text"
                border='none'
                outline='none'
                placeholder="E.g How to connect MySQL database to react app"
                value={this.state.currentAnswer}
                onChange={this.onAnswerChange}
                style={inputStyle1}
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
    )
    
  }


}







export default AnswerPage