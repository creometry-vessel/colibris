import ListAppointments from "./components/appointments.list";
import Markers from "./components/markers.component";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar"
import Users from "./components/Users";
import Zone from "./components/zone.component";
import { useCookies } from "react-cookie";
import Sign from "./components/signin.component";

function App() {
  const [cookies] = useCookies(['AdminCol']);

  return (
    <div id="wrapper">
      <TopBar />
      {cookies.AdminCol?
      <div>
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
                <Route
                  exact
                  path="/zone"
                  component={Zone}
                />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
      </div>:
      <div className="main">
      <div className="main-content">
        <div className="container-fluid">
      <Sign />
      </div>
      </div>
      </div>}
    </div>
  );
}

export default App;