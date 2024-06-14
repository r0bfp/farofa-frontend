import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"

import Login from "./pages/Login"
import Products from "./pages/Products"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./contexts/AuthContext"
import Loader from "./components/Loader"


const PrivateRoute = () => {
    const { validate_token } = useContext(AuthContext)
    const [isValid, setIsValid] = useState(null)

    useEffect(() => {
        const checkTokenValidity = async () => {
            const isValidToken = await validate_token()

            setIsValid(isValidToken)
        }

        checkTokenValidity()
    }, [validate_token])

    if (isValid === null) {
        return <Loader/>
    }
  
    return isValid ? <Outlet /> : <Navigate to="/" />
}

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='app' element={<PrivateRoute/>}>
                    <Route path="home" element={<Products/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
