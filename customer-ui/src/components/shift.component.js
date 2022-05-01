

export default function List(props){
    let {shift, setShift} = props


    return(
        <div>
            
             <label className="green-box" onClick={()=>{setShift("morning"); props.handleNext()}}>Morning</label>
             <label className="green-box" onClick={()=>{setShift("afternoon"); props.handleNext()}} >Afternoon</label>
        </div>
        
    )
}