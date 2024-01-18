import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const [, dispatch] = useStateValue();

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      }); 
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <LoginIcon className="loginIcon" />
        <div className="login__text">
          <h1>Sign In</h1>
        </div>

        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
