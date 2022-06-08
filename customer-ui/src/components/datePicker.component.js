import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function StaticDatePickerLandscape(props) {
    let {myDate, setMyDate} = props;
    const [days, setDays] = useState([]);
    useEffect(()=>{
      fetch('config/ZONE_SERVICE_URI')
    .then((r) => r.text())
    .then(ZONE_SERVICE_URI  => {
      axios.get(`${ZONE_SERVICE_URI}/findbycity?city=${props.chosenAddr.address.city}`).then(res=>{
        if(res.status != 200) {alert("server error!!!"); return;}
        let result = [];
          for(let day of res.data.data){
            switch(day){
              case "Dimanche": result = [...result, 0]; break;
              case "Lundi": result = [...result, 1]; break;
              case "Mardi": result = [...result, 2]; break;
              case "Mercredi":  result = [...result, 3]; break;
              case "Jeudi": result = [...result, 4]; break;
              case "Vendredi":  result = [...result, 5]; break;
              case "Samedi":  result = [...result, 6]; break;
            }
          }
          setDays(result)
      }).catch(err=>console.log(err))    })  
      
    },[])
    const fn =  (date)=>{
        return days.indexOf(date.getDay()) == -1 || date < new Date()
    }
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          orientation="landscape"
          openTo="day"
          value={myDate}
          shouldDisableDate={fn}
          onChange={(newValue) => {
            if(newValue > new Date()){
              props.handleNext()
            }
            setMyDate(newValue.toDateString());
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }