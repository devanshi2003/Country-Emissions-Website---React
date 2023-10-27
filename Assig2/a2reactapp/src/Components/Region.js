import RegionCard from './RegionCard'
import { useState, useEffect } from 'react'

const Region = ({ }) => {

    const [regionsData, updateRegionsData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5256/api/A_Regions`)
            .then(response => response.json())
            .then(data => updateRegionsData(data))
            .catch(err => {
                console.log(err)
            });
    }, [])

    return (
        <div>
            <div className="full-width-section">
                <div className="overlay-content">
                    <h1> Regions</h1>
                </div>
            </div>

            <div className="row">
                {regionsData.map((obj) => (
                    <RegionCard
                        key={obj.regionId}
                        regionId={obj.regionId}
                        regionName={obj.regionName}
                        imageUrl={obj.imageUrl}
                        countryCount={obj.countryCount}
                    />
                )
                )
                }
            </div>
        </div>
        
    )
}
export default Region