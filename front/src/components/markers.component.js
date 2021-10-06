import { useEffect } from "react";
import axios from 'axios'
import Dialog from './dialog.component'
let marker = null;
let Gdata = {};
let map = null;
let geocoder = null;
let infowindow = null;
export default function Markers() {
  const geocodeLatLng=(data)=>{
    Gdata = data
    const latlng = {
      lat: data.lat,
      lng: data.lng,
    };
    console.log(latlng)
    geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          map.setZoom(11);
          if(marker){
            marker.setMap(null)
          }
          marker = new window.google.maps.Marker({
            position: latlng,
            map: map,
          });
          //infowindow.setContent(`<p>${data.address}</p>`+response.results[0].formatted_address);
          infowindow.setContent(
            `<p>nom: ${data.name}</p>
            <p>numero tel: ${data.phone}</p>
            <p>addresse: ${data.address}</p>
            <p>formatted address: ${response.results[0].formatted_address}</p>
            `
          )
          infowindow.open(map, marker);
        } else {
          window.alert("No results found");
        }
        
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  }
  const getMarker = (status, ...args) => {
    if(marker){
      marker.setMap(null)
    }
    let ss = ""
    if(args.length>0){
      ss = "&description="+args[0]
    }
    axios.get(`${process.env.REACT_APP_BACKEND_URI}/marker?marker=${JSON.stringify(Gdata)}&status=${status + ss}`).then(res=>{
          if(res.data.data !== null)
        geocodeLatLng(res.data.data);
        else window.alert("you have no more markers")
      })
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
      getMarker(undefined);
       geocoder = new window.google.maps.Geocoder();
       infowindow = new window.google.maps.InfoWindow(); 
    }, 1000)
    
  })
  return (
    <div>
      
      <button onClick={()=>{window.location.href = "/"}}>{"<--Form"}</button>
    <div id="map" style={{width: "100%", height: "400px"}}></div>
      <input id="submit" type="button" value="next" onClick={()=>getMarker('success')} />
      <Dialog getMarker={getMarker} />
    </div>
  );
}

