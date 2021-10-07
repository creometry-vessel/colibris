import React, { Component } from 'react';

class Home extends React.Component {
    render() { 
        return <div>
            <div className="wrapper">

        <div id="content">
            <header>
                <div className="head-top">
                    <div className="container">

                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                <div className="email">
                                    <a href="#"><img src="images/mail_icon.png" /> Email : colibris@gmail.com</a>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                <div className="logo">
                                    <a href="/"><img src="images/colibris.png" /></a>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                <div className="contact_nu">
                                    <a href="#"> <img src="images/phone_icon.png" /> Contact : +216 50 500 500</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg">
                    <div className="container">
                        <nav className="navigation navbar-expand-md  navbar-dark ">

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                        </nav>
                    </div>
                </div>
            </header>
            <div className="slider_section banner_main">
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="first-slide" src="images/back.jpg" alt="First slide"/>
                            <div className="container">
                                <div className="carousel-caption relative">
                                    <h1>Gather<br/>
                                    <strong className="dark_brown">New Body Energy</strong></h1>
                                    
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <a className="mb-4" href="/form">Fill the form</a>
                                        </div>
                                        <div className="col">
                                            <a className="mb-4" href="/markers">Pick a client</a>
                                        </div>
                                    </div>
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
                                        <h2>About <strong className="black"> us</strong></h2>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumyLorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut labore et doloremagna aliquyam erat, sed diam voluptua con tremum bombe.Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut labore et doloremagna aliquyam erat, sed diam voluptua con tremum bombe.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 pppp">

                            <div className="about_box_img">
                                <figure><img src="images/pic1.jpg" alt="#" /></figure>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
    <footer>
        <div className="footer">
            <div className="copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <p>© 2021 Colibris Designed by<a href="https://creometry.com"> Creometry</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
        </div>;
    }
}
 
export default Home;