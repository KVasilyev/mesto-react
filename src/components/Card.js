import React from "react";

function Card(props) { 

  function handleClick() {
    props.onCardClick(props.card);
  } 

    return (
    <li className="elements__element" id={props.card._id}>
        <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
        <div className="elements__info">
          <h2 className="elements__name">{props.card.name}</h2>
          <button type="button" className="elements__button-like" aria-label="Лайк"></button>
          <span className="elements__like">{props.card.likes.length}</span>
        </div>
        <button type="button" className="elements__button-delete" aria-label="Удалить карточку"></button>
      </li>
    )
}

export default Card;