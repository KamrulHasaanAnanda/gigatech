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

    useEffect(() => {
        // Mock API call to fetch users
        setUsers([
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
        ]);
    }, []);

    const handleScheduleAppointment = (e) => {
        e.preventDefault();
        console.log('Appointment scheduled:', { ...appointmentData, with: selectedUser });
        // Reset form and selected user
        setAppointmentData({ title: '', description: '', date: '', time: '' });
        setSelectedUser(null);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">User Interaction</h1>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">User List</h2>
                    <ul className="space-y-2">
                        {filteredUsers.map(user => (
                            <li key={user.id} className="bg-gray-50 p-3 rounded-md flex justify-between items-center">
                                <span>{user.name} ({user.email})</span>
                                <button
                                    onClick={() => setSelectedUser(user)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                                >
                                    Schedule Appointment
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {selectedUser && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Schedule Appointment with {selectedUser.name}</h2>
                        <form onSubmit={handleScheduleAppointment} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                                value={appointmentData.title}
                                onChange={(e) => setAppointmentData({ ...appointmentData, title: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                                value={appointmentData.description}
                                onChange={(e) => setAppointmentData({ ...appointmentData, description: e.target.value })}
                                required
                            ></textarea>
                            <div className="flex space-x-4">
                                <input
                                    type="date"
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                                    value={appointmentData.date}
                                    onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                                    required
                                />
                                <input
                                    type="time"
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                                    value={appointmentData.time}
                                    onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                                Schedule Appointment
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserInteraction;