import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar, Header, Home, Question } from "./Components";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Header />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/question" exact component={() => <Question />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
