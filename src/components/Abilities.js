import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Abilities(props) {
    const [ability, setAbility] = useState()

    useEffect(() => {
        const getHabilityDesc = async () => {
            try{
                const response = await axios.get(`${props.uri}`)
                const abiDesc = response.data.effect_entries.filter(ab => {
                    return ab.language.name.includes("en")
                })
                setAbility({
                    name: response.data.name,
                    effect: abiDesc[0].effect,
                    shortEffect: abiDesc[0].short_effect
                })

            } catch (err) {
                setAbility(null)
            }
        }

        getHabilityDesc()
    }, [])

    return (
        <div className="abi-type">
            <h4>
                Type: {ability && ability.name}   
            </h4>
            <p>
                <b>Ability Description: </b> {ability && ability.effect}
            </p>
            <p>
                <b>Short Effect: </b> {ability && ability.shortEffect}
            </p>        
        </div>
    )
}
