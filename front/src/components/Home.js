import React from "react";
import FacebookLogin from 'react-facebook-login';
import axios from "axios"
import { withCookies } from 'react-cookie';

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
      let response = await axios.post(`${process.env.REACT_APP_USER_SERVICE_URI}/auth/facebook`, userInfo)
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
        
        <div class="carousel">
            <div class="container-fluid">
                <div class="">
                    <div class="carousel-item">
                        <div class="carousel-img">
                            <img src="img/colibris8.jpg" alt="Image"/>
                        </div>
                        <div class="carousel-text">
                            <h1>  أعمل إلّي <span>عليك</span> </h1>
                            <p>
                            Colibris crée des emplois décents et durables en organisant la collecte, en porte à porte, des déchets recyclables des ménages et des entreprises.    
                            </p>

                            {this.state.loggedIn? 
                          <div /> : 
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
        <div class="about">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <div class="about-img">
                            <img src="img/colibris1.jpg" alt="Image"/>
                           
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="about-content">
                            <div class="section-header">
                                <p>About Us</p>
                                <h2>Collecting Since 2018</h2>
                            </div>
                            <div class="about-text">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem. Curabitur non nisl nec nisi scelerisque maximus. Aenean consectetur convallis porttitor. Aliquam interdum at lacus non blandit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="about">
            <div class="container">
                <div class="row align-items-center">
                    
                    <div class="col-lg-4">
                        <div class="about-img">
                            <img src="img/colibris5.jpg" alt="Image"/>
                           
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="about-img">
                            <img src="img/colibris7.jpg" alt="Image"/>
                           
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="about-img">
                            <img src="img/colibris4.jpg" alt="Image"/>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="food mt-0">
            <div class="container">
            <div class="section-header">
                                <h2>Our goals</h2>
                            </div>
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <div class="food-item">
                          <i class="fas fa-recycle"></i>
                            <h2>Burgers</h2>
                            <p>
                                Lorem ipsum dolor sit amet elit. Phasel nec pretium mi. Curabit facilis ornare velit non vulputa. Aliquam metus tortor auctor quis sem. 
                            </p>
                            
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="food-item">
                        <i class="fas fa-globe-africa"></i>
                            <h2>Snacks</h2>
                            <p>
                                Lorem ipsum dolor sit amet elit. Phasel nec pretium mi. Curabit facilis ornare velit non vulputa. Aliquam metus tortor auctor quis sem. 
                            </p>
                            
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="food-item">
                        <i class="fas fa-seedling"></i>
                            <h2>Beverages</h2>
                            <p>
                                Lorem ipsum dolor sit amet elit. Phasel nec pretium mi. Curabit facilis ornare velit non vulputa. Aliquam metus tortor auctor quis sem. 
                            </p>
                            
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
