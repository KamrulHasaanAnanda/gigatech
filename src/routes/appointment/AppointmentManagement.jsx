import React, { useState, useEffect } from 'react';

function AppointmentManagement() {
    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data - replace with actual API call
    useEffect(() => {
        const mockAppointments = [
            { id: 1, title: 'Meeting with John', date: '2024-08-10', time: '10:00', status: 'pending', isScheduler: true, audioMessage: null },
            { id: 2, title: 'Project Discussion', date: '2024-08-05', time: '14:00', status: 'accepted', isScheduler: false, audioMessage: 'audio_url_here' },
            { id: 3, title: 'Team Sync', date: '2024-07-30', time: '11:00', status: 'declined', isScheduler: true, audioMessage: null },
        ];
        setAppointments(mockAppointments);
    }, []);

    const filteredAppointments = appointments.filter(appointment => {
        const matchesSearch = appointment.title.toLowerCase().includes(searchTerm.toLowerCase());
        const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
        const isUpcoming = appointmentDate > new Date();

        if (filter === 'upcoming' && !isUpcoming) return false;
        if (filter === 'past' && isUpcoming) return false;

        return matchesSearch;
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

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Appointment Management</h1>

                <div className="mb-6 flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search appointments..."
                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past</option>
                    </select>
                </div>

                <div className="space-y-4">
                    {filteredAppointments.map(appointment => (
                        <div key={appointment.id} className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">{appointment.title}</h3>
                            <p>Date: {appointment.date} Time: {appointment.time}</p>
                            <p>Status: {appointment.status}</p>
                            {appointment.audioMessage && (
                                <audio controls className="mt-2">
                                    <source src={appointment.audioMessage} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            )}
                            <div className="mt-4 space-x-2">
                                {appointment.isScheduler && appointment.status !== 'cancelled' && new Date(`${appointment.date}T${appointment.time}`) > new Date() && (
                                    <button onClick={() => handleCancel(appointment.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                                        Cancel
                                    </button>
                                )}
                                {!appointment.isScheduler && appointment.status === 'pending' && (
                                    <>
                                        <button onClick={() => handleAccept(appointment.id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                                            Accept
                                        </button>
                                        <button onClick={() => handleDecline(appointment.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
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