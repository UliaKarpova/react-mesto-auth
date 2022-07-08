import React, { useEffect, useState } from 'react';
import { Route, Switch, BrowserRouter, useHistory } from 'react-router-dom';


import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import ImageDeletePopup from './ImageDeletePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/Api';
import * as apiAuth from '../utils/apiAuth.js';

import '../index.css';



function App() {
    const history = useHistory();

    const [currentUser, setCurrentUser] = useState({});

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImageDeletePopupOpen, setIsImageDeletePopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [cardGoingToBeDeleted, setCardGoingToBeDeleted] = useState({});
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [isUserRegistred, setIsUserRegistred] = useState(false); 
    const [userEmail, setUserEmail] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);


    useEffect(() => {
        Promise.all([
        api.getPhotos(),
        api.getInfo()])

        .then(([cards, data]) => {
            setCards(cards);
            setCurrentUser(data);
        }).catch((err) => console.log(err));
    }, [])

    /*function addTokenToLocalStorage(data) {
        localStorage.setItem('token', data.token);
    }
    function getTokenFromLocalStorage() {
        localStorage.getItem('token');
    }*/

    function handleRegisterSubmit(data) {
        apiAuth.register(data)
        .then((res) => {
            if (res) {
                console.log(res);
                setUserEmail(res.data.email);
                setIsUserRegistred(true);
                history.push('/signin');
            } else {
            setIsUserRegistred(false);
            }
        }).finally(handleInfoTooltipOpen)
    }

    function handleInfoTooltipOpen() {
        setIsInfoTooltipOpen(true);
    }

    
    function handleLogin(e) {
        e.preventDefault();
        setLoggedIn(true);

    }

    function handleInfoTooltipClose() {
        closeAllPopups();
        setIsUserRegistred(false);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function handleImageDeleteClick(data) {
        setCardGoingToBeDeleted(data);
        setIsImageDeletePopupOpen(true);
    };

    function closeAllPopups() {
            setIsAddPlacePopupOpen(false);
            setIsEditAvatarPopupOpen(false);
            setIsEditProfilePopupOpen(false);
            setIsImageDeletePopupOpen(false);
            setIsInfoTooltipOpen(false);
            setSelectedCard(null);
    }

    function handleUpdateUser(data) {
        setSubmitDisabled(true);

        api.sendNewProfileInfo(data)
        .then((info) => {
            setCurrentUser(info);
            closeAllPopups();
            setSubmitDisabled(false);
        }).catch((err) => console.log(err))
    }

    function handleUpdateAvatar(data) {
        setSubmitDisabled(true);

        api.sendNewAvatar(data)
        .then((info) => {
            setCurrentUser(info);
            closeAllPopups();
            setSubmitDisabled(false);
        }).catch((err) => console.log(err))
    }

    function handleAppPlaceSubmit(data) {
        setSubmitDisabled(true);

        api.addNewCard(data)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
            setSubmitDisabled(false)
        }).catch((err) => console.log(err))
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        }).catch((err) => console.log(err))
    }

    function handleCardDelete(event) {
        event.preventDefault();

        api.deleteImage(cardGoingToBeDeleted).then(() => {
            setCards((cards) => cards.filter((c) => c._id === cardGoingToBeDeleted._id ? '' : c));
            closeAllPopups();
            setCardGoingToBeDeleted({});
        }).catch((err) => console.log(err))
    }

  return (
    <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
            <BrowserRouter>
            <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <>            
            <Header />

            <Main 
            onImageDeleteClick={handleImageDeleteClick}
            onEditAvatar={handleEditAvatarClick} 
            onEditProfile={handleEditProfileClick} 
            onCardClick={setSelectedCard} 
            onAddPlace={handleAddPlaceClick} 
            cards={cards}
            onCardLike={handleCardLike} />

            <Footer />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser} 
            submitStatus={submitDisabled} />

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar} 
            submitStatus={submitDisabled} />

            <AddPlacePopup submit="Создать" 
            cards={cards}
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onSubmit={handleAppPlaceSubmit}
            submitStatus={submitDisabled} />
        
            <ImageDeletePopup name="delete-image" 
            title="Вы уверены?" 
            submit="Да" 
            onSubmit={handleCardDelete}
            isOpen={isImageDeletePopupOpen} 
            onClose={closeAllPopups} />

            <ImagePopup card={selectedCard} 
            onClose={closeAllPopups} />
            </>
  
    </ProtectedRoute>
            
            <Route path="/signup">
          <Register onSubmit={handleRegisterSubmit} />
          <InfoTooltip name="tooltip" isOpen={isInfoTooltipOpen} isUserRegistred={isUserRegistred} onClose={handleInfoTooltipClose} />
        </Route>
        <Route path="/signin">
          <Login handleLogin={handleLogin} />
        </Route>
            
            </Switch>
            </BrowserRouter>
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;