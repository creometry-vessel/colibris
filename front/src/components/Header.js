import React from "react";
class Header extends React.Component {
  render() {
    return (
      <div>
        <header>
          <div className="head-top">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                  <div className="email">
                    <a href="">
                      <img src="images/mail_icon.png" /> Email :
                      colibris@gmail.com
                    </a>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                  <div className="logo">
                    <a href="/">
                      <img src="images/colibris.png" />
                    </a>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                  <div className="contact_nu">
                    <a href="#">
                      {" "}
                      <img src="images/phone_icon.png" /> Contact : +216 50 500
                      500
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg">
            <div className="container">
              <nav className="navigation navbar-expand-md  navbar-dark ">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarsExample04"
                  aria-controls="navbarsExample04"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </nav>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
