import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Select from 'react-select'
import Dialog from "./dialogMap.component"
let coord = [
  {
    gov: "Ariana",
    villes: ["Riadh el Andalous", "Ghazela", "Soukra", "Chotrana", "Ennasr", "Jardins Menzah"]
  },
  {
    gov: "Ben Arous",
    villes: ["Ben Arous", "Mourouj", "Megrine", "Morneg"]
  },
  {
    gov: "Nabeul",
    villes: ["Hammamet", "Nabeul"]
  },
  {
    gov: "Tunis",
    villes: ["Marsa", "Gammarth", "Ain Zaghouan", "Aouina", "Lac 1", "Lac 2", "Kram", "Sidi Boussaid", "Carthage", "Manar", "Mutuelleville" , "Bardo", "Alain Savary", "Menzah 1", "Centre Urbain", "Jardins de Carthage" ]
  },
  
]
export default function Address(props) {
  const {locations, index, setLocations ,colibrisID, ...others} = props;
  const [usernames, setUsernames] = useState([]);
  useEffect(()=>{
    axios.get(`${window.ENV.USER_SERVICE_URI}/username`).then((res)=>{
      let data = [];
      for(let username of res.data){
        if(colibrisID != username.id)
        data.push({label: username.username, value: username.id})
      }
      data.push({label: "hadhemi", value: "54794155"})
      setUsernames(data)
    })
  }, [])
  const updateLoc = (champ, value)=>{
    let locs = [...locations]
    let loc = {...locations[index], address: {...locations[index].address, [champ]: value}}
    locs[index] = loc
    setLocations(locs)  
  }

  const deleteLoc = async ()=>{
    if(locations[index]._id){
      await axios.delete(`${window.ENV.USER_SERVICE_URI}/location/${locations[index]._id}`)
    }
    setLocations(locations.filter((tag, ind) => index !== ind));
  }


    return(
        <div >
            <div className="col-lg-12 mb-3">
                  <input type="radio" id="appartment" checked={locations[index].address.addressType === "appartment"}
                  name="addressType" value="appartment" onChange={(e)=>updateLoc("addressType", e.target.value)}/>
                  <label for="appartment">appartment</label>
                  
                  <input type="radio" id="building" checked={locations[index].address.addressType === "building"}
                  name="addressType" value="building" onChange={(e)=>updateLoc("addressType", e.target.value)}/>
                  <label for="building">buildling</label>
                  
                  <input type="radio" id="house" checked={locations[index].address.addressType === "house"}
                  name="addressType" value="house" onChange={(e)=>updateLoc("addressType", e.target.value)}/>
                  <label for="house">house</label>
            </div>

            <div className="col-lg-12 mb-3">
                  <input type="radio" id="professional" checked={locations[index].address.locationType === "professional"}
                  name="locationType" value="professional" onChange={(e)=>updateLoc("locationType", e.target.value)}/>
                  <label for="professional">professional</label>
                  
                  <input type="radio" id="residental" checked={locations[index].address.locationType === "residental"}
                  name="locationType" value="residental" onChange={(e)=>updateLoc("locationType", e.target.value)}/>
                  <label for="residental">residental</label>
                  
                  
            </div>
      <Select options={usernames} 
      inputId="54794155"
      defaultValue={()=> {
       /* let loc = locations[index];
        let id = ""
        if(loc.managers[0] == colibrisID) id= loc.managers[1]
        id= loc.managers[0]
        console.log(usernames)
        for(let user of usernames){
          console.log(usernames)
          if (user.value == id) {console.log(user)}
        }*/
      }}
       onChange={e=> {
        let locs = [...locations]
        let loc = locations[index];
        if(loc.managers[0] == colibrisID) loc.managers[1] = e.value;
        else loc.managers[0] = e.value
        locs[index] = loc
        setLocations(locs)  
      }}/>

                    <div className="col-lg-12 mb-3">
                      <select className="col-lg-12 mb-3" onChange={(e)=> updateLoc("state", e.target.value)} value={locations[index].address.state}>
                        <option>--State--</option>
                        {coord.map((element, index)=>(
                          <option index={index} key={index}>{element.gov}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-12 mb-3">
                    <select className="col-lg-12 mb-3" onChange={(e)=> updateLoc("city", e.target.value)} value={locations[index].address.city}>
                        <option>--Ville--</option>
                        {coord.map((element, ind)=>{
                          if(element.gov == locations[index].address.state){
                            element.villes = element.villes.sort()
                            return(element.villes.map((ville, index2)=>(
                              <option key={ind + "," + index2}>{ville}</option>
                            )))
                          }
                          
                        }
                        )}
                      </select>
                    </div>
                    <div className="col-lg-12 mb-3">
                      <input
                        placeholder="rue"
                        className="form-control"
                        value={locations[index].address.streetName}
                        onChange={(e) => {
                          updateLoc("streetName", e.target.value)
                        }}
                      />
                    </div>
                    <div className="col-lg-12 mb-3">
                      <input
                        placeholder="street number"
                        className="form-control"
                        id="streetnumber"
                        type="number"
                        value={locations[index].address.streetNumber}
                        onChange={(e) => updateLoc("streetNumber", parseFloat(e.target.value))}
                
                      />
                    </div>
                    <div className="col-lg-12 mb-3">
                      <input
                        placeholder="zipCode"
                        className="form-control"
                        id="zipCode"
                        type="number"
                        value={locations[index].address.zipCode}
                        onChange={(e) => updateLoc("zipCode", parseFloat(e.target.value))}
                        
                
                      />
                    </div>
                    <div className="col-lg-12 mb-3">
                      <input
                        placeholder="lat"
                        className="form-control"
                        id="lat"
                        type="number"
                        value={locations[index].address.lat}
                        onChange={(e) => updateLoc("lat", parseFloat(e.target.value))}
                        hidden
                
                      />
                    </div>

                    <div className="col-lg-12 mb-3">
                      <input
                        placeholder="lng"
                        className="form-control"
                        id="lng"
                        type="number"
                        value={locations[index].address.lng}
                        onChange={(e) => updateLoc("lng", parseFloat(e.target.value))}
                        hidden
                      />
                    </div>
                    <div className="col-lg-2">
                    
                    
                    <Dialog address={`${locations[index].streetName},${locations[index].city},${locations[index].state}`} setLat={(val)=>updateLoc("lat", val)} setLng={(val)=>updateLoc("lng", val)} />
                </div>
                    <button onClick={deleteLoc}>delete location</button>
                  </div>
    )
}