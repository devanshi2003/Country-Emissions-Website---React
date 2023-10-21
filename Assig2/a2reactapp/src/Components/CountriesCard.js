import { Link } from "react-router-dom"

const countriesCard = ({ countryName, cityCount, imageUrl, iso3, emissionDataYearRange, temperatureDataYearRange, countryId }) => {

    return (
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <img src={imageUrl} className="card-img-top" alt={"Image of " + countryName} />
                <h5 className="card-title">{countryName}</h5>
                <p className="card-text">Number of Cities: {cityCount}</p>
                <p className="card-text">Iso3: {iso3}</p>

                {emissionDataYearRange[0] === 0
                    ? <p className="card-text">No Country Emission Data Available </p>
                    : <Link class="btn btn-primary mb-2" to={"/Countries"}>View Country Emissions</Link>
                }

                {temperatureDataYearRange[0] === 0
                    ? <p className="card-text">No Temperature Data Available </p>
                    : <Link class="btn btn-primary mb-2" to={"/Countries"}>View Temperature Data</Link>}

                <Link class="btn btn-primary" to={"/Cities/" + countryId}>View Cities</Link>

                </div>
        </div>
    );
};

export default countriesCard;
