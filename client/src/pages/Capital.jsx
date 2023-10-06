import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Capital.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const RAPID_KEY = import.meta.env.VITE_RAPID_KEY;
const RAPID_HOST = import.meta.env.VITE_RAPID_HOST;

export default function Capital() {
    const [capital, setCapital] = useState({
        url: "",
        name: "",
        country: "",
        population: "",
        language: "",
        currency: "",
        description_title: "",
        description_subtitle_1: "",
        description_text_1: "",
        description_subtitle_2: "",
        description_text_2: "",
        description_subtitle_3: "",
        description_text_3: "",
    });

    const { id } = useParams();
    const [europeanCapitals, setEuropeanCapitals] = useState([]);
    const [comments, setComments] = useState([]);
    const [weather, setWeather] = useState(null);
    const [prices, setPrices] = useState({});
    const [pricesOpen, setPricesOpen] = useState(false);

    useEffect(() => {
        getCapital();
    }, [id]);

    useEffect(() => {
        getEuropeanCapitals();
    }, []);

    useEffect(() => {
        if (capital.name) {
            getWeather();
            getPrices();
        }
    }, [capital.name]);

    const getEuropeanCapitals = async () => {
        const response = await fetch("/api/capitals");
        const data = await response.json();
        setEuropeanCapitals(data);
    };

    const getCapital = async () => {
        try {
            const response = await fetch(`/api/capitals/${id}`);
            const data = await response.json();

            setCapital(data.capital);
            setComments(data.comments);

            if (capital.name) await getWeather();
        } catch (error) {
            console.log("Error fetching capital and comments", error)
        }
    };

    const getPrices = async () => {
        const url = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${capital.name}&country_name=${capital.country}`;
        
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPID_KEY,
                'X-RapidAPI-Host': RAPID_HOST
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log("result: ", result);
            setPrices(result);
        } catch (error) {
            console.error(error);
        };
    };

    const getWeather = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital.name}&appid=${API_KEY}&units=metric`)
            const data = await response.json();

            if(response.ok) setWeather(data.main.temp);
            else if (!response.ok) throw new Error(data.message);

        } catch (error) {
            console.log(error.message);
        }
    };

    const openPrices = () => {
        setPricesOpen(true);
    };

    const closePrices = () => {
        setPricesOpen(false);
    };

    return (
        <div id="Capital">
            <div className="capital-div">
                <ul className="capital-list">
                    {europeanCapitals.map((c) => (
                        <li key={c.id}>
                            <Link to={`/capitals/${c.id}`}>{c.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div>
                <img className="capital-img" src={capital.url} alt={capital.name}/>
                <div className="main-capital">
                    <div className="white-text">
                        <h1 className="capital-name">{capital.name}</h1>
                        <h2 className="capital-country">Capital of {capital.country}</h2>
                    </div>

                    <div className="basics-grid">
                        <p className="basics">Population:<br/>{capital.population} inhabitants</p>
                        <p className="basics">Official language(s):<br/>{capital.language}</p>
                        <p className="basics">Currency:<br/>{capital.currency}</p>
                        {weather && <p className="basics">Current temperature:<br/>{weather} °C</p>}
                    </div>

                    <div>
                        <h3 className="description-title">{capital.description_title}</h3>
                        <h4 className="description-subtitle">{capital.description_subtitle_1}</h4>
                        <p className="description-text">{capital.description_text_1}</p>
                        <h4 className="description-subtitle">{capital.description_subtitle_2}</h4>
                        <p className="description-text">{capital.description_text_2}</p>
                        <h4 className="description-subtitle">{capital.description_subtitle_3}</h4>
                        <p className="description-text">{capital.description_text_3}</p>
                    </div>

                    {capital.name === "Kiev" &&
                    <div className="important-message">
                        <h5>
                            Important Travel Advisory for Kiev, Ukraine:
                        </h5>
                        <p>
                            Considering the current uncertainties and potential challenges, we strongly advise travelers to exercise caution when planning a visit to Kiev. While the city's captivating history and cultural attractions are alluring, it's crucial to prioritize safety and well-being. Stay informed about travel advisories, health guidelines, and local restrictions that might affect your trip. Prioritize your health and stay connected with official government sources and local authorities for the latest updates. Your safety is paramount, and we hope for a time when exploring Kiev's wonders can be enjoyed without reservation. Until then, make informed decisions and ensure your travel plans align with prevailing conditions.
                        </p>
                    </div>}

                    <div>
                        {prices && (<div>
                            <h3>Cost of living in {capital.name}</h3>

                            {pricesOpen ? (
                            <>
                                <table className="prices-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Minimum Price</th>
                                            <th>Maximum Price</th>
                                            <th>Average</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {prices.prices.map((p) => (
                                            <tr key={p.good_id}>
                                                <td>{p.item_name}</td>
                                                <td>{p.min} {p.currency_code}</td>
                                                <td>{p.max} {p.currency_code}</td>
                                                <td>{p.avg} {p.currency_code}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <button className="open-close" onClick={() => closePrices()}>Hide</button>
                            </>)
                            : <button className="open-close" onClick={() => openPrices()}>See</button>}
                        </div>)}
                    </div>
                </div>   

                {comments.length ? <div className="comments">
                    <h4>Experiences from fellow Eurocapis</h4>
        
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment.id}>
                                <div className="comment">
                                    <h5 className="comment-text">{comment.title}</h5>
                                    <p className="comment-text">By {comment.username || "Unknown User"}</p>
                                    <p className="comment-text">Local: {comment.local ? "Yes" : "No"}</p>
                                    <p className="comment-text">Date: {(comment.date).slice(0, 10)}</p>
                                    <p className="comment-text">{comment.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div> : null}

                <p className="note">
                    Note: Eurocapi is dedicated to providing accurate and comprehensive information about {capital.name} and all its unique facets, ensuring you have the most enriching experience possible.
                </p>

                <button className="go-back">
                    <Link to={"/capitals"}>Go back</Link>
                </button>
            </div>
        </div>
    )
}
