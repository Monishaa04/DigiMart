// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-10 w-full">
            <div className="container text-center">
                <p>&copy; 2024 My E-Commerce Store. All Rights Reserved.</p>
                <ul className="flex justify-center space-x-6 mt-4">
                    <li>
                        <button className="text-gray-400 hover:text-gray-200 focus:outline-none" onClick={() => alert('Privacy Policy')}>
                            Privacy Policy
                        </button>
                    </li>
                    <li>
                        <button className="text-gray-400 hover:text-gray-200 focus:outline-none" onClick={() => alert('Terms of Service')}>
                            Terms of Service
                        </button>
                    </li>
                    <li>
                        <button className="text-gray-400 hover:text-gray-200 focus:outline-none" onClick={() => alert('Support')}>
                            Support
                        </button>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
