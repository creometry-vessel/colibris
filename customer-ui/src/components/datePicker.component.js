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
      axios.get(`${window.ENV.ZONE_SERVICE_URI}/findbycity?city=${props.chosenAddr.address.city}`).then(res=>{
        let result = [];
          for(let day of res.data.data){
            switch(day){
              case "dimanche": result = [...result, 0]; break;
              case "lundi": result = [...result, 1]; break;
              case "mardi": result = [...result, 2]; break;
              case "mercredi":  result = [...result, 3]; break;
              case "jeudi": result = [...result, 4]; break;
              case "vendredi":  result = [...result, 5]; break;
              case "samedi":  result = [...result, 6]; break;
            }
          }
          setDays(result)
      }).catch(err=>console.log(err))
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
            setMyDate(newValue.toDateString());
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }