import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Predict', path: '/predict' },
        { name: 'Trends', path: '/trends' },
        { name: 'Eco Score', path: '/eco' },
    ];

    return (
        <nav className="fixed w-full h-16 border-b border-white/10 flex items-center px-6 justify-between bg-background/50 backdrop-blur-xl rounded-none z-50">
            <Link to="/" className="text-xl font-bold font-display text-gradient">
                SneakerAI
            </Link>
            <div className="flex gap-6 items-center">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`text-sm font-medium transition-colors relative ${location.pathname === link.path ? 'text-white' : 'text-muted hover:text-white'
                            }`}
                    >
                        {link.name}
                        {location.pathname === link.path && (
                            <motion.div
                                layoutId="navbar-indicator"
                                className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-primary"
                            />
                        )}
                    </Link>
                ))}
                <div className="w-px h-6 bg-white/10 mx-2" />
                <Link to="/admin" className="text-sm border border-white/10 px-4 py-1.5 rounded-full hover:bg-white/5 transition">
                    Admin
                </Link>
            </div>
        </nav>
    );
}
