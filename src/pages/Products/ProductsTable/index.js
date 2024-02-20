import { useState } from 'react'
import { Badge, Button, Form } from 'react-bootstrap'
import { Table } from '../../../components/Table'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import DeleteProductModal from '../DeleteProductModal'
import AddProductModal from '../AddProductModal'
import { FarofaApi } from '../../../services/FarofaApi'
import './style.css'
import EditProductModal from '../EditProductModal'


export default function ProductsTable({products, setProducts, yampiProducts}) {
    const [selectedProduct, setSelectedProduct] = useState({})
    const [modal, setModal] = useState({add: false, edit: false, delete: false})
    const [search, setSearch] = useState('')

    function handleModalShow(modal, status) {
        setModal(prev => ({...prev, [modal]: status}))
    }

    function handleDeleteProduct(product) {
        toast.promise(FarofaApi.deleteProduct(product.id), {
            pending: `Excluindo produto ${product.id}`,
            success: 'Produto excluido!',
            error: `Ocorreu um erro ao remover o produto ${product.id}`
        })
        setProducts(prev => prev.filter(e => e.id !== product.id))
    }

    function handleEditProduct(product) {
        setProducts(prev => prev.map(e => e.id === product.id ? ({...e, ...product}) : e))
    }

    function handleSelectProduct(modal, product) {
        setSelectedProduct(product)
        handleModalShow(modal, true)
    }

    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <div className='product-actions'>
                <div className='filter-container'>
                    <Form.Control placeholder='Filtrar produto' onChange={e => setSearch(e.target.value)}/>
                </div>
                <div>
                    <Button onClick={() => handleModalShow('add', true)}>
                        <FontAwesomeIcon icon={faPlus} />{' '}
                        Novo produto
                    </Button>
                </div>
            </div>
            <div className='table-content'>
                <Table.Root loading={false}>
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Nome</Table.HeaderCell>
                            <Table.HeaderCell>Código</Table.HeaderCell>
                            <Table.HeaderCell>Tipo</Table.HeaderCell>
                            <Table.HeaderCell>Mensagem</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {
                            filteredProducts.map(product => (
                                <Table.Row key={product.id}>
                                    <Table.Cell>{product.id}</Table.Cell>
                                    <Table.Cell>{product.name}</Table.Cell>
                                    <Table.Cell>{product.code}</Table.Cell>
                                    <Table.Cell>
                                        <Badge pill bg={product.type === 'produto' ? 'primary' : 'secondary'}>
                                            {product.type === 'produto' ? 'Produto' : 'Serviço'}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell tooltip>{product.message}</Table.Cell>
                                    <Table.Cell centered>
                                        <Button size='sm' variant='link' onClick={e => handleSelectProduct('edit', product)}>
                                            <FontAwesomeIcon icon={faPen} />
                                        </Button>
                                        {' '}
                                        <Button size='sm' variant='link' onClick={e => handleSelectProduct('delete', product)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table.Root>
            </div>
            <AddProductModal 
                isShow={modal.add} 
                yampiProducts={yampiProducts} 
                handleModalShow={handleModalShow}
            />
            <DeleteProductModal 
                isShow={modal.delete} 
                product={selectedProduct} 
                handleModalShow={handleModalShow} 
                handleDeleteProduct={handleDeleteProduct}
            />
            <EditProductModal 
                isShow={modal.edit} 
                product={selectedProduct} 
                yampiProducts={yampiProducts} 
                handleModalShow={handleModalShow} 
                handleEditProduct={handleEditProduct}
            />
        </div>
    )
}