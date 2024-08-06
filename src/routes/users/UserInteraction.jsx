import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserInteraction() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [appointmentData, setAppointmentData] = useState({
        title: '',
        description: '',
        date: '',
        time: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Mock API call to fetch users
        setUsers([
            { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://i.pravatar.cc/150?img=1' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://i.pravatar.cc/150?img=2' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/150?img=3' },
        ]);
    }, []);

    const handleScheduleAppointment = (e) => {
        e.preventDefault();
        console.log('Appointment scheduled:', { ...appointmentData, with: selectedUser });
        setSuccessMessage(`Appointment scheduled with ${selectedUser.name} on ${appointmentData.date} at ${appointmentData.time}`);
        // Reset form and selected user
        setAppointmentData({ title: '', description: '', date: '', time: '' });
        setSelectedUser(null);
        setTimeout(() => setSuccessMessage(''), 5000);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">User Interaction</h1>

                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">User List</h2>
                    <ul className="space-y-4">
                        {filteredUsers.map(user => (
                            <li key={user.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:shadow-md transition duration-300">
                                <div className="flex items-center space-x-4">
                                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                                    <div>
                                        <h3 className="font-semibold text-lg text-black">{user.name}</h3>
                                        <p className="text-gray-600">{user.email}</p>
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
                    <div className="bg-gray-50 p-8 rounded-xl shadow-inner">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Schedule Appointment with {selectedUser.name}</h2>
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