import { useRef, useState } from "react";
import { ExcelExport ,   ExcelExportColumn} from "@progress/kendo-react-excel-export";
import axios from 'axios'
export default function Search(props){
    const [date, setDate] = useState(new Date().toDateString());
    const [shift, setShift] = useState("morning");
    const [fileName, setFileName] = useState("");
    
    const _export = useRef(null);

    const filters = ()=>{
      return "?dueDate="+date+"&shift="+shift;
    }
    const excelExport = () => {
      if (_export.current) {
        _export.current.save();
      }
    };
    const Sort = ()=>{
      if(!date || !shift) return;
      fetch('config/APPOINT_SERVICE_URI')
      .then((r) => r.text())
      .then( APPOINT_SERVICE_URI  => {
        axios.put(`${APPOINT_SERVICE_URI}/sort`, {
          shift: shift,
          dueDate: date
        }).then(res=>{
          window.alert(res.data.data)
        })         
      })
    }
    return(
    <div className="row panel">
    <div className="col-md-2">
      <div className="panel-heading">
        <h3 className="panel-title"> Search by :</h3>
      </div>
    </div>
    <div className="col-md-4">
      <div className="panel-heading">
        <h4>Date:</h4>

      </div>
    </div>
    <div className="col-md-6">
      <div className="mt-4 mb-3">
      <div className="input-group">
      <input type="date" className="form-control" placeholder="dd-mm-yyyy" onChange={(e)=>setDate(e.target.value)}/>
        <span className="input-group-btn">
        <button className="btn btn-primary" type="button" onClick={()=>{
            setFileName(date+"---"+shift)
            props.Submit(filters())}}>
          <i className="fas fa-search"></i>
        </button>
        </span>
      </div>
      </div>
    </div>
    <div className="col-md-2">
      <div className="panel-heading">
      </div>
    </div>
    <div className="col-md-4">
      <div className="panel-heading">
        <h4>Shift:</h4>

      </div>
    </div>
    <div className="col-md-6">
      <div className="mt-4 mb-3">
      <div className="input-group">
      <select className="form-control" onChange={(e)=>setShift(e.target.value)}>
                <option>morning</option>
                <option>afternoon</option>
      </select>        
        <span className="input-group-btn">
        <button className="btn btn-primary" type="button" onClick={excelExport}>
              <i className="fa fa-file-excel-o"></i>
          </button>
        <ExcelExport data={props.data} ref={_export} fileName={fileName}>
          {
            //appointment info
          }
          <ExcelExportColumn field="dueDate" title="Date"  />
          <ExcelExportColumn field="shift" title="Shift" />
          <ExcelExportColumn field="status" title="Status" />
          <ExcelExportColumn field="waypointRank" title="Order" />
          {
            //location info
          }
          <ExcelExportColumn field="location.address.addressType" title="address type" />
          <ExcelExportColumn field="location.address.locationType" title="location type" />
          <ExcelExportColumn field="location.address.streetNumber" title="street number" />
          <ExcelExportColumn field="location.address.streetName" title="street name" />
          <ExcelExportColumn field="location.address.city" title="city" />
          <ExcelExportColumn field="location.address.state" title="state" />
          <ExcelExportColumn field="location.address.zipCode" title="zip code" />
          <ExcelExportColumn field="location.address.lat" title="latitude" />
          <ExcelExportColumn field="location.address.lng" title="longitude" />
          {
            //first client info
          }
          <ExcelExportColumn field="location.userID.name" title="client name" />
          <ExcelExportColumn field="location.userID.username" title="client username" />
          <ExcelExportColumn field="location.userID.email" title="client email" />
          <ExcelExportColumn field="location.userID.phone1" title="client phone 1" />
          <ExcelExportColumn field="location.userID.phone2" title="client phone 2" />
          </ExcelExport>
        </span>
      </div>
      </div>
    </div>
    <button className="btn btn-primary" type="button" onClick={Sort}>
        Sort       
    </button>
  </div>
  )
}