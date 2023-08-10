import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Capital.css"

export default function Capital() {
    const [capital, setCapital] = useState({ name: "", country: "", population: "", language: "" });
    const { id } = useParams();
    const [europeanCapitals, setEuropeanCapitals] = useState([]);

    useEffect(() => {
        getCapital();
    }, [id]);

    useEffect(() => {
        getEuropeanCapitals();
    }, []);

    const getEuropeanCapitals = async () => {
        const response = await fetch("/api/capitals");
        const data = await response.json();
        setEuropeanCapitals(data);
    };

    const getCapital = async () => {
        const response = await fetch(`/api/capitals/${id}`);
        const data = await response.json();
        setCapital(data);
    };

    return (
        <div id="Capital">
            <div className="capital-bar">
                <ul>
                    {europeanCapitals.map((c) => (
                        <li key={c.id}>
                            <Link to={`/capitals/${c.id}`}>{c.name}, {c.country}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="main-capital">
                <img className="capital-img" src={capital.url}/>
                <div className="white-text">
                    <h1 className="capital-name">{capital.name}</h1>
                    <h2 className="capital-country">Capital of {capital.country}</h2>
                    <p>Population: {capital.population} inhabitants | Official languages: {capital.language}</p>
                </div>

                <button>
                    <Link to={"/capitals"}>Go back</Link>
                </button>
            </div>
        </div>
    )
}
