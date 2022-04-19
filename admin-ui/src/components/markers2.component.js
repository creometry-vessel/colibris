import { useEffect, useState } from "react"
import axios from "axios"
import ConfirmationDialog from "./dialog.component";



export default function Markers2(){
    const [appoint, setAppoint] = useState({});
    const getMarker = (status, ...args)=>{
        axios.put(`${window.ENV.APPOINT_SERVICE_URI}/markers`, {
            userID: appoint.userID,
            status: status,
            reason: args[0] ? args[0] : "",
            appointment: appoint
          }).then((res) => {
              console.log(res.data)
            if (res.data.data) setAppoint(res.data.data);
            else window.alert("you have no more markers");
          }).catch(err=>{
            console.log(err)
          })
    }
    useEffect(()=>{
        getMarker("pending");
    },[])
    return(
            <div className="container-fluid">
            <iframe src={`https://www.google.com/maps/embed/v1/place?q=${appoint.lat},${appoint.lng}&key=${window.ENV.GOOGLE_API_KEY}&zoom=18`} width="400" height="500"></iframe>
        <div className="mt-2 row align-items-center">
          <div className="col-lg-5">
              <h3>Client Info</h3>
                <h5>Name: {appoint.name}</h5>
                <h5>Address: {appoint.streetNumber} {appoint.streetName},{appoint.city},{appoint.state}</h5>
                <h5>Phone: {appoint.phone1}/{appoint.phone2}</h5>
                
          </div>
          <div className="ml-2 mt-2">
            <input
              className="btn custom-btn"
              id="submit"
              type="button"
              value="next →"
              onClick={() => getMarker("completed")}
            />
          </div>
          <div className="ml-3 mt-2">
            <ConfirmationDialog getMarker={getMarker} />
          </div>
        </div>
      </div>
    )
}