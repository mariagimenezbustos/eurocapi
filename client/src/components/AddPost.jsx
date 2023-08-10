import { useState, useEffect } from "react";
import "./AddPost.css";

function AddPost() {
    const [europeanCapitals, setEuropeanCapitals] = useState([]);
    const [project, setProject] = useState({
        name: "",
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
                <p>AddPost</p>

                <form 
                    // onSubmit={handleSubmit} 
                    // value = {project}
                    >

                    <label>
                        Choose a Capital
                        <select>
                            {europeanCapitals.map((capital) => (
                                <option name="name" key={capital.id} value={capital.name} >{capital.name}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Title
                        <input
                            name="title"
                            value={project.title}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </label>

                    <label>
                        Description
                        <textarea
                            name="description"
                            value={project.description}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </label>

                    <div className = "span2cols">
                        <button>SUBMIT</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default AddPost;