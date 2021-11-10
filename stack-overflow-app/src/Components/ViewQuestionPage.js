import React from 'react';
import { useLocation } from "react-router-dom";

const ViewQuestionPage = () => {
    const { state } = useLocation();

    return (
        <div>
            <h1>View Question</h1>
            <div>
                <h3> Title: {state.question.title} </h3>
                <h3> Content: {state.question.content} </h3>
            </div>
        </div>
    )
}

export default ViewQuestionPage
