import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import ProductsTable from './components/ProductsTable';
import ModalEdit from './components/ModalEdit';
import ModalAdd from './components/ModalAdd';
import { api } from './services/api';


function App() {
    const [productNames, setProductNames] = useState([]);
    const [modalEditShow, setModalEditShow] = useState(false);
    const [modalAddShow, setModalAddShow] = useState(false);
    const [alert, setAlert] = useState({show: false, variant: '', message: ''});
    const [selectedProduct, setSelectedProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [productsStatus, setProductsStatus] = useState('done');

    useEffect(() => {
        api.get('yampi/products')
            .then((response) => {
                setProductNames(response.data);
            });

        setProductsStatus('pending');

        api.get('products')
            .then((response) => {
                setProducts(response.data.results);
                setProductsStatus('done');
            })
    }, [])

    useEffect(() => {
        if(alert.show){
            setTimeout(() => setAlert(prev => ({...prev, show: false})), 8000);
        }
    }, [alert])

    function handleEditClick(product) {
        setSelectedProduct(product);
        setModalEditShow(true);
    }

    function handleAddProducts(newProducts, setSalvarButtonDisabled) {
        Promise.all(newProducts.map(product => api.post('products/', product)))
            .then((responses) => {
                responses.map(response => setProducts(prev => [...prev, response.data]))
            })
            .catch(() => {
                setAlert({show: true, variant: 'danger', message: 'Ocorreu um problema ao adicionar o produto'})
            })
            .finally(() => setModalAddShow(false))
    }

    function handleEditProduct(product) {
        api.put(`products/${product.id}/`, product)
            .catch(() => {
                setAlert({show: true, variant: 'danger', message: 'Ocorreu um problema ao editar esse produto'})
            });

        setProducts(prev => prev.map(e => e.id === product.id ? product : e));
    }

    function handleDeleteClick(productId) {
        api.delete(`products/${productId}/`)
            .catch(() => {
                setAlert({show: true, variant: 'danger', message: 'Ocorreu um problema ao remover o produto'})
            })

        setProducts(prev => prev.filter((e, i) => e.id !== productId))
    }

    const containerStyle = {
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }

    const contentStyle = {
        backgroundColor: '#FFFFFF',
        maxWidth: '1200px'
    }

    return (
        <div style={containerStyle}>
            <ModalAdd show={modalAddShow} setModalShow={setModalAddShow} productNames={productNames} handleAddProducts={handleAddProducts}/>
            <ModalEdit show={modalEditShow} setModalShow={setModalEditShow} productNames={productNames} selectedProduct={selectedProduct} handleEditProduct={handleEditProduct}/>
            <Card style={contentStyle}>
                <Card.Body>
                    <Card.Title>Controle de Estoque</Card.Title>
                    <Card.Body  style={{maxHeight: '400px', overflowY: 'auto'}}>
                        <ProductsTable products={products} productsStatus={productsStatus} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>
                    </Card.Body>
                    <Button variant="primary" onClick={() => setModalAddShow(true)}>Adicionar</Button>
                </Card.Body>
            </Card>
            <Alert 
                key={alert.variant} 
                variant={alert.variant} 
                style={{marginTop: '20px'}} 
                show={alert.show}
                onClose={() => setAlert(prev => ({...prev, show: false}))}
                dismissible 
            >{alert.message}</Alert>
        </div>
        
    );
}

export default App;
