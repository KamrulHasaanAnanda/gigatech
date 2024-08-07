import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../configs/supabase';
import MainLayout from '../../components/MainLayout';

function AppointmentManagement({ session }) {

    const { userId } = useParams();

    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [appointmentType, setAppointmentType] = useState('all');

    useEffect(() => {
        getAppointments();
    }, []);

    const getAppointments = async () => {
        const { data, error } = await supabase
            .from('appointments')
            .select()
            .or(`sender.eq.${userId},reciever.eq.${userId}`)

        if (data?.length > 0) {
            setAppointments(data);
        } else {
            setAppointments([]);
        }
    };

    const filteredAndSortedAppointments = appointments
        .filter(appointment => {
            const matchesSearch = appointment.title.toLowerCase().includes(searchTerm.toLowerCase());
            const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
            const isUpcoming = appointmentDate > new Date();
            const isSent = appointment.sender === userId;

            if (filter === 'upcoming' && !isUpcoming) return false;
            if (filter === 'past' && isUpcoming) return false;
            if (appointmentType === 'sent' && !isSent) return false;
            if (appointmentType === 'received' && isSent) return false;

            return matchesSearch;
        })
        .sort((a, b) => {

            console.log('a,b', a, b)
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

    const handleStatusChange = async (id, status) => {
        const { error } = await supabase
            .from('appointments')
            .update({ status })
            .eq('id', id);

        if (error) {
            throw error;
        } else {
            getAppointments();
        }
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
        <MainLayout title={"Appointments"}>
            <div className="mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                        <input
                            type="text"
                            placeholder="Search appointments..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300 bg-[#1c2432]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <select
                            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300 bg-[#1c2432]"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="past">Past</option>
                        </select>
                        <select
                            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300 bg-[#1c2432]"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="date">Sort by Date</option>
                            <option value="title">Sort by Title</option>
                        </select>
                        <select
                            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300 bg-[#1c2432]"
                            value={appointmentType}
                            onChange={(e) => setAppointmentType(e.target.value)}
                        >
                            <option value="all">All Appointments</option>
                            <option value="sent">Sent</option>
                            <option value="received">Received</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                {filteredAndSortedAppointments.map(appointment => {
                    const isSent = appointment.sender === userId;
                    return (
                        <div key={appointment.id} className="bg-[#1c2432] rounded-lg shadow-md overflow-hidden">
                            <div className={`h-2 ${getStatusColor(appointment.status)}`}></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-white">{appointment.title}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)} bg-opacity-20`}>
                                        {appointment.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">{appointment.description}</p>
                                <p className="text-sm text-white mb-1">📅 {new Date(appointment.date).toLocaleDateString()}</p>
                                <p className="text-sm text-white mb-4">
                                    {isSent ? `🚀 ${appointment.reciever_email}` : `📩${appointment.sender_email}`}
                                </p>
                                <div className="flex justify-end space-x-2">
                                    {!isSent && appointment.status === 'pending' && (
                                        <>
                                            <button onClick={() => handleStatusChange(appointment.id, "accepted")} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300">
                                                Accept
                                            </button>
                                            <button onClick={() => handleStatusChange(appointment.id, 'declined')} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300">
                                                Decline
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </MainLayout>
    );
}

export default AppointmentManagement;