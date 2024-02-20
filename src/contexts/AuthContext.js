import { createContext } from "react";
import { FarofaApi } from "../services/FarofaApi";


export const AuthContext = createContext(null)


export default function AuthProvider({children}) {
    async function validate_token() {
        const token = localStorage.getItem('token')

        if(token){
            const isValid = await FarofaApi.validateToken(token)

            return isValid
        }
    }

    async function signin(username, password) {
        const token = await FarofaApi.signin(username, password)

        if(token){
            localStorage.setItem('token', token)

            return true
        }

        return false
    }

    async function signout() {
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{signin, signout, validate_token}}>
            {children}
        </AuthContext.Provider>
    )
}