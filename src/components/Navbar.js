import React from "react";
import {
  FaSistrix,
  FaTelegramPlane,
  FaRegCompass,
  FaRegHeart,
} from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { InstagramProvider } from "../Global/InstagramState";
const Navbar = () => {
  const { openModel, user, logout, loader } = React.useContext(
    InstagramProvider
  );
  // const showUser = () => {
  //   if (user) {
  //     return (
  //       <>
  //       {!loader ? () : ''}
  //       </>
  //       <span>
  //         {user.displayName} / <span onClick={logoutUser}>Logout</span>
  //       </span>
  //     );
  //   } else {
  //     return <span onClick={openAccounts}>Register/Login</span>;
  //   }
  // };
  const showUser = () => {
    return !loader ? (
      user ? (
        <div className="both">
          <span className="navbar__profile">
            <img src={user.photoURL} alt={user.photoURL} />
          </span>
          <span onClick={logoutUser} className="logout">
            Logout
          </span>
        </div>
      ) : (
        <span onClick={openAccounts}>Register / Login</span>
      )
    ) : (
      "loading..."
    );
  };
  const openAccounts = () => {
    openModel();
  };
  const logoutUser = () => {
    logout();
  };
  return (
    <div className="navbar">
      <div className="navbar__first">
        <div className="navbar__first-logo">
          <img src="/images/instagramLogo.png" alt="logo" />
        </div>
      </div>
      <div className="navbar__middle">
        <div className="navbar__search">
          <input
            type="text"
            className="navbar__search-bar"
            placeholder="Search"
          />
          <FaSistrix className="navbar__searchIcon" />
        </div>
      </div>
      <div className="navbar__last">
        <li>
          <MdHome className="navbar__last-icon" />
        </li>
        <li>
          <FaTelegramPlane className="navbar__last-icon" />
        </li>
        <li>
          <FaRegCompass className="navbar__last-icon" />
        </li>
        <li>
          <FaRegHeart className="navbar__last-icon" />
        </li>
        {/* <li>
          <div className="navbar__profile">
            <img src="/images/0.jfif" alt="user" />
          </div>
        </li> */}
        <li className="only">{showUser()}</li>
      </div>
    </div>
  );
};

export default Navbar;
