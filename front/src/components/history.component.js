import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import DialogApp from "./dialogAppointment.component"
export default function History(props) {
  const [cookies] = useCookies(["colibrisID"]);
  const [current, setCurrent] = useState([]);
  const [ancient, setAncient] = useState([]);

  useEffect(() => {
   getApp()
  }, [cookies.colibrisID]);

  const getApp = ()=>{
    axios
    .get(`${window.ENV.APPOINT_SERVICE_URI}/` + cookies.colibrisID)
    .then((res) => {
      setCurrent(res.data.current);
      setAncient(res.data.ancient);
    });
  }

  const deleteApp = (id, index) => {
    //delete from list 
    let array = [... current];
    array.splice(index, 1);
    setCurrent(array)
    //delete from database
    axios.delete(`${window.ENV.APPOINT_SERVICE_URI}`, {
      data: { id: id },
    });
  };

  
  return (
    <div>
      <div className="page-header mb-3">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>History</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        
        <h2>Current :</h2>
        <div>
          <table className="table white">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Address</th>
                <th scope="col">Cancel</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
            {current.map((element, index) => (
              <tr>
              <th scope="row">{index + 1}</th>
              <td>{element.Date}</td>
              <td>{element.address.street+" ,"+element.address.city+" ,"+element.address.governorate}</td>
              <td>
                <a className="red-btn" onClick={() => deleteApp(element._id, index)}>X</a>
              </td>
              <td>
                <DialogApp refresh={getApp} id={element._id} />
              </td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
        <h2>Ancient :</h2>
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
            {ancient.map((element, index) => (
              <tr>
              <th scope="row">{index + 1}</th>
              <td>{element.Date}</td>
              <td>{element.address.street+" ,"+element.address.city+" ,"+element.address.governorate}</td>
              <td>{element.status}</td>
              <td>{element.description}</td>
            </tr>
            ))}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
