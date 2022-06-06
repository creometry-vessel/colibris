import { useCookies } from "react-cookie";
import FacebookLogin from 'react-facebook-login';
import axios from 'axios'
export default function Sign(props){
    const [cookies, setCookies ] = useCookies(["AdminCol"]);

    const Login= async(userInfo)=>{

            try{
                if(userInfo.userID){
                    fetch('config/USER_SERVICE_URI')
                    .then((r) => r.text())
                    .then(async USER_SERVICE_URI  => {
                        let response = await axios.post(`${USER_SERVICE_URI}/auth/facebook`, userInfo)
                        if(response.data.providerID){
                        setCookies("AdminCol", response.data._id )
                        window.location.reload()
                        }
                        else{
                        window.alert("couldn't connect to facebook")
                        }                
                    })            
                }
            }
            catch(err){
                console.log(err)
            }
        }
    return(
        <div className="row">
            <FacebookLogin
                appId={window.ENV.FACEBOOK_APP_ID}
                autoLoad={true}
                fields="name,email,picture"
                callback={Login}
                cssclassName="facebook-button"
                textButton={<span><i className="fa-brands fa-facebook mr-3"></i> Sign up with Facebook</span>} />
        </div>
    )
}