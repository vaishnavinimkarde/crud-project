import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Student() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:8081/');
            setStudents(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching students:", err);
            // setError("Could not load data");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;
        try {
            await axios.delete(`http://localhost:8081/student/${id}`);
            // Remove deleted from UI instead of full reload
            setStudents(prev => prev.filter(student => student.id !== id));
        } catch (err) {
            console.error("Error deleting student:", err);
            alert("Delete failed");
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <Link to='/create' className='btn btn-success mb-3'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center">No students found</td>
                            </tr>
                        ) : (
                            students.map((student, i) => (
                                <tr key={student.id ?? i}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <Link to={`/update/${student.id}`} className='btn btn-primary'>Update</Link>
                                        <button
                                            className='btn btn-danger ms-2'
                                            onClick={() => handleDelete(student.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Student;
