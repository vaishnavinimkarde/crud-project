import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch existing student data
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8081/student/${id}`);
                // Assuming your backend has route like GET /student/:id
                const student = res.data;
                setName(student.name);
                setEmail(student.email);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching student:", err);
                // setError("Could not fetch student data");
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !email) {
            setError("Both name and email are required");
            return;
        }

        try {
            const res = await axios.put(
                `http://localhost:8081/update/${id}`,
                { name, email },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log("Update response:", res.data);
            navigate('/');
        } catch (err) {
            console.error("Error updating student:", err);
            setError("Failed to update student");
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Update Student</h2>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor='name' className='form-label'>Name</label>
                        <input
                            id='name'
                            type='text'
                            placeholder='Enter Name'
                            className='form-control'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input
                            id='email'
                            type='email'
                            placeholder='Enter Email'
                            className='form-control'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateStudent;
