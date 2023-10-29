import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom"

const CountryEmission = ({ }) => {

    const params = useParams();
    const [summaryCountryEmissions, updateSummaryCountryEmissions] = useState([]);
    const [elementData, updateElementData] = useState([]);
    const [selectedElement, updateSelectedElement] = useState(0);
    const [countryEmission, updateCountryEmission] = useState([]);
    const location = useLocation();
    const { regionData, countryData }  = location.state;
    console.log(location.state);


    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/SummaryCountryEmissionData/${params.countryId}`)
            .then(response => response.json())
            .then(data => updateSummaryCountryEmissions(data))
            .catch(err => {
                console.log(err)
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/GetElementList`)
            .then(response => response.json())
            .then(data => updateElementData(data))
            .catch(err => {
                console.log(err)
            });

    }, []);

    useEffect(() => {
        if (selectedElement !== 0 && selectedElement != 'Select an element') {
            fetch(`http://localhost:5256/api/B_Countries/CountryEmissionData/${params.countryId}?elementId=${selectedElement}`)
                .then(response => response.json())
                .then(data => {
                    updateCountryEmission(data);
                })
                .catch(err => {
                    console.log(err);
                });
        }

    }, [selectedElement]);

    function elementChanged() {
        const selectedElement = document.querySelector('[name = "selectedElement"]').value;
        updateSelectedElement(selectedElement)
    }

    return (
        <div>

            <div className="position-relative pt-5">
                <div className="position-absolute top-50 start-0 translate-middle">
                    <Link className="btn btn-dark btn-back" to={"/Countries/" + params.regionId} state={regionData}>Back to Countries</Link>
                </div>
            </div>

            <div className="row">
                <div className="full-width-section full-width-section-countries">
                    <div className="overlay-content">
                        <h2>
                            Emission Data for {countryData.countryName}
                        </h2>
                        {regionData.regionId !== 0 && <h5>Region: {regionData.regionName}</h5>}
                        <img src={countryData.imageUrl} className="rounded-circle mx-auto d-block" width="140" height="140" alt={"Image of " + countryData.countryName} />                      
                    </div>
                </div>
            </div>

                          
            {summaryCountryEmissions.length > 0 ? (
                <>
                    <h5 className="mt-5 text-start">Emission Summary</h5>
                    <table className="table mt-3 table-hover">
                        <thead className="table-info">
                            <tr>
                                <th scope="col">Element</th>
                                <th scope="col">Year</th>
                                <th scope="col">Total Emission</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summaryCountryEmissions.map((data) => (
                                <tr>
                                    <td>{data.element}</td>
                                    <td>{data.year}</td>
                                    <td>{data.totalValue.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )
            : <p> No Data to Show!</p>
            }

            <h5 className="mt-5 text-start">Select Element to View Item Data</h5>
            <div className="text-start">
                <select className="form-select mt-3" style={{ width: '300px'}} value={selectedElement} onChange={elementChanged} name="selectedElement">
                    <option selected>Select an element</option>
                    {elementData.map((element) => (
                        <option value={element.elementId}>{element.elementName}</option>
                    ))}
                </select>
            </div>


            {selectedElement !== 0 && selectedElement !== 'Select an element' && (
            
                <table className="table table-hover">
                    <thead className="table-secondary">
                        <tr>
                            <th scope="col">Year</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            countryEmission ? countryEmission.map((data) => (
                                <tr>
                                    <td>{data.year}</td>
                                    <td>{data.itemName}</td>
                                    <td>{data.value.toFixed(2)}</td>
                                </tr>
                            ))
                                : <p>No data to show</p>
                        }

                    </tbody>
                </table>
            )
            }
        </div>
    )
}
export default CountryEmission