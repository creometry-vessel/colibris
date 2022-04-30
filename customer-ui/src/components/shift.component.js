

export default function List(props){
    let {shift, setShift} = props


    return(
        <div>
            <input 
            type='radio' 
            name="shift"
            onChange={()=>{setShift("morning")}}
            checked={shift == "morning"}
            /> <label className="green-box"
            > morning</label>
            <br></br>
            <input 
            type='radio' 
            name="shift"
            onChange={()=>{setShift("afternoon")}}
            checked={shift == "afternoon"}
            />  <label             className="green-box"
            >afternoon</label>
        </div>
        
    )
}