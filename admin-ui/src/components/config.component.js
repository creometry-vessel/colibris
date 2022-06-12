import { useEffect, useState } from "react";
import axios from "axios";
export default function Config(props) {
  const [key, setKey] = useState("");
  const [max, setMax] = useState(0);
  useEffect(() => {
    fetch("config/ADMIN_SERVICE_URI")
      .then((r) => r.text())
      .then((ADMIN_SERVICE_URI) => {
        axios.get(`${ADMIN_SERVICE_URI}/config/key`).then((key) => {
          setKey(key.data);
        });
        axios.get(`${ADMIN_SERVICE_URI}/config/max`).then((max) => {
          setMax(max.data);
        });
      });
  }, []);

  const Submit = () => {
    fetch("config/ADMIN_SERVICE_URI")
      .then((r) => r.text())
      .then((ADMIN_SERVICE_URI) => {
        let promise1 = axios.post(`${ADMIN_SERVICE_URI}/config/key`, {
          key: key,
        });
        let promise2 = axios.post(`${ADMIN_SERVICE_URI}/config/max`, {
          max: max,
        });
        Promise.all([promise1, promise2]).then(() => {
          alert("done");
        });
      });
  };
  return (
    <div className="panel input-group">
      <div className="panel-heading">
        <h3 className="panel-title"> Config</h3>
      </div>
      <div className="row container-fluid">
        <div className="col-lg-6">
          <h4>API KEY</h4>
          <input
            className="form-control"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <div className="col-lg-6">
          <h4>MAX APPOINTMENTS PER DAY:</h4>
          <input
            className="form-control"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
        <div className="center">
            <button className="btn btn-primary mt-3 mb-3" onClick={Submit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
