import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loader from './Loader'

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
                console.log(response.data)
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

    return (
        <div className="pokeInfo-Container">
            <h3>
                Info Page of the Pokemon: {id}
            </h3>
            {loading === true ? <Loader /> : data &&
                <div className="Poke-info-card">
                    <div className="img-container">
                        <img src={data.sprites.other.dream_world.front_default} alt={data.name} />
                    </div>
                    <div>
                        <div className="General-Info">
                            <p>
                                <strong>Weigh:</strong> <span>{data.weight * 0.1} Kg</span>
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
