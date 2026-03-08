import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { CheckCircle, ArrowRight, BookOpen } from 'lucide-react';
import './Assessment.css';

const MOCK_QUESTIONS = [
    {
        id: 1,
        topic: 'Data Structures',
        question: 'Which data structure follows the LIFO (Last In First Out) principle?',
        options: ['Queue', 'Stack', 'Tree', 'Graph'],
        correctAnswer: 'Stack'
    },
    {
        id: 2,
        topic: 'Algorithms',
        question: 'What is the time complexity of Binary Search?',
        options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(1)'],
        correctAnswer: 'O(log n)'
    },
    {
        id: 3,
        topic: 'Databases',
        question: 'Which of the following is NOT a NoSQL database?',
        options: ['MongoDB', 'Cassandra', 'PostgreSQL', 'Redis'],
        correctAnswer: 'PostgreSQL'
    }
];

const Assessment = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [answers, setAnswers] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    const { updateSkillScore } = useContext(UserContext);
    const navigate = useNavigate();

    const handleNext = () => {
        // Save answer
        setAnswers({ ...answers, [currentQuestion]: selectedOption });
        setSelectedOption('');

        if (currentQuestion < MOCK_QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            finishAssessment();
        }
    };

    const finishAssessment = () => {
        // Calculate naive score for demo
        let correct = 0;
        Object.entries(answers).forEach(([index, ans]) => {
            // Need to include current answer if on last question and just clicked next
            const answerToCheck = Number(index) === MOCK_QUESTIONS.length - 1 ? selectedOption : ans;
            if (answerToCheck === MOCK_QUESTIONS[index].correctAnswer) {
                correct++;
            }
        });

        // Add current question answer since state update is async
        if (selectedOption === MOCK_QUESTIONS[currentQuestion].correctAnswer) {
            correct++;
        }

        const calculatedScore = Math.round((correct / MOCK_QUESTIONS.length) * 100);
        updateSkillScore(calculatedScore);
        setIsFinished(true);
    };

    if (isFinished) {
        return (
            <div className="assessment-container result-view">
                <div className="result-card glass-panel animate-fade-in">
                    <div className="icon-wrapper">
                        <CheckCircle size={64} className="success-icon" />
                    </div>
                    <h2>Assessment Complete!</h2>
                    <p>We've analyzed your skill gaps and generated a personalized learning path.</p>

                    <button className="primary-btn mt-4" onClick={() => navigate('/path')}>
                        View Recommended Path <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        );
    }

    const question = MOCK_QUESTIONS[currentQuestion];
    const progress = ((currentQuestion) / MOCK_QUESTIONS.length) * 100;

    return (
        <div className="assessment-container">
            <div className="assessment-header">
                <div className="header-info">
                    <h2>Computer Science Fundamentals Core Assessment</h2>
                    <p>Answer the following questions to help us identify your skill gaps.</p>
                </div>
                <div className="progress-container">
                    <div className="progress-text">Question {currentQuestion + 1} of {MOCK_QUESTIONS.length}</div>
                    <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="question-card glass-panel animate-fade-in" key={currentQuestion}>
                <div className="question-topic">
                    <BookOpen size={16} /> <span>{question.topic}</span>
                </div>
                <h3 className="question-text">{question.question}</h3>

                <div className="options-grid">
                    {question.options.map((option, idx) => (
                        <div
                            key={idx}
                            className={`option-card ${selectedOption === option ? 'selected' : ''}`}
                            onClick={() => setSelectedOption(option)}
                        >
                            <div className="option-indicator"></div>
                            <span>{option}</span>
                        </div>
                    ))}
                </div>

                <div className="card-actions">
                    <button
                        className="primary-btn"
                        onClick={handleNext}
                        disabled={!selectedOption}
                    >
                        {currentQuestion === MOCK_QUESTIONS.length - 1 ? 'Finish Assessment' : 'Next Question'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Assessment;
