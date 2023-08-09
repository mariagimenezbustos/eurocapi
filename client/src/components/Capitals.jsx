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

    return (
        <div>
            <div className="main">
                <p>Capitals</p>

                    <ul>
                        {capitals.map((capital) => (
                            <li key={capital.id}>
                                <Link to={`/capitals/${capital.id}`}>{capital.name}, {capital.country}</Link>
                            </li>
                        ))}
                    </ul>
            </div>
        </div>
    )
}

export default Capitals;