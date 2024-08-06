import React, { useState, useEffect } from 'react';

function AppointmentManagement() {
    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');

    useEffect(() => {
        const mockAppointments = [
            { id: 1, title: 'Meeting with John', date: '2024-08-10', time: '10:00', status: 'pending', isScheduler: true, audioMessage: null },
            { id: 2, title: 'Project Discussion', date: '2024-08-05', time: '14:00', status: 'accepted', isScheduler: false, audioMessage: 'audio_url_here' },
            { id: 3, title: 'Team Sync', date: '2024-07-30', time: '11:00', status: 'declined', isScheduler: true, audioMessage: null },
        ];
        setAppointments(mockAppointments);
    }, []);

    const filteredAndSortedAppointments = appointments
        .filter(appointment => {
            const matchesSearch = appointment.title.toLowerCase().includes(searchTerm.toLowerCase());
            const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
            const isUpcoming = appointmentDate > new Date();

            if (filter === 'upcoming' && !isUpcoming) return false;
            if (filter === 'past' && isUpcoming) return false;

            return matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`);
            } else if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });

    const handleCancel = (id) => {
        setAppointments(appointments.map(app =>
            app.id === id ? { ...app, status: 'cancelled' } : app
        ));
    };

    const handleAccept = (id) => {
        setAppointments(appointments.map(app =>
            app.id === id ? { ...app, status: 'accepted' } : app
        ));
    };

    const handleDecline = (id) => {
        setAppointments(appointments.map(app =>
            app.id === id ? { ...app, status: 'declined' } : app
        ));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'accepted': return 'text-green-600 bg-green-100';
            case 'declined': return 'text-red-600 bg-red-100';
            case 'cancelled': return 'text-gray-600 bg-gray-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Appointment Management</h1>

                <div className="mb-8 flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Search appointments..."
                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past</option>
                    </select>
                    <select
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="date">Sort by Date</option>
                        <option value="title">Sort by Title</option>
                    </select>
                </div>

                <div className="space-y-6">
                    {filteredAndSortedAppointments.map(appointment => (
                        <div key={appointment.id} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-semibold">{appointment.title}</h3>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                                    {appointment.status}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-2">Date: {appointment.date} | Time: {appointment.time}</p>
                            {appointment.audioMessage && (
                                <div className="mt-4">
                                    <h4 className="text-lg font-medium mb-2">Audio Message:</h4>
                                    <audio controls className="w-full">
                                        <source src={appointment.audioMessage} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            )}
                            <div className="mt-6 space-x-3">
                                {appointment.isScheduler && appointment.status !== 'cancelled' && new Date(`${appointment.date}T${appointment.time}`) > new Date() && (
                                    <button onClick={() => handleCancel(appointment.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
                                        Cancel
                                    </button>
                                )}
                                {!appointment.isScheduler && appointment.status === 'pending' && (
                                    <>
                                        <button onClick={() => handleAccept(appointment.id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
                                            Accept
                                        </button>
                                        <button onClick={() => handleDecline(appointment.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
                                            Decline
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AppointmentManagement;