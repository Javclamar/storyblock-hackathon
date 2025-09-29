import { useState, useEffect } from 'react';
import '../styles/LoadingAnimation.css';

const AILoadingAnimation = () => {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  
  const statusMessages = [
    "Analyzing your preferences...",
    "Processing neural patterns...",
    "Crafting personalized content...",
    "Fine-tuning AI responses...",
    "Almost ready..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [statusMessages.length]);

  const dotPositions = [
    { top: '20%', left: '30%', animationDelay: '0s' },
    { top: '35%', right: '25%', animationDelay: '0.3s' },
    { bottom: '30%', left: '40%', animationDelay: '0.6s' },
    { top: '50%', left: '20%', animationDelay: '0.9s' },
    { bottom: '40%', right: '35%', animationDelay: '1.2s' },
    { top: '40%', left: '50%', animationDelay: '1.5s' }
  ];

  const particles = Array.from({ length: 12 }, (_, i) => ({
    left: Math.random() * 100 + '%',
    animationDelay: Math.random() * 6 + 's',
    animationDuration: (4 + Math.random() * 4) + 's'
  }));

  return (
    <div className="ai-loading-container">
      <div className="ai-particles">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="ai-particle"
            style={{
              left: particle.left,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration
            }}
          />
        ))}
      </div>
      
      <div className="ai-brain">
        <div className="ai-brain-outline"></div>
        <div className="ai-neural-dots">
          {dotPositions.map((dot, index) => (
            <div
              key={index}
              className="ai-dot"
              style={dot}
            />
          ))}
        </div>
      </div>
      
      <div className="ai-loading-text">PERSONALIZING</div>
      
      <div className="ai-progress-bar">
        <div className="ai-progress-fill"></div>
      </div>
      
      <div className="ai-status-text">
        {statusMessages[currentStatusIndex]}
      </div>
    </div>
  );
};

export default AILoadingAnimation;