import React from "react";
import { InstagramProvider } from "../Global/InstagramState";
import firebase from "firebase";
import { auth } from "../config";
const Accounts = () => {
  const { model, closeModel, registerUser, loginUser } = React.useContext(
    InstagramProvider
  );
  console.log("my model", model);
  const [state, setState] = React.useState({
    register: true,
    login: false,
  });
  const accountToggle = () => {
    setState({
      register: !state.register,
      login: !state.login,
    });
  };
  const closeForm = (e) => {
    const className = e.target.getAttribute("class");
    if (className === "accounts") {
      closeModel();
    }
  };
  const [input, setInput] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const changeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const register = (e) => {
    e.preventDefault();
    registerUser(input);
  };
  const login = (e) => {
    e.preventDefault();
    loginUser(input);
  };
  const signupgoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("google user", user);
        firebase.auth().signInWithRedirect(provider);
        // ...
      })
      .catch(function (error) {
        console.log("Google error: ", error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  return (
    <>
      {model ? (
        <div className="accounts" onClick={closeForm}>
          {state.register ? (
            <div className="accounts__same">
              <form onSubmit={register}>
                <div className="accounts__group">
                  <img src="/images/instagramLogo.png" alt="" />
                </div>
                <div className="accounts__group">
                  <input
                    type="text"
                    name="username"
                    className="accounts__input"
                    placeholder="Username..."
                    value={input.username}
                    onChange={changeInput}
                    required
                  />
                </div>
                <div className="accounts__group">
                  <input
                    type="email"
                    name="email"
                    className="accounts__input"
                    placeholder="Email..."
                    value={input.email}
                    onChange={changeInput}
                    required
                  />
                </div>
                <div className="accounts__group">
                  <input
                    type="password"
                    name="password"
                    className="accounts__input"
                    placeholder="Create Password..."
                    value={input.password}
                    onChange={changeInput}
                    required
                  />
                </div>
                <div className="accounts__group">
                  <input
                    type="submit"
                    value="Register"
                    className="btn btn-smart btn-block"
                  />
                </div>
                <div className="accounts__group">
                  <span onClick={signupgoogle}>Signup with google</span>
                </div>
              </form>
              <div className="accounts__group">
                <span onClick={accountToggle}>
                  {state.register
                    ? "Already have an account"
                    : "Create a new account"}
                </span>
              </div>
            </div>
          ) : (
            <div className="accounts__same">
              <form onSubmit={login}>
                <div className="accounts__group">
                  <img src="/images/instagramLogo.png" alt="" />
                </div>
                <div className="accounts__group">
                  <input
                    type="email"
                    name="email"
                    className="accounts__input"
                    placeholder="Email..."
                    value={input.email}
                    onChange={changeInput}
                    required
                  />
                </div>
                <div className="accounts__group">
                  <input
                    type="password"
                    name="password"
                    className="accounts__input"
                    placeholder="Create Password..."
                    value={input.password}
                    onChange={changeInput}
                    required
                  />
                </div>
                <div className="accounts__group">
                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-smart btn-block"
                  />
                </div>
              </form>
              <div className="accounts__group">
                <span onClick={accountToggle}>
                  {state.register
                    ? "Already have an account"
                    : "Create a new account"}
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Accounts;
