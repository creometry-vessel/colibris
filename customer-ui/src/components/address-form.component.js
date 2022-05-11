import axios from "axios";
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
  const {locations, index, setLocations} = props;
  const updateLoc = (champ, value)=>{
    let locs = [...locations]
    let loc = {...locations[index], address: {...locations[index].address, [champ]: value}}
    locs[index] = loc
    setLocations(locs)  
  }
  const updateLatLng = (location)=>{
    let locs = [...locations]
    let loc = {...locations[index], address: {...locations[index].address, lat: location.lat, lng: location.lng}}
    locs[index] = loc
    setLocations(locs)  
  }
  const deleteLoc = async ()=>{
    if(locations[index]._id){
      try{
        await axios.delete(`${window.ENV.USER_SERVICE_URI}/location/${locations[index]._id}`)
      }
      catch(e){
        alert("server erreur!!!")
      }
    }
    setLocations(locations.filter((tag, ind) => index !== ind));
  }
  const renderType = ()=>{
    if(locations[index].address.locationType === "professional")
      return(
        <div className="col-lg-12 mb-3">
                  <input type="radio" id="Store" checked={locations[index].address.addressType === "Store"}
                  name="addressType" value="Store" onChange={(e)=>updateLoc("addressType", e.target.value)}/>
                  <label className="mr-3 ml-1">Store</label>
                  
                  <input type="radio" id="Office" checked={locations[index].address.addressType === "Office"}
                  name="addressType" value="Office" onChange={(e)=>updateLoc("addressType", e.target.value)}/>
                  <label className="mr-3 ml-1">Office</label>
                  
                  <input type="radio" id="Floor" checked={locations[index].address.addressType === "Floor"}
                  name="addressType" value="Floor" onChange={(e)=>updateLoc("addressType", e.target.value)}/>
                  <label className="mr-3 ml-1">Floor</label>

                  <input type="radio" id="Building" checked={locations[index].address.addressType === "Building"}
                  name="addressType" value="Building" onChange={(e)=>updateLoc("addressType", e.target.value)}/>
                  <label className="mr-3 ml-1">Building</label>
        </div>
      )
    else if (locations[index].address.locationType === "residental")
    return(
      <div className="col-lg-12 mb-3">
                  <input type="radio" id="Appartment" checked={locations[index].address.addressType === "Appartment"}
                  name="addressType" value="Appartment" onChange={(e)=>updateLoc("addressType", e.target.value)}/>
                  <label className="mr-3 ml-1">Appartment</label>
                  
                  <input type="radio" id="Building" checked={locations[index].address.addressType === "Building"}
                  name="addressType" value="Building" onChange={(e)=>updateLoc("addressType", e.target.value)}/>
                  <label className="mr-3 ml-1">Building</label>
                  
                  <input type="radio" id="House" checked={locations[index].address.addressType === "House"}
                  name="addressType" value="House" onChange={(e)=>updateLoc("addressType", e.target.value)}/>
                  <label className="mr-3 ml-1">House</label>

                  <input type="radio" id="Residential compound" checked={locations[index].address.addressType === "Residential compound"}
                  name="addressType" value="Residential compound" onChange={(e)=>updateLoc("addressType", e.target.value)}/>
                  <label className="mr-3 ml-1">Residential compound</label>
      </div>
    )
    else return (<div></div>)
  }

    return(
        <div className="box-shadowly ml-4" >
          <div className="ml-much col-lg-4">
            <button className="btn-circle-red" onClick={deleteLoc}>
              <i className="fa-solid fa-trash-can mr-3"></i> delete Address
            </button>
          </div>
          
          <h6>Type :</h6>
          <div className="col-lg-12 mb-3">
                  <input type="radio" id="professional" checked={locations[index].address.locationType === "professional"}
                  name="locationType" value="professional" onChange={(e)=>updateLoc("locationType", e.target.value)}/>
                  <label className="mr-3 ml-1">Professional</label>
                  
                  <input type="radio" id="residental" checked={locations[index].address.locationType === "residental"}
                  name="locationType" value="residental" onChange={(e)=>{updateLoc("locationType", e.target.value)}}/>
                  <label className="mr-3 ml-1">Residental</label>
                  
                  
            </div>
            {renderType()}

            
                    <div className="col-lg-12 mb-3">
                      <h6>Gouvernorat :</h6>
                      <select className="col-lg-12" onChange={(e)=> updateLoc("state", e.target.value)} value={locations[index].address.state}>
                        <option>--State--</option>
                        {coord.map((element, index)=>(
                          <option index={index} key={index}>{element.gov}</option>
                        ))}
                      </select>
                    </div>
                    <div className="row col-lg-12">
                    <div className="col-lg-6 mb-3">
                      <h6>Ville :</h6>
                    <select className="col-lg-12" onChange={(e)=> updateLoc("city", e.target.value)} value={locations[index].address.city}>
                        <option>--Ville--</option>
                        {coord.map((element, ind)=>{
                          if(element.gov === locations[index].address.state){
                            element.villes = element.villes.sort()
                            return(element.villes.map((ville, index2)=>(
                              <option key={ind + "," + index2}>{ville}</option>
                            )))
                          }
                          
                        }
                        )}
                      </select>
                    </div>
                    <div className="col-lg-6 mb-3">
                      <h6>Code Postal :</h6>
                      <input
                        placeholder="zipCode"
                        className="form-control"
                        id="zipCode"
                        type="number"
                        value={locations[index].address.zipCode}
                        onChange={(e) => updateLoc("zipCode", parseFloat(e.target.value))}
                      />
                    </div>
                    </div>
                    
                   
                    <div className="col-lg-12 mb-3">
                      <h6>Rue :</h6>
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
                      <h6>Numéro :</h6>
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
                    
                    
                    <Dialog address={`${locations[index].address.streetName},${locations[index].address.city},${locations[index].address.state}`} setLatLng={updateLatLng} />
                </div>
                    
                  </div>
    )
}