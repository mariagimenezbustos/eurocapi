import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import "./Capital.css";
import HotelDatePicker from "hotel-datepicker";

const WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY;
const RAPID_KEY = import.meta.env.VITE_RAPID_KEY;
const PRICES_HOST = import.meta.env.VITE_PRICES_HOST;
const HOTELS_HOST = import.meta.env.VITE_HOTELS_HOST;

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
    const [location, setLocation] = useState({});
    const [hotels, setHotels] = useState({});
    const [hotelsOpen, setHotelsOpen] = useState(false);
    const [hotelForm, setHotelForm] = useState(false);
    const [arrivalDate, setArrivalDate] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [numGuests, setNumGuests] = useState(1);
    const [numRooms, setNumRooms] = useState(1);

    const inputFieldRef = useRef(null);
    const datePickerRef = useRef(null);

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
            getLocation();
        }
    }, [capital.name]);

    useEffect(() => {
        if (inputFieldRef.current) {
            datePickerRef.current = new HotelDatePicker(inputFieldRef.current, {
                // date format
                format: "YYYY-MM-DD",
                infoFormat: "YYYY-MM-DD",
                ariaDayFormat: "dddd, MMMM DD, YYYY",
                // separator displayed between date strings
                separator: " - ",
                startOfWeek: "monday",
                // start/end dates
                startDate: arrivalDate,
                endDate: departureDate,
                // onSelectRange: (startDate, endDate) => {
                //     console.log("Selected Start Date:", startDate);
                //     console.log("Selected End Date:",endDate);
                // },
                // min/max nights required to select a range of dates
                minNights: 1,
                maxNights: 0,
                // the second date must be after the first date
                selectForward: true,
                // disabled dates
                disabledDates: [],
                noCheckInDates: [],
                noCheckOutDates: [],
                disabledDaysOfWeek: [],
                noCheckInDaysOfWeek: [],
                noCheckOutDaysOfWeek: [],
                // allows the checkout on a disabled date or not
                enableCheckout: false,
                // determines whether to close the date range picker on click outside
                preventContainerClose: false,
                // container to hold the date range picker
                container: "",
                // animation speed
                animationSpeed: ".5s",
                // show a tooltip when hovering a date
                // or:
                // hoveringTooltip: function(nights, startTime, hoverTime) {
                //   return nights;
                // }
                hoveringTooltip: true, 
                // auto close the date range picker when a date range is selected 
                autoClose: true,
                // show/hide the toolbar
                showTopbar: true,
                // or "bottom"
                topbarPosition: "top",
                // move both months when clicking on the next/prev month button
                moveBothMonths: false,
                // enable inline mode
                inline: false,
                // show the Clear button
                clearButton: false,
                // show the Submit button
                submitButton: false,
                // the name of the Submit button
                submitButtonName: '',
                // trigger a custom function to show extra text in day cells
                // parameters: date, attributes
                extraDayText: false,
                // callback functions
                onDayClick: false,
                onOpenDatepicker: false,
                onSelectRange: false,
            });
        }
    }, [inputFieldRef]);

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

    const getWeather = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital.name}&appid=${WEATHER_KEY}&units=metric`)
            const data = await response.json();

            if(response.ok) setWeather(data.main.temp);
            else if (!response.ok) throw new Error(data.message);

        } catch (error) {
            console.log(error.message);
        }
    };

    const getPrices = async () => {
        const url = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${capital.name}&country_name=${capital.country}`;
        
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPID_KEY,
                'X-RapidAPI-Host': PRICES_HOST
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setPrices(result);

        } catch (error) {
            console.log(error.message);
        };
    };

    const getLocation = async () => {
        const url = `https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?text=${capital.name}&languagecode=en-us`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPID_KEY,
                'X-RapidAPI-Host': HOTELS_HOST
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setLocation(result);
            console.log(url);
            console.log(result);
            
        } catch (error) {
            console.log(error.message);
        }
    };

    const getHotels = async () => {
        const url = `https://apidojo-booking-v1.p.rapidapi.com/properties/list?offset=0&arrival_date=${arrivalDate}&departure_date=${departureDate}&guest_qty=${numGuests}&dest_ids=${location[0]["dest_id"]}&room_qty=${numRooms}&search_type=${location[0]["dest_type"]}&search_id=none&price_filter_currencycode=EUR&languagecode=en-us`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPID_KEY,
                'X-RapidAPI-Host': HOTELS_HOST
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setHotels(result);
            console.log(url);
            console.log(result);

        } catch (error) {
            console.log(error.message);
        };
    };

    const sendForm = async (e) => {
        e.preventDefault();
        getHotels();
        setHotelForm(true);
    };

    const openPrices = () => {
        setPricesOpen(true);
    };

    const closePrices = () => {
        setPricesOpen(false);
    };

    const openHotels = () => {
        setHotelsOpen(true);
    };

    const closeHotels = () => {
        setHotelsOpen(false);
    };
    
    const handleGuestsChange = (e) => {
        const value = parseInt(e.target.value);
        setNumGuests(value);
    };

    const handleRoomsChange = (e) => {
        const value = parseInt(e.target.value);
        setNumRooms(value);
    };

    const handleArrivalChange = (e) => {
        const value = e.target.value;
        setArrivalDate(value);
    };

    const handleDepartureChange = (e) => {
        const value = e.target.value;
        setDepartureDate(value);
    }

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
                            {pricesOpen ? (
                            <>
                                <h3>Cost of living in {capital.name}</h3>

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
                            : <button className="open-close" onClick={() => openPrices()}>See Cost of Living</button>}
                        </div>)}
                    </div>

                    <div>
                        {hotels && hotelsOpen ? (
                            <>
                                <h3>Look for hotels in {capital.name}</h3>

                                <form onSubmit={sendForm}>
                                    <label htmlFor="numGuests">
                                        Guests:
                                        <input type="number"
                                        id="numGuests"
                                        name="numGuests"
                                        value={numGuests}
                                        onChange={handleGuestsChange}
                                        min="1"
                                        />
                                    </label>

                                    <label htmlFor="numRooms">
                                        Rooms:
                                        <input type="number"
                                        id="numRooms"
                                        name="numRooms"
                                        value={numRooms}
                                        onChange={handleRoomsChange}
                                        min="1"
                                        />
                                    </label>

                                    <label htmlFor="arrivalDate">
                                        Arrival Date:
                                        <input id="datePickerInput"
                                        type="date"
                                        value={arrivalDate}
                                        onChange={handleArrivalChange}
                                        />
                                    </label>

                                    <label htmlFor="departureDate">
                                        Departure Date:
                                        <input id="datePickerInput"
                                        type="date"
                                        value={departureDate}
                                        onChange={handleDepartureChange}
                                        />
                                    </label>

                                    <button className="hotel-search">Search</button>
                                </form>

                                {hotelForm && hotels.result && hotels.result.map((h) => (
                                    <div key={h.id} className="hotel-booking">
                                        <div>
                                            <h4 className="hotel-name">{h.hotel_name}</h4>
                                            <p><b>Address:</b> {h.address}, {capital.name}, {capital.country}</p>
                                            <p><b>Review Score:</b> {h.review_score / 2}/5</p>
                                            <p><b>All Inclusive Price:</b> {h.price_breakdown.all_inclusive_price} {h.price_breakdown.currency}</p>
                                        </div>
                                        <div>
                                            <img src={h.main_photo_url}
                                            alt={h.hotel_name}
                                            className="hotel-img"
                                            style={{width: "100px", height: "100px"}}
                                            />
                                            <br/>
                                            <Link to={h.url}>Book your stay!</Link>
                                        </div>
                                    </div>
                                ))}

                                <button className="open-close" onClick={() => closeHotels()}>Hide</button>
                            </>
                            ) : (
                            <button className="open-close" onClick={() => openHotels()}>See Hotels</button>
                        )}
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
