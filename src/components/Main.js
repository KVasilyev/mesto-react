import React from "react";
import api from "../utils/Api.js"
import Card from "./Card.js"

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getMyInfo(), api.getCards()]) 
      .then(([userInfo, cardsInfo]) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards(cardsInfo);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

    return (
    <main className="content">
        <section className="profile" aria-label="Профиль пользователя">
          <div className="profile__user">
            <button type="button" className="profile__change-avatar" onClick={props.onEditAvatar}><img className="profile__avatar" src={userAvatar} alt="Аватар Пользователя"/></button>
            <div className="profile__info">
              <div className="profile__name">
                <h1 className="profile__names">{userName}</h1>
                <button type="button" className="profile__button-edit" aria-label="Редактировать" onClick={props.onEditProfile}></button>
              </div>
              <p className="profile__job">{userDescription}</p>
            </div>
          </div>
          <button type="button" className="profile__button-add" aria-label="Добавить контент" onClick={props.onAddPlace}></button>
        </section>
        <section className="elements" aria-label="Список картинок">
          <ul className="elements__grid">
                {cards.map((card) => {
                    return (                    
                        <Card card={card} key={card._id} onCardClick={props.onCardClick}/>
                    )
                })}
          </ul>
        </section>
    </main>
    )
}

export default Main;