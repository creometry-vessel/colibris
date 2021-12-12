import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from 'react-cookie';

export default function History(props){
    const [cookies] = useCookies(['colibrisID']);
    const [current, setCurrent] = useState([]);
    const [ancient, setAncient] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:5000/appointment/"+cookies.colibrisID).then(res=>{
            console.log(res.data)
            setCurrent(res.data.current);
            setAncient(res.data.ancient);
        })
    }, [])

    const deleteApp = (id)=>{
        axios.delete("http://localhost:5000/appointment", {data: {id : id}})
    }

    return (
    <div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <h2>Current:</h2>
        {current.map((element, index)=>(
            <div>
                <p>{element.Date}</p> 
                <div onClick={()=>deleteApp(element._id)} >
                    <p style={{color: "red"}} >X</p>
                </div >
            </div>
        ))}
        <h2>Ancient:</h2>
        {ancient.map((element, index)=>(
            <div>
                <p>{element.Date}</p>
                <p>{element.status}</p>
                <p>{element.description}</p>

            </div>
        ))}
    </div>)
}