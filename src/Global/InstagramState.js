import React, { createContext } from "react";
import { auth } from "../config";
import { db } from "../config";
export const InstagramProvider = createContext();

const InstagramState = (props) => {
  const [posts, setPosts] = React.useState([]);
  const [model, setModel] = React.useState(false);
  const closeModel = () => {
    setModel(false);
  };
  const [loader, setLoader] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const openModel = () => {
    setModel(true);
  };
  const registerUser = async (user) => {
    const { username, email, password } = user;
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      res.user.updateProfile({ displayName: username });
      auth.onAuthStateChanged((userr) => {
        setUser(userr);
        setLoader(false);
        // console.log("register user set user ", user);
      });
      setModel(false);
    } catch (error) {
      console.log(error);
    }
  };
  const loginUser = async (user) => {
    // console.log("login user: ", user);
    const { email, password } = user;
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      setModel(false);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // console.log("current user: ", user);
      setUser(user);
      setLoader(false);
    });
  }, [user, loader]);
  React.useEffect(() => {
    // setLoader(true);
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              title: doc.data().title,
              image: doc.data().image,
              username: doc.data().username,
              avator: doc.data().username[0],
            };
          })
        );
      });
    // setLoader(false);
  }, [loader]);
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("context user: ", user);
  return (
    <InstagramProvider.Provider
      value={{
        model,
        closeModel,
        openModel,
        registerUser,
        user,
        logout,
        loginUser,
        loader,
        posts,
      }}
    >
      {props.children}
    </InstagramProvider.Provider>
  );
};

export default InstagramState;
