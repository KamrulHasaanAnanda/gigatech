import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../configs/supabase';
import toast from 'react-hot-toast';
import MainLayout from '../../components/MainLayout';

function UserInteraction({ session }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { userId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
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


    async function uploadAudio(file) {
        const fileName = `${Date.now()}_${file.name}`
        const { data, error } = await supabase.storage
            .from('audio-bucket')
            .upload(fileName, file)

        if (error) {
            toast.error(error)
            return null
        }

        return data.path
    }
    const handleScheduleAppointment = async (e) => {
        e.preventDefault();
        setLoading(true)

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
            reciever: selectedUser?.authId,
            sender_email: session?.user?.email,
            reciever_email: selectedUser?.email
        };

        try {
            if (selectedFile) {
                const audioPath = await uploadAudio(selectedFile);
                values.file_path = audioPath;
            }
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
            setLoading(false)

        } catch (error) {
            setErrorMessage('An error occurred while scheduling the appointment.');
            setLoading(false)

        }

        setTimeout(() => setSuccessMessage(''), 5000);
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRemoveSelectedUser = () => {
        setSelectedUser(null);
        setAppointmentData({ title: '', description: '', date: '', time: '' });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('audio/')) {
            setSelectedFile(file);
        } else {
            toast.error('Please select a valid audio file.');
            event.target.value = null; // Reset the file input
        }
    };



    return (
        <MainLayout title={"Schedule"}>


            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full h-12  p-4 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="mb-6 max-h-96 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className=" text-base  sm:text-2xl font-semibold text-white">User List</h2>
                    <button
                        onClick={() => navigate("/appointment/" + userId)}
                        className="bg-gray-300 text-white px-2 sm:px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300 flex items-center"
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
                                d="M8 7V3m0 0h8m-8 0H7a2 2 0 00-2 2v2m13 11v2a2 2 0 01-2 2h-1m-4 0H7a2 2 0 01-2-2v-2m12-11V5a2 2 0 00-2-2h-1m-4 0h-1a2 2 0 00-2 2v2m12 11v2a2 2 0 01-2 2h-1m-4 0H7a2 2 0 01-2-2v-2M5 7h14m-2 4H7m0 4h6"
                            />
                        </svg>
                        View appointments
                    </button>

                </div>
                <ul className="space-y-4">
                    {filteredUsers.map(user => (
                        <li key={user.id} className="bg-[#242424] p-4 rounded-lg flex flex-wrap justify-between items-center hover:shadow-md transition duration-300">
                            <div className="w-full flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                                <img src={'https://i.pravatar.cc/150?img=1'} alt={user.email} className="w-12 h-12 rounded-full" />
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="font-semibold text-lg text-white">{user.name}</h3>
                                    <p className="text-gray-600 truncate text-ellipsis">{user.email}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedUser(user)}
                                    className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition duration-300 w-full md:w-auto"
                                >
                                    Schedule
                                </button>
                            </div>
                        </li>



                    ))}
                </ul>
            </div>

            {selectedUser && (
                <div className="bg-[#242424] p-4 rounded-xl shadow-inner relative ">
                    <button
                        onClick={handleRemoveSelectedUser}
                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition duration-300"
                        aria-label="Remove selected user"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-3xl font-semibold text-white mb-6">Schedule Appointment with {selectedUser.name}</h2>
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
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300 h-20"
                            value={appointmentData.description}
                            onChange={(e) => setAppointmentData({ ...appointmentData, description: e.target.value })}
                            required
                        ></textarea>
                        <input

                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"

                            type="file" accept="audio/*" onChange={handleFileChange}
                        />



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
                        <button type="submit" className={`w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300 ${loading & "opacity-60"}`}>
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

        </MainLayout>
    );
}

export default UserInteraction;
