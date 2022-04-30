import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function List(props){
    const [address, setAddress] = useState([])
    const [cookies] = useCookies(["colibrisID"]);
    let {handleNext ,setChosenAddr, ...others } = props
    useEffect(() => {
        axios
          .get(`${window.ENV.USER_SERVICE_URI}/location?userID=` + cookies.colibrisID)
          .then((res) => {
            let final = []
            for(let addr of res.data){
              //if(addr.address.streetName && addr.address.city && addr.address.state && addr.address.lat && addr.address.lng){
                final.push(addr)
              //}
            }
            setAddress(final);
          });
      }, [cookies.colibrisID]);

      const chooseAddr = (address)=>{
        setChosenAddr(address)
        handleNext()
      }
    return(
        <div className="col-l">
            {address.map((element, index)=>(
                <div className="green-box mb-3" key={index} onClick={()=>chooseAddr(element)}>
                    {element.address.streetNumber} {element.address.streetName}, {element.address.city}, {element.address.state}
                </div>
            ))}
        </div>
        
    )
}