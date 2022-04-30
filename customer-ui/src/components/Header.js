import React from "react";
import { withCookies } from "react-cookie";
import Avatar from '@mui/material/Avatar';
import axios from 'axios'
class Header extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = this.props;
    this.state = {
      Avatar: "",
      loggedIn: cookies.cookies.colibrisID ? true : false,
    };
    this.removeCookies = this.removeCookies.bind(this);
  }
  componentDidMount(){
    axios
      .get(`${window.ENV.USER_SERVICE_URI}/${this.props.cookies.cookies.colibrisID}`)
      .then((res) => {
       
        this.setState({Avatar: res.data.avatar})
      });
  }
  removeCookies() {
    const { cookies } = this.props;
    cookies.remove("colibrisID");
  }
  render() {
    return (
      <div>
        <div className="navbar navbar-expand-lg bg-light navbar-light">
          <div className="container-fluid">
            <a href="/" className="navbar-brand">
              <img src="img/colibris.png" />
            </a>
            {this.state.loggedIn ? <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button> : <p></p>}

            {this.state.loggedIn ? (
              
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav ml-auto">
                  <a href="/" className="nav-item nav-link ">
                    Home
                  </a>
                  
                  
                  <a href="/#/appointment" className="nav-item nav-link ">
                    Take an appointment
                  </a>
                  

                  <a
                    className="btn custom-btn mr-4"
                    onClick={this.removeCookies}
                    href="/"
                  >
                    Disconnect
                  </a>
                  <a href="/#/profile">
                    <Avatar alt="" src={this.state.Avatar} />
                  </a>
                </div>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(Header);
