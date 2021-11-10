import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar, HomePage, QuestionsPage, AskQuestionPage, ViewQuestionPage, AnswersPage } from "./Components";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        
        <Switch>
          <Route path="/" exact component={() => <HomePage />} />
          <Route path="/questions" exact component={() => <QuestionsPage />} />
          <Route path="/ask-question" exact component={() => <AskQuestionPage />} />
          <Route path="/answer" exact component={() => <AnswersPage />} />
          <Route path="/view-question/:id" exact component={() => <ViewQuestionPage />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
