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
    return (
        <div className=" p-8">
            <div className="max-w-4xl mx-auto bg-black  rounded-xl shadow-2xl p-8 max-h-[80vh] min-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-white">{title}</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default MainLayout