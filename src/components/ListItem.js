import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function ListItem(props) {
    const [pokemon, setPokemon] = useState()

    useEffect(() => {
        const getPokemon = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.pokemon}`)
                setPokemon(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        getPokemon()
    }, [props.pokemon])


    return (
        <li>
            {pokemon && <Link to={`/pokemon/${pokemon.name}`}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <p>
                    <strong>
                        {pokemon.name}
                    </strong>
                </p>
            </Link>}
        </li>
    )
}
