import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaFire, FaChartLine, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function Predict() {
    const [formData, setFormData] = useState({
        brand: 'Nike',
        model_name: '',
        retail_price: 150,
        days_since_release: 0,
        is_limited_edition: false,
        sentiment_score: 0.5,
        drop_frequency: 10,
        volatility_score: 0.2,
        production_count: 50000
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handlePredict = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await axios.post('/api/predict', formData);
            setResult(data);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to fetch prediction.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Input Column */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-8"
            >
                <h2 className="text-2xl mb-6">Sneaker Profile</h2>
                <form onSubmit={handlePredict} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-muted mb-1">Brand</label>
                            <select
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition"
                                value={formData.brand}
                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            >
                                <option value="Nike">Nike</option>
                                <option value="Adidas">Adidas</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Yeezy">Yeezy</option>
                                <option value="New Balance">New Balance</option>
                                <option value="Asics">Asics</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-muted mb-1">Model Name</label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. Air Force 1"
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition"
                                value={formData.model_name}
                                onChange={(e) => setFormData({ ...formData, model_name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-muted mb-1">Retail Price ($)</label>
                            <input
                                type="number"
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition"
                                value={formData.retail_price}
                                onChange={(e) => setFormData({ ...formData, retail_price: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-muted mb-1">Days since release</label>
                            <input
                                type="number"
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition"
                                value={formData.days_since_release}
                                onChange={(e) => setFormData({ ...formData, days_since_release: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-muted mb-1">Sentiment (-1 to 1)</label>
                            <input
                                type="number" step="0.1"
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition"
                                value={formData.sentiment_score}
                                onChange={(e) => setFormData({ ...formData, sentiment_score: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-muted mb-1">Market Volatility (0-1)</label>
                            <input
                                type="number" step="0.1"
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition"
                                value={formData.volatility_score}
                                onChange={(e) => setFormData({ ...formData, volatility_score: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    <label className="flex items-center gap-3 p-4 bg-black/30 border border-white/5 rounded-lg cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-5 h-5 accent-primary"
                            checked={formData.is_limited_edition}
                            onChange={(e) => setFormData({ ...formData, is_limited_edition: e.target.checked })}
                        />
                        <span className="text-sm">Limited Edition Release</span>
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-primary text-white rounded-lg font-bold mt-4 hover:bg-primary/90 flex justify-center items-center gap-2"
                    >
                        {loading ? <span className="animate-pulse">Analyzing Market...</span> : "Generate Prediction"}
                    </button>
                </form>
            </motion.div>

            {/* Output Column */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-6"
            >
                {result ? (
                    <>
                        <div className="glass-card p-8 flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-secondary to-primary" />
                            <p className="text-muted text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                                <FaChartLine /> Projected Resale
                            </p>
                            <h1 className="text-6xl md:text-8xl font-black text-gradient my-4">
                                ${result.predicted_price.toFixed(2)}
                            </h1>

                            <div className="flex gap-4 mt-4 w-full">
                                <div className="bg-black/40 p-4 rounded-xl flex-1 text-center">
                                    <div className="text-white/60 text-xs mb-1">Confidence</div>
                                    <div className="text-xl font-bold text-green-400">{result.confidence_score}%</div>
                                </div>
                                <div className="bg-black/40 p-4 rounded-xl flex-1 text-center">
                                    <div className="text-white/60 text-xs mb-1">Net Yield</div>
                                    <div className={`text-xl font-bold ${result.predicted_price >= formData.retail_price ? 'text-green-400' : 'text-red-400'}`}>
                                        {result.predicted_price >= formData.retail_price ? '+' : '-'}${Math.abs(result.predicted_price - formData.retail_price).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="glass-card p-6 flex items-center justify-between">
                                <div>
                                    <div className="text-white/60 text-sm mb-1">Hype Index</div>
                                    <div className="text-3xl font-display font-bold">{result.hype_score}/100</div>
                                </div>
                                <FaFire className="text-4xl text-accent opacity-50" />
                            </div>

                            <div className="glass-card p-6 flex items-center justify-between">
                                <div>
                                    <div className="text-white/60 text-sm mb-1">Rarity Rating</div>
                                    <div className="text-3xl font-display font-bold">{result.rarity_score}/100</div>
                                </div>
                                <FaCheckCircle className="text-4xl text-secondary opacity-50" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="glass-card p-8 flex flex-col items-center justify-center h-full text-center border-dashed border-white/20">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <FaChartLine className="text-2xl text-white/30" />
                        </div>
                        <h3 className="text-xl text-white/50">Awaiting Input</h3>
                        <p className="text-sm text-white/30 mt-2">Enter sneaker details to generate an AI valuation.</p>
                        {error && (
                            <div className="mt-4 p-4 border border-red-500/30 bg-red-500/10 text-red-400 rounded-lg flex items-center gap-2">
                                <FaExclamationTriangle /> {error}
                            </div>
                        )}
                    </div>
                )}
            </motion.div>

        </div>
    );
}
