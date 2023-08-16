import { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';


export default function ModalAdd({show, setModalShow, productNames, handleAddProducts}){
    const defaultMessage = 'Resgate seu código promocional no site aq.com/code. Basta copiar e colar o código, em caso de erros entre em contato com o suporte (21) 98860-6223'

    const [codes, setCodes] = useState([]);
    const [validated, setValidated] = useState(false);
    const [product, setProduct] = useState({});
    const [isService, setIsService] = useState(false);

    useEffect(() => {
        setProduct({
            name: '',
            code: '',
            id_yampi: '',
            type: 'produto',
            message: defaultMessage
        })
    }, [])

    function handleSubmit(event) {
        const form = event.currentTarget;
        const codesWithProduct = product.type === 'produto' ? codes.map(code => ({...product, code})) : Array({...product, message: ''});

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

            setValidated(true);
        } else {
            event.preventDefault();
            handleAddProducts(codesWithProduct);
            setProduct({
                name: '',
                code: '',
                id_yampi: '',
                type: 'produto',
                message: defaultMessage
            });
            setIsService(false);
            setCodes([]);
        }
    };

    function handleChangeType(value) {
        setProduct(prev => ({...prev, type: value}))
        
        setIsService(value !== 'produto')
    }

    function handleOnBlurCodesAmount(amount) {
        let amountAsInt = parseInt(amount);

        if(amountAsInt > 30){
            amountAsInt = 30
        }

        setCodes(Array(amountAsInt).fill(""))
    }

    function handleChangeCodes(code, index) {
        let newCodes = [...codes]

        newCodes[index] = code

        setCodes(newCodes);
    }

    return (
        <Modal show={show} onHide={() => setModalShow(false)} size='lg'>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Produtos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Produto</Form.Label>
                            <Form.Select 
                            disabled={!productNames.length}
                            required 
                            onChange={(e) => setProduct(prev => ({
                                ...prev,
                                id_yampi: e.target.options[e.target.selectedIndex].dataset.idYampi, 
                                name: e.target.value
                            }))}>
                                <option value="">Selecione</option>
                                {productNames.map((e, i) => (
                                    <option key={i} value={e.name} data-id-yampi={e.id}>
                                        {e.name}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Selecione um produto.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" >
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select 
                            onChange={(e) => handleChangeType(e.currentTarget.value)}
                            >
                                <option value='produto'>Produto</option>
                                <option value='servico'>Serviço</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="2" >
                            <Form.Label>Qtd</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    disabled={isService}
                                    type="number"
                                    placeholder="Qtd"
                                    required
                                    max="30"
                                    min="1"
                                    onBlur={(e) => handleOnBlurCodesAmount(e.currentTarget.value)}
                                />
                                <Form.Control.Feedback type="invalid">Insira uma quantidade.</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" >
                            <Form.Label>Mensagem</Form.Label>
                            <Form.Control
                                disabled={isService}
                                as="textarea"
                                placeholder="Mensagem"
                                style={{ height: '80px' }}
                                required
                                onChange={(e) => setProduct(prev => ({...prev, message: e.target.value}))}
                                defaultValue={defaultMessage}
                            />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">Insira um código.</Form.Control.Feedback>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" >
                            <Form.Label>Códigos</Form.Label>
                            {codes.map((e, i) => (
                                <InputGroup hasValidation className="mb-2" key={i}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Código"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onChange={(e) => handleChangeCodes(e.currentTarget.value, i)}
                                    />
                                    <Form.Control.Feedback type="invalid">Insira um código.</Form.Control.Feedback>
                                </InputGroup>
                            ))}
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>
                        Fechar
                    </Button>
                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}