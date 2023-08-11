import { useEffect, useState } from "react";
import "./Capitals.css";
import { Link } from "react-router-dom";


function Capitals() {
    const [capitals, setCapitals] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [displayAll, setDisplayAll] = useState(false);
    
    useEffect(() => {
        getCapitals();
    }, []);

    const getCapitals = async () => {
        const response = await fetch("/api/capitals");
        const data = await response.json();
        setCapitals(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Fetch filtered data based on the search term
        const response = await fetch(`/api/capitals?search=${searchTerm}`);
        const data = await response.json();
        setCapitals(data);
        setDisplayAll(true);
    };

    const allCapitals = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/capitals");
        const data = await response.json();
        setCapitals(data);
        setDisplayAll(false);
        setSearchTerm("");
    };

    return (
        <div id="Capitals">
            <div className="main-capitals">
                <h1 className="euro-capi">European Capitals</h1>

                <form className="inputs" onSubmit={handleSubmit}>
                    <label>
                    <input
                        className="search-bar"
                        placeholder="Search by capital, country, language or currency"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}>
                    </input>
                    </label>
                    <button type="submit">Search</button>
                    {displayAll && <button className="all-btn" onClick={allCapitals}>Show all capitals</button>}
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