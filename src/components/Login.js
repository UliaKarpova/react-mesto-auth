import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Login({onSubmit}) {
    const [userData, setUserData] = useState({});
    
    useEffect(() => {
        setUserData({});
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({...userData,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userData.email || !userData.password) {
            return;
        } else {
            onSubmit(userData);
        }
    }

    return (
        <>
            <header className="header-sign">
            
                <a href={logo} 
                className="header__logo" />
                
                <Link to="/signup" className='header-sign__text'>Регистрация</Link>
            </header>
            
            <main className='content'>
                <section>
                    <form className='sign__form'
                    onSubmit={handleSubmit}
                    noValidate>
                        <h2 className='sign__header'>Вход</h2>
                        
                        <input className='sign__input' 
                        onChange={handleChange}
                        value={userData.email || ""}
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="email@mail.com" 
                        required />
                        
                        <input className='sign__input' 
                        onChange={handleChange}
                        value={userData.password || ""}
                        minLength="2" 
                        maxLength="15" 
                        id="password" 
                        name="password" 
                        type="password" 
                        placeholder="Пароль" 
                        required />
                        
                        <button className='sign__submit' 
                        type='submit' 
                        >Войти</button>
                    </form>
                </section>
            </main>
        </>
    )
}

export default Login;