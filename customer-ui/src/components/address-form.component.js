import axios from "axios";
import Dialog from "./dialogMap.component";
import { useCookies } from "react-cookie";
import { useState } from "react";

let coord = [
  {
    gov: "Ariana",
    villes: [
      "Riadh el Andalous",
      "Ghazela",
      "Soukra",
      "Chotrana",
      "Ennasr",
      "Jardins Menzah",
    ],
  },
  {
    gov: "Ben Arous",
    villes: ["Ben Arous", "Mourouj", "Megrine", "Morneg"],
  },
  {
    gov: "Nabeul",
    villes: ["Hammamet", "Nabeul"],
  },
  {
    gov: "Tunis",
    villes: [
      "Marsa",
      "Gammarth",
      "Ain Zaghouan",
      "Aouina",
      "Lac 1",
      "Lac 2",
      "Kram",
      "Sidi Boussaid",
      "Carthage",
      "Manar",
      "Mutuelleville",
      "Bardo",
      "Alain Savary",
      "Menzah 1",
      "Centre Urbain",
      "Jardins de Carthage",
    ],
  },
];
export default function Address(props) {
  const { handleClose, adress_id  } = props;
  const [adress, setAddress] = useState(props.adress);
  const [cookies] = useCookies(["colibrisID"]);
  const updateAdress = (champ, value) => {
    setAddress({...adress, [champ]: value});
  };


  const updateLatLng = (location) => {
    setAddress({...adress, lat: location.lat, lng: location.lng})
  };


  const cancel = () => {
    handleClose();
  };



  const confirmerLoc = () => {
      let {lat, lng, city, state, streetName} = adress
      if(lat==0 || lng == 0 || city=="" || state=="" || streetName=="") {
        alert("need to complete the form");
        return
      }
      try {
        fetch("config/USER_SERVICE_URI")
          .then((r) => r.text())
          .then(async (USER_SERVICE_URI) => {
            if (adress._id) {
            await axios.put(
              `${USER_SERVICE_URI}/location/${adress_id}`, {userID: cookies.colibrisID, address: adress}
            );
            }else{
              await axios.post(
              `${USER_SERVICE_URI}/location`, {userID: cookies.colibrisID, address: adress}
              );
            }
            handleClose()
          });
      } catch (e) {
        alert("server erreur!!!");
      }
    }



  const renderType = () => {
    if (adress.locationType === "Professional")
      return (
        <select
          className="col-lg-12"
          onChange={(e) => updateAdress("addressType", e.target.value)}
          value={adress.addressType}
        >
          <option value="">
            ---Type Adresse---
          </option>
          <option>
            Store
          </option>
          <option>
            Office/Floor
          </option>
          <option>
            Building
          </option>
        </select>
      );
    else if (adress.locationType === "Residential")
      return (
        <select
          className="col-lg-12"
          onChange={(e) => updateAdress("addressType", e.target.value)}
          value={adress.addressType}
        >
          <option value="">
            ---Type Adresse---
          </option>
          <option>
            Appartment
          </option>
          <option>
            House
          </option>
          <option>
            Building/Residential compound
          </option>
        </select>
      );
    else return <div></div>;
  };

  return (
    <div className="box-shadowly ml-4">
      

      <h6>Type :</h6>
      <div className="row">
        <div className="col-lg-6 mb-3">
          <select
            className="col-lg-12"
            onChange={(e) => updateAdress("locationType", e.target.value)}
            value={adress.locationType}
          >
            <option>
              Professional
            </option>
            <option>
              Residential
            </option>
          </select>
        </div>
        <div className="col-lg-6 mb-3">{renderType()}</div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-3">
          <h6>Numéro de la rue:</h6>
          <input
            placeholder="street number"
            className="form-control"
            id="streetnumber"
            type="number"
            value={adress.streetNumber}
            onChange={(e) =>
              updateAdress("streetNumber", parseFloat(e.target.value))
            }
          />
        </div>

        <div className="col-lg-6 mb-3">
          <h6>Nom de la rue :</h6>
          <input
            placeholder="Avenue Habib Bourguiba"
            className="form-control"
            value={adress.streetName}
            onChange={(e) => {
              updateAdress("streetName", e.target.value);
            }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-3">
          <h6>Gouvernorat :</h6>
          <select
            className="col-lg-12"
            onChange={(e) => updateAdress("state", e.target.value)}
            value={adress.state}
          >
            <option>--Gouvernorat--</option>
            {coord.map((element, index) => (
              <option index={index} key={index}>
                {element.gov}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-6 mb-3">
          <h6>Ville :</h6>
          <select
            className="col-lg-12"
            onChange={(e) => updateAdress("city", e.target.value)}
            value={adress.city}
          >
            <option>--Ville--</option>
            {coord.map((element, ind) => {
              if (element.gov === adress.state) {
                element.villes = element.villes.sort();
                return element.villes.map((ville, index2) => (
                  <option key={ind + "," + index2}>{ville}</option>
                ));
              }
            })}
          </select>
        </div>
      </div>

      <div className="col-lg-12 mb-3">
        <input
          placeholder="lat"
          className="form-control"
          id="lat"
          type="number"
          value={adress.lat}
          onChange={(e) => updateAdress("lat", parseFloat(e.target.value))}
          hidden
        />
      </div>

      <div className="col-lg-12 mb-3">
        <input
          placeholder="lng"
          className="form-control"
          id="lng"
          type="number"
          value={adress.lng}
          onChange={(e) => updateAdress("lng", parseFloat(e.target.value))}
          hidden
        />
      </div>
        <div className="mr-2 mb-2">
          <Dialog
          address={`${adress.streetName},${adress.city},${adress.state}`}
          setLatLng={updateLatLng}
        />
        </div>
        <div className="row center">

        <div className="mr-2">
        <button className="btn custom-btn" onClick={confirmerLoc} disabled={adress.lat == 0 || adress.lng == 0}>
          Confirmer
        </button>
        </div>
        <div className="">
        <button className="red-custom-btn" onClick={cancel}>
          Annuler
        </button>
        </div>
        
      </div>
    </div>
  );
}