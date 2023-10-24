import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {

  // Редактирование профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // Смена аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // Редактирование профиля
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // Открытие попапа с картинкой
  const [selectedCard, setSelectedCard] = React.useState(null);
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

  return (
    <div className="page">
    <Header />    
    <Main 
      onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
    />
    <Footer />

    <PopupWithForm 
      name='edit' 
      isOpen={isEditProfilePopupOpen} 
      title="Редактировать профиль"
      buttonText="Сохранить"
      onClose={closeAllPopups}
    >
      <input className="popup__input input input_type_name" placeholder="Имя" type="text" id="name" name="name" minLength="2" maxLength="40" required />
      <span className="popup__input-error name-input-error"></span>
      <input className="popup__input input input_type_job" placeholder="Работа" type="text" id="about" name="about" minLength="2" maxLength="200" required />
      <span className="popup__input-error about-input-error"></span>
    </PopupWithForm>
    <PopupWithForm 
      name='add' 
      isOpen={isAddPlacePopupOpen}
      title="Новое место"
      buttonText="Создать"
      onClose={closeAllPopups}
    >
      <input className="popup__input input input_type_description" placeholder="Название" type="text" name="name" id="description" minLength="2" maxLength="30" required />
      <span className="popup__input-error description-input-error"></span>
      <input className="popup__input input input_type_link" placeholder="Ссылка на картинку" type="url" name="link" id="url" required />
      <span className="popup__input-error url-input-error"></span>
    </PopupWithForm>
    <PopupWithForm 
      name='change-avatar' 
      isOpen={isEditAvatarPopupOpen} 
      title="Обновить аватар"
      buttonText="Сохранить"
      onClose={closeAllPopups}
    >
      <input className="popup__input input input_type_link" placeholder="Ссылка на картинку аватара" type="url" name="avatar" id="avatar" required />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
    <ImagePopup 
      card={selectedCard} 
      onClose={closeAllPopups}
    />
    
  </div>
  );
}

export default App;
