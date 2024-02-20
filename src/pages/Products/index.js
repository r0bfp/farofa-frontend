import { useEffect, useState } from 'react'
import { FarofaApi } from '../../services/FarofaApi'
import ProductsTable from './ProductsTable'
import SettingsDropdown from './SettingsDropdown'
import './style.css'


export default function Products() {
    const [products, setProducts] = useState([])
    const [yampiProducts, setYampiProducts] = useState([])

    useEffect(() => {
        fetchProducts()
        fetchYampiProducts()
    }, [])

    async function fetchProducts() {
        setProducts(await FarofaApi.listProducts())
    }

    async function fetchYampiProducts() {
        setYampiProducts(await FarofaApi.listYampiProducts())
    }

    return (
        <div className='container'>
            <div className='products-module'>
                <div className='container-header'>
                    <div>
                        <h5>Produtos</h5>
                        <span className='text-secondary'>Gerenciamento do estoque de produtos</span>
                    </div>
                    <div>
                        <SettingsDropdown />
                    </div>
                </div>
                <div className='container-body'>
                    <ProductsTable
                        products={products}
                        setProducts={setProducts}
                        yampiProducts={yampiProducts}
                        fetchProducts={fetchProducts}
                    />
                </div>
                <div className='container-footer'>
                    <span className='text-secondary'>{products.length} Registros</span>
                </div>
            </div>
        </div>
    )
}
