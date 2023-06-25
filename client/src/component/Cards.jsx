import React from "react";
import style from "../Css/Cards.module.css";

const Cards = ({ image, name, description, dateLastEdited }) => {
  const date = new Date(dateLastEdited);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  return (
    <div className={style.card}>
      <img src={image} alt="Card" className={style.card_image} />
      <div className={style.card_content}>
        <h2 className={style.card_title}>Title: {name}</h2>
        <p className={style.card_description}>Description: {description}</p>
        <p className={style.card_description}>Modified at: {formattedDate+" "+formattedTime}</p>
      </div>
    </div>
  );
};

export default Cards;
