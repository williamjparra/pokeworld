import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loader from './Loader'
import Abilities from './Abilities'

import './css/PokeInfo.css'

export default function PokeInfo() {
    const [ data, setData ] = useState()
    const [ loading, setLoading ] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                setData(response.data)
                setLoading(false)
            } catch (err) {
                setData("error")
            }
        }
        
        getData()
    }, [id])

    if(data === "error") {
        return <h2>
            error getting data, please try again latter
        </h2>
    }
    
    if(loading) {
        return <div className="pokeInfo-Container">
            <h3>
                Info Page of the Pokemon: {id}
            </h3>
            <Loader />
        </div> 
    }

    const weightFormater = (weight) => {
        var kgWeight = weight * 0.1

        return kgWeight.toString().slice(0,3) 
    }
        
    

    return (
        <div className="pokeInfo-Container">
            <div className="Poke-info-card">
                <div className="img-container">
                    <img src={data.sprites.other.dream_world.front_default} alt={data.name} />
                </div>
                <div>
                    <div className="General-Info">
                        <div className="General">
                            <h3>General info</h3>
                            <p>
                                <b>Weigh:</b> <span>{weightFormater(data.weight)} Kg</span>
                            </p>
                            <p>
                                <b>Height: </b> {data.height} Mts
                            </p>
                        </div>
                        <div className="types">
                            <h3>
                                Types
                            </h3>
                            {data.types.map(type => <p key={type.type.name}>✔️{type.type.name}</p>)}
                        </div>
                        <div className="abilities">
                            <h3> Abilities </h3>
                            <div className="abi-con">
                                {data.abilities.map( ab => <Abilities  uri={ab.ability.url} key={ab.ability.name} />)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="data-stats">
                    <h3>
                        Pokemon Stats
                    </h3>
                    <div className="stats">    
                        {data.stats.map(stat => <p key={stat.stat.name}>
                                <b>{stat.stat.name}: </b>{stat.base_stat}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
