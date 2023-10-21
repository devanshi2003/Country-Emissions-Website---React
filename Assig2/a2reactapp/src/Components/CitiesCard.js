
const citiesCard = ({ cityName }) => {

    return (
        <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                <h5 className="card-title">{cityName}</h5>
                </div>
        </div>
    )

}
export default citiesCard