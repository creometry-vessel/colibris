import {useEffect, useState} from 'react'
export default function Config(props){
    const [key, setKey] = useState("")
    const [max, setmax] = useState(0)
    useEffect(()=>{

    }, [])

    const Submit = ()=>{

    }
return(
    <div>
        <p>API KEY</p>
        <input value={key} onChange={e=>setKey(e.target.value)} />
        <p>MAX APPOINTMENTS PER DAY:</p>
        <input type="number" value={max} onChange={e=>setmax(e.target.value)}/>
        <button onClick={Submit}>Submit</button>
    </div>
    )
}