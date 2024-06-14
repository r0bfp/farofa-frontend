import { Spinner } from "react-bootstrap";
import './style.css'

export default function Loader({children, visible = false}) {
    return (
        <div className={`loader-container ${!visible && 'hide'}`}>
            <Spinner
                variant="primary"
                as="span"
                animation="border"
                role="status"
                aria-hidden="true"
            />
        </div>
    )
}