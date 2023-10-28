import { Link } from "react-router-dom";
import '../site.css';


const RegionCard = ({ regionId, regionName, imageUrl, countryCount }) => {

    //const regionData = { regionId, regionName, imageUrl, countryCount }

    return (
        <div className="col-lg-4 mt-5">
            <div className="card border-0 region-card" >
                {regionId !== 0 && <img src={imageUrl} className="rounded-circle mx-auto mt-3" width="140" height="140" alt={"Image of " + regionName} />}
                <div className="card-body d-flex flex-column align-items-center">
                    <h3 className="card-title text-center">{regionName}</h3>
                    <p className="card-text">Number of Countries: {countryCount}</p>
                    <Link className="stretched-link" to={"/Countries/" + regionId}  />
                </div>
            </div>
        </div>
            
    );
};

export default RegionCard;

