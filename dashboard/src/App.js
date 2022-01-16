import ListAppointments from "./components/appointments.list";
import Markers from "./components/markers.component";
import { Route, HashRouter as Router, Switch } from "react-router-dom";

function App() {
  return (
    
    <Router hashType="noslash">
      <Switch>
        <Route exact path="/" component={ListAppointments} />
        <Route exact path="/markers" component={Markers} />
        
      </Switch>
    </Router>
    
  );
}

export default App;
