import Markers from "./components/markers.component";
import Form from "./components/form.component";
import Home from './components/Home';
import Profile from "./components/Profile.component"

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path ="/form" component={Form} />
        <Route exact path="/markers" component={Markers} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
