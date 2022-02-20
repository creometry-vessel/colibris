import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

let zones = [
    [
      "marsa",
      "gammarth",
      "ain zaghouan",
      "aouina",
      "lac 1",
      "lac 2",
      "kram",
      "sidi boussaid",
      "carthage",
      "soukra",
      "chotrana",
    ],
    [
      "ghazela",
      "ennasr",
      "riadh el andalous",
      "jardins Menzah",
      "Manar",
      "Menezeh",
    ],
    [
      "mutuelleville",
      "bardo",
      "alain savary",
      "menzah1",
      "centre urbain",
      "lac 1",
      "lac 2",
      "jardins de carthage",
      "aouina",
      "ain zaghouan",
    ],
    ["mornag", "banlieue sud"],
    [],
    [],
    ["banlieue sud", "hammamet", "nabeul", "ben arous", "mourouj"],
  ];
  const getDatePerLocation = (location) => {
    let availableDates = [];
    for (let i = 0; i < zones.length; i++) {
      for (let j = 0; j < zones[i].length; j++) {
        if (zones[i][j] == location.toLowerCase()) {
          availableDates.push(i);
          break;
        }
      }
    }
    return availableDates;
  };
export default function Form(props) {
    const [availableDates, setAvailableDates] = useState([]);
    const [chosen, setChosen] = useState("");
    const [cookies] = useCookies(["colibrisID"]);
    const [addresses, setAddre] = useState([]);
    const [currentAddr, setCurrent] = useState("");
    const [shift, setShift] = useState("morning");
    useEffect(() => {
      getAllWeek();
      axios
        .get(`${window.ENV.USER_SERVICE_URI}/location?userID=` + cookies.colibrisID)
        .then((res) => {
          let final = []
          for(let addr of res.data){
            //if(addr.address.street && addr.address.city && addr.address.governorate && addr.address.lat && addr.address.lng){
              final.push(addr)
            //}
          }
          setAddre(final);
        });
    }, [cookies.colibrisID]);
  
    const getAllWeek = (address) => {
      if (!address) {
        setAvailableDates([]);
        setCurrent("");
        setChosen("");
        return;
      }
      let available = getDatePerLocation(address.address.city);
      let days = [];
      for (let i = 0; i < available.length; i++) {
        let today = new Date();
        today.setDate(today.getDate() + 1);
        while (today.getDay() !== available[i]) {
          today.setDate(today.getDate() + 1);
        }
        days.push((today + "").substring(4, 15));
        today.setDate(today.getDate() + 7);
        days.push((today + "").substring(4, 15));
      }
      setCurrent(address);
      
      setAvailableDates(days.sort());
    };
  
    const Submit = async () => {
      if (!chosen || !currentAddr) return;
      let response ;
      if(props.id){
        response = await axios.put(`${window.ENV.APPOINT_SERVICE_URI}`, {
          dueDate: chosen, location: currentAddr._id, shift: shift, contact: cookies.colibrisID, id: props.id
        })
      }
      else  response = await axios.post(
        `${window.ENV.APPOINT_SERVICE_URI}`,
        { createdBy: cookies.colibrisID, dueDate: chosen, location: currentAddr._id, shift: shift, contact: cookies.colibrisID }
      );
      if (response.data.error) {
        window.alert("Server error !!");
      } else {
        props.close(response.data);
      }
    };
    return(
        <div className="booking-form">

        <div className="control-group">
                    <div className="input-group">
                      <select
                        className="custom-select form-control"
                        multiple="yes"
                        onChange={(e) => getAllWeek(addresses[e.target.value])}
                      >
                        <option>--choose an address--</option>
                        {addresses.map((add, index) => (
                          <option value={index} key={index} >
                            {add.address.streetNumber} {add.address.streetName}, {add.address.city}, {add.address.state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="input-group">
                      <select
                        className="custom-select form-control"
                        multiple="yes"
                        onChange={(e) => {
                          if(e.target.value !== "--choose a date for your appointement--")
                          setChosen(e.target.value);
                        }}
                      >
                        <option>--choose a date for your appointement--</option>
                        {availableDates.map((date, index) => (
                          <option key={index*10}>{date}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="input-group">
                      <select
                        className="custom-select form-control"
                        multiple="yes"
                        onChange={(e) => {
                          if(e.target.value !== "--choose a shift--")
                          setShift(e.target.value);
                        }}
                      >
                        <option>--choose a shift--</option>
                          <option>morning</option>
                          <option>afternoon</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 mt-2" />

                    <div className="col-lg-4 text-center">
                      <button
                        onClick={Submit}
                        className="btn custom-btn"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
    )
}