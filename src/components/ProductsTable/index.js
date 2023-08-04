import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';


function PlaceHolder() {
    return (
        Array(3).fill(0).map((_, i) => (
            <tr key={i}>
                {
                Array(6).fill(0).map((_, j) => (
                    <td key={j} className='placeholder-glow'>
                        <div className='placeholder' style={{height: '100%', width: '100%'}}></div>
                    </td>
                ))
                }
            </tr>
        ))
    )
}

export default function ProductsTable({products, productsStatus, handleEditClick, handleDeleteClick}){
    return (
        <>
            <Table responsive hover className="same-col-widths">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Código</th>
                        <th>Tipo</th>
                        <th>Mensagem</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productsStatus === 'pending' ? <PlaceHolder/> :
                        !!products.length ?
                        products.map((item, i) => (
                            <tr key={i}>
                                <td>{i}</td>
                                <td>{item.name}</td>
                                <td>{item.code}</td>
                                <td>
                                    <Badge bg={item.type === 'produto' ? 'primary' : 'secondary'}>
                                        {item.type === 'produto' ? 'Produto' : 'Serviço'}
                                    </Badge>
                                </td>
                                <td>{item.message}</td>
                                <td>
                                    <div style={{display: 'flex', height: '100%', alignItems: 'center'}}>
                                        <Button style={{marginRight: '2px'}} variant="outline-primary" size='sm' onClick={() => handleEditClick(item)}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </Button>
                                        <Button variant="outline-danger" size='sm' onClick={() => handleDeleteClick(item.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        )) : 
                        (
                            <tr>
                                <td colSpan={6}>
                                    <h3>Nenhum produto encontrado</h3>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </>
    )
}