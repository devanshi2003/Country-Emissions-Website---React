const countriesCard = ({ countryName, regionName }) => {

    return (
        <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                <h5 className="card-title">{countryName}</h5>
                <h6 className="card-title">{regionName}</h6>

                </div>
        </div>
    );
};

export default countriesCard;
