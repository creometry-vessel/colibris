import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
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

  const handleNext = async () => {
    if(activeStep == steps.length -1){
        let response = null
       if(id){
        response = await axios.put(`${window.ENV.APPOINT_SERVICE_URI}/${id}`, {
            dueDate: myDate, location: chosenAddr._id, shift: shift, contact: cookies.colibrisID
          })
        close(response.data);
        setActiveStep(0)
        return;
       }else{
         response = await axios.post(
            `${window.ENV.APPOINT_SERVICE_URI}`,
            { createdBy: cookies.colibrisID, dueDate: myDate, location: chosenAddr._id, shift: shift, contact: cookies.colibrisID }
          );
            console.log(response.data)
       }
        
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  const handleReset = () => {
    setChosenAddr({});
    setMyDate(null);
    shift("morning")

    setActiveStep(0);
  };

  const generate = (step)=>{
    switch(step){
        case 0: return(<Adresses handleNext={handleNext} setChosenAddr={setChosenAddr}   />)
        case 1: return(<DatePicker myDate={myDate} setMyDate={setMyDate}   />)
        case 2: return(<Shift shift={shift} setShift={setShift}  />)
        case 3: return(<Confirm myDate={myDate} shift={shift} chosenAddr={chosenAddr} />)


    }
}
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {          
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}></Typography>
          {generate(activeStep)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            {activeStep == steps.length - 1 ? 
                        <Button onClick={handleReset}>Reset</Button>
              :
              <div></div>
            }

            <Box sx={{ flex: '1 1 auto' }} />
            
            {activeStep == 0? <div></div>:
            <Button onClick={handleNext}>
                
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>

          }
            
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}