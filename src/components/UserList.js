import React from "react";
import Profile from "./Profile";
import Card from "./Card";

const UserList = () => {
  const [state, setState] = React.useState([
    { id: 1, img: "/images/fawad1.jpg", name: "Fawad" },
    { id: 2, img: "/images/ahsan1.jpg", name: "Ahsan" },
    { id: 3, img: "/images/imrankhan1.jpg", name: "Imran" },
    { id: 4, img: "/images/shahid1.jpg", name: "Shahid" },
    { id: 5, img: "/images/feroz1.jpg", name: "Feroz" },
  ]);
  const [cardStatus, setCardStatus] = React.useState({
    id: "",
    name: "",
    image: "",
    status: false,
  });
  const [info, setInfo] = React.useState({});
  const userCard = (user) => {
    setCardStatus({
      ...cardStatus,
      id: user.id,
      name: user.name,
      image: user.image,
      status: true,
    });
    setInfo(user);
  };

  const closeCard = () => {
    setCardStatus({
      ...cardStatus,
      status: false,
    });
  };
  return (
    <div className="list">
      <Profile />
      <div className="list__users">
        <h4>Suggestions For You</h4>
        {state.map((user) => (
          <div className="list__user" key={user.id}>
            <div
              className="list__empty"
              onMouseEnter={() => userCard(user)}
              onMouseLeave={closeCard}
            >
              <div className="list__user-img">
                <img src={user.img} alt="user" />
              </div>
              <div className="list__user-info">
                <p className="user-info-name">{user.name}</p>
              </div>
            </div>
            <div className="list__user-link">
              <a href="">Follow</a>
            </div>
            {cardStatus.status && cardStatus.id === user.id ? (
              <Card info={info} />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
