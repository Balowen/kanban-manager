import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, google } from "../../firebase";
import { Header } from "../../components/layout/Header";
import "./login.scss";

const INPUTS = Object.freeze({
  email: Symbol("email"),
  password: Symbol("password"),
});

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const clearError = () => {
    if (errorResponse != "") {
      setErrorResponse("");
    }
  };

  const updateValue = (type, e) => {
    clearError();
    switch (type) {
      case INPUTS.email:
        setEmail(e.target.value);
        break;
      case INPUTS.password:
        setPassword(e.target.value);
        break;
    }
  };

  const trySignIn = async () => {
    setLoading(true);

    await auth.signInWithEmailAndPassword(email, password).catch((err) => {
      setPassword("");
      switch (err.code) {
        default:
          setErrorResponse("An unknown error has occured");
      }
    });
    history.push("/");

    setLoading(false);
  };

  const trySignUp = async () => {
    setLoading(true);
    await auth.createUserWithEmailAndPassword(email, password).catch((err) => {
      switch (err.code) {
        case "auth/email-already-in-use":
          setErrorResponse(err.message);
          break;
        default:
          setErrorResponse("An unknown error has occurred");
      }
    });
    history.push("/");

    setLoading(false);
  };

  const trySignInWithGoogle = async () => {
    setLoading(true);

    await auth.signInWithPopup(google).catch((err) => {
      switch (err.code) {
        default:
          setErrorResponse("An unknown error has occurred");
      }
    });
    history.push("/");

    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="sign_in">
        <span>Email:</span>
        <input
          type="text"
          value={email}
          onChange={updateValue.bind(null, INPUTS.email)}
        />
        <span>Hasło:</span>
        <input
          type="password"
          value={password}
          onChange={updateValue.bind(null, INPUTS.password)}
        />
        <div className="error_response">{errorResponse}</div>
        <button onClick={trySignIn} disabled={loading}>
          Zaloguj
        </button>{" "}
        <button onClick={trySignUp} disabled={loading}>
          Zarejestruj się
        </button>
        <button onClick={trySignInWithGoogle} disabled={loading}>
          Lub zaloguj kontem Google
        </button>
      </div>
    </>
  );
}
