import axios from "axios"
import { useEffect, useState } from "react"
import Search from './searchAppointments.component'

export default function ListAppointments(props){
    const [appointments, setAppointments] = useState([])
    
    useEffect(()=>{
        axios.get(`${window.ENV.APPOINT_SERVICE_URI}`).then(res=>{
          console.log(res.data)
            setAppointments(res.data)
        }).catch(err=>console.log(err))
    }, [])
    const Submit =  (filters) => {
       axios.get(`${window.ENV.APPOINT_SERVICE_URI}${filters}`).then(res=>{
        setAppointments(res.data)
    })
    }
    return(
        <div>
          <Search Submit={Submit} data={appointments} />
            <table className="table white">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">shift</th>
                <th scope="col">Order</th>
                <th scope="col">Address</th>
                <th scope="col">Status</th>
                <th scope="col">Attempts</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
            {appointments.map((element, index) => (
              <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{element.dueDate.substring(0,10)}</td>
              <td>{element.shift}</td>
              <td>{element.waypointRank}</td>
              <td>{element.location?.address.streetNumber} {element.location?.address.streetName}, {element.location?.address.city}, {element.location?.address.state}</td>
              <td>{element.status}</td>
              <td>{element.attempts}</td>
              <td>{element.reason}</td>
            </tr>
            ))}
              
            </tbody>
          </table>
            
        </div>
    )
}