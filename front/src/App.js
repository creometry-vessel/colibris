import Markers from "./components/markers.component";
import Form from "./components/form.component";
import Home from './components/Home';
import Profile from "./components/Profile.component"

import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
function App() {
  return (
    <div className="wrapper">
      <Header />

      <Router hashType="noslash">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path ="/form" component={Form} />
        <Route exact path="/markers" component={Markers} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
    
    <Footer />
    </div>
    
  );
}

export default App;
