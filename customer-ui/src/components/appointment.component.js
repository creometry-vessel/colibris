import AppointmentForm from "./appointment.form.component"
import Schedule from './scheduleAppointment.component'
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
        <div className="booking">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-4">
                <div className="booking-content">
                  <div className="section-header">
                    <h2>
                      Book Your appointment & wait for our agent to call you{" "}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <Schedule />
                {/*<AppointmentForm close={(message)=>{
                  window.alert(message);
                  window.location.href = "/";
                  }} />*/
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
