import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import CountriesCard from './CountriesCard'

const Countries = ({ }) => {

    let params = useParams()
    const [countriesData, updateCountriesData] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/CountryList/${params.regionId}`)
            .then(response => response.json())
            .then(data => updateCountriesData(data))
            .catch(err => {
                console.log(err)
            });

    }, [])


    return (
        <div className="row">
            <p>Load Data here </p>
        </div>
    );
}
export default Countries