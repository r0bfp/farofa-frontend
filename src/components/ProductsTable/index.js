import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';


export default function ProductsTable({products, handleEditClick, handleDeleteClick}){
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
                                    <Button variant="outline-primary" size='sm' onClick={() => handleEditClick(item)}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </Button>{' '}
                                    <Button variant="outline-danger" size='sm' onClick={() => handleDeleteClick(item.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </td>
                            </tr>
                        )) :
                        (
                            <tr>
                                <td colSpan={6}><h3>Nenhum produto encontrado</h3></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </>
    )
}