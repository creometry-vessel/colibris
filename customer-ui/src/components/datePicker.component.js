import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
let arr = ['2022-02-20', '2022-02-02']

export default function StaticDatePickerLandscape(props) {
    let {myDate, setMyDate} = props;
    const fn = (date)=>{
        for(let mDate of arr){
                if(date.toDateString() == new Date(mDate).toDateString()){
                    return false
                }
        }
        return true
    }
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          orientation="landscape"
          openTo="day"
          value={myDate}
          shouldDisableDate={fn}
          onChange={(newValue) => {
            console.log(newValue.toDateString())
            setMyDate(newValue.toDateString());
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }