import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
<<<<<<< HEAD
import { AnswersPage } from "./Components";
import { NavigationBar, HomePage, QuestionsPage, AskQuestionPage, ViewQuestionPage } from "./Components";
=======
import { NavigationBar, HomePage, QuestionsPage, AskQuestionPage, ViewQuestionPage, AnswersPage } from "./Components";
>>>>>>> e53266fa30abfe10df3d8555c8de67f0be57276c

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        
        <Switch>
          <Route path="/" exact component={() => <HomePage />} />
          <Route path="/questions" exact component={() => <QuestionsPage />} />
          <Route path="/ask-question" exact component={() => <AskQuestionPage />} />
<<<<<<< HEAD
          <Route path="/view-question" exact component={() => <ViewQuestionPage />} />
=======
>>>>>>> e53266fa30abfe10df3d8555c8de67f0be57276c
          <Route path="/answer" exact component={() => <AnswersPage />} />
          <Route path="/view-question/:id" exact component={() => <ViewQuestionPage />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
