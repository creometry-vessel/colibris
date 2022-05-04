import axios from 'axios'
import { useEffect, useState } from 'react'
import Dialog from './dialogZone.component'
let weekdays = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
export default function Zone(){
    const [zones, setZones] = useState([]);
    useEffect(()=>{
        getZones()
    }, [])
    const getZones = ()=>{
        axios.get(`${window.ENV.ZONE_SERVICE_URI}`).then(res=>{
            setZones(res.data.data.zones)
        })
    }
    const getZoneData = (weekday)=>{
        for(let zone of zones){
            if(zone.weekday == weekday) return zone;
        }
        return null;
    }
    return(
    <div>
        <div className="row ">
        {weekdays.map((weekday, index)=>(
            <Dialog weekday={weekday} key={index} zoneData={getZoneData(weekday)} refresh={getZones} />
        ))}
       
        </div>
    </div>
    )
    
}