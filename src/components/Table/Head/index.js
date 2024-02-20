import './style.css'


export default function Head({children}) {
    return (
        <thead className='table-head'>
            {children}
        </thead>
    )
}