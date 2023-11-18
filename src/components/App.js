import React, { useEffect } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";


import api from "../utils/Api.js"

import { currentUserContext } from '../context/CurrentUserContext.js';


function App() {

  // Card
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    Promise.all([api.getCards()]) 
      .then(([cardsInfo]) => {
        setCards(cardsInfo);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  //Юзер-стейт
  const [currentUser, setCurrentUser] = React.useState({});
  useEffect(() => {
    api.getMyInfo()
    .then((res) => {  
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

  //Лайки
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.likeToggle(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    }) 
  }

  //Удаление
  function handleCardDelete(card) {
    api.deleteCards(card._id)
    .then(() => {
      setCards((cards) => cards.filter((item) => item._id !== card._id));
    })
    .catch(err => {
      console.log(err);
    })
  }


  // Константы
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  // Редактирование профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // Смена аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // Редактирование профиля
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // Открытие попапа с картинкой
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Закрытие всех попапаов
  function closeAllPopups() {
      setIsEditProfilePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsAddPlacePopupOpen(false); 
      setSelectedCard(null);
  }

  // Меняем Имя и Обо мне
  function handleUpdateUser(data) {
    api.setMyInfo(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // Меняем Аватар
  function handleUpdateAvatar(data) {
    api.setMyAvatar(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // Добавляем карточки
    function handleAddPlaceSubmit(data) {
      api.addCards(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
    }

  return (
    <currentUserContext.Provider value={currentUser}>
    <div className="page">    
    <Header />    
    <Main 
      onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
      cards={cards}
    />
    <Footer />

    <EditProfilePopup 
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups} 
      onUpdateUser={handleUpdateUser}
    />

    <EditAvatarPopup 
      isOpen={isEditAvatarPopupOpen} 
      onClose={closeAllPopups} 
      onUpdateAvatar={handleUpdateAvatar} 
    />

    <AddPlacePopup 
      isOpen={isAddPlacePopupOpen} 
      onClose={closeAllPopups} 
      onUpdateCardList={handleAddPlaceSubmit}
    /> 
    
    <ImagePopup 
      card={selectedCard} 
      onClose={closeAllPopups}
    />
    
  </div>
  </currentUserContext.Provider>
  );
}

export default App;
