import React from "react";

function PopupWithForm(props) {
    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>        
        <div className="popup__container">
          <button type="button" className="popup__button-close" aria-label="Закрыть" onClick={props.onClose}></button>
          <form name={props.popupType} id={props.popupType} className={`popup__form popup__${props.popupType}`} aria-label={props.popupTypeAria}>
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button type="submit" className="popup__submit popup__button-submit">{props.buttonText}</button> 
          </form>
        </div>      
      </section>
    )
}

export default PopupWithForm;