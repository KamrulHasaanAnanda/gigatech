import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        setError('');
        if (password === confirmPassword) {
            // Handle sign-up logic here
            console.log('Sign up successful');
        } else {
            setError('Passwords do not match');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-2xl space-y-8 transform hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                    <svg className="mx-auto h-16 w-auto text-indigo-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <h2 className="mt-6 text-4xl font-extrabold text-gray-900 tracking-tight">
                        Sign Up
                    </h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Create your account
                    </p>
                </div>
                <form className="space-y-6" onSubmit={handleSignUp}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-lg w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-lg w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="sr-only">
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="appearance-none rounded-lg w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
                                Already have an account? Login
                            </Link>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-md font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        By signing up, you agree to our Terms and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;