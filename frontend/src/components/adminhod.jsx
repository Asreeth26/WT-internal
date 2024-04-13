import { useState,useEffect } from "react"
import axios from 'axios';

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
        <>
        <h1>hi</h1>
        <div>
            <ul>
                {papers.map(file => (
                    <li key={file._id.toString()}>
                        <input
                            type="radio"
                            id={file._id}
                            name="file"
                            onChange={() => handleCheckboxChange(file._id)}
                            checked={selectedFile === file._id}
                        />Select
                        <label htmlFor={file._id}>
                            <p>{file._id}</p>
                            <strong>Filesec:</strong> {file.section}
                            <br />
                            <strong>Filesub:</strong> {file.subject}
                        </label>
                    </li>
                ))}
            </ul>
            <button onClick={handleSubmit}>Submit</button>
        </div>
        </>
    )
}

export default adminhod