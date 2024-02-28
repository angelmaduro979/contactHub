import React, { useState, useEffect } from 'react';
import { Header } from '../Header/Header';
import './Contacts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus, faRobot } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';




const Contacts = () => {

    //Need to GET this data to the LocalStorage
    const accessStorage = () => {
        let infoRetrieved = localStorage.getItem('contactList')
        if (infoRetrieved) {
            return JSON.parse(infoRetrieved)
        } else {
            return [];
        }
    }

    const [contactList, setContactList] = useState(accessStorage());
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [filterContact, setFilterContact] = useState('')
 

    function addContact(event) {
        event.preventDefault();
        if (name.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' && phoneNumber.trim() !== '') {

            const existingContact = contactList.find(contact => contact.Email === email || contact.PhoneNumber === phoneNumber);
            if (existingContact) {
                alert('Contact already exists!');
                return;
            }
            const newContact = {
                id: Date.now(),
                Name: name,
                LastName: lastName,
                Email: email,
                PhoneNumber: phoneNumber,
            }


            const newContactCopy = [...contactList, newContact];
            setContactList(newContactCopy)

            //I have to reset my states 

            setName('');
            setLastName('');
            setEmail('');
            setPhoneNumber('');

            //and my input values

            document.getElementById('form').reset();
        }

    };

    //Need to SEND this data to the LocalStorage

    useEffect(() => {
        localStorage.setItem('contactList', JSON.stringify(contactList));
    }, [contactList]);

    //delete function

    const deleteContact = (Deleted) => {
        const contactToDelete = contactList.filter(parameterToDelete => parameterToDelete.id !== Deleted)
        setContactList(contactToDelete)
    };

    //Filter function

    const searchFunction = () => {
        const filterText = filterContact.toLowerCase();
        return contactList.filter(contact => (
            contact.Name.toLowerCase().includes(filterText) ||
            contact.LastName.toLowerCase().includes(filterText) ||
            contact.Email.toLowerCase().includes(filterText) ||
            contact.PhoneNumber.includes(filterContact) // NOT NEEDED TO USE TOLOWERCASE
        ));
    }

    const displayForm = () => {
        const form = document.getElementById('form');
        if (form) {
            form.style.display = 'flex';
        }
    };

    const hideForm = () => {
        const form = document.getElementById('form');
        if (form) {
            form.style.display = 'none';
        }
    };

    function noInfo() {
        const inforFinded = contactList.every(infoFind => infoFind.Email === '' && infoFind.LastName === '' && infoFind.PhoneNumber === '' && infoFind.Name === '')
        if (inforFinded) {
            return (
                <div className='noInfoContainer'>
                    <span>
                        <FontAwesomeIcon icon={faRobot} /> {''} Whoops! Looks like you have not added any contacts yet.
                    </span>
                    <ul>
                        <li>Click on the "+" button</li>
                        <li>Fill in the blank boxes</li>
                        <li>Click add contact</li>
                    </ul>
                </div>
            )
        }
    }

    


    return (
        <>

            <Header

                values={filterContact}
                onChangeFunc={(e) => setFilterContact(e.target.value)}
            />


            <FontAwesomeIcon icon={faPlus} className='faPlus' onClick={() => displayForm()} />


            <form id='form' name='form'>
                <div className="IconX">
                    <FontAwesomeIcon icon={faX} className='icon' onClick={() => hideForm()} />
                </div>
                <div className="name">
                    <label htmlFor="Name">Name</label>
                    <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="lastName">
                    <label htmlFor="Last Name">Last Name</label>
                    <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="email">
                    <label htmlFor="Email">Email</label>
                    <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="phone">
                    <label htmlFor="Phone Number">Phone Number</label>
                    <input type="tel" placeholder='(+54) xx-xxxx-xxxx' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <button onClick={addContact} >Add Contact</button>

            </form>


            {/* Contact List */}
            <div className="containerMain">
                <div className="containerList" style={{ display: !filterContact ? 'flex' : 'none' }}  >  {/*This is to hide containerList if there is a search*/}
                    {noInfo()}
                    <ul>
                        {contactList.map((contact) => (
                            <li className='eachContact' key={contact.id}>

                                <div className='justInfo' style={{ display: 'flex', gap: '20px' }}>

                                    <div className="textLi">
                                        <p>{contact.Name}</p>
                                    </div>

                                    <div className="textLi">
                                        <p>{contact.LastName}</p>
                                    </div>

                                    <div className="textLi">
                                        <p>{contact.Email}</p>
                                    </div>

                                    <div className="textLi">
                                        <p>{contact.PhoneNumber}</p>
                                    </div>
                                </div>

                                <button className='deleteButton' onClick={() => deleteContact(contact.id)} >Delete</button>
                            </li>
                        ))}
                    </ul >
                </div >
            </div>

            {/* Search structure */}

            <div className="containerMain">

                <div className="filteredData">
                    <ul>
                        {filterContact && searchFunction().map((search) =>
                            <li className='eachContact' key={search.id} >

                                <div className='justInfo' style={{ display: 'flex', gap: '20px' }}>

                                    <div className="textLi">
                                        <p>{search.Name}</p>
                                    </div>

                                    <div className="textLi">
                                        <p>{search.LastName}</p>
                                    </div>

                                    <div className="textLi">
                                        <p>{search.Email}</p>
                                    </div>

                                    <div className="textLi">
                                        <p>{search.PhoneNumber}</p>
                                    </div>
                                </div>

                                <button className='deleteButton' onClick={() => deleteContact(search.id)} >Delete</button>
                            </li>)
                        }
                    </ul>
                </div>
            </div>

            <footer>
                <div className='footerContainer'>
                    <ul>
                        <li>Copyright © 1999-2024 Ángel Maduro</li>
                        <li>Yerbal 2340, Flores, CABA, 1406</li>
                        <li><a href="tel:+541122506741" target='_blank'>(+54) 11-2250-6741</a></li>
                        <li><a href='mailto:angelmaduro979@gmail.com' target='_blank'>angelmaduro979@gmail.com</a></li>
                        <div className='socialMedia'>
                            <li><a href='https://github.com/angelmaduro979' target='_blank'><FontAwesomeIcon icon={faGithub} /></a></li>
                            <li><a href='https://www.linkedin.com/in/angel-maduro-cs/' target='_blank'><FontAwesomeIcon icon={faLinkedin} /></a></li>
                        </div>

                    </ul>


                </div>
            </footer>

        </>
    )
}

export { Contacts }