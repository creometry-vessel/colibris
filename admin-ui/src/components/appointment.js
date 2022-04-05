import axios from "axios";
import { useEffect, useState } from "react";

export default function ListAppointments(props) {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${window.ENV.APPOINT_SERVICE_URI}/?filter=${JSON.stringify({
          status: "waiting",
        })}`
      )
      .then((res) => {
        setAppointments(res.data.sort((a, b) => (a.date > b.date ? 1 : -1)));
      });
  }, []);
  return (
    <div>
      <h3 className="page-title">Appointments history</h3>

      <table className="table white">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Address</th>
            <th scope="col">Lattitude</th>
            <th scope="col">Longitude</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((element, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{element.date}</td>
              <td>
                {element.address.street +
                  " ," +
                  element.address.city +
                  " ," +
                  element.address.governorate}
              </td>
              <td>{element.address.lat}</td>
              <td>{element.address.lng}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}