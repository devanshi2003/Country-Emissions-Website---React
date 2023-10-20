import './App.css';
import { Link, Outlet } from "react-router-dom"


function App() {
  return (
      <div className="App container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                  <a className="navbar-brand" href="#">Environmental Database</a>
                  <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav">
                          <li className="nav-item">
                              <a className="nav-link" aria-current="page" href="#">Regions</a>
                          </li>                       
                      </ul>
                  </div>
              </div>
          </nav>
          <Outlet />
      </div>
  );
}

export default App;
