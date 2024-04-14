import { useState,useEffect } from "react"
import axios from 'axios';
import './adminhome.css';

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
        <div className="admin-dashboard">
    <h1 className="admin-dashboard-title">ADMIN DASHBOARD</h1>
    <div className="files">
    <h2 className="file-title">Question Papers</h2>
    <ul className="file-list">
        {papers.map(file => (
            <li key={file._id.toString()} className="file-item">
                {/* <p className="file-id">{file._id}</p> */}
                <strong className="file-label">Teacher Section:</strong>
                <span className="file-value">{file.section}</span>
                <br />
                <strong className="file-label">File Data:</strong>
                <a
        href={`data:application/pdf;base64,${btoa(String.fromCharCode.apply( file.file))}`}
        download={file.section}
        className="file-download-link"
      >
        Download
      </a>
            </li>
        ))}
    </ul>
    <div className="button-container">
        <button onClick={handleButtonClick} className="send-button">
            Click to send
        </button>
    </div>
</div>


    <h1 className="selected-title">Selected by Hod</h1>
    <div className="files">
    <ul className="selected-file-list">
  {click.map(files => (
    <li key={files._id.toString()} className="selected-file-item">
      <strong className="file-label">Filename:</strong>
      <span className="file-value">{files.section}</span>
      <br />
      <strong className="file-label">File Data:</strong>
      <a
        href={`data:application/pdf;base64,${btoa(String.fromCharCode.apply( files.file))}`}
        download={files.section}
        className="file-download-link"
      >
        Download
      </a>
    </li>
  ))}
</ul>

</div>
</div>
    )
}

export default adminhome