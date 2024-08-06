import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../configs/supabase';

function UserInteraction({ session }) {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { userId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [appointmentData, setAppointmentData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const { data, error } = await supabase
            .from('users')
            .select()
            .not('authId', 'eq', userId);

        if (data?.length > 0) {
            setUsers(data);
        } else {
            setUsers([]);
        }
    };

    const handleScheduleAppointment = async (e) => {
        e.preventDefault();

        const { title, description, date, time } = appointmentData;

        if (!title || !description || !date || !time) {
            setErrorMessage('All fields are required.');
            return;
        }

        const currentDate = new Date();
        const selectedDateTime = new Date(`${date}T${time}`);

        if (selectedDateTime <= currentDate) {
            setErrorMessage('Selected date and time must be in the future.');
            return;
        }

        const values = {
            title,
            description,
            date,
            time,
            sender: session?.user?.id,
            reciever: selectedUser?.id,
            sender_email: session?.user?.email,
            reciever_email: selectedUser?.email
        };

        try {
            const { error } = await supabase
                .from('appointments')
                .insert(values);

            if (error) {
                throw error;
            }

            setSuccessMessage('Appointment scheduled successfully');
            setAppointmentData({ title: '', description: '', date: '', time: '' });
            setSelectedUser(null);
            setErrorMessage('');

        } catch (error) {
            setErrorMessage('An error occurred while scheduling the appointment.');
        }

        setTimeout(() => setSuccessMessage(''), 5000);
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.split('@')[0].toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRemoveSelectedUser = () => {
        setSelectedUser(null);
        setAppointmentData({ title: '', description: '', date: '', time: '' });
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">User Interaction</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                </div>

                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="mb-10 max-h-96 overflow-y-auto">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">User List</h2>
                        <button
                            onClick={() => navigate("/appointment/" + userId)}
                            className="bg-gray-300 text-white px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
                        >
                            View appointments
                        </button>
                    </div>
                    <ul className="space-y-4">
                        {filteredUsers.map(user => (
                            <li key={user.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:shadow-md transition duration-300">
                                <div className="flex items-center space-x-4">
                                    <img src={'https://i.pravatar.cc/150?img=1'} alt={user.email} className="w-12 h-12 rounded-full" />
                                    <div>
                                        <h3 className="font-semibold text-lg text-black">{user.email}</h3>
                                        <p className="text-gray-600">{user.email.split('@')[0]}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedUser(user)}
                                    className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                                >
                                    Schedule
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {selectedUser && (
                    <div className="bg-gray-50 p-8 rounded-xl shadow-inner relative max-h-96 overflow-y-auto">
                        <button
                            onClick={handleRemoveSelectedUser}
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition duration-300"
                            aria-label="Remove selected user"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Schedule Appointment with {selectedUser.email.split('@')[0]}</h2>
                        <form onSubmit={handleScheduleAppointment} className="space-y-6">
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
                                value={appointmentData.title}
                                onChange={(e) => setAppointmentData({ ...appointmentData, title: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300 h-32"
                                value={appointmentData.description}
                                onChange={(e) => setAppointmentData({ ...appointmentData, description: e.target.value })}
                                required
                            ></textarea>
                            <div className="flex space-x-4">
                                <input
                                    type="date"
                                    className="flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
                                    value={appointmentData.date}
                                    onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                                    required
                                />
                                <input
                                    type="time"
                                    className="flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
                                    value={appointmentData.time}
                                    onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300">
                                Schedule Appointment
                            </button>
                        </form>
                    </div>
                )}

                {errorMessage && (
                    <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg">
                        {errorMessage}
                    </div>
                )}

                {successMessage && (
                    <div className="mt-8 p-4 bg-green-100 text-green-700 rounded-lg">
                        {successMessage}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserInteraction;
