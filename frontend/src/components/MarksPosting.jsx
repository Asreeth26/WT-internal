import React, { useState, useEffect } from 'react';

// function MarksPosting() {
//   const [marksData, setMarksData] = useState({});

//   useEffect(() => {
//     fetchMarks();
//   }, []);

//   const fetchMarks = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/home/marks');
//       if (!response.ok) {
//         throw new Error('Failed to fetch marks');
//       }
//       const { '"marksData"': marksData } = await response.json();
//     console.log(marksData);
//     // Set marksData state
//     setMarksData(marksData || {});

//     } catch (error) {
//       console.error('Error fetching marks:', error);
//     }
//   };

//   const handleSubmit = async (event, studentId) => {
//     event.preventDefault();
//     try {
//       const updatedMarks = {
//         ...marksData,
//         [studentId]: parseInt(event.target.elements[`marks_${studentId}`].value, 10)
//       };
//       setMarksData(updatedMarks); // Update marksData state directly
//       const response = await fetch('http://localhost:8000/home/marks', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ marksData: updatedMarks })
//       });
//       if (response.ok) {
//         console.log('Marks updated successfully');
//         alert('Marks updated successfully');
//       } else {
//         console.error('Failed to update marks');
//         alert('Failed to update marks');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  

//   const handleMarksChange = (event, studentId) => {
//     // You can optionally handle marks change here
//   };

//   return (
//     <>
//       <ul>
//   {Object.entries(marksData).map(([studentId, marks]) => (
//     <li key={studentId}>
//       <form onSubmit={event => handleSubmit(event, studentId)}>
//         <div>
//           <label>
//             <strong>{studentId}</strong>
//           </label>
//           <input
//             type="number"
//             name={`marks_${studentId}`}
//             onChange={event => handleMarksChange(event, studentId)}
//             required
//           />
//         </div>
//         <input type="submit" value="Submit" />
//       </form>
//     </li>
//   ))}
// </ul>
//     </>
//   );
// }

// export default MarksPosting;
import "./MarksPosting.css";

function MarksPosting() {
  const [marksData, setMarksData] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    try {
      const response = await fetch('http://localhost:8000/home/marks');
      if (!response.ok) {
        throw new Error('Failed to fetch marks');
      }
      const fetchedMarksData = await response.json();
      console.log(fetchedMarksData);
      // Set marksData state
      setMarksData(fetchedMarksData);

    } catch (error) {
      console.error('Error fetching marks:', error);
    }
  };

  const handleInputChange = (event, studentId) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      [studentId]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedMarks = {
        ...marksData,
        ...formData
      };
      setMarksData(updatedMarks); // Update marksData state directly
      console.log(updatedMarks);
      const response = await fetch('http://localhost:8000/home/marks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedMarks)
      });
      if (response.ok) {
        console.log('Marks updated successfully');
        alert('Marks updated successfully');
      } else {
        console.error('Failed to update marks');
        alert('Failed to update marks');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
     <form onSubmit={handleSubmit} className="marks-form">
    <h3 className="form-title">Post Marks</h3>
    <ul className="student-list">
        {Object.keys(marksData).map(studentId => (
            <li key={studentId} className="student-item">
                <div className="student-details">
                    <label htmlFor="" className="student-id">
                        <strong>{studentId}</strong>
                    </label>
                    <input
                        type="number"
                        name={`marks_${studentId}`}
                        id={`marks_${studentId}`}
                        value={formData[studentId] || ""}
                        onChange={event => handleInputChange(event, studentId)}
                        required
                    />
                </div>
            </li>
        ))}
    </ul>
    <input type="submit" value="Submit" className="submit-button" />
</form>
    </>
  );
}

export default MarksPosting;