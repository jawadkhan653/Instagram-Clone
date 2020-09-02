import React from "react";

const Slider = () => {
  const [state, setState] = React.useState([
    { id: 1, image: "/images/jawad653.jpg", name: "shakil54" },
    { id: 2, image: "/images/0.jfif", name: "imrankhan" },
    { id: 3, image: "/images/imrankhan3.jpg", name: "aliShahi" },
    { id: 4, image: "/images/fawad1.jpg", name: "fawadkhan" },
    { id: 5, image: "/images/ahsan1.jpg", name: "ahsankhan" },
    { id: 6, image: "/images/feroz1.jpg", name: "feroz56" },
    { id: 7, image: "/images/shahid1.jpg", name: "Shahidafridi" },
    { id: 8, image: "/images/babar1.jpg", name: "babar" },
    { id: 9, image: "/images/ahmed1.jpg", name: "ahmed" },
  ]);
  return (
    <div className="slider">
      {state.map((user) => (
        <div className="slider__info" key={user.id}>
          <div className="slider__img">
            <span>
              <img src={user.image} alt="user" />
            </span>
          </div>
          <div className="slider__name">{user.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
