import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Address from "./address-form.component";

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
        setName(res.data.name);
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


  const verify = ()=>{
    //check all info
    if(! name || !email || !phone1 || !street1 || !city1 || !gov1 || !lat1 || !lng1 ) return "please fill the form";
    //check phone 
    if(phone1.length !== 8 && (phone1.substring(0,1)!== "9" || phone1.substring(0,1) !== "2" || phone1.substring(0,1) !== "5") )
    return "verifier numero de telephone"
    if(phone2 && phone2.length !== 8 && (phone2.substring(0,1)!== "9" || phone2.substring(0,1) !== "2" || phone2.substring(0,1) !== "5") )
    return "verifier le deuxiéme numéro de telephone"    
    return "ok"
  }


  const Submit = () => {
    let verif = verify()
    if(verif !== "ok"){
      window.alert(verif)
      return;
    }
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
        name: name,
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
          <div className="col-lg-12 mb-3 padding  contact-form">
              <div className="row container-fluid">
                <div className="col-lg-12 mb-3">
                  <input
                    placeholder="nom et prénom"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="col-lg-12 mb-3">
                  <input
                    placeholder="addresse email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-lg-12 mb-3">
                  <input
                    placeholder="numero de téléphone"
                    className="form-control"
                    type="number"
                    value={phone1}
                    onChange={(e) => setPhone1(e.target.value)}
                  />
                </div>
                {enablePhone2 ? (
                  <div className="col-lg-12 mb-3">
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
                  <div className="col-lg-12 mb-3">
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
                <div className="col-lg-12 mb-3">

                  <Address id="ad1" street={street1} setStreet={setStreet1} city={city1} setCity={setCity1} gov={gov1} setGov={setGov1} lat={lat1} setLat={setLat1} lng={lng1} setLng={setLng1} />
                </div>
                {enableAddr2 ? (
                  <div className="col-lg-12 mb-3">
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
                  <div className="col-lg-12 mb-4">
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
