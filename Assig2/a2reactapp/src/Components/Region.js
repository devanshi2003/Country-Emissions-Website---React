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
            <div className="card col-4 mb-2" style={{ width: 18 + 'rem' }}>
                <h5 className="card-title">Regions Page</h5>
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