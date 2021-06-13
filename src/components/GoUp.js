import React from 'react'
import './css/GoUp.css'

export default function GoUp() {
    const goUp = () => {window.scrollTo(0, 0)}

    return (
        <div className="upButton" onClick={goUp}>
            <span>
                ⬆️
            </span>
        </div>
    )
}
