import { Link } from "react-router-dom";

const RegionCard = ({ regionId, regionName, imageUrl, countryCount }) => {

    const linkStyle = {
        textDecoration: 'none', 
        color: 'inherit', 
    };

    return (
        
        <div className="card" style={{ width: '18rem' }}>
            <Link to = {"/Countries/" + regionId} style={linkStyle}>
                <img src={imageUrl} className="card-img-top" alt={"Image of " + regionName} />
                <div className="card-body">
                    <h5 className="card-title">{regionName}</h5>
                    <h6 className="card-title">{regionId}</h6>
                    <p className="card-text">{countryCount}</p>
                </div>
            </Link>
        </div>
    );
};

export default RegionCard;

