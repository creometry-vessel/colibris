import { useState } from "react"
import axios from "axios"
export default function Form(){
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [lat, setlat] = useState(0)
    const [lng, setlng] = useState(0)
    const Submit = ()=>{
        if(!name || !phone || !address || !lat || !lng){
            window.alert("please fill all the form")
            return;
        }
        if(phone.length !== 8){
            window.alert("phone number should be an 8 digit")
            return;
        }
        if(lat>90 || lat<-90){
            window.alert("insert a valid latitude")
            return;
        }
        if(lng>180 || lng<-180){
            window.alert("insert a valid longitude")
            return;
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URI}/marker`, {
            name: name,
            phone: phone,
            address: address,
            lat: lat,
            lng: lng
        }).then(res=>{
            if(res.data.data){
                window.alert("marker registered successfully !!!")
                setName("");
                setPhone("");
                setAddress("");
                setlat(0);
                setlng(0);
            }
        }).catch(err=> window.alert(err))
    }
    return(
        <div>
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
            

            <div id="contact" className="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title mt-5">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">

                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 padding">

                        <form className="main_form">
                            <div className="row">

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <input className="form-control" placeholder="Nom et prénom" type="text" onChange={e=> setName(e.target.value)} value={name}/>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <input className="form-control" placeholder="Numéro de téléphone" type="number" onChange={e=> setPhone(e.target.value)} value={phone}/>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <input className="form-control" placeholder="Adresse" type="text" onChange={e=> setAddress(e.target.value)} value={address}/>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <input className="form-control" placeholder="Latitude" type="text" onChange={e=> setlat(e.target.value)} type='number' value={lat} />
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <input className="form-control" placeholder="Longitude" type="text" onChange={e=> setlng(e.target.value)} type='number' value={lng} />
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <input type="button" value="submit" className="btn-main" onClick={Submit} />
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-2">
                                    <button onClick={()=> window.location.href = "/markers"} className="btn-main" >{"Map-->"}</button>
                                </div>

                                
                            </div>

                        </form>
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

        {/*

            <p>nom et prenom</p>
            <input placeholder="nom et prenom" onChange={e=> setName(e.target.value)} value={name} />
            <p>numero de tel</p>
            <input placeholder="tel" onChange={e=> setPhone(e.target.value)} type="number" value={phone} />
            <p>addresse</p>
            <input placeholder="addresse" onChange={e=> setAddress(e.target.value)} value={address} />
            <p>latitude</p>
            <input placeholder="lat" onChange={e=> setlat(e.target.value)} type='number' value={lat} />
            <p>longitude</p>
            <input placeholder="lng" onChange={e=> setlng(e.target.value)} type='number' value={lng} />
            <br />
            <input type="button" value="submit" onClick={Submit} />
            <br />
            <button onClick={()=> window.location.href = "/markers"}>{"Map-->"}</button>
        
        */}
        </div>
    )
}