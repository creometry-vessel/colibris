import AppointmentForm from "./appointment.form.component"
import Schedule from './scheduleAppointment.component'
export default function Form() {
  


  return (
    <div>
      <div>
        <div className="no-header mb-3">
         
        </div>
  

        <div className="booking">
          <div className="container">
            <div className="align-items-center">
              <div className="">
                <div className="booking-content">
                  <div className="section-header">
                    <h3 className="align-items-center">
                      Book Your appointment & wait for our agent to call you :
                    </h3>
                  </div>
                </div>
              </div>
              <div className="">
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
