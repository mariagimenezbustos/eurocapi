import { useState, useEffect } from "react";
import "./AddPost.css";

function AddPost() {
    const [europeanCapitals, setEuropeanCapitals] = useState([]);
    const [project, setProject] = useState({
        name: "",
        local: "",
        title: "",
        description: "",
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
        const value = event.target.value;
        const name = event.target.name;
    
        setProject((state) => ({
          ...state,
          [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form button clicked!");
        props.addProject(project);
    };

    return (
        <div id="AddPost">
            <div>
                <h1>Share your experience!</h1>

                <form 
                    // onSubmit={handleSubmit} 
                    // value = {project}
                    >

                    <label>
                        Choose a Capital
                        <select>
                            {europeanCapitals.map((capital) => (
                                <option name="name"
                                key={capital.id}
                                value={capital.name} 
                                >{capital.name}</option>
                            ))}
                        </select>
                    </label>

                    <br />

                    <label className="local">
                        Mark if you're a local
                        <input type="checkbox" className="checkbox" name="local" value={project.local} />
                    </label>

                    <label>
                        <h3 className="title-tag">Title</h3>
                        <input
                            className="title-input"
                            name="title"
                            value={project.title}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </label>

                    <label>
                        <h3 className="description-tag">Description</h3>
                        <textarea
                            className="description-input"
                            name="description"
                            value={project.description}
                            onChange={(e) => handleInputChange(e)}
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