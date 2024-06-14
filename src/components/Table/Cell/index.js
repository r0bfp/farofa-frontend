import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import './style.css'



function ToolTipCell({children, centered}) {
    return (
        <OverlayTrigger overlay={<Tooltip>{children}</Tooltip>}>
            <td className={`text-secondary table-cell ${centered && 'centered'}`}>
                {children}
            </td>
        </OverlayTrigger>
    )
}

export default function Cell({children, tooltip, centered}) {
    return (
        tooltip ?
        <ToolTipCell centered>{children}</ToolTipCell> :
        <td className={`text-secondary table-cell ${centered && 'centered'}`}>
            {children}
        </td>
    )
}