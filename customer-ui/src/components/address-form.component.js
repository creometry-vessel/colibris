import axios from "axios";
import Dialog from "./dialogMap.component";
import { useCookies } from "react-cookie";

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
  const { locations, index, setLocations } = props;
  const [cookies] = useCookies(["colibrisID"]);
  const updateLoc = (champ, value) => {
    let locs = [...locations];
    let loc = {
      ...locations[index],
      address: { ...locations[index].address, [champ]: value },
    };
    locs[index] = loc;
    setLocations(locs);
  };
  const updateLatLng = (location) => {
    let locs = [...locations];
    let loc = {
      ...locations[index],
      address: {
        ...locations[index].address,
        lat: location.lat,
        lng: location.lng,
      },
    };
    locs[index] = loc;
    setLocations(locs);
  };
  const deleteLoc = () => {
    if (locations[index]._id) {
      try {
        fetch("config/USER_SERVICE_URI")
          .then((r) => r.text())
          .then(async (USER_SERVICE_URI) => {
            await axios.delete(
              `${USER_SERVICE_URI}/location/${locations[index]._id}`
            );
          });
      } catch (e) {
        alert("server erreur!!!");
      }
    }
    setLocations(locations.filter((tag, ind) => index !== ind));
  };
  const confirmerLoc = () => {
      let {lat, lng, city, state, streetName} = locations[index].address
      if(lat==0 || lng == 0 || city=="" || state=="" || streetName=="") {
        alert("need to complete the form");
        return
      }
      try {
        fetch("config/USER_SERVICE_URI")
          .then((r) => r.text())
          .then(async (USER_SERVICE_URI) => {
            if (locations[index]._id) {
            await axios.put(
              `${USER_SERVICE_URI}/location/${locations[index]._id}`, {userID: cookies.colibrisID, address: locations[index].address}
            );
            }else{
              await axios.post(
              `${USER_SERVICE_URI}/location`, {userID: cookies.colibrisID, address: locations[index].address}
              );
            }
            
            console.log(locations[index]);
          });
      } catch (e) {
        alert("server erreur!!!");
      }
    }
  const renderType = () => {
    if (locations[index].address.locationType === "Professional")
      return (
        <select
          className="col-lg-12"
          onChange={(e) => updateLoc("addressType", e.target.value)}
          value={locations[index].address.addressType}
        >
          <option index={index} key={index} value="">
            ---Type Adresse---
          </option>
          <option index={index} key={index}>
            Store
          </option>
          <option index={index} key={index}>
            Office/Floor
          </option>
          <option index={index} key={index}>
            Building
          </option>
        </select>
      );
    else if (locations[index].address.locationType === "Residential")
      return (
        <select
          className="col-lg-12"
          onChange={(e) => updateLoc("addressType", e.target.value)}
          value={locations[index].address.addressType}
        >
          <option index={index} key={index} value="">
            ---Type Adresse---
          </option>
          <option index={index} key={index}>
            Appartment
          </option>
          <option index={index} key={index}>
            House
          </option>
          <option index={index} key={index}>
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
            onChange={(e) => updateLoc("locationType", e.target.value)}
            value={locations[index].address.locationType}
          >
            <option index={index} key={index}>
              Professional
            </option>
            <option index={index} key={index}>
              Residential
            </option>
          </select>
        </div>
        <div className="col-lg-6 mb-3">{renderType()}</div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-3">
          <h6>Numéro :</h6>
          <input
            placeholder="street number"
            className="form-control"
            id="streetnumber"
            type="number"
            value={locations[index].address.streetNumber}
            onChange={(e) =>
              updateLoc("streetNumber", parseFloat(e.target.value))
            }
          />
        </div>

        <div className="col-lg-6 mb-3">
          <h6>Rue :</h6>
          <input
            placeholder="rue"
            className="form-control"
            value={locations[index].address.streetName}
            onChange={(e) => {
              updateLoc("streetName", e.target.value);
            }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-3">
          <h6>Gouvernorat :</h6>
          <select
            className="col-lg-12"
            onChange={(e) => updateLoc("state", e.target.value)}
            value={locations[index].address.state}
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
            onChange={(e) => updateLoc("city", e.target.value)}
            value={locations[index].address.city}
          >
            <option>--Ville--</option>
            {coord.map((element, ind) => {
              if (element.gov === locations[index].address.state) {
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
          value={locations[index].address.lat}
          onChange={(e) => updateLoc("lat", parseFloat(e.target.value))}
          hidden
        />
      </div>

      <div className="col-lg-12 mb-3">
        <input
          placeholder="lng"
          className="form-control"
          id="lng"
          type="number"
          value={locations[index].address.lng}
          onChange={(e) => updateLoc("lng", parseFloat(e.target.value))}
          hidden
        />
      </div>
        <div className="mr-2 mb-2">
          <Dialog
          address={`${locations[index].address.streetName},${locations[index].address.city},${locations[index].address.state}`}
          setLatLng={updateLatLng}
        />
        </div>
        <div className="row center">

        <div className="mr-2">
        <button className="btn custom-btn" onClick={confirmerLoc}>
          Confirmer
        </button>
        </div>
        <div className="">
        <button className="red-custom-btn" onClick={deleteLoc}>
          Annuler
        </button>
        </div>
        
      </div>
    </div>
  );
}