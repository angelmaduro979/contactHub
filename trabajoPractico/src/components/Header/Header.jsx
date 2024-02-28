import React, { useState } from 'react';
import logoWhite from '../../assets/logoWhite.png'
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';



const Header = (props) => {
    const [isItOpen, setIsItOpen]= useState(false);
    
    const toggleSearchBar = () => {
        setIsItOpen(!isItOpen);
        const search = document.getElementById('searchBar');
        if (isItOpen) {
            search.style.display = 'flex';
        } else {
            search.style.display = 'none';
        }
    }
    
    return (
        <>
            <header>
                <img src={logoWhite} style={{ width: '100px' }} />
                <FontAwesomeIcon icon={faMagnifyingGlass} onClick={toggleSearchBar} className='magnifying' />
            </header>
            <div id='searchBar'>
                    <div className="closeContainer">
                    <FontAwesomeIcon icon={faX} className='CloseBar' onClick={toggleSearchBar} />
                    </div>
                    <div className="searchContainer">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='searchIcon' />
                        <input className='inputSearch' type="text"  value={props.values} onChange={props.onChangeFunc} placeholder='Search for contacts by Email, name, last name or phone number' />
                    </div>
                </div>
        </>
    )
}

export { Header }