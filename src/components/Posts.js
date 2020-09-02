import React from "react";
import Reactions from "./Reactions";
import CommentBox from "./CommentBox";

import Loader from "./Loader";
import { InstagramProvider } from "../Global/InstagramState";
const Posts = () => {
  const { posts, loader } = React.useContext(InstagramProvider);
  console.log("loader status :", loader);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        posts.map((post) => (
          <div className="posts" key={post.id}>
            <div className="post__header">
              <div className="post__header-img">
                {post.avator.toUpperCase()}
              </div>
              <div className="post__header-name">{post.username}</div>
            </div>
            <div className="post__body">
              <div className="post__image">
                <img src={post.image} alt="post" />
              </div>
              <Reactions />
              <div className="likes">9999</div>
              <div className="post__content">{post.title}</div>
              <CommentBox post={post} />
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Posts;
