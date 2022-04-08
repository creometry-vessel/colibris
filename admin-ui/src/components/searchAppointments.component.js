import { useRef, useState } from "react";
import { ExcelExport ,   ExcelExportColumn} from "@progress/kendo-react-excel-export";

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
        console.log(props.data)
        _export.current.save();
      }
    };
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
                <option>evening</option>
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
            //first manager info
          }
          <ExcelExportColumn field="location.managers[0].name" title="1 manager name" />
          <ExcelExportColumn field="location.managers[0].username" title="1 manager username" />
          <ExcelExportColumn field="location.managers[0].email" title="1 manager email" />
          <ExcelExportColumn field="location.managers[0].phone1" title="1 manager phone 1" />
          <ExcelExportColumn field="location.managers[0].phone2" title="1 manager phone 2" />
          {
            //second manager info
          }
          <ExcelExportColumn field="location.managers[1].name" title="2 manager name" />
          <ExcelExportColumn field="location.managers[1].username" title="2 manager username" />
          <ExcelExportColumn field="location.managers[1].email" title="2 manager user email" />
          <ExcelExportColumn field="location.managers[1].phone1" title="2 manager user phone 1" />
          <ExcelExportColumn field="location.managers[1].phone2" title="2 manager user phone 2" />
          </ExcelExport>
        </span>
      </div>
      </div>
    </div>
  </div>
  )
}