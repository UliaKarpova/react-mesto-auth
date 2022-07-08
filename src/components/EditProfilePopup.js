import React from "react";
import {useState, useEffect} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser, submitStatus}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [values, setValues] = useState({});
    
    const [isValid, setIsValid] = useState(true);
    const [validationMessage, setValidationMessage] = useState({});

    useEffect(() => {
        setValues({...values, name: currentUser.name,
        about: currentUser.about});
    }, [currentUser]);

    useEffect(() => {
        setValues({...values, name: currentUser.name,
        about: currentUser.about});
        setIsValid(false);
        setValidationMessage({});
    }, [isOpen])
    
    function handleChange(event) {
        const {name, value} = event.target;
        setValues({...values, [name]: value});
        setIsValid(event.target.closest('form').checkValidity());
        setValidationMessage({...validationMessage, [name]: event.target.validationMessage});
    }

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateUser({
            name: values.name,
            about: values.about
        });
      } 
      
    return (
        <PopupWithForm name="edit-profile" 
        isValid={isValid}
        title="Редактировать профиль" 
        isOpen={isOpen} 
        onClose={onClose} 
        onSubmit={handleSubmit}
        submitStatus={submitStatus} >
            
            <input className="popup__item" 
            onChange={handleChange}
            value={values.name}
            minLength="2" 
            maxLength="40" 
            id="name" 
            name="name" 
            type="text" 
            placeholder="Имя" 
            required />
            
            <span className={`popup__item-error name-error ${!isValid && "popup__item-error_visible"}`}>
            {validationMessage.name}</span>
            
            <input className="popup__item" 
            onChange={handleChange} 
            value={values.about}
            minLength="2" 
            maxLength="200" 
            id="info" 
            name="about" 
            type="text" 
            placeholder="Занятие" 
            required />
            
            <span className={`popup__item-error info-error ${!isValid && "popup__item-error_visible"}`}>
            {validationMessage.about}</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;