import React from 'react';
import {useState} from 'react';
import VotingFeature from './VotingFeature';

 const QuestionPage = () => {
     const[vote] = useState(null);
     return (
         <div>
             <VotingFeature style ={{marginTop:'10px'}} value ={vote} vote={0}/>
             <p> This is the question page. </p>
         </div>
     )
     // Include the VotingFeature line 2 times once in the question component
     // and the other one for in the answer component
 }

 export default QuestionPage;