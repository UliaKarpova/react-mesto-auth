import React from 'react';
import logo from '../images/logo.svg';

function Header() {
    return (
        <header className="header">
            <a href={logo} 
            className="header__logo" />
        </header>
    )
}

export default Header;