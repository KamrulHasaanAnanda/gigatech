import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className=" flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div>
                    <svg className="mx-auto h-16 w-auto text-indigo-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 tracking-tight">
                        Appointment Scheduler
                    </h2>
                    <p className="mt-2 text-center text-lg text-gray-600">
                        Manage your time efficiently
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="rounded-md shadow">
                        <Link to="/login" className="w-full flex justify-center py-3 px-4 border-0 font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
                            Login
                        </Link>
                    </div>
                    <div>
                        <Link to="/signup" className="w-full flex justify-center py-3 px-4 border border-transparent text-md font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
                            Sign Up
                        </Link>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Streamline your scheduling process and boost productivity
                    </p>
                </div>
                <div className="flex justify-center space-x-4 mt-8">
                    <span className="text-gray-400 hover:text-indigo-600 cursor-pointer transition-colors duration-300">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </span>
                    <span className="text-gray-400 hover:text-indigo-600 cursor-pointer transition-colors duration-300">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                    </span>
                    <span className="text-gray-400 hover:text-indigo-600 cursor-pointer transition-colors duration-300">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.917 15.165c-.274.566-.664 1.046-1.162 1.438-.498.392-1.075.69-1.731.893-.656.203-1.34.305-2.052.305-1.034 0-1.965-.178-2.791-.534-.828-.355-1.529-.839-2.105-1.451-.577-.612-1.019-1.332-1.325-2.159-.308-.828-.46-1.711-.46-2.651 0-.933.153-1.813.46-2.64.308-.828.75-1.548 1.325-2.16.576-.612 1.277-1.097 2.105-1.452.826-.355 1.757-.533 2.791-.533.712 0 1.396.102 2.052.305.656.203 1.233.501 1.731.893.498.392.888.872 1.162 1.438.274.565.411 1.189.411 1.872 0 .898-.175 1.687-.525 2.367-.349.68-.854 1.249-1.512 1.707-.657.458-1.442.807-2.353 1.045-.912.238-1.924.357-3.038.357h-1.535v2.886h1.535c1.114 0 2.126.119 3.038.357.911.238 1.696.588 2.353 1.046.658.458 1.163 1.026 1.512 1.706.35.68.525 1.47.525 2.367 0 .683-.137 1.307-.411 1.872z" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Home;