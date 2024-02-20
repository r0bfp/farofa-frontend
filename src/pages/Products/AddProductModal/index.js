import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import './style.css'
import { FarofaApi } from "../../../services/FarofaApi";
import { toast } from "react-toastify";
import { useState } from "react";


export default function AddProductModal({isShow, yampiProducts, handleModalShow}) {
    const defaultMessage = 'Resgate seu código promocional no site aq.com/code. Basta copiar e colar o código, em caso de erros entre em contato com o suporte (21) 98860-6223'
    
    const [codesAmount, setCodesAmount] = useState(0)
    const [productData, setProductData] = useState({message: defaultMessage, type: 'produto'})
    const [codes, setCodes] = useState([])

    function closeModal() {
        handleModalShow('add', false)
    }

    function onConfirm() {
        let parsedProducts = null

        if(productData.type === 'produto'){
            parsedProducts = codes.map(code => ({...productData, code}))
        } else {
            parsedProducts = [productData]
        }

        const toastId = toast.loading('Adicionando produto(s)')

        FarofaApi.addProducts(parsedProducts)
            .then(responses => {
                toast.dismiss(toastId)

                const successes = responses.filter(res => res.status === 201).length
                
                if(successes > 0){
                    toast.success(`${successes} produtos adicionados`)
                }

                responses.forEach(res => {
                    if(res.status === 409){
                        toast.error(`Já existe um produto com esse código no estoque: ${res.code}`, {
                            autoClose: 10 * 1000
                        })
                    }
                });
            })
    }

    function handleCodeBlur(codeIndex, code) {
        const newCodes = codes
        newCodes[codeIndex] = code

        setCodes(newCodes)
    }

    return (
        <Modal show={isShow} centered onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar produtos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group a={Col} md='12'>
                            <Form.Label>Produto</Form.Label>
                            <Form.Select 
                                onChange={e => setProductData(prev => ({
                                    ...prev, 
                                    id_yampi: e.target.selectedOptions[0].value,
                                    name: e.target.selectedOptions[0].text
                                }))}
                            >
                                <option>Selecione</option>
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
                            <Form.Select onChange={e => setProductData(prev => ({...prev, type: e.target.value}))}>
                                <option value='produto'>Produto</option>
                                <option value='servico'>Serviço</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="4" >
                            <Form.Label>Qtd.</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    disabled={productData.type === 'servico'}
                                    type="number"
                                    placeholder="Qtd"
                                    required
                                    max="50"
                                    min="1"
                                    onChange={e => setCodesAmount(e.target.value > 50 ? 50 : e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">Insira uma quantidade.</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" >
                            <Form.Label>Mensagem</Form.Label>
                            <Form.Control
                                onChange={e => setProductData(prev => ({...prev, message: e.target.value}))}
                                disabled={productData.type === 'servico'}
                                as="textarea"
                                placeholder="Mensagem"
                                style={{ height: '80px' }}
                                required
                                defaultValue={defaultMessage}
                            />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">Insira um código.</Form.Control.Feedback>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="p-0">
                                <div className="codes-title">
                                    {codesAmount > 0 && <Form.Label>Códigos</Form.Label>}
                                </div>
                                <div className="codes-container">
                                {
                                    Array.from({length: codesAmount}, (value, index) => (
                                        <InputGroup hasValidation className="mb-2" key={index}>
                                            <InputGroup.Text>{index + 1}</InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Código"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                onBlur={e => handleCodeBlur(index, e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">Insira um código.</Form.Control.Feedback>
                                        </InputGroup>
                                    ))
                                }
                                </div>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>Cancelar</Button>
                <Button variant="primary" onClick={onConfirm}>Confirmar</Button>
            </Modal.Footer>
        </Modal>
    )
}