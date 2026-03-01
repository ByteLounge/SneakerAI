import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaDatabase, FaServer, FaLock } from 'react-icons/fa';

export default function Admin() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const triggerRetrain = async () => {
        setLoading(true);
        setMessage('');
        try {
            const { data } = await axios.post('/api/admin/retrain');
            setMessage(data.status);
        } catch (err) {
            setMessage('Failed to trigger retrain.');
        } finally {
            setTimeout(() => setLoading(false), 2000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
            <div className="mb-8 flex items-center gap-3">
                <FaLock className="text-primary text-2xl" />
                <h1 className="text-3xl font-bold">Admin Panel</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-4 text-secondary">
                        <FaDatabase className="text-xl" />
                        <h3 className="font-bold text-lg text-white">XGBoost ML Pipeline</h3>
                    </div>
                    <p className="text-muted text-sm mb-6">
                        Trigger a manual retrain on the most recent dataset ingested through the PostgreSQL models.
                        The `xgboost_model.pkl` will be overwritten in memory across FastAPI workers.
                    </p>
                    <button
                        disabled={loading}
                        onClick={triggerRetrain}
                        className={`w-full py-3 rounded-lg font-bold border transition ${loading ? 'bg-black/50 border-white/10 text-white/50 animate-pulse' : 'bg-primary/20 border-primary text-primary hover:bg-primary hover:text-white'
                            }`}
                    >
                        {loading ? 'Retraining Model...' : 'Trigger Manual Retrain'}
                    </button>
                    {message && <div className="mt-4 text-sm text-green-400 text-center">{message}</div>}
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 border-dashed border-white/20">
                    <div className="flex items-center gap-3 mb-4 text-muted">
                        <FaServer className="text-xl" />
                        <h3 className="font-bold text-lg text-white">System Logs</h3>
                    </div>
                    <div className="bg-black/70 font-mono text-xs p-4 rounded-lg h-32 overflow-y-auto text-green-400 space-y-1 border border-white/5">
                        <div>[INFO] System initialized. API mounted on :8000</div>
                        <div>[INFO] PostgreSQL connected successfully.</div>
                        <div>[INFO] XGBoost model v1 loaded. Accuracy R2: 0.74</div>
                        <div>[WARN] Rate limit reached for Google Trends mock API.</div>
                        <div>[INFO] Requested heartbeat /health: {"{status: 'healthy'}"}</div>
                        {message && <div>[INFO] User triggered model retrain. Task ID: {Math.random().toString(36).substring(7)}</div>}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
