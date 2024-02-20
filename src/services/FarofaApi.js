import axios from "axios"


const api = axios.create({baseURL: process.env.REACT_APP_API_URL_V2})

api.interceptors.request.use(
    function(config) {
        const token = localStorage.getItem("token")

        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token
        }
        return config
    },
    function(error) {
        return Promise.reject(error)
    }
)

export const FarofaApi = {
    signin: async (username, password) => {
        try {
            const formData = new FormData()

            formData.append('username', username)
            formData.append('password', password)
    
            const response = await api.post('/auth/signin', formData)
            
            const token = response.data && response.data.token

            api.defaults.headers.common.Authorization = 'Bearer ' + token

            return token
        } catch (error) {
            return false
        }
    },
    validateToken: async (token) => {
        const response = await api.post('/auth/validate', {}, {
            headers: {Authorization: `Bearer ${token}`},
            validateStatus: () => true
        })

        return response.status === 200
    },
    listProducts: async () => {
        const response = await api.get('/products')

        if(response.status !== 200){
            return false
        }else{
            return response.data
        }
    },
    addProducts: async (products) => {
        const promises = products.map(product =>
            api.post('/products', product)
              .then(response => ({ code: product.code, status: response.status }))
              .catch(error => ({ code: product.code, status: error.response.status }))
        )

        return await Promise.all(promises)
    },
    deleteProduct: (productId) => {
        return api.delete(`/products/${productId}`)
    },
    editProduct: (product) => {
        return api.put(`/products/${product.id}`, product)
    },
    listYampiProducts: async () => {
        const response = await api.get('/yampi/products')
        
        if(response.status !== 200){
            return false
        }else{
            return response.data
        }
    },
}