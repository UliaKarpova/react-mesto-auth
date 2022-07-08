import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onImageDeleteClick, onCardLike, onCardClick}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `${isOwn ? 'grid__delete-item' : 'grid__delete-item_hidden'}`
    ); 

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `grid__heart ${isLiked ? 'grid__heart_active' : ''}`; 
    
    const handleImageClick = () => {
        onCardClick(card);
    }

    const handleLikeClick = () => {
        onCardLike(card);
    }
    
    const handleDeleteCard = () => {
        onImageDeleteClick(card);
    }

    return (
        <>
            <div className="grid__photo" 
            onClick={handleImageClick} 
            style={{
                backgroundImage: `url(${card.link})`
            }} />
            
            <div className="grid__signature">
                <h2 className="grid__text">{card.name}</h2>
                
                <div className="grid__like">
                    <button type="button" 
                    onClick={handleLikeClick} 
                    className={cardLikeButtonClassName} />
                    
                    <span className="grid__likes-number">{card.likes.length}</span>
                </div>
            </div>
            
            <button type="button" 
            className={cardDeleteButtonClassName} 
            onClick={handleDeleteCard} />
        </>
    )
}

export default Card;