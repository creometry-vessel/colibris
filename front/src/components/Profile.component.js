import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Address from "./address-form.component";

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
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [gov1, setGov1] = useState("");
  const [gov2, setGov2] = useState("");
  const [cookies] = useCookies(["colibrisID"]);
  const [enablePhone2, setEnablePhone] = useState(false);
  const [enableAddr2, setEnableAddr] = useState(false);
  useEffect(() => {
    axios
      .get(`${window.ENV.USER_SERVICE_URI}/${cookies.colibrisID}`)
      .then((res) => {
        setName(res.data.Name);
        setPhone1(res.data.phone1);
        setStreet1(res.data.addresses[0].street);
        setCity1(res.data.addresses[0].city);
        setGov1(res.data.addresses[0].governorate);
        setLat1(res.data.addresses[0].lat);
        setLng1(res.data.addresses[0].lng);
        setEmail(res.data.email);
        if (res.data.phone2) {
          setEnablePhone(true);
          setPhone2(res.data.phone2);
        }
        if (res.data.addresses.length === 2) {
          setEnableAddr(true);
          setStreet2(res.data.addresses[1].street);
          setCity2(res.data.addresses[1].city);
          setGov2(res.data.addresses[1].governorate);
          setLat2(res.data.addresses[1].lat);
          setLng2(res.data.addresses[1].lng);
        }
      });
  }, [cookies.colibrisID]);

  /*useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        window.ENV.GOOGLE_API_KEY +
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
*/
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
    /*if (!name || !phone1 || !address1 || !lat1 || !lng1) {
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
    }*/
    let addresses = [
      { street: street1, city: city1, governorate: gov1, lat: lat1, lng: lng1 },
    ];
    if (enableAddr2 && lat2 !== 0 && lng2 !== 0) {
      addresses.push({
        street: street2,
        city: city2,
        governorate: gov2,
        lat: lat2,
        lng: lng2,
      });
    }
    axios
      .put(`${window.ENV.USER_SERVICE_URI}/${cookies.colibrisID}`, {
        Name: name,
        phone1: phone1,
        phone2: phone2,
        addresses: addresses,
      })
      .then((res) => {
        if (res.data === "client updated successfully!!") {
          window.location.href = "/";
        }
      })
      .catch((err) => window.alert(err));
  };
  return (
    <div>
      <div>
        <div className="page-header mb-0">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2>Profile</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-3 contact">
        <div className="row ">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3 padding  contact-form">
              <div className="row container-fluid">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                  <input
                    placeholder="nom et prénom"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                  <input
                    placeholder="addresse email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                  <input
                    placeholder="numero de téléphone"
                    className="form-control"
                    value={phone1}
                    onChange={(e) => setPhone1(e.target.value)}
                  />
                </div>
                {enablePhone2 ? (
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                    <input
                      placeholder="deuxiéme numero de téléphone"
                      className="form-control mb-2"
                      value={phone2}
                      onChange={(e) => setPhone2(e.target.value)}
                    />
                    <a
                      className="btn-circle"
                      onClick={() => {
                        setPhone2("");
                        setEnablePhone(false);
                      }}
                    >
                      <i className="fas fa-minus mt-3 green"></i>
                    </a>
                  </div>
                ) : (
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                    <a
                      className="btn-circle mt-2"
                      onClick={() => {
                        setEnablePhone(true);
                      }}
                    >
                      <i className="fas fa-plus green"></i>
                    </a>
                  </div>
                )}
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">

                  <Address id="ad1" street={street1} setStreet={setStreet1} city={city1} setCity={setCity1} gov={gov1} setGov={setGov1} lat={lat1} setLat={setLat1} lng={lng1} setLng={setLng1} />
                </div>
                {enableAddr2 ? (
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                          <Address id="ad2" street={street2} setStreet={setStreet2} city={city2} setCity={setCity2} gov={gov2} setGov={setGov2} lat={lat2} setLat={setLat2} lng={lng2} setLng={setLng2} />

                    <a
                      className="btn-circle"
                      onClick={() => {
                        setEnableAddr(false);
                        setGov2("");
                        setCity2("");
                        setStreet2("");
                        setLat2(0);
                        setLng2("");
                      }}
                    >
                      {" "}
                      <i className="fas fa-minus mr-2 green"> </i>Delete address
                    </a>
                  </div>
                ) : (
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                    <a
                      className="btn-circle"
                      onClick={() => {
                        setEnableAddr(true);
                      }}
                    >
                      <i className="fas fa-plus green mr-3"></i>
                      Add an address
                    </a>
                  </div>
                )}

                <div className="col-lg-3 mt-2" />

                <div className="col-lg-3">
                  <button
                    className="btn custom-btn"
                    onClick={() => getInfo(lat1, lng1)}
                  >
                    vérifier coordonnées
                  </button>
                </div>
                <div className="col-lg-2">
                  <button onClick={Submit} className="btn custom-btn">
                    Submit
                  </button>
                </div>
              </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}
