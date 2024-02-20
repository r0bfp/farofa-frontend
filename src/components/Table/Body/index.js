import './style.css'


export default function Body({children}) {
    return (
        <tbody className='table-body'>
            {children}
        </tbody>
    )
}