import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar, Header, HomePage, QuestionPage } from "./Components";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Header />
        <Switch>
          <Route path="/" exact component={() => <HomePage />} />
          <Route path="/question" exact component={() => <QuestionPage />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
