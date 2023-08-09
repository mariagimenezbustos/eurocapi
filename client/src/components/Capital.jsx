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
        <div className="grid">
            <div className="capital-bar">
                <p>Capitals</p>
                <ul>
                    {europeanCapitals.map((c) => (
                        <li key={c.id}>
                            <Link to={`/capitals/${c.id}`}>{c.name}, {c.country}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="main">
                <h1>{capital.name}</h1>
                <h2>Capital of {capital.country}</h2>
                
                <Link to={"/capitals"}>Go back</Link>
            </div>
        </div>
    )
}
