import './style.css'


export default function HeaderCell({children}) {
    return (
        <th className='head-cell'>
            {children}
        </th>
    )
}