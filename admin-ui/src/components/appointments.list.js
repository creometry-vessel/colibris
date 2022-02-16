import axios from "axios"
import { useEffect, useState } from "react"

export default function ListAppointments(props){
    const [appointments, setAppointments] = useState([])
    useEffect(()=>{
        axios.get(`${window.ENV.APPOINT_SERVICE_URI}`).then(res=>{
            setAppointments(res.data)
        })
    }, [])
    return(
        <div>
            <table className="table white">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Address</th>
                <th scope="col">Status</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
            {appointments.map((element, index) => (
              <tr>
              <th scope="row">{index + 1}</th>
              <td>{element.date}</td>
              <td>{element.address.street+" ,"+element.address.city+" ,"+element.address.governorate}</td>
              <td>{element.status}</td>
              <td>{element.description}</td>
            </tr>
            ))}
              
            </tbody>
          </table>
            
        </div>
    )
}