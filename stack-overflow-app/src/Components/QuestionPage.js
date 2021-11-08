import React, { useEffect, useState } from 'react'

// Leaving the existing implementation here for now to avoid big merge conflicts. 
// This page should be renamed "QuestionsPage" or "CurrentQuestions" and contain the list of questions 
// submitted by any user. 

class QuestionPage extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    question: '',
    answer: '',
    currentQuestion: '',
    currentAnswer: '',
    showQuestion: false,
    showAnswer: false,
  }

  onLineChange = (e) => {
    const currentQuestion = e.target.value;
    this.setState(() => ({ currentQuestion }))
  }

  onAnswerChange = (e) => {
    const currentAnswer = e.target.value;
    this.setState(() => ({ currentAnswer }))
  }

  onSubmitQuestion = (e) => {
    e.preventDefault();
    let question = this.state.currentQuestion;
    this.setState(() => ({ currentQuestion: '' }))
    this.setState(() => ({ question }))
    this.setState(() => ({ showQuestion: true }))
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
    const title = {
      fontSize: 30,
      textAlign: "left",
      paddingTop: "100px",
      paddingLeft: "50px",
      fontFamily: "Ubuntu",
    }

    const subtitle = {
      fontSize: 20,
      color: '#000000',
      textAlign: "center",
      paddingTop: "0px",
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
      padding: "10px",
      backgroundColor: "white",
      borderRadius: 5,
      borderColor: "#3E86C2",
      fontType: "Ubuntu",
      margin: "0 10% 50px 10%",
      width: '80%'
    }

    const submitted = {
        padding: "35px", 
        backgroundColor: "#EBEBEB",
        borderColor: "B0B0B0",
        border: "solid 1px",
        borderRadius: 5, 
        margin: 20
    }

    const titleAnswer = {
        fontSize: 30, 
        fontFamily: "Ubuntu", 
        textAlign: "left", 
        paddingLeft: "50px"
    }

    return (
      <div className="container">
          <h3 style={title}> Question </h3>
        {this.state.showQuestion && 
        <div>
            <h4 className="question" display="flex" style={submitted}>{this.state.question} </h4>
            {this.state.showAnswer && 
            <div>
                <h3 style={titleAnswer}> Answer </h3>
                <h4 style={submitted} className="answer" display="flex">{this.state.answer}</h4>
            </div>
            }
            <form onSubmit={this.onSubmitAnswer}>
              <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center'}}>
              <input
                type="text"
                placeholder="Enter answer"
                value={this.state.currentAnswer}
                onChange={this.onAnswerChange}
                style={inputStyle1}
              />
              </div>
              <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center'}}>
              <button  style={buttonStyle1}>Submit Answer</button>
              </div>
            </form>
          </div>
        }
          <div >
            <form onSubmit={this.onSubmitQuestion}>
              <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center'}}>
              <input
                type="text"
                placeholder="Enter question"
                value={this.state.currentQuestion}
                onChange={this.onLineChange}
                style={inputStyle1}
              />
              </div>
              <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center'}}>
              <button  style={buttonStyle1}>Submit Question</button>
              </div>
            </form>
          </div>
        
      </div>
    )
    
  }
}

export default QuestionPage