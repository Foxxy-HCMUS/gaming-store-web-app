import React, { useState } from 'react'
import axios from 'axios';
// import { useForm } from 'react-hook-form';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // const { handleSubmit } = useForm()

    const onSubmit = async (e) => {
        e.preventDefault();
        // try {
    
        const response = await axios.post("/signup",
            JSON.stringify({ email, password }), {"headers": {"Content-Type": "Application/json"}})
            .then(() => {console.log(response.data)})
            .catch((error) => {console.log(error);})
        setMessage(`Hello ${email}`);
        // } catch (error) {
        //     console.error(error);
        // }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Sign Up</h2>
            <input type="email" placeholder="Email" value={email} onInput={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Sign Up</button>
            <h2>{message}</h2>
        </form>
    );
}

export default SignUp;