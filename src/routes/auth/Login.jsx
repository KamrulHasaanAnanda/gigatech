import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../configs/supabase';
import AuthLayout from '../../components/auth/AuthLayout';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    console.log('supabase', supabase)

    async function signInWithEmail() {
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            // Handle successful login here
        } catch (error) {
            setError(error.message);
        }


    }

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmail()

    };

    return <AuthLayout title={"Welcome Back"} description={"Log in to manage your appointments"}>
        <form className="space-y-6" onSubmit={handleLogin}>
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
                        className="appearance-none rounded-lg w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 bg-[#1c2432]"
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
                        className="appearance-none rounded-lg w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 bg-[#1c2432]"
                        placeholder="Password"
                    />
                </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent text-md font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                >
                    Login
                </button>
            </div>
        </form>
        <div className="text-center">
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
                Don't have an account? Sign up
            </Link>
        </div>

    </AuthLayout>


}

export default Login;