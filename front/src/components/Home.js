import React from "react";
import FacebookLogin from 'react-facebook-login';
import axios from "axios"
import { withCookies, Cookies } from 'react-cookie';

class Home extends React.Component {
  constructor(props){
    super(props);
    const { cookies } = this.props;
    this.state = {
      loggedIn: cookies.cookies.colibrisID? true: false
    }
    this.Login = this.Login.bind(this);
    this.removeCookies = this.removeCookies.bind(this);
  }

   async Login(userInfo){
    const { cookies } = this.props;
     if(userInfo.userID){
      let response = await axios.post("http://localhost:5001/auth/facebook", userInfo)
      if(response.data.userID){
        cookies.set('colibrisID', response.data._id, { path: '/' });
        window.location.reload()
      }
      else{
        console.log(response)
        window.alert("couldn't connect to facebook")
      }      
     }
    
  }
  removeCookies(){
    const { cookies } = this.props;
    cookies.remove("colibrisID")
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div id="content">
            <div className="slider_section banner_main">
              <div
                id="myCarousel"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      className="first-slide"
                      src="images/back.jpg"
                      alt="First slide"
                    />
                    <div className="container">
                      <div className="carousel-caption relative">
                        <h1>
                          Gather
                          <br />
                          <strong className="dark_brown">
                            New Body Energy
                          </strong>
                        </h1>

                          {this.state.loggedIn? 
                          <div className="row">
                            <div className="col-lg-4">
                            <a className="mb-4" href="/#/profile">
                              Profile
                            </a>
                          </div>
                          <div className="col">
                            <a className="mb-4" href="/#/appointment">
                              Take an appointement
                            </a>
                          </div>
                          <div className="col" onClick={this.removeCookies}>
                            <a className="mb-4" href="/">
                              disconnect
                            </a>
                          </div>
                          <div className="col">
                            <a className="mb-4" href="/#/history">
                              history
                            </a>
                          </div>
                          </div> : 
                          <div className="row">
                            <FacebookLogin
                              appId="201651958770779"
                              autoLoad={true}
                              fields="name,email,picture"
                              callback={this.Login} />
                            </div>  
                              }
                          
                          
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="about" className="about top_layer">
              <div className="container-fluid ml-4">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 pppp">
                    <div className="about_box">
                      <div className="about_box_text">
                        <div className="title">
                          <h2>
                            About <strong className="black"> us</strong>
                          </h2>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consetetur sadipscing
                          elitr,sed diam nonumyLorem ipsum dolor sit amet,
                          consetetur sadipscing elitr,sed diam nonumy eirmod
                          tempor invidunt ut labore et doloremagna aliquyam
                          erat, sed diam voluptua con tremum bombe.Lorem ipsum
                          dolor sit amet, consetetur sadipscing elitr,sed diam
                          nonumy eirmod tempor invidunt ut labore et doloremagna
                          aliquyam erat, sed diam voluptua con tremum bombe.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 pppp">
                    <div className="about_box_img">
                      <figure>
                        <img src="images/pic1.jpg" alt="#" />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(Home);
