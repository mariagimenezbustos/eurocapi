import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Capital.css"

const API_KEY = import.meta.env.VITE_API_KEY; // this still needs to get fixed

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
    const [usernames, setUsernames] = useState({});
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        getCapital();
    }, [id]);

    useEffect(() => {
        getEuropeanCapitals();
    }, []);

    useEffect(() => {
        async function fetchUsernames() {
            const newUsernameMap = { ...usernames };
            for (const comment of comments) {
                if (!newUsernameMap[comment.user_id]) {
                    const username = await fetchUsername(comment.user_id);
                    newUsernameMap[comment.user_id] = username;
                }
            }
            setUsernames(newUsernameMap);
        }
        fetchUsernames();
    }, [comments]);

    useEffect(() => {
        if (capital.name) getWeather();
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

    const fetchUsername = async (user_id) => {
        try {
            const response = await fetch(`/api/users/${user_id}`);
            const userData = await response.json();
            return userData.username;
        } catch (error) {
            console.error("Failed to fetch username:", error);
            return null;
        }
    };

    const getWeather = async () => {

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital.name}&appid=${API_KEY}&units=metric`)
            const data = await response.json();
            console.log(data);

            if(response.ok) setWeather(data.main.temp);
            else if (!response.ok) throw new Error(data.message);

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div id="Capital">
            <div>
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
                        <p className="basics">Official languages:<br/>{capital.language}</p>
                        <p className="basics">Currency:<br/>{capital.currency}</p>
                        {/* {weather && <p className="basics">Current temperature:<br/>{weather} °C</p>} */}
                    </div>

                    <h3>{capital.description_title}</h3>
                    <h4>{capital.description_subtitle_1}</h4>
                    <p>{capital.description_text_1}</p>
                    <h4>{capital.description_subtitle_2}</h4>
                    <p>{capital.description_text_2}</p>
                    <h4>{capital.description_subtitle_3}</h4>
                    <p>{capital.description_text_3}</p>

                    <i>
                        Note: Eurocapi is dedicated to providing accurate and comprehensive 
                        information about {capital.name} and all its unique facets, ensuring 
                        you have the most enriching experience possible.
                    </i>
                </div>   

                <div className="comments">
                    <h4>Experiences from fellow Eurocapis</h4>
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment.id}>
                                <h5>{comment.title}</h5>
                                <p>By {usernames[comment.user_id]}</p>
                                <p>Local: {comment.local ? "Yes" : "No"}</p>
                                <p>Date: {comment.date}</p>
                                <p>{comment.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <button className="go-back">
                    <Link to={"/capitals"}>Go back</Link>
                </button>
            </div>
        </div>
    )
}
