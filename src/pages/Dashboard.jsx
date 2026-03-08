import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { TrendingUp, BookOpen, AlertCircle, Award } from 'lucide-react';
import './Dashboard.css';

// Register ChartJS modules
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
    const { user } = useContext(UserContext);

    // Mock data for charts
    const progressData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        datasets: [
            {
                label: 'Skill Score',
                data: [45, 52, 58, 63, user?.skillScore || 68],
                borderColor: '#4F46E5', // primary
                backgroundColor: 'rgba(79, 70, 229, 0.2)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const topicData = {
        labels: ['Strong', 'Average', 'Weak'],
        datasets: [
            {
                data: [3, 4, 2],
                backgroundColor: [
                    '#10B981', // accent
                    '#F59E0B', // warning
                    '#EF4444', // danger
                ],
                borderWidth: 0,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: '#F9FAFB' }
            }
        },
        scales: {
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#9CA3AF' }
            },
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#9CA3AF' }
            }
        }
    };

    return (
        <div className="dashboard">
            <div className="stats-grid">
                <div className="stat-card glass-panel">
                    <div className="stat-icon" style={{ background: 'rgba(79, 70, 229, 0.2)', color: '#818CF8' }}>
                        <Award size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Overall Score</h3>
                        <p className="stat-value">{user?.skillScore || 68}%</p>
                    </div>
                </div>

                <div className="stat-card glass-panel">
                    <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34D399' }}>
                        <TrendingUp size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Progress</h3>
                        <p className="stat-value">{user?.progress || 45}%</p>
                    </div>
                </div>

                <div className="stat-card glass-panel">
                    <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60A5FA' }}>
                        <BookOpen size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Lessons Completed</h3>
                        <p className="stat-value">12 / 28</p>
                    </div>
                </div>

                <div className="stat-card glass-panel">
                    <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#F87171' }}>
                        <AlertCircle size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Weak Areas</h3>
                        <p className="stat-value">2 Topics</p>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-card glass-panel">
                    <h3>Skill Growth Over Time</h3>
                    <div className="chart-container">
                        <Line data={progressData} options={chartOptions} />
                    </div>
                </div>

                <div className="chart-card glass-panel">
                    <h3>Topic Mastery Distribution</h3>
                    <div className="chart-container">
                        <Doughnut data={topicData} options={{ ...chartOptions, scales: {} }} />
                    </div>
                </div>
            </div>

            <div className="recommendations-container glass-panel">
                <h3>Recommended Next Steps</h3>
                <div className="rec-list">
                    <div className="rec-item">
                        <div className="rec-priority high">Priority</div>
                        <div className="rec-details">
                            <h4>Review: Advanced Data Structures</h4>
                            <p>Based on your recent quiz, you struggled with Graph traversal algorithms.</p>
                        </div>
                        <button className="primary-btn">Start Lesson</button>
                    </div>
                    <div className="rec-item">
                        <div className="rec-priority medium">Suggested</div>
                        <div className="rec-details">
                            <h4>Practice: Dynamic Programming</h4>
                            <p>Complete 3 exercises to solidify your understanding.</p>
                        </div>
                        <button className="secondary-btn">View Exercises</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
