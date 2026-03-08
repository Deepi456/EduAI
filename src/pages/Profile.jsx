import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { User, Mail, BookOpen, Target, Edit2, Check, Award } from 'lucide-react';
import './Profile.css';

const Profile = () => {
    const { user } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || 'Alex Johnson',
        email: user?.email || 'alex@example.com',
        bio: 'Aspiring software engineer passionate about machine learning and data structures. Looking to improve algorithm skills to tackle complex problems.',
        subjects: user?.subjects?.join(', ') || 'Mathematics, Computer Science',
        interests: user?.interests?.join(', ') || 'Machine Learning, Data Structures'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // In a real app, this would call an API and update the UserContext
        setIsEditing(false);
    };

    if (!user) {
        return <div className="profile-container"><p>Please log in to view your profile.</p></div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>Your Profile</h2>
                <button
                    className={`edit-btn ${isEditing ? 'saving' : ''}`}
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                >
                    {isEditing ? <><Check size={18} /> Save Changes</> : <><Edit2 size={18} /> Edit Profile</>}
                </button>
            </div>

            <div className="profile-content">
                {/* Left Column: Avatar & Quick Stats */}
                <div className="profile-sidebar glass-panel animate-fade-in">
                    <div className="profile-avatar-large">
                        {formData.name.charAt(0)}
                    </div>
                    <h3 className="profile-name">{formData.name}</h3>
                    <p className="profile-role">Student</p>

                    <div className="profile-stats-mini">
                        <div className="mini-stat">
                            <Award size={18} className="icon-primary" />
                            <span>Score: <strong>{user?.skillScore}%</strong></span>
                        </div>
                        <div className="mini-stat">
                            <BookOpen size={18} className="icon-accent" />
                            <span>Lessons: <strong>12/28</strong></span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="profile-details glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>

                    <div className="detail-section">
                        <h3>Personal Information</h3>
                        <div className="detail-grid">
                            <div className="input-group">
                                <label><User size={16} /> Full Name</label>
                                {isEditing ? (
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                                ) : (
                                    <p className="detail-text">{formData.name}</p>
                                )}
                            </div>
                            <div className="input-group">
                                <label><Mail size={16} /> Email Address</label>
                                {isEditing ? (
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                                ) : (
                                    <p className="detail-text">{formData.email}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>About You</h3>
                        <div className="input-group full-width">
                            <label>Bio</label>
                            {isEditing ? (
                                <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={4} />
                            ) : (
                                <p className="detail-text bio-text">{formData.bio}</p>
                            )}
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Learning Preferences</h3>
                        <div className="detail-grid">
                            <div className="input-group">
                                <label><BookOpen size={16} /> Enrolled Subjects</label>
                                {isEditing ? (
                                    <input type="text" name="subjects" value={formData.subjects} onChange={handleInputChange} placeholder="Comma separated..." />
                                ) : (
                                    <div className="tags-container">
                                        {formData.subjects.split(',').map((sub, i) => (
                                            <span key={i} className="tag subject-tag">{sub.trim()}</span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="input-group">
                                <label><Target size={16} /> Specific Interests / Goals</label>
                                {isEditing ? (
                                    <input type="text" name="interests" value={formData.interests} onChange={handleInputChange} placeholder="Comma separated..." />
                                ) : (
                                    <div className="tags-container">
                                        {formData.interests.split(',').map((interest, i) => (
                                            <span key={i} className="tag interest-tag">{interest.trim()}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
