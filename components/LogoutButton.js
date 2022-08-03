import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton =(props)=>{
    const {logout, isAuthenticated} = useAuth0();

    return(
        isAuthenticated && (
            <button className={props.class_name} onClick={()=>logout({returnTo: window.location.origin})}>
                Sign Out
            </button>
        )
    );
}

export default LogoutButton;