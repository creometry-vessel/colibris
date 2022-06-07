import {useEffect, useState} from 'react'
import axios from 'axios'
export default function Config(props){
    const [key, setKey] = useState("")
    const [max, setMax] = useState(0)
    useEffect(()=>{
        fetch('config/ADMIN_SERVICE_URI')
        .then((r) => r.text())
        .then( ADMIN_SERVICE_URI  => {
            axios.get(`${ADMIN_SERVICE_URI}/config/key`).then(key=>{
                setKey(key.data);
            })
            axios.get(`${ADMIN_SERVICE_URI}/config/max`).then(max=>{
                setMax(max.data);
            })
        }) 
    }, [])

    const Submit = ()=>{
        fetch('config/ADMIN_SERVICE_URI')
        .then((r) => r.text())
        .then( ADMIN_SERVICE_URI  => {
            let promise1 = axios.post(`${ADMIN_SERVICE_URI}/config/key`, {key: key})
            let promise2 = axios.post(`${ADMIN_SERVICE_URI}/config/max`, {max: max})
            Promise.all([promise1, promise2]).then(()=>{
                alert("done")
            })
        }) 
    }
return(
    <div>
        <p>API KEY</p>
        <input value={key} onChange={e=>setKey(e.target.value)} />
        <p>MAX APPOINTMENTS PER DAY:</p>
        <input type="number" value={max} onChange={e=>setMax(e.target.value)}/>
        <button onClick={Submit}>Submit</button>
    </div>
    )
}