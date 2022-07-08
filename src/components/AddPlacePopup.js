import React from "react";
import {useEffect, useRef, useState} from 'react';
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({submit, isOpen, onClose, onSubmit, submitStatus}) {
    const placeRef = useRef('');
    const linkRef = useRef('');
    const [isValid, setIsValid] = useState(true);
    const [validationMessages, setValidationMessages] = useState({});
    
   useEffect(() => {
        placeRef.current.value = '';
        linkRef.current.value = '';
        setIsValid(false);
        setValidationMessages({});
    }, [isOpen])

    function validateForm(event) {
        const input = event.target;
        setIsValid(input.closest('form').checkValidity());
        setValidationMessages({...validationMessages, [input.name]: event.target.validationMessage});
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit({
            name: placeRef.current.value,
            link: linkRef.current.value
        });
    }

    return (
        <PopupWithForm name="add-image" 
        title="Новое место" 
        onSubmit={handleSubmit} 
        submit={submit} 
        isOpen={isOpen} 
        onClose={onClose}
        submitStatus={submitStatus} 
        isValid={isValid} >
           
            <input className="popup__item" 
            onChange={validateForm}
            defaultValue=''
            ref={placeRef}
            minLength="2" 
            maxLength="20" 
            id="image-name" 
            name="name" 
            type="text" 
            placeholder="Название" 
            required />
            
            <span className={`popup__item-error image-name-error ${!isValid && "popup__item-error_visible"}`}>
            {validationMessages.name}</span>
            
            <input className="popup__item" 
            onChange={validateForm}
            defaultValue=""
            ref={linkRef}
            id="image-link" 
            name="link" 
            type="url" 
            placeholder="Ссылка на картинку"
            required />
            
            <span className={`popup__item-error image-link-error ${!isValid && "popup__item-error_visible"}`}>
            {validationMessages.link}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;