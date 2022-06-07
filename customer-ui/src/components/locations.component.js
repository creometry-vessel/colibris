import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Address from "./address-form.component"
export default function Locations(props) {
    const [locations, setLocations] = useState([]);
    const [cookies] = useCookies(["colibrisID"]);

    useEffect(() => {
      fetch('config/USER_SERVICE_URI')
      .then((r) => r.text())
      .then(USER_SERVICE_URI  => {
        axios
          .get(`${USER_SERVICE_URI}/${cookies.colibrisID}`)
          .then((res) => {
            setLocations(res.data.locations);
          }).catch(err=>{
            console.log(err)
          });
      })
        
      }, [cookies.colibrisID]);

      const Submit = () => {
        //verif
        fetch('config/USER_SERVICE_URI')
        .then((r) => r.text())
        .then(USER_SERVICE_URI  => {
          axios
          .put(`${USER_SERVICE_URI}/${cookies.colibrisID}`, {
            locations: locations,
          })
          .then((res) => {
            if (res.data === "client updated successfully!!") {
              window.location.href = "/";
            }
          })
          .catch((err) => window.alert(err));
        })
        
      };
    return(
        <div className="contact">
        <div className="row container-fluid contact-form">
                <div className="col-lg-12 mb-3">
                  {locations.map((location, index) => (
                    <Address
                      key={index}
                      id="ad1"
                      locations={locations}
                      index={index}
                      setLocations={setLocations}
                      colibrisID={cookies.colibrisID}
                    />
                  ))}
                </div>

                <div className="col-lg-12 mb-4">
                  <button
                    className="btn-circle"
                    onClick={() => {
                      //setEnableAddr(true);

                      setLocations([
                        ...locations,
                        {
                          address: {
                            lng: 0,
                            lat: 0,
                            addressType: "appartment",
                            locationType: "professional",
                            streetNumber: 0,
                            streetName: "",
                            state: "",
                            city: "",
                            zipCode: 0,
                          },
                        },
                      ]);
                    }}
                  >
                    <i className="fas fa-plus green mr-3"></i>
                    Add an address
                  </button>
                </div>

                <div className="col-lg-2 center">
                  <button onClick={Submit} className="btn custom-btn">
                    Submit
                  </button>
                </div>
              </div>
        </div>
    )
}
