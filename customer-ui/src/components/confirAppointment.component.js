export default function Confirm(props){
    return(
        <div>
            {props.chosenAddr.address.streetNumber} {props.chosenAddr.address.streetName}, {props.chosenAddr.address.city}, {props.chosenAddr.address.state}
                <br />
                {props.myDate.toDateString()}
                <br />
            {props.shift}
        </div>
    )
}