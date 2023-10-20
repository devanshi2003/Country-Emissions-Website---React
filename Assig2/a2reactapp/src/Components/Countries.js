import { Link, useParams} from "react-router-dom"

const Countries = ({ }) => {
    let params = useParams()

    return (
        <div className="card col-4 mb-2" style={{ width: 18 + 'rem' }}>
            <h5 className="card-title">Countries Page</h5>
            <h6 className="card-title">{params.regionId}</h6>
            <Link className="btn btn-primary" to="/Cities">Cities</Link>
        </div>
    )
}
export default Countries