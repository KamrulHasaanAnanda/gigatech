import React from 'react'
import { supabase } from '../configs/supabase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function MainLayout({ title, children }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
        } else {
            toast.success("Successfully logged out")
            navigate('/login');

        }
    };

    const handleBack = () => {
        window.history.back();
    }
    return (
        <div className="p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-4 sm:p-8 max-h-[80vh] min-h-[80vh] overflow-y-auto">
                <div className="flex flex-row justify-between items-center mb-8">

                    <button
                        onClick={handleBack}
                        className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition duration-300 mr-4 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <h1 className=" text-sm sm:text-4xl font-bold text-black">{title}</h1>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300 flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-6 0v-1m6-10V5a3 3 0 00-6 0v1m6 10H7"
                            />
                        </svg>

                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default MainLayout