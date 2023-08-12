import { useState, useEffect } from "react";
import "./AddPost.css";
import { Link } from "react-router-dom";

function AddPost() {
    const [europeanCapitals, setEuropeanCapitals] = useState([]);
    const [project, setProject] = useState({
        capital_id: "",
        local: false,
        title: "",
        description: "",
        username: "",
    });

    useEffect(() => {
        getEuropeanCapitals();
    }, []);

    const getEuropeanCapitals = async () => {
        const response = await fetch("/api/capitals");
        const data = await response.json();
        setEuropeanCapitals(data);
    };

    const handleInputChange = (event) => {
        const value = event.target.value === "checkbox" ? event.target.checked : event.target.value;
        const name = event.target.name;
    
        setProject((state) => ({
          ...state,
          [name]: value,
        }));
    };

    const getUser = async (req, res) => {
        const { username } = req.query
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Capital ID:", project.capital_id);

        // Fetch user ID based on the provided username
        const userResponse = await fetch(`/api/users?username=${project.username}`);

        if (userResponse.ok) {
            const userData = await userResponse.json();

            const newComment = {
                capital_id: project.capital_id,
                local: project.local,
                title: project.title,
                description: project.description,
                user_id: userData.id,
            };
    
            const response = await fetch(`/capitals/${project.capital_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newComment),
            });
        
            if (response.ok) {
                setProject((state) => ({
                    ...state,
                    capital_id: "",
                    local: false,
                    title: "",
                    description: "",
                    username: "",
                }));

                // Redirecting to the capital's landing page
                const capitalId = europeanCapitals.find((capital) => capital.id === project.capital_id).id;
                return <Link to={`/capitals/${capitalId}`}/>
            } else {
                // Handle error
                console.error("Failed to add comment.");
            }

        } else {
            console.error("Failed to fetch user data");
        }
    };

    return (
        <div id="AddPost">
            <div>
                <h1>Share your experience!</h1>

                <form 
                    onSubmit={handleSubmit}
                    >

                    <label>
                        Select a capital
                        <select
                            name="capital_id"
                            value={project.capital_id}
                            onChange={handleInputChange}
                            >
                                <option>Choose</option>
                                {europeanCapitals.map((c) => (
                                    <option
                                    key={c.id}
                                    value={c.id} 
                                    >{c.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <br />

                    <label className="local">
                        Mark if you're a local
                        <input
                            type="checkbox"
                            className="checkbox"
                            name="local"
                            checked={project.local}
                            onChange={handleInputChange}
                        />
                    </label>

                    <br />

                    <label className="user">
                        Please provide your username
                        <input
                            name="username"
                            className="username"
                            value={project.username}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        <h3 className="title-tag">Title</h3>
                        <input
                            className="title-input"
                            name="title"
                            value={project.title}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        <h3 className="description-tag">Description</h3>
                        <textarea
                            className="description-input"
                            name="description"
                            value={project.description}
                            onChange={handleInputChange}
                        />
                    </label>

                    <div className = "submit">
                        <button>SUBMIT</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default AddPost;