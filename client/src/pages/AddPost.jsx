import { useState, useEffect } from "react";
import "./AddPost.css";

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
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        const name = event.target.name;
    
        setProject((state) => ({
          ...state,
          [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Capital ID:", project.capital_id);

        try {
            // Fetch user ID based on the provided username
            const userResponse = await fetch(`/api/users/${project.username}`);

            if(!userResponse.ok) {
                console.error("Failed to fetch user data");
                return;
            }

            const userData = await userResponse.json();
            console.log(userData);

            const newComment = {
                local: project.local,
                title: project.title,
                description: project.description,
                user_id: userData.id,
                username: project.username,
            };

            console.log(newComment);
        
            const response = await fetch(`/api/capitals/${project.capital_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newComment),
            });

            console.log(response.status, response.statusText);
        
            if (response.ok) {
                setProject({
                    capital_id: "",
                    local: false,
                    title: "",
                    description: "",
                    username: "",
                });

            } else {
                // Handle error
                console.error("Failed to add comment.");
            }
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    return (
        <div id="AddPost">
            <div>
                <h1 className="share-experience">Share your experience!</h1>

                <form 
                    className="experience-form"
                    onSubmit={handleSubmit}
                    >

                    <label className="label">
                        Select a capital
                        <select
                            name="capital_id"
                            className="capital"
                            value={project.capital_id}
                            onChange={handleInputChange}
                            >
                                <option id="choose_id">Choose</option>
                                {europeanCapitals.map((c) => (
                                <option
                                key={c.id}
                                value={c.id}
                                id={c.id} 
                                >{c.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <br />

                    <label className="label">
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

                    <label className="label">
                        Please provide your username
                        <input
                            name="username"
                            className="username"
                            value={project.username}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label className="label">
                        <h3 className="title-tag">Title</h3>
                        <input
                            className="title-input"
                            name="title"
                            value={project.title}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label className="label">
                        <h3 className="description-tag">Description</h3>
                        <textarea
                            className="description-input"
                            name="description"
                            value={project.description}
                            onChange={handleInputChange}
                        />
                    </label>

                    <div className = "submit">
                        <button className="button">SUBMIT</button>
                    </div>
                    
                </form>

            </div>
        </div>
    )
}

export default AddPost;