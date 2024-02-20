import './index.css'
import { Form, Button } from 'react-bootstrap'
import logo from '../../images/logo.png'
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Login() {
    const {signin} = useContext(AuthContext)
    const [validated, setValidated] = useState(false)
    const navigate = useNavigate()

    async function onSubmit(event) {
        const form = event.currentTarget
        const {username, password} = form.elements

        event.preventDefault()
        event.stopPropagation()

        if(form.checkValidity() === false){
            setValidated(true)
            return
        }

        const status = await signin(username.value, password.value)

        if(status){
            navigate('/app/home')
        }else{
            toast('Usuário ou senha incorreto', {position: 'bottom-center', type: 'error'})
        }
    }

    return (
        <div className='container'>
            <div className='content'>
                <div className='header-container'>
                    <div className='image-container'>
                        <img src={logo} alt='logo'/>
                    </div>
                    <h3>Controle de Estoque</h3>
                </div>
                <Form noValidate validated={validated} onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control required type="text" placeholder="Usuário" name='username'/>
                        <Form.Control.Feedback type='invalid'>Usuário inválido!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control required type="password" placeholder="Senha" name='password'/>
                        <Form.Control.Feedback type='invalid'>Senha inválida!</Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" className='w-12'>Entrar</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}