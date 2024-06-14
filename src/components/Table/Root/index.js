import { useContext } from "react"
import { Table } from "react-bootstrap"
import { LoadingContext, LoadingProvider } from "../LoadingContext"



export default function Root({ children, loading }) {
    return (
        <LoadingProvider>
            <Table hover>
                {children}
            </Table>
        </LoadingProvider>
    )
}
