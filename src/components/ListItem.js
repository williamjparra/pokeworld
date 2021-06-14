import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function ListItem(props) {
    const [pokemon, setPokemon] = useState()

    useEffect(() => {
        var mounted = true
        const getPokemon = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.pokemon}`)
                if (mounted){
                    setPokemon({img: response.data.sprites.front_default})
                }
            } catch (err) {
                console.log(err)
            }
        }
        getPokemon()

        return function cleanup() {
            mounted = false
        }
    }, [props.pokemon])

    return (
        <li>
             <Link to={`/pokemon/${props.pokemon}`}>
                {pokemon && <img src={pokemon.img} alt={pokemon.name} />}
                <p>
                    <strong>
                        {props.pokemon}
                    </strong>
                </p>
            </Link>
        </li>
    )
}
