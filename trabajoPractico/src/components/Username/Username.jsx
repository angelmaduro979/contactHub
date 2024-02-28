import React, { useState } from 'react';
import { Contacts } from '../Contacts/Contacts';
import { useNavigate } from 'react-router-dom'
import './Username.css';
import logoWhite from '../../assets/logoWhite.png';



const Username = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    function mensajeFuncion(event) {
        event.preventDefault();
        if (nombre.trim() !== '' && apellido.trim() !== '') {

            let mensaje = `Welcome to your contact List ${nombre}! 😎`
            setMensaje(mensaje);
            alert(mensaje);
            navigate('/contacts');

        } else {
            alert('Please complete the empty boxes 😢!')
        }
    }



    return (
        <>
            <section>
                <div className='containerUser'>
                    <div className="logoWhiteContainer">
                        <img src={logoWhite} className='logoWhite1' style={{ width: '200px' }} />
                    </div>
                    <form onSubmit={mensajeFuncion}>
                        <div className='labelAndInput'>
                            <label htmlFor="nombre">Name</label>
                            <input id='nombre' type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                        </div>
                        <div className='labelAndInput'>
                            <label htmlFor="apellido">Last Name</label>
                            <input id='apellido' type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                        </div>
                        <button>Submit</button>

                    </form>
                </div>
            </section>




        </>
    )
}




export { Username };