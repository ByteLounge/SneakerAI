import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Trends() {
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        // Fetch mock trending sneakers
        axios.get('/api/trending').then(res => setTrending(res.data)).catch(console.error);
    }, []);

    const historyData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                fill: true,
                label: 'Air Jordan 1 Retro High Chicago',
                data: [1200, 1250, 1150, 1300, 1350, 1320, 1400],
                borderColor: '#ff0055',
                backgroundColor: 'rgba(255, 0, 85, 0.1)',
                tension: 0.4
            },
            {
                fill: true,
                label: 'Yeezy Boost 350 V2 Zebra',
                data: [350, 340, 360, 330, 320, 310, 320],
                borderColor: '#00f0ff',
                backgroundColor: 'rgba(0, 240, 255, 0.1)',
                tension: 0.4
            }
        ]
    };

    const sentimentData = {
        labels: ['Nike', 'Jordan', 'Adidas', 'New Balance', 'Asics', 'Yeezy'],
        datasets: [
            {
                label: 'Social Sentiment Score',
                data: [85, 92, 70, 88, 75, 60],
                backgroundColor: [
                    'rgba(107, 76, 255, 0.8)',
                    'rgba(255, 0, 85, 0.8)',
                    'rgba(0, 240, 255, 0.8)',
                    'rgba(255, 255, 255, 0.8)',
                    'rgba(128, 128, 146, 0.8)',
                    'rgba(200, 100, 50, 0.8)'
                ],
                borderRadius: 8,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: '#fff' } }
        },
        scales: {
            y: { ticks: { color: 'rgba(255,255,255,0.5)' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            x: { ticks: { color: 'rgba(255,255,255,0.5)' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 space-y-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-4xl font-bold">Market Trends</h1>
                    <p className="text-muted mt-2">Historical price volatility and global sentiment.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Historical Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 glass-card p-6 h-[400px]"
                >
                    <h3 className="mb-4 font-semibold text-lg">Historical Resale Average (Last 7 Months)</h3>
                    <div className="h-[300px]">
                        <Line options={chartOptions} data={historyData} />
                    </div>
                </motion.div>

                {/* Trending List */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-6 h-[400px] overflow-y-auto"
                >
                    <h3 className="mb-4 font-semibold text-lg">Hot Models Right Now</h3>
                    <div className="space-y-4">
                        {trending.map((item, i) => (
                            <div key={item.id} className="p-4 bg-black/40 rounded-xl flex items-center justify-between border border-white/5 hover:border-primary/50 transition cursor-pointer">
                                <div>
                                    <div className="text-xs text-muted font-bold">{item.brand}</div>
                                    <div className="font-semibold text-sm truncate w-32 md:w-48">{item.model}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold">${item.current_price}</div>
                                    <div className={`text-xs ${item.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                        {item.trend}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Sentiment Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="lg:col-span-3 glass-card p-6 h-[400px]"
                >
                    <h3 className="mb-4 font-semibold text-lg">Brand Hype & Social Sentiment (Twitter/Google Trends)</h3>
                    <div className="h-[300px]">
                        <Bar options={chartOptions} data={sentimentData} />
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
