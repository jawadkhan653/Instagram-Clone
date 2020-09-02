import React from "react";

const Card = (props) => {
  console.log("info: ", props.info);
  const { img, name } = props.info;
  return (
    <>
      <div className="list__card">
        <div className="list__card-img">
          <img src={img} alt={img} />
        </div>
        <div className="list__card-name">
          <p>{name}</p>
          <p>Followers 34k</p>
        </div>
      </div>
    </>
  );
};

export default Card;
