import { Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Profile() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
    const [cookies] = useCookies(["colibrisID"]);
    const [avatar, setAvatar] = useState("");
    const [errors, setErrors] = useState([false, false, false, false, false])
    useEffect(() => {
      fetch('config/USER_SERVICE_URI')
      .then((r) => r.text())
      .then(USER_SERVICE_URI  => {
        axios
          .get(`${USER_SERVICE_URI}/${cookies.colibrisID}`)
          .then((res) => {
            setName(res.data.name);
            setEmail(res.data.email);
            setPhone1(res.data.phone1);
            setUsername(res.data.username);
            setAvatar(res.data.avatar);
            setPhone2(res.data.phone2);
            
          }).catch(err=>{console.log(err)});
      })
        
      }, [cookies.colibrisID]);
    
      const Submit = () => {
        let vari = [false, false, false, false, false];
        const checkIfStringStartsWith = (str, substrs) =>{
          return substrs.some(substr => str.startsWith(substr.toLowerCase()));
        }
        vari[0] = ! /^[a-z A-Z]+$/.test(name)
        vari[1] = username.length == 0
        vari[2] = ! /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
        vari[3] = ! /^[0-9]{8}$/.test(phone1) || ! checkIfStringStartsWith(phone1, ["2", "5", "7", "9"])
        vari[4] = ! /^[0-9]{8}$/.test(phone2) || ! checkIfStringStartsWith(phone2, ["2", "5", "7", "9"])
        setErrors(vari)
        for(let bool of vari) {
          if(bool) return
        }
        fetch('config/USER_SERVICE_URI')
        .then((r) => r.text())
        .then(USER_SERVICE_URI  => {
          axios
          .put(`${USER_SERVICE_URI}/${cookies.colibrisID}`, {
            name: name,
            email: email,
            phone1: phone1,
            phone2: phone2,
            avatar: avatar,
            username: username,
          })
          .then((res) => {
              console.log(res.data)
            if (res.data === "client updated successfully!!") {
              window.location.href = "/";
            }
          })
          .catch((err) => window.alert(err));
        })
        
      };
    return(
        <div className="container-fluid mt-3 contact">
          <div className="row">
            <div className="col-lg-12 mb-3 padding  contact-form center">
              <div className="row container-fluid ">
                <div className="col-lg-12 mb-3">
                  <div className="col-lg-9 center mb-3">
                    <input
                      placeholder="nom et prénom"
                      className="form-control"
                      value={name}
                      pattern=""
                      onChange={(e) => setName(e.target.value)}
                      style={errors[0]?{borderColor: "red"}: {}}
                    />
                  </div>
                  <div className="col-lg-9 center mb-3">
                    <input
                      placeholder="pseudo nom"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={errors[1]?{borderColor: "red"}: {}}
                    />
                  </div>
                  <div className="col-lg-9 center mb-3">
                    <input
                      placeholder="addresse email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={errors[2]?{borderColor: "red"}: {}}

                    />
                  </div>

                  <div className="col-lg-9 center mb-3">
                    <input
                      placeholder="numero de téléphone"
                      className="form-control"
                      type="text"
                      value={phone1}
                      onChange={(e) => setPhone1(e.target.value)}
                      style={errors[3]?{borderColor: "red"}: {}}

                    />
                  </div>
                    <div className="col-lg-9 center mb-3">
                      <input
                        placeholder="deuxiéme numero de téléphone"
                        className="form-control mb-2"
                        value={phone2}
                        onChange={(e) => setPhone2(e.target.value)}
                        style={errors[4]?{borderColor: "red"}: {}}

                      />
                      
                    </div>
                </div>
              </div>
              
                <div className="col-lg-2 center">
                  <button onClick={Submit} className="btn custom-btn ml-4">
                    Submit
                  </button>
                </div>
            </div>
          </div>
        </div>
    )
}