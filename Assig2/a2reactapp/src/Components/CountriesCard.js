const countriesCard = ({ countryName, cityCount, imageUrl, iso3, emissionDataYearRange, temperatureDataYearRange }) => {

    return (
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <img src={imageUrl} className="card-img-top" alt={"Image of " + countryName} />
                <h5 className="card-title">{countryName}</h5>
                <p className="card-text">Number of Cities: {cityCount}</p>
                <p className="card-text">Iso3: {iso3}</p>

                {emissionDataYearRange[0] === 0
                    ? <p className="card-text">No Country Emission Data Available </p>
                    : <p className="card-text">Country Emission Data Available From: {emissionDataYearRange[0]} to {emissionDataYearRange[1]} </p>

                }

                {temperatureDataYearRange[0] === 0
                    ? <p className="card-text">No Temperature Data Available </p>
                    : <p className="card-text">Temperature Data Available From: {temperatureDataYearRange[0]} to {temperatureDataYearRange[1]} </p>}
               
                </div>
        </div>
    );
};

export default countriesCard;
