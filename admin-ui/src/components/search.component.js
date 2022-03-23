import { useState } from "react";

export default function Search(props){
  const [filter, setFilter] = useState(props.filters[0]);
    const [search, setSearch] = useState("");
    const Change = (e)=>{
        setSearch("")
        for(let i = 0; i < props.filters.length; i++){
            if(props.filters[i].key == e.target.value){
                setFilter(props.filters[i])
                break;
            }
        }
    }
    const getSearch = (e)=>{
        setSearch(e.target.value)
    }
    const getInput = ()=>{
        if(!filter.type) return (<div></div>)
        else if(filter.type == "select") 
        return(
            <select className="form-control" onChange={getSearch}>
                {filter.value.map((element, index)=>(
                <option key={index} value={element}>{element}</option>
                ))}
            </select>)
        else if(filter.type == "date") return (<input type="date" className="form-control" placeholder="dd-mm-yyyy" onChange={getSearch}/>)
        else return (<input className="form-control" onChange={getSearch}/>)
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
        <select className="form-control" onChange={Change}>
            {props.filters.map((element, index)=>(
                <option key={index} value={element.key}>{element.key}</option>
            ))}
        </select>
      </div>
    </div>
    <div className="col-md-6">
      <div className="mt-4 mb-3">
      <div className="input-group">
          {getInput()}
        <span className="input-group-btn">
          <button className="btn btn-primary" type="button" onClick={()=>props.Submit(filter.id, search)}>
              <i className="fas fa-search"></i>
          </button>
        </span>
      </div>
      </div>
    </div>
  </div>
  )
}