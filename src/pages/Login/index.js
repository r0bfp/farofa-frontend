import './index.css'
import { Form, Button } from 'react-bootstrap'
import logo from '../../images/logo.png'
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Login() {
    const {signin} = useContext(AuthContext)
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()

    async function onSubmit(data) {
        const status = await signin(data.username, data.password)

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
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control required type="text" placeholder="Usuário" {...register('username', {required: true})}/>
                        <Form.Control.Feedback type='invalid'>Campo obrigatório!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control required type="password" placeholder="Senha" {...register('password', {required: true})}/>
                        <Form.Control.Feedback type='invalid'>Campo obrigatório!</Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" className='w-12'>Entrar</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}