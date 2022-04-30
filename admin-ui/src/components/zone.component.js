let weekdays = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
export default function Zone(){
    return(
    <div>
        <div className="row ">
        {weekdays.map((weekday, index)=>(
            <div key={index} className="mx-2 my-2" style={{width: "200px", height: "200px", borderColor: "black", borderWidth: "1px", borderStyle: "solid"}}>
                 {weekday}
            </div>
        ))}
       
        </div>
    </div>
    )
    
}