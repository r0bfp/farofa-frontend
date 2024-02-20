import { Button, Modal } from "react-bootstrap"

export default function DeleteProductModal({isShow, product, handleModalShow, handleDeleteProduct}) {
    function closeModal() {
        handleModalShow('delete', false)
    }

    function onConfirm() {
        handleDeleteProduct(product)
        closeModal()
    }

    return (
        <Modal show={isShow} centered onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Atenção!</Modal.Title>
            </Modal.Header>
            <Modal.Body>tem certeza que deseja excluir o produto <strong>{product.name}</strong>?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>Cancelar</Button>
                <Button variant="danger" onClick={onConfirm}>Excluir</Button>
            </Modal.Footer>
        </Modal>
    )
}