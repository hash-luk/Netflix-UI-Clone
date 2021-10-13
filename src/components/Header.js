import React from 'react';
import './Header.css';

export default function Header({black}) {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/"><img src="https://logodownload.org/wp-content/uploads/2014/10/netflix-logo-5.png" alt="Netflix Logo"></img></a>
            </div>
            <div className="header--user">
                <a href="/"><img src={`https://avatars.dicebear.com/api/avataaars/.svg?top[]=shortHair&eyebrow[]=raised&mouth[]=smile`} alt="Usuário"></img></a>
            </div>
        </header>
    )
}
