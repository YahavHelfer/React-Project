import { useNavigate } from 'react-router-dom';

const About = () => {
    const nav = useNavigate();

    return (
        <div className="flex flex-col items-center p-8 text-gray-100 bg-gray-600 dark:bg-gray-900">
            <h1 className="mb-6 text-5xl font-bold text-gray-100">About Us</h1>

            <p className="mb-8 text-lg text-center text-gray-300">
                Welcome to our App! We are dedicated to providing advanced tools for easy and efficient card management. Our user-friendly design aims to enhance your experience and simplify the process.
            </p>

            <div className="flex flex-col w-full max-w-2xl overflow-hidden bg-gray-700 rounded-lg shadow-lg dark:bg-gray-800">
                <div className="p-6">
                    <h2 className="text-3xl font-semibold text-gray-100">Our Vision</h2>
                    <p className="mt-4 text-gray-400">
                        Our vision is to empower users with the right tools for seamless card management. We pay attention to detail to ensure our services are simple, secure, and customizable for everyone.
                    </p>
                </div>
                <div className="p-4 bg-gray-600 dark:bg-gray-700">
                    <h3 className="text-xl font-semibold text-gray-100">Our Mission</h3>
                    <p className="mt-2 text-gray-400">
                        We are committed to simplifying the card management process with tailored solutions. Our goal is to provide every user with the support and tools needed to manage their cards effectively.
                    </p>
                </div>
            </div>

            <button
                onClick={() => nav('/')}
                className="px-6 py-3 mt-6 text-white transition duration-300 bg-blue-700 rounded hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
                Go Back to Home
            </button>
        </div>
    );
};

export default About;
