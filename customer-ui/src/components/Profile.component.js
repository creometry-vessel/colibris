import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Address from "./address-form.component";

export default function Profile() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [cookies] = useCookies(["colibrisID"]);
  const [enablePhone2, setEnablePhone] = useState(false);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    axios
      .get(`${window.ENV.USER_SERVICE_URI}/${cookies.colibrisID}`)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setLocations(res.data.locations);
        setPhone1(res.data.phone1);
        if (res.data.phone2) {
          setEnablePhone(true);
          setPhone2(res.data.phone2);
        }
      });
  }, [cookies.colibrisID]);


  /*const verify = ()=>{
    //check all info
    if(! name || !email || !phone1 || !street1 || !city1 || !gov1 || !lat1 || !lng1 ) return "please fill the form";
    //check phone 
    if(phone1.length !== 8 && (phone1.substring(0,1)!== "9" || phone1.substring(0,1) !== "2" || phone1.substring(0,1) !== "5") )
    return "verifier numero de telephone"
    if(phone2 && phone2.length !== 8 && (phone2.substring(0,1)!== "9" || phone2.substring(0,1) !== "2" || phone2.substring(0,1) !== "5") )
    return "verifier le deuxiéme numéro de telephone"    
    return "ok"
  }*/


  const Submit = () => {
    /*let verif = verify()
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
    }*/
    axios
      .put(`${window.ENV.USER_SERVICE_URI}/${cookies.colibrisID}`, {
        name: name,
        email: email,
        phone1: phone1,
        phone2: phone2,
        locations: locations,
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
                      {
                        locations.map((location, index)=>(
                          <Address id="ad1" locations={locations} index={index} setLocations={setLocations} />
                        ))

                      }
                </div>
              
                  <div className="col-lg-12 mb-4">
                    <a
                      className="btn-circle"
                      onClick={() => {
                        //setEnableAddr(true);
                        
                        setLocations([...locations, {address: {lng: 0, lat: 0, addressType: "appartment", locationType: "professional", streetNumber: 0,streetName:"", state: "", city: "", zipCode: 0}}]);
                      }}
                    >
                      <i className="fas fa-plus green mr-3"></i>
                      Add an address
                    </a>
                  </div>
                

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
