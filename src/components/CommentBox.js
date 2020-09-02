import React from "react";
import { db } from "../config";
import firebase from "firebase";
import { InstagramProvider } from "../Global/InstagramState";
const CommentBox = (props) => {
  const { user } = React.useContext(InstagramProvider);
  const [state, setState] = React.useState("");
  const username = user ? user.displayName : "Unkown";
  const { id } = props.post;
  const [comments, setComments] = React.useState([]);
  const inputChange = (e) => {
    setState(e.target.value);
  };
  const submitComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(id).collection("comments").add({
      text: state,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setState("");
  };
  React.useEffect(() => {
    db.collection("posts")
      .doc(id)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // if()
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
  }, [id]);
  console.log("comments :", comments);
  return (
    <div className="comment__box">
      {comments.map((comment) => (
        <div className="comments__content">
          <div className="comments__content-username">{comment.username}</div>
          <div className="comments__content-textt">{comment.text}</div>
        </div>
      ))}
      <form onSubmit={submitComment}>
        <input
          type="text"
          name=""
          id=""
          className="comment__input"
          placeholder="Add a comment..."
          value={state}
          onChange={inputChange}
        />
      </form>
    </div>
  );
};

export default CommentBox;
