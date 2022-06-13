import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Address from "./address-form.component";
import Dialog from "@mui/material/Dialog";

export default function Locations(props) {
  const [locations, setLocations] = useState([]);
  const [cookies] = useCookies(["colibrisID"]);
  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  const init = ()=>{
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
  }
  const handleClose = () => {
    setOpen(false);
    init()
  };
  const handleCloseNew = () => {
    setOpenNew(false);
    init()
  };

  const deleteLoc = (id, index)=>{
    try {
      fetch("config/USER_SERVICE_URI")
        .then((r) => r.text())
        .then(async (USER_SERVICE_URI) => {
          await axios.delete(
            `${USER_SERVICE_URI}/location/${id}`
          );
        });
        setLocations(locations.filter((tag, ind) => index !== ind));
    } catch (e) {
      alert("server erreur!!!");
    }
  }

  useEffect(init , [cookies.colibrisID]);
  

  
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
                    <td>
                      {element.address.streetNumber} {element.address.streetName},{element.address.city},{element.address.state}</td>
                    <td>
                      <i className="fa-solid fa-trash red-icon" onClick={()=>deleteLoc(element._id, index)}></i>
                    </td>
                    <td onClick={() => setOpen(true)}>
                      <i className="fa-solid fa-pen-to-square green"></i>
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
                            handleClose={handleClose}
                            adress={element.address}
                            adress_id={element._id}
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
            onClick={() => setOpenNew(true)}
          >
            <i className="fas fa-plus green mr-3"></i>
            Add an address
          </button>
          <Dialog
            onClose={handleCloseNew}
            fullWidth={true}
            maxWidth={"md"}
            open={openNew}
          >
                      <div className="contact">
                        <div className="container-fluid mt-4 mb-5 contact-form">
                          <Address
                            id="ad1"
                            handleClose={handleCloseNew}
                            adress={{
                              lng: 0,
                              lat: 0,
                              addressType: "",
                              locationType: "Professional",
                              streetNumber: 0,
                              streetName: "",
                              state: "",
                              city: "",
                            }}
                          />
                        </div>
                      </div>
         </Dialog>
        </div>
      </div>
    </div>
  );
}
