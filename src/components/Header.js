import React from 'react';
import logo from '../images/logo.svg';

function Header({email, exitFromAccount}) {
    return (
        <header className="header">
            <a href={logo} 
            className="header__logo" />
            <div className='header__acc-container'>
                <p className='header__account'>{email}</p>
            
                <p className='header__account-exit'
                onClick={exitFromAccount}>Выйти</p>
            </div>
        </header>
    )
}

export default Header;