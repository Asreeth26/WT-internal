import React, { useState, useEffect,useRef } from "react";
import axios from "axios"; // Make sure to import axios
import { useLocation  } from 'react-router-dom';
import MarksPosting from "./MarksPosting";
import './Home.css';

function Home() {
    const location = useLocation();
    const file = useRef();
    const [details, setDetails] = useState([]);
    const [sec,setSec] = useState();
    const [sub,setSub] = useState();
    
    console.log(sec,sub)
    
    useEffect(() => {
        console.log('yes')
        axios.get(`http://localhost:8000/home?email=${location.state.id}`)
            .then(response => {
                setDetails(response.data); // Assuming the response is already JSON data
                setSec(response.data.section);
                setSub(response.data.subject);
            
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const subject = sub;
        const section = sec;
        const file1 = file.current.files[0];
        console.log(file1)
        const formData = new FormData();
        formData.append('section', section);
        formData.append('subject', subject);
        formData.append('file', file1);

        try {
            const response = await fetch('http://localhost:8000/questionpaper', {
              method: 'POST',
              body: formData
            });
            if (response.ok) {
              alert('File uploaded successfully');
            } else {
              console.error('Failed to upload file');
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }

    

    return (
      <div className="homepage">
      <h1 className="welcome-message">Welcome, Teachers !!</h1>
      <div className="user-details">
        <h2 className="details">Teacher Details</h2>
          <p className="section">Section: {sec}</p>
          <p className="subject">Subject: {sub}</p>
          <p className="email">Email: {location.state.id}</p>
      </div>
      <div className="section2">
      <form onSubmit={handleSubmit} className="file-upload-form">
          <label htmlFor="" className="file-label">Post Question Paper</label>
          <input type="file" name="file" id="" ref={file} accept=".pdf" className="file-input"/> 
          <input type="submit" value="Submit" className="submit-button" />
      </form>
      <MarksPosting />
      </div>
  </div>
    )
}

export default Home;
