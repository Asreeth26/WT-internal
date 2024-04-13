import { useState,useEffect } from "react"
import axios from 'axios';

function adminhome(){

    const [papers,setPapers] = useState([])
    const [click,setClick] = useState([])
    const handleButtonClick = () => {
       
        axios.post('http://localhost:8000/update-pick', { pick: false })
            .then(response => {
                alert('Records updated successfully');
            })
            .catch(error => {
                console.error('Error updating records:', error);
            })
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

    useEffect(()=>{

        fetch('http://localhost:8000/questionpaper/isclicked')
        .then(response => response.json())
            .then(data => {
                setClick(data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });

    },[])
    return(
        <>
        <h1>hi</h1>
        <ul>
    {papers.map(file => (
        <li key={file._id.toString()}> {/* Convert _id to string */}
            <p>{file._id}</p>
            <strong>Filename:</strong> {file.section}
            <br />
            <strong>File Data:</strong>
            <a href={`data:application/pdf;base64,${file.file}`} download={file.section}>
                            Download
            </a>
        </li>
    ))}
</ul>

        <div>
            <button onClick={handleButtonClick}>Click to send
            </button>
        </div>

        
        <h1>Selected by Hod</h1>
        <ul>
  {click.map(files => (
    <li key={files._id.toString()}>
      <strong>Filename:</strong> {files.section}
      <br />
      <strong>File Data:</strong>
            <a href={`data:application/pdf;base64,${files.file}`} download={files.section}>
                            Download
            </a>
    </li>
  ))}
</ul>

        </>
    )
}

export default adminhome