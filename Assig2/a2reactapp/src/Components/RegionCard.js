

const RegionCard = ({ regionId, regionName, imageUrl, countryCount }) => {

    return (
        <div className="card" style={{ width: 18 + 'rem' }} >
            <img src={imageUrl} className="card-img-top" alt={"Image of " + regionName} />
            <div className="card-body">
                <h5 className="card-title">{regionName}</h5>
                <h6 className="card-title">{regionId}</h6>
                <p className="card-text">{countryCount}</p>
                </div>
        </div>
    )

}

export default RegionCard;

