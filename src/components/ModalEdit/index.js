import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';


export default function ModalEdit({show, setModalShow, productNames, selectedProduct, handleEditProduct}){
    const [product, setProduct] = useState(selectedProduct);
    const [validated, setValidated] = useState(false);

    useEffect(() => setProduct(selectedProduct), [selectedProduct])

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

            setValidated(true);
        } else {
            event.preventDefault();
            setModalShow(false);
            handleEditProduct(product);
        }
    };

    function handleChangeProduct(value) {
        setProduct(prev => ({...prev, ...value})); 
    }

    return (
        <Modal show={show} onHide={() => setModalShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Produto</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Produto</Form.Label>
                        <Form.Select 
                            required
                            defaultValue={selectedProduct.name} 
                            onChange={(e) => handleChangeProduct({
                                id_yampi: e.target.options[e.target.selectedIndex].dataset.idYampi, 
                                name: e.currentTarget.value
                        })}>
                            {productNames.map((e, i) => (
                                <option key={i} value={e.name} data-id-yampi={e.id}>
                                    {e.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Código</Form.Label>
                        <Form.Control  
                            required
                            placeholder="Código" 
                            defaultValue={selectedProduct.code} 
                            onChange={(e) => handleChangeProduct({code: e.currentTarget.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Select 
                            defaultValue={selectedProduct.type} 
                            onChange={(e) => handleChangeProduct({type: e.currentTarget.value})}
                        >
                            <option value='produto'>Produto</option>
                            <option value='serviço'>Serviço</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mensagem</Form.Label>
                        <Form.Control 
                            required
                            as="textarea"
                            placeholder="Mensagem"
                            style={{ height: '100px' }}
                            defaultValue={selectedProduct.message}
                            onChange={(e) => handleChangeProduct({message: e.currentTarget.value})}
                        />
                    </Form.Group>
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