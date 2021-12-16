import { useEffect, useState } from "react";
import axios from "axios";

let map = null;
let marker = null;
export default function Profile() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
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
  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URI}/user?id=someid`)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setAddress(res.data.address);
        setLat(res.data.lat);
        setLng(res.data.lng);
        if (res.data.lat !== 0 && res.data.lng !== 0) {
          const latlng = {
            lat: res.data.lat,
            lng: res.data.lng,
          };
          marker = new window.google.maps.Marker({
            position: latlng,
            map: map,
          });
        }
      })
      .catch((err) => console.error(err));
  };
  const updateUser = () => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_URI}/user`, {
        id: "someid",
        name: name,
        email: email,
        phone: phone,
        address: address,
        lat: lat,
        lng: lng,
      })
      .then((res) => {
        window.location.href = "/";
      })
      .catch((err) => console.error(err));
  };
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
    getUser();
    setTimeout(() => {
      try {
        map = new window.google.maps.Map(document.getElementById("map"), {
          zoom: 11,
          center: { lat: 36.80278, lng: 10.17972 },
        });
        map.addListener("click", async (e) => {
          setLat(e.latLng.lat());
          setLng(e.latLng.lng());
          getInfo(e.latLng.lat(), e.latLng.lng());
        });
      } catch (err) {
        console.error(err);
      }
    }, 1000);
  }, []);
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <input
                    placeholder="addresse"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <input
                    placeholder="lat"
                    className="form-control"
                    id="lat"
                    type="number"
                    value={lat}
                    onChange={(e) => setLat(parseFloat(e.target.value))}
                  />
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <input
                    placeholder="lng"
                    className="form-control"
                    id="lng"
                    type="number"
                    value={lng}
                    onChange={(e) => setLng(parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                  <button
                    className="btn-main"
                    onClick={() => getInfo(lat, lng)}
                  >
                    vérifier coordonnées
                  </button>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <button
                   onClick={updateUser}
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
