import { useEffect, useState } from "react";
import "./Capitals.css";
import { Link, Outlet } from "react-router-dom";


function Capitals() {
    const [capitals, setCapitals] = useState([]);

    useEffect(() => {
        getCapitals();
    }, []);

    const getCapitals = async () => {
        const response = await fetch("/api/capitals");
        const data = await response.json();
        setCapitals(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // const response = await fetch("/api/capitals?search=")
    }

    return (
        <div id="Capitals">
            <div className="main-capitals">
                <h1>European Capitals</h1>

                <form onSubmit={handleSubmit}>
                    <label>
                    <input className="search-bar" placeholder="Search by capital, country or language">
                    </input> {/* THIS STILL DOESN'T TAKE onChange */}
                    </label>
                    <button type="submit">Search</button>
                </form>

                <div className="card-grid">
                    {capitals.map((capital) => (
                        <div key={capital.id} className="card">
                            <img src={capital.url} alt="Image" className="card-img" />
                            <h2 className="card-title">{capital.name}</h2>
                            <h3 className="card-description">{capital.country}</h3>
                            <button className="card-btn">
                                <Link to={`/capitals/${capital.id}`}>Discover {capital.name}</Link>
                            </button>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    )
}

export default Capitals;