import React, { useState } from "react";
import "./Capitals.css";
import { Link } from "react-router-dom";

function Capitals() {
    const [capitals, setCapitals] = useState();

    return (
        <div>
            <p>Capitals</p>
            <Link to={`/capitals/${capital.id}`}></Link>
        </div>
    )
}

export default Capitals;