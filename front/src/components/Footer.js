import React from "react";
class Footer extends React.Component {
  render() {
    return (
      <div>
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="footer-contact">
                  <h2>Infos</h2>
                  <p>
                    <i className="fa fa-map-marker"></i>123 Street, New York, USA
                  </p>
                  <p>
                    <i className="fa fa-phone"></i>58 330 734
                  </p>
                  <p>
                    <i className="fa fa-envelope"></i>
                    selim@colibristunisie.com
                  </p>
                  <div className="footer-social">
                    <a href="">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.facebook.com/colibristunisie">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="">
                      <i className="fab fa-youtube"></i>
                    </a>
                    <a href="https://www.instagram.com/colibristunisie/">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="footer-newsletter">
                  <h2>Newsletter</h2>
                  <p>
                    Lorem ipsum dolor sit amet elit. Quisque eu lectus a leo
                    dictum nec non quam. Tortor eu placerat rhoncus, lorem quam
                    iaculis felis, sed lacus neque id eros.
                  </p>
                  <div className="form">
                    <input className="form-control" placeholder="Email goes here" />
                    <button className="btn custom-btn">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright">
            <div className="container">
              <p>
                Copyright &copy; <a href="#">Colibris</a>, All Right Reserved.{" "}
                <br />
              </p>
              <p>
                Designed By <a href="https://creometry.com">Creometry</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
