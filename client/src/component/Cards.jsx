import React from "react";
import style from "../Css/Cards.module.css";

// Cards component
const Cards = ({ image, name, description, dateLastEdited }) => {
  // Convert dateLastEdited prop to a Date object
  const date = new Date(dateLastEdited);

  // Format the date to a localized string representation
  const formattedDate = date.toLocaleDateString();

  // Format the time to a localized string representation
  const formattedTime = date.toLocaleTimeString();

  return (
    <div className={style.card}>
      {/* Card image */}
      <img src={image} alt="Card" className={style.card_image} />

      <div className={style.card_content}>
        {/* Card title */}
        <h2 className={style.card_title}>Title: {name}</h2>

        {/* Card description */}
        <p className={style.card_description}>Description: {description}</p>

        {/* Modified date */}
        <p className={style.card_description}>Modified at: {formattedDate + " " + formattedTime}</p>
      </div>
    </div>
  );
};

export default Cards;
