import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Region from './Components/Region';
import Countries from './Components/Countries';
import Cities from './Components/Cities';
import TemperatureData from './Components/TemperatureData'
import CountryEmission from './Components/CountryEmission'
import AirQualityData from './Components/AirQualityData'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="Region" element={<Region />} />
                <Route path="Countries/:regionId" element={<Countries />} />
                <Route path="Cities/:regionId/:countryId" element={<Cities />} />
                <Route path="TemperatureData/:regionId/:countryId" element={<TemperatureData/>} />
                <Route path="CountryEmission/:regionId/:countryId" element={<CountryEmission />} />
                <Route path="AirQualityData/:regionId/:countryId/:cityID" element={<AirQualityData />} />
                <Route path="*" element={<Region />} /> {/*route when no matches are found above*/}
            </Route>
        </Routes>
    </BrowserRouter> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
