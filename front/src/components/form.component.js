import { useState } from "react"
import axios from "axios"
export default function Form(){
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [lat, setlat] = useState(0)
    const [lng, setlng] = useState(0)
    const Submit = ()=>{
        if(!name || !phone || !address || !lat || !lng){
            window.alert("please fill all the form")
            return;
        }
        if(phone.length !== 8){
            window.alert("phone number should be an 8 digit")
            return;
        }
        if(lat>90 || lat<-90){
            window.alert("insert a valid latitude")
            return;
        }
        if(lng>180 || lng<-180){
            window.alert("insert a valid longitude")
            return;
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URI}/marker`, {
            name: name,
            phone: phone,
            address: address,
            lat: lat,
            lng: lng
        }).then(res=>{
            if(res.data.data){
                window.alert("marker registered successfully !!!")
                setName("");
                setPhone("");
                setAddress("");
                setlat(0);
                setlng(0);
            }
        }).catch(err=> window.alert(err))
    }
    return(
        <div>
            <p>nom et prenom</p>
            <input placeholder="nom et prenom" onChange={e=> setName(e.target.value)} value={name} />
            <p>numero de tel</p>
            <input placeholder="tel" onChange={e=> setPhone(e.target.value)} type="number" value={phone} />
            <p>addresse</p>
            <input placeholder="addresse" onChange={e=> setAddress(e.target.value)} value={address} />
            <p>latitude</p>
            <input placeholder="lat" onChange={e=> setlat(e.target.value)} type='number' value={lat} />
            <p>longitude</p>
            <input placeholder="lng" onChange={e=> setlng(e.target.value)} type='number' value={lng} />
            <br />
            <input type="button" value="submit" onClick={Submit} />
            <br />
            <button onClick={()=> window.location.href = "/markers"}>{"Map-->"}</button>

        </div>
    )
}