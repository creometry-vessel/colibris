import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Address from "./address-form.component";
import Dialog from "@mui/material/Dialog";

export default function Locations(props) {
  const [locations, setLocations] = useState([]);
  const [cookies] = useCookies(["colibrisID"]);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    fetch("config/USER_SERVICE_URI")
      .then((r) => r.text())
      .then((USER_SERVICE_URI) => {
        axios
          .get(`${USER_SERVICE_URI}/${cookies.colibrisID}`)
          .then((res) => {
            setLocations(res.data.locations);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, [cookies.colibrisID]);

  const Submit = () => {
    //verif
    fetch("config/USER_SERVICE_URI")
      .then((r) => r.text())
      .then((USER_SERVICE_URI) => {
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
      });
  };
  return (
    <div className="contact">
      {locations.length == 0 ? (
        <div className="center">
          <h6>Cliquez ci-dessous pour ajouter une nouvelle adresse</h6>
        </div>
      ) : (
        <div></div>
      )}
      <div className="row container-fluid contact-form">
        <div className="col-lg-12 mb-3">
          <div>
            <table className="table white table-style">
              <thead className="thead">
                <tr>
                  <th scope="col">Address</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {locations.map((element, index) => (
                  <tr key={index}>
                    <td onClick={() => setOpen(true)}></td>
                    
                    <td>
                      <i className="fa-solid fa-trash red-icon"></i>
                    </td>
                    <td>
                      <i class="fa-solid fa-pen-to-square green"></i>
                    </td>
                    <Dialog
                      onClose={handleClose}
                      fullWidth={true}
                      maxWidth={"md"}
                      open={open}
                    >
                      <div className="contact">
                        <div className="container-fluid mt-4 mb-5 contact-form">
                          <Address
                            key={index}
                            id="ad1"
                            locations={locations}
                            index={index}
                            setLocations={setLocations}
                            colibrisID={cookies.colibrisID}
                          />
                        </div>
                      </div>
                    </Dialog>
                  </tr>
                  
                ))}
                
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-lg-12 mb-4 center">
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
                    addressType: "",
                    locationType: "Professional",
                    streetNumber: 0,
                    streetName: "",
                    state: "",
                    city: "",
                  },
                },
              ]);
            }}
          >
            <i className="fas fa-plus green mr-3"></i>
            Add an address
          </button>
        </div>
      </div>
    </div>
  );
}
