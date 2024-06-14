import './style.css'


export default function Row({children}) {
    return (
        <tr className='table-row'>
            {children}
        </tr>
    )
}