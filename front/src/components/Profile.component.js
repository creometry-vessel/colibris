import { useEffect, useState } from "react";


let map = null;
let marker = null;
export default function Profile() {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const getInfo = (Lat, Lng) =>{
        if(marker) marker.setMap(null)
        const latlng = {
            lat: Lat,
            lng: Lng,
          };
          console.log(latlng)
          marker = new window.google.maps.Marker({
            position: latlng,
            map: map,
          });
          map.setCenter(latlng)
          map.setZoom(17)
    }
  useEffect(()=>{
    if(!window.google){
      const script = document.createElement("script");
      script.src = "https://maps.googleapis.com/maps/api/js?key="+process.env.REACT_APP_GOOGLE_API_KEY+"&callback=initMap&v=weekly";
      script.async = true
      document.body.appendChild(script);
    }
    setTimeout(()=>{
       map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: { lat: 36.80278, lng: 10.17972 },
      });
      map.addListener('click', async e=>{
        setLat(e.latLng.lat());
        setLng(e.latLng.lng());
        getInfo(e.latLng.lat(), e.latLng.lng())
    })
    }, 1000)
    
  },[])
  return (
    <div>
      
    <div id="map" style={{width: "100%", height: "400px"}}></div>
    <input placeholder='lat' id="lat" type="number" value={lat} onChange={(e)=> setLat(parseFloat(e.target.value))}/>
    <input placeholder='lng' id="lng" type="number" value={lng} onChange={(e)=> setLng(parseFloat(e.target.value))}/>
    <button onClick={()=> getInfo(lat, lng)}>click here</button>
    <p>{lat}</p>
    <p>{lng}</p>
    </div>
  );
}

