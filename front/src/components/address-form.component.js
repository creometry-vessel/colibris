import { useEffect } from "react";
export default function Address(props) {
    let map = null;
    let marker = null;

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
             map = new window.google.maps.Map(document.getElementById(props.id), {
              zoom: 11,
              center: { lat: 36.80278, lng: 10.17972 },
            });
            map.addListener("click", async (e) => {
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
        if (marker) marker.setMap(null);
        const latlng = {
          lat: Lat,
          lng: Lng,
        };
        try {
          marker = new window.google.maps.Marker({
            position: latlng,
            map: map,
          });
          map.setCenter(latlng);
          map.setZoom(17);
        } catch (err) {
          console.error(err);
        }
      };
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
                  </div>
    )
}