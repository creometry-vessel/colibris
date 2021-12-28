import { useEffect, useRef } from "react";
export default function Address(props) {
  const _map = useRef(null);
  const _marker = useRef(null);
  const _geocode = useRef(null);
    
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
          try {
             _geocode.current = new window.google.maps.Geocoder();
             _map.current = new window.google.maps.Map(document.getElementById(props.id), {
              zoom: 11,
              center: { lat: 36.80278, lng: 10.17972 },
            });
            _map.current.addListener("click", async (e) => {
              /*_geocode.current.geocode({location: {lat: e.latLng.lat(), lng: e.latLng.lng()}}, (results, status)=>{
                console.log(results);
              })*/
              props.setLat(e.latLng.lat());
              props.setLng(e.latLng.lng());
              getInfo(e.latLng.lat(), e.latLng.lng());
              
            });
          } catch (err) {
            console.error(err);
          }
        }, 1000);
      }, []);

  const getInfo = (Lat, Lng) => {
        if (_marker.current) _marker.current.setMap(null);
        const latlng = {
          lat: Lat,
          lng: Lng,
        };
        try {
          _marker.current = new window.google.maps.Marker({
            position: latlng,
            map: _map.current,
          });
          _map.current.setCenter(latlng);
          _map.current.setZoom(17);
        } catch (err) {
          console.error(err);
        }
      };

  const getMarkerFromAddress = ()=>{
    _geocode.current.geocode({address: `${props.street} , ${props.city}, ${props.gov}`}, (results, status)=>{
      if (status == 'OK') {
        console.log(results.length)
        getInfo(results[0].geometry.location.lat(), results[0].geometry.location.lng())
        props.setLat(results[0].geometry.location.lat());
        props.setLng(results[0].geometry.location.lng());
      }else{
        alert("on ne peut pas trouver cette addresse")
      } 
  })
  }
    return(
        <div >
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                      <input
                        placeholder="rue"
                        className="form-control"
                        value={props.street}
                        onChange={(e) => props.setStreet(e.target.value)}
                      />
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                      <input
                        placeholder="ville"
                        className="form-control"
                        value={props.city}
                        onChange={(e) => props.setCity(e.target.value)}
                      />
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                      <input
                        placeholder="governorat"
                        className="form-control"
                        value={props.gov}
                        onChange={(e) => props.setGov(e.target.value)}
                      />
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                      <input
                        placeholder="lat"
                        className="form-control"
                        id="lat"
                        type="number"
                        value={props.lat}
                        onChange={(e) => props.setLat(parseFloat(e.target.value))}
                      />
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                      <input
                        placeholder="lng"
                        className="form-control"
                        id="lng"
                        type="number"
                        value={props.lng}
                        onChange={(e) => props.setLng(parseFloat(e.target.value))}
                      />
                    </div>
                    <div
                        id={props.id}
                        className="mt-3 container-fluid"
                        style={{ width: "90%", height: "400px" }}
                    ></div>
                    <button onClick={()=>getMarkerFromAddress()}>get marker</button>
                  </div>
    )
}