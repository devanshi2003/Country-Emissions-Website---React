const countriesCard = ({ countryName }) => {

    return (
        <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{countryName}</h5>
                </div>
        </div>
    );
};

export default countriesCard;
