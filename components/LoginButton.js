import { useAuth0 } from "@auth0/auth0-react";

const LoginButton =(props)=>{
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    return(
        !isAuthenticated && (
            <button className={props.class_name} onClick={()=>loginWithRedirect()}>
                Sign In
            </button>
        )
    );
}
export default LoginButton;