import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import DatePicker from './datePicker.component'
import Adresses from './listAddress.component'
import Shift from './shift.component'
import axios from 'axios';
import { useCookies } from "react-cookie";
import Confirm from './confirAppointment.component';


const steps = ['Select address', 'select Date', 'select shift', 'confirm appointment'];


export default function HorizontalLinearStepper(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [chosenAddr, setChosenAddr] = React.useState({})
    const [myDate, setMyDate] = React.useState()
    const [shift, setShift] = React.useState("morning")
    const [cookies] = useCookies(["colibrisID"]);
    let {id, close} = props

  const handleNext =  () => {
    if(activeStep === steps.length -1){
        let response = null
        fetch('config/APPOINT_SERVICE_URI')
        .then((r) => r.text())
        .then(async APPOINT_SERVICE_URI  => {
          if(id){
            response = await axios.put(`${APPOINT_SERVICE_URI}/${id}`, {
                dueDate: myDate, location: chosenAddr._id, shift: shift, createdBy: cookies.colibrisID
              })
            close(response.data);
            setActiveStep(0)
            return;
           }else{
             response = await axios.post(
                `${APPOINT_SERVICE_URI}`,
                { createdBy: cookies.colibrisID, dueDate: myDate, location: chosenAddr._id, shift: shift }
              );
           }
        })  
       
        
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  const handleReset = () => {
    setChosenAddr({});
    setMyDate(null);
    setShift("morning")

    setActiveStep(0);
  };

  const generate = (step)=>{
    switch(step){
        case 0:   return(<Adresses handleNext={handleNext} setChosenAddr={setChosenAddr}   />)
        case 1:   return(<DatePicker myDate={myDate} setMyDate={setMyDate} chosenAddr={chosenAddr} />)
        case 2:   return(<Shift shift={shift} setShift={setShift} handleNext={handleNext}  />)
        case 3:   return(<Confirm myDate={myDate} shift={shift} chosenAddr={chosenAddr} />)
        default:  return(<div></div>)

    }
}

  return (
    <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {          
            return (
              <Step key={label}>
                <StepLabel >{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper> 
      
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
           <h2 className='text-center mt-3'> All steps completed - you&apos;re finished</h2>
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <button className="outlined-btn" onClick={handleReset}>Reset</button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}></Typography>
          {generate(activeStep)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <button
              className='btn-circle'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>
            {activeStep === steps.length - 1 ? 
                <span onClick={handleReset} className="outlined-btn ml-much">Reset</span>
              :
              <div></div>
            }

            <Box sx={{ flex: '1 1 auto' }} />
            
            {activeStep === 0? <div></div>:

            <div onClick={handleNext} >

            {activeStep === steps.length - 1 ? 
            <span className="simple-btn mt-2">Finish</span> : 

              <a className="btn-circle">
            <i className="fa-solid fa-angle-right"></i>
            </a>}
            </div>

            }
            
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}