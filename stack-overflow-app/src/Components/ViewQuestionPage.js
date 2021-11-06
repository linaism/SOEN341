import React, {useState } from 'react'
import Axios from 'axios';

const ViewQuestionPage = () => {

    // The view question page displays a question in either of these cases: 
    //  1. If a new question has been submitted through Ask Question, the submitted question is displayed here 
    //  2. If a question is selected among the current list of questions, it is displayed here 
    // The view question page is where a user can answer a question

    // It would make sense for it to take in the id of the question that is to be displayed based on the button clicked

    return (
        <div>
            <h1>View Question</h1>
        </div>
    )
}

export default ViewQuestionPage
