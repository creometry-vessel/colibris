import AppointmentForm from "./appointment.form.component"

export default function Form() {
  


  return (
    <div>
      <div>
        <div className="page-header mb-3">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2>Appointements</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="booking">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-4">
                <div class="booking-content">
                  <div class="section-header">
                    <h2>
                      Book Your appointment & wait for our agent to call you{" "}
                    </h2>
                  </div>
                </div>
              </div>
              <div class="col-lg-8">
                <AppointmentForm close={()=>{
                  window.alert("Booked Successfully !");
                  window.location.href = "/";
                  }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
