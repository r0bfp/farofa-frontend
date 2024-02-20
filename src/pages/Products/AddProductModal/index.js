import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap"
import { FarofaApi } from "../../../services/FarofaApi"
import { toast } from "react-toastify"
import { useState } from "react"
import './style.css'


export default function AddProductModal({isShow, yampiProducts, handleModalShow, handleAddProduct}) {
    const defaultMessage = 'Resgate seu código promocional no site aq.com/code. Basta copiar e colar o código, em caso de erros entre em contato com o suporte (21) 98860-6223'
    
    const [codesAmount, setCodesAmount] = useState(1)
    const [selectedType, setSelectedType] = useState('produto')
    const [validated, setValidated] = useState(false)
    const [codes, setCodes] = useState([])

    function handleCodeBlur(codeIndex, code) {
        const newCodes = codes
        newCodes[codeIndex] = code

        setCodes(newCodes)
    }

    function handleChangeCodesAmount(amount) {
        if(amount < 1){
            setCodesAmount(1)
        } else if(amount > 50){
            setCodesAmount(50)
        } else {
            setCodesAmount(amount)
        }
    }

    function closeModal() {
        handleModalShow('add', false)
    }

    function resetForm(form) {
        setCodesAmount(1)
        setSelectedType('produto')
        form.reset()
    }

    function onConfirm(event) {
        const form = event.currentTarget
        const {type, product, message, code} = form.elements

        event.preventDefault()
        event.stopPropagation()

        if(form.checkValidity() === false){
            setValidated(true)
            return
        }

        const formData = {
            type: type.value,
            name: yampiProducts.find(e => e.id == product.value).name,
            id_yampi: product.value,
            message: message.value,
            code: type.value === 'produto' && code.value,
        }

        const products = code ? codes.map(code => ({...formData, code})) : [formData]

        FarofaApi.addProducts(products)
            .then(responses => {
                const successes = responses.filter(res => res.status === 201).length
                
                if(successes > 0){
                    toast.success(`${successes} produtos adicionados`)
                }

                responses.forEach(res => {
                    if(res.status === 409){
                        toast.error(`Já existe um produto no estoque com o código ${res.code}`, {
                            autoClose: 10 * 1000
                        })
                    }
                })

                setValidated(false)
                closeModal()
                handleAddProduct()
                resetForm(form)
            })
    }

    return (
        <Modal show={isShow} centered onHide={closeModal}>
            <Form noValidate validated={validated} onSubmit={onConfirm}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar produtos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Row className="mb-3">
                            <Form.Group a={Col} md='12'>
                                <Form.Label>Produto</Form.Label>
                                <Form.Select name='product' required>
                                    <option value=''>Selecione</option>
                                    {
                                        yampiProducts.map(product => (
                                            <option key={product.id} value={product.id}>{product.name}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="8" >
                                <Form.Label>Tipo</Form.Label>
                                <Form.Select name='type' onChange={e => setSelectedType(e.target.value)}>
                                    <option value='produto'>Produto</option>
                                    <option value='servico'>Serviço</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="4" >
                                <Form.Label>Qtd.</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="number"
                                        defaultValue={codesAmount}
                                        disabled={selectedType === 'servico'}
                                        placeholder="Qtd"
                                        required
                                        max="50"
                                        min="1"
                                        onChange={e => handleChangeCodesAmount(e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" >
                                <Form.Label>Mensagem</Form.Label>
                                <Form.Control
                                    disabled={selectedType === 'servico'}
                                    as="textarea"
                                    placeholder="Mensagem"
                                    required
                                    name='message'
                                    defaultValue={defaultMessage}
                                />
                            </Form.Group>
                        </Row>
                        {
                            selectedType === 'produto' && (
                                <Row className="mb-3">
                                    <Form.Group as={Col} className="p-0">
                                        <div className="codes-title">
                                            <Form.Label>Códigos</Form.Label>
                                        </div>
                                        <div className="codes-container">
                                        {
                                            Array.from({length: codesAmount}, (value, index) => (
                                                <InputGroup hasValidation className="mb-2" key={index}>
                                                    <InputGroup.Text>{index + 1}</InputGroup.Text>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Código"
                                                        required
                                                        name='code'
                                                        onBlur={e => handleCodeBlur(index, e.target.value)}
                                                    />
                                                </InputGroup>
                                            ))
                                        }
                                        </div>
                                    </Form.Group>
                                </Row>
                            )
                        }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Cancelar</Button>
                    <Button variant="primary" type="submit">Confirmar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}