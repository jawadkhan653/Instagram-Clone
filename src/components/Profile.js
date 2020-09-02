import React from "react";
import { InstagramProvider } from "../Global/InstagramState";
const Profile = () => {
  const { user, loader } = React.useContext(InstagramProvider);
  const avator = user && !loader && user.displayName ? user.displayName[0] : "";
  const profileImage = !loader && user ? user.photoURL : "";
  console.log("profile username: ");
  return (
    <div className="profile">
      <div className="profile__img">
        <img src={profileImage} alt={profileImage} />
      </div>
      <div className="profile__name">
        <p className="profile__name-name">shakil4035</p>
        <span>{user && !loader ? user.displayName : ""}</span>
      </div>
    </div>
  );
};

export default Profile;
