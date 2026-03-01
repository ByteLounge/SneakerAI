import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaRecycle, FaTree } from 'react-icons/fa';

export default function EcoScore() {
    const brands = [
        { name: 'Nike', score: 65, color: 'bg-[#6b4cff]', icon: <FaRecycle />, focus: 'Move to Zero Initiative' },
        { name: 'Adidas', score: 82, color: 'bg-[#00f0ff]', icon: <FaTree />, focus: 'Ocean Plastic & Parley' },
        { name: 'New Balance', score: 55, color: 'bg-white', icon: <FaLeaf />, focus: 'Green Leaf Standard' },
        { name: 'Asics', score: 70, color: 'bg-accent', icon: <FaRecycle />, focus: 'Earth Day Pack & Recycled Materials' },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black mb-4">Sustainability & <span className="text-green-400 text-gradient">Eco Score</span></h1>
                <p className="text-muted max-w-2xl mx-auto">
                    Aligning SneakerAI with United Nations Sustainable Development Goals (SDGs 9, 12, 13).
                    Tracking carbon footprint estimation and brand sustainability ratings.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {brands.map((brand, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={brand.name}
                        className="glass-card p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold">{brand.name}</h3>
                            <div className={`p-3 rounded-full bg-black/50 text-xl border border-white/10 ${brand.color.replace('bg-', 'text-')}`}>
                                {brand.icon}
                            </div>
                        </div>

                        <div className="mb-2 flex justify-between text-sm">
                            <span className="text-muted">Eco Rating</span>
                            <span className="font-bold">{brand.score}/100</span>
                        </div>

                        <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden mb-4 border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${brand.score}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full ${brand.color}`}
                            />
                        </div>

                        <p className="text-xs text-muted mt-4">
                            <span className="font-semibold text-white/80">Primary Focus:</span><br /> {brand.focus}
                        </p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 glass-card p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaTree className="text-green-400" /> Carbon Offset Estimator (Resale Market)</h2>
                <p className="text-muted mb-6">
                    Buying resale reduces production demand. Predict your carbon savings per purchase.
                </p>
                <div className="flex flex-col md:flex-row gap-8 items-center justify-around bg-black/40 p-6 rounded-xl border border-white/5">
                    <div className="text-center">
                        <div className="text-4xl font-black text-green-400 mb-2">14kg</div>
                        <div className="text-sm text-muted uppercase tracking-wider">CO² Saved per pair</div>
                    </div>
                    <div className="w-px h-16 bg-white/10 hidden md:block" />
                    <div className="text-center">
                        <div className="text-4xl font-black text-secondary mb-2">3.5k</div>
                        <div className="text-sm text-muted uppercase tracking-wider">Gallons of Water</div>
                    </div>
                    <div className="w-px h-16 bg-white/10 hidden md:block" />
                    <div className="text-center">
                        <div className="text-4xl font-black text-primary mb-2">SDG 12</div>
                        <div className="text-sm text-muted uppercase tracking-wider">Responsible Consumption</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
