import React from 'react'
import { Link } from 'react-router-dom'

import './css/Nav.css'

export default function Nav() {
    return (
        <nav>
            <Link to="/">
                <h1>
                    PokeWorld    
                </h1>         
            </Link>
        </nav>
    )
}
