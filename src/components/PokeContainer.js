import React, { useState, /*useMemo,*/ useEffect } from 'react'
import axios from 'axios'
import PokeCard from './PokeCard'
import Loader from './Loader'
import ListItem from './ListItem'

import './css/PokeContainer.css'

export default function PokeContainer() {
    const [ data, setData ] = useState([])
    const [ next, setNext ] = useState("")
    const [ search, setSearch ] = useState()
    const [ loading, setLoading ] = useState(true)
    const [ searchData, setSearchData ] = useState()
    
    const pokemonFetchAmount = 12

    useEffect(() => {
        const response = async () => {
            try {
                const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${pokemonFetchAmount}`)
                setNext(poke.data.next)
                setData([...poke.data.results])
                setLoading(false)
            } catch(err) {
                setData("error")
                setLoading(false)
            }
        }
        const search = async () => {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=500`)
            setSearchData([...response.data.results])
        }

        response()
        search()
    }, [])    

    const getPokemons = async () => {
        try {
            const response = await axios.get(`${next}`)
            setNext(response.data.next)
            const pokemons = [...data, ...response.data.results]
            setData(pokemons)
        } catch (err) {
            console.log(err)
            setData("error")
        }                
    }

    const filteredPokemons = async (e) => {
        if(e.target.value === "") {
            setSearch(null)
        } 
        
        else {

            const filteredPokemons = searchData.filter((poke) => {
                return poke.name.toLowerCase().includes(e.target.value.toLowerCase())
            })
            setSearch([...filteredPokemons])
        }
    }

    if (loading) {
        return <Loader />
    }

    if(data === "error") {
        return <div>
            <h2>
                Error getting data please try again latter
            </h2>
        </div>
    }

    return (
        <div className="PokeContainer">
            <div className="Search">
                <input type="text" placeholder="Search for Pokemons" onChange={filteredPokemons}/>
                <div className="select-Container" >
                    {
                        search && <ul>
                            {
                                search.map(item => <ListItem pokemon={item.name} key={item.name} />)
                            }
                        </ul>
                    }
                </div>
            </div>
            {data && data.map(pok => <PokeCard pokemonName={pok.name} key={pok.name}/>)}
            <div className="button-Container">
                <button onClick={getPokemons}>
                    <span>Load more Pokemons</span>
                </button>
            </div>
        </div>
    )
}
