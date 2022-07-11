import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Register({onSubmit}) {
    const [values, setValues] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({...values,
            [name]: value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(values);
      }

    return (
        <>
            <header className="header-sign">
                <a href={logo} 
                className="header__logo" />

                <Link to="/signin" className='header-sign__text'>Войти</Link>
            </header>
            
            <main className='content'>
                <section className='sign__container'>
                    <form className='sign__form'
                    onSubmit={handleSubmit}>
                        <h2 className='sign__header'>Регистрация</h2>
                        
                        <input className='sign__input' 
                        onChange={handleChange}
                        value={values.email || ""}
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="email" 
                        required />
                        
                        <input className='sign__input' 
                        onChange={handleChange}
                        value={values.password || ""}
                        id="password" 
                        name="password" 
                        type="password" 
                        placeholder="Пароль" 
                        required />
                        
                        <button className='sign__submit' 
                        type='submit' 
                        >Зарегистрироваться</button>
                        
                        <Link to="/signin" className='sign__to-login'>Уже зарегистрированы? Войти</Link>
                    </form>
                </section>
            </main>
        </>
    )
}

export default Register;