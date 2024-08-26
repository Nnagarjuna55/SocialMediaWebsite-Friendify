import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../redux/authSlice';
import { request } from '../../util/request';

const Auth = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isRegister) {
                if (username === '' || email === '' || password === '') {
                    setError("Fill all fields!");
                    setTimeout(() => {
                        setError(null);
                    }, 2500);
                    return;
                }

                const headers = { 'Content-Type': 'application/json' };
                const body = { username, email, password };
                const data = await request('/auth/register', 'POST', headers, body);

                console.log(data);
                dispatch(register(data));

                navigate('/');
            } else {
                if (email === '' || password === '') {
                    setError("Fill all fields!");
                    setTimeout(() => {
                        setError(null);
                    }, 2500);
                    return;
                }

                const headers = { 'Content-Type': 'application/json' };
                const body = { email, password };
                const data = await request('/auth/login', 'POST', headers, body);
                dispatch(login(data));
                navigate('/');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            setError("An error occurred. Please try again.");
            setTimeout(() => {
                setError(null);
            }, 2500);
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md flex flex-col md:flex-row">
                {/* Left Side - Brand Content */}
                <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left p-6 bg-blue-50 rounded-lg">
                    <h1 className="text-5xl font-bold text-blue-600">Friendify</h1>
                    <p className="text-gray-600 mt-4 leading-7 max-w-sm">
                        Connect with friends and the world around you on Friendify.
                    </p>
                </div>
                {/* Right Side - Auth Form */}
                <div className="flex-1 flex justify-center items-center p-6">
                    <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-6">
                        {isRegister && (
                            <input
                                type="text"
                                placeholder='Username'
                                className="border-b border-gray-300 py-2 outline-none focus:border-blue-500"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        )}
                        <input
                            type="email"
                            placeholder='Email address'
                            className="border-b border-gray-300 py-2 outline-none focus:border-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            className="border-b border-gray-300 py-2 outline-none focus:border-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="bg-blue-600 text-white text-xl py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                            type="submit"
                        >
                            {isRegister ? 'Sign Up' : 'Log In'}
                        </button>
                        <p
                            className="text-center cursor-pointer text-blue-600 underline"
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? 'Already have an account? Log in' : 'Don\'t have an account? Sign up'}
                        </p>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Auth;
