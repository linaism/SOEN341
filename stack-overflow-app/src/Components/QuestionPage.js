import React, { useEffect, useState } from 'react'

class QuestionPage extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    question: '',
    answer: '',
    currentQuestion: '',
    currentAnswer: '',
    currentContent:'',
    showQuestion: false,
    showAnswer: false,
    showContent:false

  }

onContentChange =(e) => 
{
const currentContent = e.target.value;
this.setState(() => ({ currentContent}))

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
    let Content = this.state.currentContent;
    this.setState(() => ({ currentContent: '' }))
    this.setState(() => ({ Content }))
    this.setState(() => ({ showContent: true }))

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
        {this.state.showQuestion && 
        <div>
        
<br/> <br/> <div> 
<table style={{ marginLeft: "auto", marginRight: "auto",alignSelf: 'center', align: 'center'}}> <tr style={{VAlign: 'TOP'}}> <td style={{textAlign: 'right'}}> <b> Question: </b></td> <td>{this.state.question}</td> </tr> 
<tr style={{VAlign: 'TOP'}}> <td style={{textAlign: 'right'}}> <b> Content: </b></td> <td>{this.state.Content}</td> </tr> </table> </div>
   <br/><h3 style={{alignSelf: 'center', textAlign: 'center'}}> Thank you! Your question has been submitted successfully</h3></div>
        }
{!this.state.showQuestion && 
       <div> <h2 style={Askquestion}> <b>Ask a question</b>  </h2> 
        <b><hr/> </b>
        <br/>
          <h3 style={title}> Question </h3>
          <p> Insert a title that displays your question </p>
          <div >
            <form onSubmit={this.onSubmitQuestion}>
              <div style={{display: 'flex', alignSelf: 'left', textAlign: 'left', width: '70%'}}>
              <input
                type="text"
                border='none'
                outline='none'
                placeholder="E.g How to connect MySQL database to react app"
                value={this.state.currentQuestion}
                onChange={this.onLineChange}
                style={inputStyle1}
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
                value={this.state.currentContent}
                onChange={this.onContentChange}
                style={inputStyle1}
              />
              </div>
              
              <div style={{ display: 'flex', alignSelf: 'right', textAlign: 'right', position: 'absolute',
    bottom: '0px'}}>
              <button  style={buttonStyle1}>Submit Question</button>
              </div>
            </form>

          
          </div>
        </div>}
      </div>
    )
    
  }
}


export default QuestionPage