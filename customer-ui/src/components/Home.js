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
        try{
            if(userInfo.userID){
                let response = await axios.post(`${window.ENV.USER_SERVICE_URI}/auth/facebook`, userInfo)
                if(response.data.providerID){
                cookies.set('colibrisID', response.data._id, { path: '/' });
                window.location.reload()
                }
                else{
                window.alert("couldn't connect to facebook")
                }      
            }
        }
        catch(err){
            console.log(err)
        }
    }
  removeCookies(){
    const { cookies } = this.props;
    cookies.remove("colibrisID")
  }
  render() {
    return (
      <div>
        
        <div className="carousel">
            <div className="container-fluid">
                <div className="">
                    <div className="carousel-item">
                        <div className="carousel-img">
                            <img src="img/colibris8.jpg" alt="Image"/>
                        </div>
                        <div className="carousel-text">
                            <h1>  أعمل إلّي <span>عليك</span> </h1>
                            <p>
                            Colibris crée des emplois décents et durables en organisant la collecte, en porte à porte, des déchets recyclables des ménages et des entreprises.    
                            </p>

                            {this.state.loggedIn? 
                          <div /> : 
                          <div className="row">
                            <FacebookLogin
                              appId={window.ENV.FACEBOOK_APP_ID}
                              autoLoad={true}
                              fields="name,email,picture"
                              callback={this.Login}
                              cssclassName="facebook-button"
                              textButton={<span><i className="fa-brands fa-facebook mr-3"></i> Sing up with Facebook</span>}
                            
                            />
                            </div>  
                              }

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="about">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="about-img">
                            <img src="img/colibris1.jpg" alt="Image"/>
                           
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-content">
                            <div className="section-header">
                                <p>About Us</p>
                                <h2>Collecting Since 2018</h2>
                            </div>
                            <div className="about-text">
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
        <div className="about">
            <div className="container">
                <div className="row align-items-center">
                    
                    <div className="col-lg-4">
                        <div className="about-img">
                            <img src="img/colibris5.jpg" alt="Image"/>
                           
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="about-img">
                            <img src="img/colibris7.jpg" alt="Image"/>
                           
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="about-img">
                            <img src="img/colibris4.jpg" alt="Image"/>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="food mt-0">
            <div className="container">
            <div className="section-header">
                                <h2>Our goals</h2>
                            </div>
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <div className="food-item">
                          <i className="fas fa-recycle"></i>
                            <h2>Burgers</h2>
                            <p>
                                Lorem ipsum dolor sit amet elit. Phasel nec pretium mi. Curabit facilis ornare velit non vulputa. Aliquam metus tortor auctor quis sem. 
                            </p>
                            
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="food-item">
                        <i className="fas fa-globe-africa"></i>
                            <h2>Snacks</h2>
                            <p>
                                Lorem ipsum dolor sit amet elit. Phasel nec pretium mi. Curabit facilis ornare velit non vulputa. Aliquam metus tortor auctor quis sem. 
                            </p>
                            
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="food-item">
                        <i className="fas fa-seedling"></i>
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
