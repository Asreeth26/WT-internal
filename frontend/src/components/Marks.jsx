import { useState,useEffect } from "react"
import axios from 'axios';
function Marks(){

    const [marks,setMarks] = useState([])

    useEffect(()=>{

        fetch('http://localhost:8000/marks')
        .then(response => response.json())
            .then(data => {
                setMarks(data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });

    },[])
  
    return(
        <div>
        <h1>Student Marks</h1>
        <table style={{ borderCollapse: 'collapse', width: '70%' }}>
            <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                    
                    <th style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>Roll No</th>
                    <th style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>Marks</th>
                </tr>
            </thead>
            <tbody>
                {marks.map((student, index) => (
                    Object.entries(student.marksData).map(([subject, mark], subIndex) => (
                        <tr key={index + subIndex} style={{ border: '1px solid #dddddd' }}>
                     
                            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{subject}</td>
                            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{mark}</td>
                        </tr>
                    ))
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default Marks