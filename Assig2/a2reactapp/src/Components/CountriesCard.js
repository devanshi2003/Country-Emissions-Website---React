import { Link } from "react-router-dom"

const countriesCard = ({ countryName, cityCount, imageUrl, iso3, emissionDataYearRange, temperatureDataYearRange, countryId, regionId, regionName, countryCount, regionImageUrl }) => {

    const countryData = { countryName, imageUrl, cityCount }
    const regionData = {regionName, countryCount, regionImageUrl, regionId }


    return (
        <div className="card mt-3 ms-3" style={{ width: '18rem' }}>
            <div className="card-body">

                <img src={imageUrl} className="card-img-top" alt={"Image of " + countryName} />
                <h5 className="card-title">{countryName}</h5>

                {cityCount === 0
                    ? <p className="card-text">No Cities Recorded</p>
                    : <p className="card-text">Number of Cities: {cityCount}</p>
                }

                {iso3 && <p className="card-text">Iso3: {iso3}</p>}
                
                {emissionDataYearRange[0] === 0
                    ? <p className="card-text">No Country Emission Data Available </p>
                    : <Link className="btn btn-dark text-center mb-2" to={"/CountryEmission/" + regionId + "/" + countryId} state={{ regionData, countryData }}>View Country Emissions</Link>
                }

                {temperatureDataYearRange[0] === 0
                    ? <p className="card-text">No Temperature Data Available </p>
                    : <Link className="btn btn-dark text-center mb-2" to={"/TemperatureData/" + regionId + "/" + countryId} state={{ regionData, countryData }}>View Temperature Data</Link>}

            
                {cityCount !== 0 && <Link className="btn btn-dark text-center" to={"/Cities/" + regionId + "/" + countryId} state={{ regionData, countryData }}>View Cities</Link>}

                </div>
        </div>
    );
};

export default countriesCard;
