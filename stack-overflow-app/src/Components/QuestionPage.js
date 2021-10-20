import React, { useEffect, useState } from 'react'

class QuestionPage extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    question: '',
    currentQuestion: '',
    showQuestion: false,
  }

  onLineChange = (e) => {
    const currentQuestion = e.target.value;
    this.setState(() => ({ currentQuestion }))
  }

  onSubmitQuestion = (e) => {
    e.preventDefault();
    let question = this.state.currentQuestion;
    this.setState(() => ({ currentQuestion: '' }))
    this.setState(() => ({ question }))
    this.setState(() => ({ showQuestion: true }))
  }

  render() {
    //Styling to modify
    const title = {
      fontSize: 50,
      color: "#4a54f1",
      textAlign: "center",
      paddingTop: "100px",
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
      width: '270px'
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

    return (
      <div className="container">

        {this.state.showQuestion && <h4 className="question" display="flex">{this.state.question}</h4>}
          <div >
            <h2 style={subtitle}>Question</h2>
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