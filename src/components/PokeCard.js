import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import axios from 'axios'
import './css/PokeCard.css'

export default function PokeCard({pokemonName}) {
    const [pokeInfo, setPokeInfo] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const pokemon = async () => {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            setPokeInfo(response.data)
            setLoading(false)
        }
        pokemon()
    }, [pokemonName])

    if(loading === true) {
        return <div className="Card-Container">
            <h3>
                Loading data of {pokemonName}
            </h3>
            <Loader />
        </div>
    }

    return (
        <div className="Card-Container">
            <div className="Img-Container">
                <Link to={`/pokemon/${pokemonName}`}>
                    <img src={pokeInfo.sprites.other.dream_world.front_default} alt={pokeInfo.abilities.map(a => `${a.ability.name} `)}/>
                </Link>
            </div>
            <h3>
                Name: <Link to={`/pokemon/${pokemonName}`}><span>{pokemonName}</span></Link>
            </h3>
            <div className="type">
                <p>Type:</p> {pokeInfo.types.map(type => <p key={type.type.name}>✔️{type.type.name}</p>)}
            </div>
            <small>
                <Link to={`/pokemon/${pokemonName}`}>
                    <strong>
                        #{pokeInfo.id.toString().padStart(4, 0)}
                    </strong>
                </Link>
            </small>
        </div>
    )
}
