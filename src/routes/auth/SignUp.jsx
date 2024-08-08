import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { supabase } from '../../configs/supabase';
import AuthLayout from '../../components/auth/AuthLayout';

function SignUp() {
    const [email, setEmail] = useState('');
    const [uName, setUName] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');



    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        if (password === confirmPassword) {

            try {
                const { data, error } = await supabase.auth.signUp({ email, password });
                console.log('data', data)

                if (error) throw error;
                if (data) {
                    console.log('data', data)
                    const { error } = await supabase
                        .from('users')
                        .insert({ email: data?.user?.email, authId: data?.user?.id, name: uName })

                    if (error) throw error;
                    else {
                        setError('');
                        setSuccessMessage('User registered successfully');
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                        setTimeout(() => {
                            setSuccessMessage('');
                            Navigate("/login");
                        }, 5000);
                    }
                }
                // Handle successful login here
            } catch (error) {
                setError(error.message);
            }


        } else {
            setError('Passwords do not match');
        }
    };

    return <AuthLayout title={"Sign Up"} description={"Create your account"}>
        <form className="space-y-2" onSubmit={handleSignUp}>
            <div className="space-y-4">
                <div>
                    <label htmlFor="email-address" className="sr-only">
                        User name
                    </label>
                    <input
                        id="email-address"
                        name="uname"
                        type="text"
                        required
                        value={uName}
                        onChange={(e) => setUName(e.target.value)}
                        className="appearance-none rounded-lg w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 bg-white"
                        placeholder="User name"
                    />
                </div>
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
                        className="appearance-none rounded-lg w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 bg-white"
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
                        className="appearance-none rounded-lg w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 bg-white"
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
                        className="appearance-none rounded-lg w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 bg-white"
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
    </AuthLayout>


}

export default SignUp;