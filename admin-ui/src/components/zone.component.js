import Dialog from './dialogZone.component'
let weekdays = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
export default function Zone(){
    return(
    <div>
        <div className="row ">
        {weekdays.map((weekday, index)=>(
            <Dialog weekday={weekday} key={index}/>
        ))}
       
        </div>
    </div>
    )
    
}