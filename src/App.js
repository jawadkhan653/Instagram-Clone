import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import Posts from "./components/Posts";
import UserList from "./components/UserList";
import Accounts from "./components/Accounts";
import Create from "./components/Create";
import InstagramState from "./Global/InstagramState";
function App() {
  return (
    <InstagramState>
      <Navbar />
      <div className="main">
        <Slider />
        <Create />
        <div className="instagram">
          <Posts />
          <UserList />
        </div>
      </div>
      <Accounts />
    </InstagramState>
  );
}

export default App;
