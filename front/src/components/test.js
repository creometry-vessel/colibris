export default function Profile() {

    return(<p>
        {process.env.REACT_APP_USER_SERVICE_URI}
    </p>)
}