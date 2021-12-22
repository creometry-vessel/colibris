import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function History(props) {
  const [cookies] = useCookies(["colibrisID"]);
  const [current, setCurrent] = useState([]);
  const [ancient, setAncient] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_APPOINT_SERVICE_URI}/` + cookies.colibrisID)
      .then((res) => {
        console.log(res.data);
        setCurrent(res.data.current);
        setAncient(res.data.ancient);
      });
  }, [cookies.colibrisID]);

  const deleteApp = (id) => {
    axios.delete(`${process.env.REACT_APP_APPOINT_SERVICE_URI}`, {
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
        <h2>Current:</h2>
        {current.map((element, index) => (
          <div>
            <p>{element.Date}</p>
            <div onClick={() => deleteApp(element._id)}>
              <p style={{ color: "red" }}>X</p>
            </div>
          </div>
        ))}
        <h2>Ancient:</h2>
        {ancient.map((element, index) => (
          <div>
            <p>{element.Date}</p>
            <p>{element.status}</p>
            <p>{element.description}</p>
          </div>
        ))}
        ------------------------------------------------------------------------
        <h2>Current :</h2>
        <div>
          <table className="table white">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Address</th>
                <th scope="col">Cancel</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>26 dec 2021</td>
                <td>20 rue 8416 cité el khadra</td>
                <td>
                  <a className="red-btn">X</a>
                </td>
              </tr>
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
              <tr>
                <th scope="row">1</th>
                <td>26 dec 2021</td>
                <td>20 rue 8416 cité el khadra</td>
                <td>Active</td>
                <td>DEEEESCRIPTION</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
