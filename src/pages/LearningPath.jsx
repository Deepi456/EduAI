import React from 'react';
import { BookOpen, CheckCircle, Lock, PlayCircle, Star } from 'lucide-react';
import './LearningPath.css';

const MOCK_PATH = [
    {
        id: 1,
        title: 'Time & Space Complexity',
        description: 'Master Big O notation, a foundational skill to optimize your algorithms.',
        status: 'completed', // completed, active, locked
        type: 'video',
        duration: '15 min'
    },
    {
        id: 2,
        title: 'Advanced Tree Traversal',
        description: 'Based on your weak areas: Learn DFS, BFS and their optimal use cases.',
        status: 'active',
        type: 'interactive',
        duration: '30 min',
        isRecommended: true
    },
    {
        id: 3,
        title: 'Dynamic Programming Patterns',
        description: 'Identify overlapping subproblems and apply memoization techniques.',
        status: 'locked',
        type: 'exercise',
        duration: '45 min'
    },
    {
        id: 4,
        title: 'Database Indexing Strategies',
        description: 'Improve read performance using B-Trees and Hash indexes.',
        status: 'locked',
        type: 'reading',
        duration: '20 min'
    }
];

const LearningPath = () => {
    return (
        <div className="path-container">
            <div className="path-header">
                <div>
                    <h2>Your Personalized Roadmap</h2>
                    <p>Generated dynamically based on your latest skill gaps and goals.</p>
                </div>
                <div className="path-stats glass-panel">
                    <div className="stat">
                        <span className="stat-label">Modules</span>
                        <span className="stat-val">4</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Est. Time</span>
                        <span className="stat-val">1h 50m</span>
                    </div>
                </div>
            </div>

            <div className="timeline">
                {MOCK_PATH.map((module, idx) => (
                    <div className={`timeline-item ${module.status}`} key={module.id}>
                        <div className="timeline-connector">
                            {idx < MOCK_PATH.length - 1 && <div className="line"></div>}
                        </div>

                        <div className="timeline-node">
                            {module.status === 'completed' && <CheckCircle size={24} className="icon-completed" />}
                            {module.status === 'active' && <PlayCircle size={28} className="icon-active" />}
                            {module.status === 'locked' && <Lock size={20} className="icon-locked" />}
                        </div>

                        <div className="timeline-content glass-panel">
                            {module.isRecommended && (
                                <div className="recommended-badge">
                                    <Star size={14} /> Top Priority (Skill Gap)
                                </div>
                            )}

                            <div className="content-header">
                                <h3>{module.title}</h3>
                                <span className={`type-badge ${module.type}`}>{module.type}</span>
                            </div>
                            <p>{module.description}</p>

                            <div className="content-footer">
                                <span className="duration">⏱ {module.duration}</span>
                                {module.status === 'active' && (
                                    <button className="primary-btn sm">Start Now</button>
                                )}
                                {module.status === 'completed' && (
                                    <button className="secondary-btn sm">Review</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LearningPath;
