import axios from "axios"
import JSONbigint from "json-bigint"


const api = axios.create({baseURL: process.env.REACT_APP_API_URL})
console.log(process.env.REACT_APP_API_URL)

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
        try {
            const response = await api.get('/stock', { 
                transformResponse: [data => data] 
            })

            let parsedResponse = JSONbigint.parse(response.data)
            parsedResponse = parsedResponse.map(e => ({...e, id: e.id.toString()}))

            return response.status === 200 && parsedResponse
        } catch (error) {
            return false
        }
    },
    addProducts: async (products) => {
        const promises = products.map(product =>
            api.post('/stock', product)
              .then(response => ({status: response.status, ...response.data}))
              .catch(error => ({ code: product.code, status: error.response.status }))
        )

        return await Promise.all(promises)
    },
    deleteProduct: (productId) => {
        return api.delete(`/stock/${productId}`)
    },
    editProduct: (product) => {
        return api.put(`/stock/${product.id}`, product)
    },
    listYampiProducts: async () => {
        try {
            const response = await api.get('/yampi/products')

            return response.status === 200 && response.data
        } catch (error) {
            return []
        }
    },
    sendMailIsActive: async () => {
        try {
            const response = await api.get('/yampi/send-mail')

            return response.data.active
        } catch (error) {
            return false
        }
    },
    updateSendMailActive: async (isActive) => {
        try {
            await api.put('/yampi/send-mail', {active: isActive})
        } catch (error) {
            return 
        }
    },
}