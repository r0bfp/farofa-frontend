import { useEffect, useState } from 'react'
import { FarofaApi } from '../../services/FarofaApi'
import ProductsTable from './ProductsTable'
import SettingsDropdown from './SettingsDropdown'
import './style.css'
import Loader from '../../components/Loader'


export default function Products() {
    const [products, setProducts] = useState([])
    const [yampiProducts, setYampiProducts] = useState([])
    const [sendMailIsActive, setSendMailIsActive] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            setLoading(true)

            const [
                productsResponse, 
                yampiProductsResponse, 
                sendMailIsActiveResponse
            ] = await Promise.all([
                FarofaApi.listProducts(),
                FarofaApi.listYampiProducts(),
                FarofaApi.sendMailIsActive()
            ])

            setProducts(productsResponse)
            setYampiProducts(yampiProductsResponse.map(e => ({value: e.id, label: e.name})))
            setSendMailIsActive(sendMailIsActiveResponse)
        } catch (error) {
            console.error('Erro ao buscar dados:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Loader visible={loading}/>
            <div className='container'>
                <div className='products-module'>
                    <div className='container-header'>
                        <div>
                            <h5>Produtos</h5>
                            <span className='text-secondary'>Gerenciamento do estoque de produtos</span>
                        </div>
                        <div>
                            <SettingsDropdown sendMailIsActive={sendMailIsActive} setSendMailIsActive={setSendMailIsActive}/>
                        </div>
                    </div>
                    <div className='container-body'>
                        <ProductsTable
                            products={products}
                            setProducts={setProducts}
                            yampiProducts={yampiProducts}
                        />
                    </div>
                    <div className='container-footer'>
                        <span className='text-secondary'>{products.length} Registros</span>
                    </div>
                </div>
            </div>
        </>
    )
}
