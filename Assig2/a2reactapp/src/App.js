import './App.css';
import { Link, Outlet } from "react-router-dom"

function App() {
  return (
      <div className="App container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                  <Link className="nav-link active" to="/">Environmental Data</Link>
                  <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav">
                          <div className="navbar-nav">
                              <Link className="nav-link active" to="/Region">Region</Link>
                              <Link className="nav-link active" to="/Countries/0">Countries</Link>
                          </div>
                      </ul>
                  </div>
              </div>
          </nav>
          <Outlet />
      </div>
  );
}

export default App;
