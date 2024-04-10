import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import { useLocation  } from 'react-router-dom';

function Home() {
    const location = useLocation();
   
    const [details, setDetails] = useState([]);
    
    useEffect(() => {
        console.log('yes')
        axios.get("http://localhost:8000/home")
            .then(response => {
                setDetails(response.data); // Assuming the response is already JSON data

            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });
    }, []);

    return (
        <div className="homepage">
            <h1>Hello {location.state.id} and welcome to the home</h1>
            <div>
                <h2>User Details:</h2>
                <ul>
                    {details.map(user => (
                        <li key={user._id}>
                            <p>Email: {user.email}</p>
                            <p>Pass : {user.password}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Home;
