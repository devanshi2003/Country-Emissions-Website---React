import { Link } from "react-router-dom"

const Countries = ({ }) => {
    return (
        <div className="card col-4 mb-2" style={{ width: 18 + 'rem' }}>
            <h5 className="card-title">Countries Page</h5>
            <Link className="btn btn-primary" to="/Cities">Cities</Link>
        </div>
    )
}
export default Countries