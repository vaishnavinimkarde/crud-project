import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !email) {
            setError("Name and email are required");
            return;
        }
        try {
            const response = await axios.post(
                'http://localhost:8081/create',
                { name, email },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log("Create response:", response.data);
            // After successful creation, navigate back to list
            navigate('/');
        } catch (err) {
            console.error("Error creating student:", err);
            setError("Failed to create student");
        }
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>

                    {error && (
                        <div className='alert alert-danger'>
                            {error}
                        </div>
                    )}

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

                    <button type='submit' className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateStudent;
