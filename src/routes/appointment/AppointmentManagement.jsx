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

    const getPublicUrl = async (filePath) => {
        try {
            const { data, error } = await supabase

                .storage
                .from('audio-bucket') // Replace with your actual bucket name
                .getPublicUrl(filePath);

            console.log('data', data.publicUrl)

            if (error) throw error;
            return data.publicUrl;
        } catch (error) {

            return null;
        }
    };

    const getAppointments = async () => {
        const { data, error } = await supabase
            .from('appointments')
            .select()
            .or(`sender.eq.${userId},reciever.eq.${userId}`);

        if (data?.length > 0) {
            const appointmentsWithAudioUrls = await Promise.all(data.map(async (appointment) => {
                if (appointment.file_path) {
                    appointment.audioUrl = await getPublicUrl(appointment.file_path);
                }
                return appointment;
            }));
            setAppointments(appointmentsWithAudioUrls);
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
            if (sortBy === 'date') {
                return new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`);
            } else if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });

    const handleStatusChange = async (id, status) => {
        const { error } = await supabase
            .from('appointments')
            .update({ status })
            .eq('id', id);

        if (error) {
            console.error('Error updating status:', error);
        } else {
            getAppointments();
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'text-yellow-400 bg-yellow-900';
            case 'accepted': return 'text-green-400 bg-green-900';
            case 'declined': return 'text-red-400 bg-red-900';
            case 'cancelled': return 'text-gray-400 bg-gray-900';
            default: return 'text-gray-400 bg-gray-900';
        }
    };

    return (
        <MainLayout title="Appointments">
            <div className="mb-8 bg-[#1c2432] p-6 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                        <input
                            type="text"
                            placeholder="Search appointments..."
                            className="w-full p-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 bg-[#2a3447] text-white placeholder-gray-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {['filter', 'sortBy', 'appointmentType'].map((selectType) => (
                            <select
                                key={selectType}
                                className="p-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 bg-[#2a3447] text-white"
                                value={eval(selectType)}
                                onChange={(e) => eval(`set${selectType.charAt(0).toUpperCase() + selectType.slice(1)}`)(e.target.value)}
                            >
                                {selectType === 'filter' && (
                                    <>
                                        <option value="all">All</option>
                                        <option value="upcoming">Upcoming</option>
                                        <option value="past">Past</option>
                                    </>
                                )}
                                {selectType === 'sortBy' && (
                                    <>
                                        <option value="date">Sort by Date</option>
                                        <option value="title">Sort by Title</option>
                                    </>
                                )}
                                {selectType === 'appointmentType' && (
                                    <>
                                        <option value="all">All Appointments</option>
                                        <option value="sent">Sent</option>
                                        <option value="received">Received</option>
                                    </>
                                )}
                            </select>
                        ))}
                    </div>
                </div>
            </div>
            <div className="space-y-6">
                {filteredAndSortedAppointments.map(appointment => {
                    const isSent = appointment.sender === userId;
                    return (
                        <div key={appointment.id} className="bg-[#1c2432] rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                            <div className={`h-2 ${getStatusColor(appointment.status)}`}></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-white">{appointment.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(appointment.status)}`}>
                                        {appointment.status}
                                    </span>
                                </div>
                                <p className="text-gray-300 mb-4">{appointment.description}</p>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-indigo-400">📅 {new Date(appointment.date).toLocaleDateString()}</p>
                                    <p className="text-indigo-400">
                                        {isSent ? `🚀 To: ${appointment.reciever_email}` : `📩 From: ${appointment.sender_email}`}
                                    </p>
                                </div>
                                {appointment.audioUrl && (
                                    <div className="mb-4">
                                        <audio
                                            src={appointment.audioUrl}
                                            controls
                                            className="w-full"
                                            onError={(e) => console.error("Error loading audio:", e)}
                                        ></audio>
                                    </div>
                                )}
                                {!isSent && appointment.status === 'pending' && (
                                    <div className="flex justify-end space-x-4">
                                        <button onClick={() => handleStatusChange(appointment.id, "accepted")} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">
                                            Accept
                                        </button>
                                        <button onClick={() => handleStatusChange(appointment.id, 'declined')} className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300">
                                            Decline
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </MainLayout>
    );
}

export default AppointmentManagement;