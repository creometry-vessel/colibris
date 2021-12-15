import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';

let map = null;
let marker = null;
export default function Profile() {
  const [lat1, setLat1] = useState(0);
  const [lng1, setLng1] = useState(0);
  const [lat2, setLat2] = useState(0);
  const [lng2, setLng2] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [cookies] = useCookies(['colibrisID']);
  const [enablePhone2, setEnablePhone] = useState(false)
  const [enableAddr2, setEnableAddr] = useState(false)
  useEffect(()=>{
    if(!cookies.colibrisID) window.location.href = "/"
    axios.get(`${process.env.REACT_APP_USER_SERVICE_URI}/${cookies.colibrisID}`).then(res=>{
      setName(res.data.Name);
      setPhone1(res.data.phone1);
      setAddress1(res.data.addresses[0].address);
      setLat1(res.data.addresses[0].lat);
      setLng1(res.data.addresses[0].lng)
      setEmail(res.data.email);
      if(res.data.phone2){
        setEnablePhone(true);
        setPhone2(res.data.phone2)
      }
      if(res.data.addresses.length === 2){
        setEnableAddr(true);
        setAddress2(res.data.addresses[1].address);
        setLat2(res.data.addresses[1].lat);
        setLng2(res.data.addresses[1].lng)
      }
    })

  }, [])

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        process.env.REACT_APP_GOOGLE_API_KEY +
        "&callback=initMap&v=weekly";
      script.async = true;
      document.body.appendChild(script);
    }
    setTimeout(() => {
      try {
        map = new window.google.maps.Map(document.getElementById("map"), {
          zoom: 11,
          center: { lat: 36.80278, lng: 10.17972 },
        });
        map.addListener("click", async (e) => {
          setLat1(e.latLng.lat());
          setLng1(e.latLng.lng());
          getInfo(e.latLng.lat(), e.latLng.lng());
        });
      } catch (err) {
        console.error(err);
      }
    }, 1000);
  }, []);


  const getInfo = (Lat, Lng) => {
    if (marker) marker.setMap(null);
    const latlng = {
      lat: Lat,
      lng: Lng,
    };
    try {
      marker = new window.google.maps.Marker({
        position: latlng,
        map: map,
      });
      map.setCenter(latlng);
      map.setZoom(17);
    } catch (err) {
      console.error(err);
    }
  };

  const Submit = () => {
    if (!name || !phone1 || !address1 || !lat1 || !lng1) {
      window.alert("please fill all the form");
      return;
    }
    if (phone1.length !== 8) {
      window.alert("phone number should be an 8 digit");
      return;
    }
    if (lat1 > 90 || lat1 < -90) {
      window.alert("insert a valid latitude");
      return;
    }
    if (lng1 > 180 || lng1 < -180) {
      window.alert("insert a valid longitude");
      return;
    }
    let addresses = [{address: address1,lat: lat1,lng: lng1}]
    if(enableAddr2 && address2!=="" && lat2 !== 0 && lng2 !== 0){
      addresses.push({address: address2,lat: lat2,lng: lng2})
    }
    axios
      .put(`${process.env.REACT_APP_USER_SERVICE_URI}/${cookies.colibrisID}`, {
        Name: name,
        phone1: phone1,
        phone2: phone2,
        addresses: addresses,
      })
      .then((res) => {
        if (res.data === "client updated successfully!!") {
          window.location.href = '/' 
        }
      })
      .catch((err) => window.alert(err));
  };
  return (
    <div id="content">
      <div id="contact" className="contact">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="title mt-5">
                <h2>
                  P<strong className="black">rofile</strong> :
                </h2>
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
                  <input
                    placeholder="nom et prénom"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <input
                    placeholder="addresse email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <input
                    placeholder="numero de téléphone"
                    className="form-control"
                    value={phone1}
                    onChange={(e) => setPhone1(e.target.value)}
                  />
                </div>
                {enablePhone2? (
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <input
                    placeholder="deuxiéme numero de téléphone"
                    className="form-control"
                    value={phone2}
                    onChange={(e) => setPhone2(e.target.value)}
                  />
                  <button onClick={()=> {setPhone2(""); setEnablePhone(false) } }>disable</button>
                  </div>
                ) : (                  <button onClick={()=>{setEnablePhone(true)}}>enable</button>
                  )}

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <input
                    placeholder="addresse"
                    className="form-control"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <input
                    placeholder="lat"
                    className="form-control"
                    id="lat"
                    type="number"
                    value={lat1}
                    onChange={(e) => setLat1(parseFloat(e.target.value))}
                  />
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <input
                    placeholder="lng"
                    className="form-control"
                    id="lng"
                    type="number"
                    value={lng1}
                    onChange={(e) => setLng1(parseFloat(e.target.value))}
                  />
                </div>
                {enableAddr2? (
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <input
                        placeholder="addresse"
                        className="form-control"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <input
                        placeholder="lat"
                        className="form-control"
                        id="lat"
                        type="number"
                        value={lat2}
                        onChange={(e) => setLat2(parseFloat(e.target.value))}
                      />
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <input
                        placeholder="lng"
                        className="form-control"
                        id="lng"
                        type="number"
                        value={lng2}
                        onChange={(e) => setLng2(parseFloat(e.target.value))}
                      />
                    </div>
                    <button onClick={()=>{
                      setEnableAddr(false);
                      setAddress2("");
                      setLat2(0);
                      setLng2("");
                    }}>disable address</button>
                  </div>
                ) : <button onClick={()=>{setEnableAddr(true)}}>enable address</button>}
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                  <button
                    className="btn-main"
                    onClick={() => getInfo(lat1, lng1)}
                  >
                    vérifier coordonnées
                  </button>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <button
                   onClick={Submit}
                   className="btn-main"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
            
            <div id="map" style={{width: "90%", height: "400px"}}></div>

          </div>
        </div>
      </div>
  
    </div>
  );
}
