import React from "react";
import {
  FaRegHeart,
  FaRegComment,
  FaRegPaperPlane,
  FaRegBookmark,
} from "react-icons/fa";
const Reactions = () => {
  return (
    <div className="post__reactions">
      <div className="reactions__first">
        <span className="reactions">
          <FaRegHeart />
        </span>
        <span className="reactions">
          <FaRegComment />
        </span>
        <span className="reactions">
          <FaRegPaperPlane />
        </span>
      </div>
      <div className="reactions__last">
        <span>
          <FaRegBookmark className="bookmark" />
        </span>
      </div>
    </div>
  );
};

export default Reactions;
