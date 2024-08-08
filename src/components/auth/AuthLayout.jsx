import React from 'react'

function AuthLayout({ title, description, children }) {
    return (
        <div className=" flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-2xl space-y-8">
                <div className="text-center">
                    <svg className="mx-auto h-16 w-auto text-indigo-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <h2 className="mt-6 text-4xl font-extrabold text-black tracking-tight">
                        {title}
                    </h2>
                    <p className="mt-2 text-lg text-gray-600">
                        {description}
                    </p>
                </div>

                {children}

            </div>
        </div>
    )
}

export default AuthLayout