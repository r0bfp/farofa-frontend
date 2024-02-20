import { Dropdown, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext'
import './style.css'


export default function SettingsDropdown() {
    const navigate = useNavigate()
    const {signout} = useContext(AuthContext)

    function handleSignout() {
        signout()
        navigate('/')
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant='secondary' >
                <FontAwesomeIcon icon={faGear} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.ItemText>
                    <div className='settings-menu'>
                        <span>Habilitar envio</span>
                        <Form.Check 
                            type="switch"
                            reverse
                            inline
                        />
                    </div>
                </Dropdown.ItemText>
                <Dropdown.Divider/>
                <Dropdown.Item className='exit' onClick={() => handleSignout()}>
                    <span style={{color: 'red'}}>Sair</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}