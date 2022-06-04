import axios from "axios"
import { useEffect, useState } from "react"
import Search from './searchAppointments.component'
import Dialog from './dialogAppoint.component'
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

    const Edit = (id)=>{
      window.alert(id)
    }

    const Delete = (id)=>{
      axios.delete(`${window.ENV.APPOINT_SERVICE_URI}`, {        data: { id: id }    }).then(res=>{
        console.log(res)
        window.alert(res.data)
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
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
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
              <td><Dialog /></td>
              <td><button className="btn btn-danger" onClick={()=>Delete(element._id)}><i class="fa fa-trash"></i></button></td>
            </tr>
            ))}
              
            </tbody>
          </table>
            
        </div>
    )
}