import ListAppointments from "./components/appointments.list";
import Markers from "./components/markers.component";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar"
import Users from "./components/Users";
import Markers2 from "./components/markers2.component";
function App() {
  return (
    <div id="wrapper">
      <TopBar />
      <Sidebar />
      
      <div className="main">
        <div className="main-content">
          <div className="container-fluid">
            {/* <ListAppointments /> */}
            <Router hashType="noslash">
              <Switch>
                <Route
                  exact
                  path="/history"
                  component={ListAppointments}
                />
                <Route
                  exact
                  path="/users"
                  component={Users}
                />
                <Route
                  exact
                  path="/markers"
                  component={Markers}
                />
                <Route exact path="/marker2" component={Markers2} />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;