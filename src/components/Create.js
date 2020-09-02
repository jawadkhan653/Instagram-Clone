import React from "react";
import { InstagramProvider } from "../Global/InstagramState";
import { storage, db } from "../config";
import firebase from "firebase";
import { FaCameraRetro } from "react-icons/fa";
const Create = () => {
  const { loader, user } = React.useContext(InstagramProvider);
  const [state, setState] = React.useState({
    title: "",
    image: "",
  });
  const [status, setStatus] = React.useState(null);
  const changeInput = (e) => {
    setState({
      ...state,
      title: e.target.value,
    });
  };
  const handleChange = (e) => {
    console.log(e.target.files[0]);
    setState({
      ...state,
      image: e.target.files[0],
    });
  };
  const createPost = (e) => {
    e.preventDefault();
    const upload = storage.ref(`images/${state.image.name}`).put(state.image);
    upload.on(
      "state_changed",
      (snapshot) => {
        //progress function
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setStatus(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(state.image.name)
          .getDownloadURL()
          .then((url) => {
            // post image in the db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              title: state.title,
              image: url,
              username: user.displayName,
            });
            setState({ title: "", image: "" });
            setStatus(null);
          });
      }
    );
  };
  return (
    <>
      {!loader ? (
        user ? (
          <div className="create">
            <form onSubmit={createPost}>
              <div className="create__input">
                <h3>Create a post</h3>
                <input
                  type="text"
                  name=""
                  className="create__input-c"
                  placeholder="What are in your mind"
                  value={state.title}
                  onChange={changeInput}
                  required
                />
              </div>
              <div className="create__second">
                <div className="create__second-f">
                  <label htmlFor="uploadImage" className="create__label">
                    <FaCameraRetro className="uploadIcon" />
                  </label>
                  <input
                    type="file"
                    name=""
                    id="uploadImage"
                    className="create__file"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="create__second-b">
                  <input
                    type="submit"
                    value="Create"
                    className="create__second-btn"
                  />
                </div>
              </div>
            </form>
            {status ? status : ""}
          </div>
        ) : (
          ""
        )
      ) : (
        "loading...."
      )}
    </>
  );
};

export default Create;
