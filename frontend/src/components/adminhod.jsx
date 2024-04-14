import { useState,useEffect } from "react"
import axios from 'axios';
import './adminhod.css';

function adminhod(){
    const [papers,setPapers] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);

    const handleCheckboxChange = (fileId) => {
        setSelectedFile(fileId);
    };

    const handleSubmit = () => {
        // Show the selected file
        if (selectedFile !== null) {
            const selectedFileName = papers.find(file => file._id === selectedFile).section;
            console.log('Selected File:', selectedFileName);
            axios.post('http://localhost:8000/selectedfile', { selectedFile: selectedFileName })
                .then(response => {
                    console.log('Response from backend:', response.data);
                })
                .catch(error => {
                    console.error('Error sending selected file to backend:', error);
                });

        } else {
            console.log('No file selected');
        }
    };
    useEffect(()=>{

        fetch('http://localhost:8000/questionpaper')
        .then(response => response.json())
            .then(data => {
                setPapers(data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });

    },[])
    
    return(
        <div className="hod-dashboard">
    <h1 className="hod-dashboard-title">HOD DASHBOARD</h1>
    <div className="file-selection-container">
        <ul className="file-list">
            {papers.map(file => (
                <li key={file._id.toString()} className="file-item">
                    <div className="s">
                    <label >Select</label>
                    <input
                        type="radio"
                        id={file._id}
                        name="file"
                        onChange={() => handleCheckboxChange(file._id)}
                        checked={selectedFile === file._id}
                        className="file-input"
                    />
                    </div>
                    <label htmlFor={file._id} className="file-label">
                        <strong className="file-label-text">Filesec:</strong>
                        <span className="file-value">{file.section}</span>
                        <br />
                        <strong className="file-label-text">Filesub:</strong>
                        <span className="file-value">{file.subject}</span>
                    </label>
                </li>
            ))}
        </ul>
        <button onClick={handleSubmit} className="submit-button">
            Submit
        </button>
    </div>
</div>

    )
}

export default adminhod