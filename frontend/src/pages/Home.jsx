import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center min-h-[85vh] justify-center px-4 pt-10 pb-20 overflow-hidden relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-4xl text-center space-y-8 z-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-4">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    XGBoost Powered Market Intelligence
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-6">
                    Predict the <br className="hidden md:block" />
                    <span className="text-gradient">Hype</span>.
                </h1>

                <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto font-light leading-relaxed">
                    AI-driven sneaker resale valuations. Real-time sentiment. Unmatched accuracy.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                    <button
                        onClick={() => navigate('/predict')}
                        className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_30px_rgba(107,76,255,0.4)] w-full sm:w-auto"
                    >
                        Launch Predictor
                    </button>

                    <button
                        onClick={() => navigate('/trends')}
                        className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/5 transition-all w-full sm:w-auto"
                    >
                        View Trends
                    </button>
                </div>
            </motion.div>

            {/* Decorative floating elements */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute top-20 right-[15%] w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10"
            />

            <motion.div
                animate={{ y: [0, 30, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="absolute bottom-10 left-[10%] w-72 h-72 bg-secondary/10 rounded-full blur-[100px] -z-10"
            />
        </div>
    );
}
