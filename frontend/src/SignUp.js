import React, { useState } from 'react'
import axios from 'axios';
// import { useForm } from 'react-hook-form';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    const headers = {
        'Content-Type': 'application/json',
        // 'Accept-Language': undefined,
        // 'User-Agent': undefined,

        // // Enable gzip compression
        // 'Accept-Encoding': 'gzip, deflate',
        // 'Content-Encoding': 'gzip',
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // pass object to axios.post, axios automatically serializes JavaScript objects to JSON.
        const response = await axios.post("/api/auth/signup",
            {email, password }, {headers: headers})
            .then(() => {console.log(response.data)})
            .catch((error) => {console.log(error);})
        setMessage(`Hello ${email}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Sign Up</button>
            {message && <p>{message}</p>}
        </form>
    );
}

export default SignUp;