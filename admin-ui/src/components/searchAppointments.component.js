import { useRef, useState } from "react";
import {
  ExcelExport,
  ExcelExportColumn,
} from "@progress/kendo-react-excel-export";
import axios from "axios";
export default function Search(props) {
  const [date, setDate] = useState(new Date().toDateString());
  const [shift, setShift] = useState("morning");
  const [fileName, setFileName] = useState("");

  const _export = useRef(null);

  const filters = () => {
    return "?dueDate=" + date + "&shift=" + shift;
  };
  const excelExport = () => {
    if (_export.current) {
      _export.current.save();
    }
  };
  const Sort = () => {
    if (!date || !shift) return;
    axios
      .put(`${window.ENV.APPOINT_SERVICE_URI}/sort`, {
        shift: shift,
        dueDate: date,
      })
      .then((res) => {
        window.alert(res.data.data);
      });
  };
  return (
    <div className="panel">
        <div className="panel-heading">
          <h3 className="panel-title"> Search by :</h3>
        </div>
      <div className="row container-fluid mb-4">
        <div className="col-lg-6">
            <h4>Date:</h4>
          <div className="input-group">
            <input
              type="date"
              className="form-control"
              placeholder="dd-mm-yyyy"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6">
            <h4>Shift:</h4>
            <div className="input-group">
              <select
                className="form-control"
                onChange={(e) => setShift(e.target.value)}
              >
                <option>morning</option>
                <option>afternoon</option>
              </select>
            </div>
        </div>
      </div>

      <div className="row container-fluid mb-3">
        <div className="col-lg-5">
          <span className="input-group-btn">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                setFileName(date + "---" + shift);
                props.Submit(filters());
              }}
            >
              <i className="fas fa-search mr-3"></i>
              Search
            </button>
          </span>
        </div>
        <div className="col-lg-4">
          <span className="input-group-btn">
            <button
              className="btn btn-primary"
              type="button"
              onClick={excelExport}
            >
              <i class="fa-solid fa-file-export mr-3"></i>
              Export Excel 
            </button>
            <ExcelExport data={props.data} ref={_export} fileName={fileName}>
              {
                //appointment info
              }
              <ExcelExportColumn field="dueDate" title="Date" />
              <ExcelExportColumn field="shift" title="Shift" />
              <ExcelExportColumn field="status" title="Status" />
              <ExcelExportColumn field="waypointRank" title="Order" />
              {
                //location info
              }
              <ExcelExportColumn
                field="location.address.addressType"
                title="address type"
              />
              <ExcelExportColumn
                field="location.address.locationType"
                title="location type"
              />
              <ExcelExportColumn
                field="location.address.streetNumber"
                title="street number"
              />
              <ExcelExportColumn
                field="location.address.streetName"
                title="street name"
              />
              <ExcelExportColumn field="location.address.city" title="city" />
              <ExcelExportColumn field="location.address.state" title="state" />
              <ExcelExportColumn
                field="location.address.zipCode"
                title="zip code"
              />
              <ExcelExportColumn
                field="location.address.lat"
                title="latitude"
              />
              <ExcelExportColumn
                field="location.address.lng"
                title="longitude"
              />
              {
                //first client info
              }
              <ExcelExportColumn
                field="location.userID.name"
                title="client name"
              />
              <ExcelExportColumn
                field="location.userID.username"
                title="client username"
              />
              <ExcelExportColumn
                field="location.userID.email"
                title="client email"
              />
              <ExcelExportColumn
                field="location.userID.phone1"
                title="client phone 1"
              />
              <ExcelExportColumn
                field="location.userID.phone2"
                title="client phone 2"
              />
            </ExcelExport>
          </span>
        </div>
        <div className="col-lg-2">
          <button className="btn btn-primary" type="button" onClick={Sort}>
          <i class="fa-solid fa-arrow-up-wide-short mr-3"></i>
            Sort results
          </button>
        </div>
      </div>
    </div>
  );
}