import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar, HomePage, QuestionPage, AskQuestionPage, ViewQuestionPage } from "./Components";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        
        <Switch>
          <Route path="/" exact component={() => <HomePage />} />
          <Route path="/question" exact component={() => <QuestionPage />} />
          <Route path="/ask-question" exact component={() => <AskQuestionPage />} />
          <Route path="/view-question" exact component={() => <ViewQuestionPage />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
