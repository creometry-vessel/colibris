import Markers from "./components/markers.component";
import Form from "./components/form.component"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Form} />
        <Route exact path="/markers" component={Markers} />
      </Switch>
    </Router>
  );
}

export default App;
