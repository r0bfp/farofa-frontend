import { useState } from 'react'
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap'
import { FarofaApi } from '../../../services/FarofaApi'
import { toast } from 'react-toastify'
import Select from 'react-select'



export default function EditProductModal({isShow, product, handleModalShow, yampiProducts, handleEditProduct}) {
    const [validated, setValidated] = useState(false)

    function closeModal() {
        handleModalShow('edit', false)
    }

    function onConfirm(event) {
        const form = event.currentTarget

        event.preventDefault()
        event.stopPropagation()

        if(form.checkValidity() === false){
            setValidated(true)
            return
        }

        const formData = {
            id: product.id,
            type: product.type,
            name: yampiProducts.find(e => e.value == form.elements.product.value).label,
            id_yampi: form.elements.product.value,
            message: form.elements.message.value,
            code: form.elements.code && form.elements.code.value,
        }

        FarofaApi.editProduct(formData)
            .then(e => {
                toast.success('Produto atualizado!')
                handleEditProduct(formData)
                setValidated(false)
                closeModal()
            })
            .catch(err => {
                if(err.response.status === 409) {
                    toast.error(`Já existe um produto com o código ${formData.code}`)
                }
            })
    }

    return (
        <Modal show={isShow} centered onHide={closeModal}>
            <Form noValidate validated={validated} onSubmit={onConfirm}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='mb-3'>
                        <Form.Group as={Col} md='12'>
                            <Form.Label>Produto</Form.Label>
                            <Select 
                                options={yampiProducts} 
                                name='product'
                                defaultInputValue={product.name}
                                placeholder='Selecione...'
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group as={Col} md='12' >
                            <Form.Label>Mensagem</Form.Label>
                            <Form.Control
                                defaultValue={product.message}
                                name='message'
                                as='textarea'
                                placeholder='Mensagem'
                                required
                            />
                        </Form.Group>
                        <Form.Control.Feedback type='invalid'>Insira um código.</Form.Control.Feedback>
                    </Row>
                    {
                        product.type === 'produto' && (
                            <Row className='mb-3'>
                                <Form.Group as={Col} md='12' >
                                    <Form.Label>Código</Form.Label>
                                    <InputGroup hasValidation className='mb-2'>
                                        <Form.Control
                                            defaultValue={product.code}
                                            type='text'
                                            name='code'
                                            placeholder='Código'
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Cancelar</Button>
                    <Button variant='primary' type='submit'>Confirmar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}