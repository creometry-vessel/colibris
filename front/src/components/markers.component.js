import { useEffect } from "react";
import axios from "axios";
import Dialog from "./dialog.component";
let marker = null;
let Gdata = {};
let map = null;
let geocoder = null;
let infowindow = null;
export default function Markers() {
  const geocodeLatLng = (data) => {
    Gdata = data;
    const latlng = {
      lat: data.lat,
      lng: data.lng,
    };
    geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          map.setZoom(11);
          if (marker) {
            marker.setMap(null);
          }
          marker = new window.google.maps.Marker({
            position: latlng,
            map: map,
          });
          //infowindow.setContent(`<p>${data.address}</p>`+response.results[0].formatted_address);
          infowindow.setContent(
            `<p>nom: ${data.name}</p>
            <p>numero tel: ${data.phone1} / ${data.phone2}</p>
            <p>addresse: ${data.street} , ${data.city} , ${data.governorate}</p>
            <p>formatted address: ${response.results[0].formatted_address}</p>
            `
          );
          infowindow.open(map, marker);
        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  };
  const getMarker = (status, ...args) => {
    if (marker) {
      marker.setMap(null);
    }
    axios
      .put(`${window.ENV.APPOINT_SERVICE_URI}`, {
        //today: (new Date()+"").substring(4,15),
        today: (new Date()+"").substring(4,15),
        userID: Gdata.userID,
        status: status,
        description: args[0] ? args[0] : "",
      })
      .then((res) => {
        if (res.data.data) geocodeLatLng(res.data.data);
        else window.alert("you have no more markers");
      });
  };

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        window.ENV.GOOGLE_API_KEY +
        "&callback=initMap&v=weekly";
      script.async = true;
      document.body.appendChild(script);
    }
    setTimeout(() => {
      map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: { lat: 36.80278, lng: 10.17972 },
      });
      getMarker(undefined);
      geocoder = new window.google.maps.Geocoder();
      infowindow = new window.google.maps.InfoWindow();
    }, 1000);
  });

  return (
    <div>
      <div className="page-header mb-3">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Markers</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div id="map" style={{ width: "100%", height: "400px" }}></div>
        <div className="mt-2 row align-items-center">
          <div className="col-lg-5"></div>
          <div className="ml-2 mt-2">
            <input
              className="btn custom-btn"
              id="submit"
              type="button"
              value="next →"
              onClick={() => getMarker("success")}
            />
          </div>
          <div className="ml-3 mt-2">
            <Dialog getMarker={getMarker} />
          </div>
        </div>
      </div>
    </div>
  );
}
