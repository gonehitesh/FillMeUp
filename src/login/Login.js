import React from "react";
import { GoogleLogin } from "react-google-login";

export default function Login() {
  const clientId =
    "329608136140-3jihk7s8b7t492c5tabklrfq1q03tjno.apps.googleusercontent.com";

    const onSuccess =(res)=>{
        console.log("login success", res)
    }
    const onFailure =(res)=>{
        console.log("failed login", res)
    }

  return (
    <div>
      <h2> Login Screen </h2>
      <div className="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Google Signin"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
      </div>
      
    </div>
  );
}
