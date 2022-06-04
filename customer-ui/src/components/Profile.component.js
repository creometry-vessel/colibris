import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import Avatar from "@mui/material/Avatar";
import MyProfile from './myProfile.component'
import History from "./history.component";
import Locations from './locations.component'
export default function Profile() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [page, setPage] = useState("profile")
  const [cookies] = useCookies(["colibrisID"]);

  useEffect(() => {
    fetch('config/USER_SERVICE_URI')
    .then((r) => r.text())
    .then(USER_SERVICE_URI  => {
      axios
      .get(`${USER_SERVICE_URI}/${cookies.colibrisID}`)
      .then((res) => {
        setName(res.data.name);
        setUsername(res.data.username);
        setAvatar(res.data.avatar)
      }).catch(err=>{console.log(err)});
    })  
    
  }, [cookies.colibrisID]);
  const render = ()=>{
    if(page == "profile") return (<MyProfile />)
    else if(page == "history") return (<History />)
    else return(<Locations />)
    }
  const classes = (mypage)=>{
    let myclass = "component row";
    if(mypage == page) myclass+= " active"
    return myclass;
  }
  return (
    <div>
      <div>
        <div className="page-header mb-0">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2>Profile</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div className="row">
        <div className="col-lg-3 side-bar-grey align-center">
                    <Avatar
                        src={avatar}
                        sx={{ width: 65, height: 65 }}
                        className="mt-4 ml-50 mb-4"
                      />
                      <h5>{name} </h5>
                      <h6>{username} </h6>
                      <div className="mt-5">
                        <span className={classes("profile")} onClick={()=>setPage("profile")}>
                          <i className="fa-solid fa-circle-user mr-3"></i> My Profile
                        </span>
                        <span className={classes("location")} onClick={()=>setPage("location")}>
                        <i className="fa-solid fa-location-dot mr-3"></i> My locations
                        </span>
                        <span className={classes("history")} onClick={()=>setPage("history")}>
                        <i className="fa-solid fa-clock-rotate-left mr-2"></i> History
                        </span>
                        
                      </div>
        </div>
        <div className="col-lg-9 mt-3">
        {render()}
        </div>
      </div>
    </div>
  );
}
