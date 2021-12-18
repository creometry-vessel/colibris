import axios from 'axios';
import {useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
let zones = [
  ["marsa", "gammarth", "ain zaghouan", "aouina", "lac 1", "lac 2", "kram", "sidi boussaid", "carthage", "soukra", "chotrana"],
  ["ghazela" , "ennasr", "riadh el andalous", "jardins Menzah", "Manar", "Menezeh"],
  ["mutuelleville", "bardo", "alain savary", "menzah1", "centre urbain", "lac 1", "lac 2", "jardins de carthage", "aouina", "ain zaghouan"],
  ["mornag", "banlieue sud"],
  [],
  [],
  ["banlieue sud", "hammamet", "nabeul", "ben arous", "mourouj"]
]
const getDatePerLocation = (location)=>{
  let availableDates = [];
  for(let i = 0; i<zones.length; i++){
    for(let j = 0; j<zones[i].length; j++){
      if(zones[i][j] == location) {
        availableDates.push(i);
        break;
      }
    }
  }
  return availableDates
}
export default function Form() {
    const [availableDates, setAvailableDates] = useState([]);
    const [chosen, setChosen] = useState("");
    const [cookies] = useCookies(['colibrisID']);
    const [addresses, setAddre] = useState([])
    const [currentAddr, setCurrent] = useState("")
    useEffect(()=>{
        getAllWeek()
        axios.get(`${process.env.REACT_APP_USER_SERVICE_URI}/`+cookies.colibrisID).then(res=>{
          setAddre(res.data.addresses)
        })
        getDatePerLocation("lac 1")
    }, [cookies.colibrisID] )
    
    const getAllWeek = (address)=>{
        if(! address) {
          setAvailableDates([])
          setCurrent("")
          setChosen("")
          return ;}
        let available = getDatePerLocation(address.city)
        let days = [];
        for(let i = 0; i<available.length; i++){
          let today = new Date();
          today.setDate(today.getDate() + 1);
          while(today.getDay() !== available[i] ){
            today.setDate(today.getDate() + 1);
          }
          days.push((today+"").substring(4,15)) 
          today.setDate(today.getDate() + 7)
          days.push((today+"").substring(4,15))
        }
        setCurrent(address)
        setAvailableDates(days)
    }

    const Submit = async ()=>{
        if(!chosen || !currentAddr) return ;
        let response = await axios.post(`${process.env.REACT_APP_APPOINT_SERVICE_URI}`, {userID : cookies.colibrisID, date: chosen, address: currentAddr });
        if(response.data.error){
            window.alert("Server error !!")
        }
        else {
            window.alert(response.data)
            window.location.href = "/"}
    }
    return (
        <div className="wrapper">
          <div id="content">
            <div className="contact">
              <div className="container mt-5">
                <div className="row">
                  <div className="col-md-12">
                    <div className="title mt-5">
                      <h2>
                        A<strong className="black">ppointment</strong> :
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="container-fluid">
            <select onClick={(e)=>getAllWeek(addresses[e.target.value])}>
                  <option>--choose an address--</option>
                  {addresses.map((add, index)=>(
                    <option value={index}>{add.street}, {add.city}, {add.governorate}  </option>
                  ))}
              </select>
              <select onChange={(e)=>{setChosen(e.target.value)}}>
                  <option>--choose a date for your appointement--</option>
                  {availableDates.map((date)=>(
                      <option>{date}</option>
                  ))}
              </select>
              <button onClick={Submit}>Submit</button>
            </div>
          </div>
        </div>
    )
}