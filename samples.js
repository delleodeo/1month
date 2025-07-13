// ====================================
// SAMPLE CODE FOR ROMANTIC WEB APP
// ====================================

// Sample: Love Letter Generator
class LoveLetterGenerator {
    constructor() {
        this.templates = [
            "My dearest {name}, every day with you feels like a beautiful dream come true. Your smile brightens my world and makes everything better. 💕",
            "Sweet {name}, you are the sunshine in my cloudy days and the stars in my darkest nights. I love you more than words can express. ✨",
            "Beautiful {name}, from the moment I met you, I knew you were special. Thank you for being the most amazing person in my life. 💖",
            "My love {name}, you make my heart skip a beat every time I see you. I'm so grateful to have you in my life. 💝"
        ];
        
        this.adjectives = ["amazing", "wonderful", "beautiful", "incredible", "stunning", "adorable"];
        this.compliments = [
            "your laugh is my favorite sound",
            "you make everything better just by being there",
            "your kindness touches everyone around you",
            "you have the most beautiful heart",
            "your smile lights up the entire room"
        ];
    }
    
    generateLetter(name) {
        const template = this.templates[Math.floor(Math.random() * this.templates.length)];
        const adjective = this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
        const compliment = this.compliments[Math.floor(Math.random() * this.compliments.length)];
        
        return template.replace('{name}', name) + ` You are ${adjective} and ${compliment}. 💫`;
    }
}

// Sample: Countdown Timer for Special Dates
class RomanticCountdown {
    constructor(targetDate, containerId) {
        this.targetDate = new Date(targetDate);
        this.container = document.getElementById(containerId);
        this.interval = null;
    }
    
    start() {
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    update() {
        const now = new Date();
        const difference = this.targetDate - now;
        
        if (difference <= 0) {
            this.container.innerHTML = "🎉 The special day is here! 🎉";
            this.stop();
            return;
        }
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        this.container.innerHTML = `
            <div class="countdown-display">
                <div class="time-unit">
                    <span class="number">${days}</span>
                    <span class="label">days</span>
                </div>
                <div class="time-unit">
                    <span class="number">${hours}</span>
                    <span class="label">hours</span>
                </div>
                <div class="time-unit">
                    <span class="number">${minutes}</span>
                    <span class="label">minutes</span>
                </div>
                <div class="time-unit">
                    <span class="number">${seconds}</span>
                    <span class="label">seconds</span>
                </div>
            </div>
        `;
    }
}

// Sample: Interactive Love Quiz
class LoveQuiz {
    constructor() {
        this.questions = [
            {
                question: "What was our first conversation about?",
                options: ["School", "Music", "Movies", "Food"],
                correct: 1,
                feedback: "Yes! We bonded over our shared love of music 🎵"
            },
            {
                question: "What's my favorite thing about you?",
                options: ["Your smile", "Your laugh", "Your kindness", "Everything"],
                correct: 3,
                feedback: "Trick question - I love everything about you! 💕"
            },
            {
                question: "What do I call you most often?",
                options: ["Baby", "Love", "Sweetheart", "Beautiful"],
                correct: 0,
                feedback: "That's right, baby! 💖"
            }
        ];
        
        this.currentQuestion = 0;
        this.score = 0;
    }
    
    renderQuestion() {
        const question = this.questions[this.currentQuestion];
        return `
            <div class="quiz-container">
                <h3>Question ${this.currentQuestion + 1} of ${this.questions.length}</h3>
                <p class="question-text">${question.question}</p>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <button class="option-btn" onclick="loveQuiz.selectAnswer(${index})">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <div class="quiz-progress">
                    <div class="progress-bar" style="width: ${(this.currentQuestion / this.questions.length) * 100}%"></div>
                </div>
            </div>
        `;
    }
    
    selectAnswer(answerIndex) {
        const question = this.questions[this.currentQuestion];
        const isCorrect = answerIndex === question.correct;
        
        if (isCorrect) {
            this.score++;
            this.showFeedback(question.feedback, true);
        } else {
            this.showFeedback("Not quite, but I love you anyway! 💕", false);
        }
        
        setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion < this.questions.length) {
                this.nextQuestion();
            } else {
                this.showResults();
            }
        }, 2000);
    }
    
    showFeedback(message, isCorrect) {
        // Implementation for showing feedback animation
        console.log(`${isCorrect ? '✅' : '❌'} ${message}`);
    }
    
    showResults() {
        const percentage = (this.score / this.questions.length) * 100;
        let message = "";
        
        if (percentage === 100) {
            message = "Perfect! You know me so well! 💕";
        } else if (percentage >= 66) {
            message = "Great job! You really pay attention! 😊";
        } else {
            message = "We should spend more time together! 💖";
        }
        
        return {
            score: this.score,
            total: this.questions.length,
            percentage: percentage,
            message: message
        };
    }
}

// Sample: Memory Timeline Generator
class MemoryTimeline {
    constructor() {
        this.milestones = [
            { date: "2024-12-23", event: "First conversation 💬", icon: "💭" },
            { date: "2024-12-25", event: "Christmas together 🎄", icon: "🎁" },
            { date: "2024-12-31", event: "New Year's Eve ✨", icon: "🎆" },
            { date: "2025-01-14", event: "First month anniversary 💕", icon: "💖" }
        ];
    }
    
    generateTimeline() {
        return this.milestones.map((milestone, index) => {
            const date = new Date(milestone.date);
            const isToday = this.isToday(date);
            const isPast = date < new Date();
            
            return `
                <div class="timeline-item ${isToday ? 'today' : ''} ${isPast ? 'completed' : 'upcoming'}">
                    <div class="timeline-icon">${milestone.icon}</div>
                    <div class="timeline-content">
                        <h4>${milestone.event}</h4>
                        <p class="timeline-date">${this.formatDate(date)}</p>
                        ${isToday ? '<span class="today-badge">Today! 🎉</span>' : ''}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }
    
    formatDate(date) {
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
}

// Sample: Romantic Particle System
class HeartParticles {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.colors = ['#ff69b4', '#ff1493', '#ff6347', '#ff4500', '#ffd700'];
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticle(x, y) {
        return {
            x: x || Math.random() * this.canvas.width,
            y: y || this.canvas.height + 10,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 3 - 1,
            size: Math.random() * 20 + 10,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            life: 1,
            decay: Math.random() * 0.02 + 0.005
        };
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    drawHeart(x, y, size, color, alpha) {
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = color;
        this.ctx.translate(x, y);
        this.ctx.scale(size / 20, size / 20);
        
        this.ctx.beginPath();
        this.ctx.moveTo(0, 3);
        this.ctx.bezierCurveTo(-6, -3, -15, 0, 0, 12);
        this.ctx.bezierCurveTo(15, 0, 6, -3, 0, 3);
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.drawHeart(
                particle.x,
                particle.y,
                particle.size,
                particle.color,
                particle.life
            );
        });
    }
    
    start() {
        // Add new particles periodically
        setInterval(() => {
            if (this.particles.length < 50) {
                this.particles.push(this.createParticle());
            }
        }, 200);
        
        // Animation loop
        const animate = () => {
            this.updateParticles();
            this.render();
            requestAnimationFrame(animate);
        };
        animate();
    }
    
    burst(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle(x, y));
        }
    }
}

// Sample: Love Calculator (Fun Feature)
class LoveCalculator {
    constructor() {
        this.algorithms = [
            this.nameCompatibility,
            this.birthdateHarmony,
            this.personalityMatch
        ];
    }
    
    calculate(name1, name2) {
        const scores = this.algorithms.map(algorithm => algorithm(name1, name2));
        const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        
        return {
            score: Math.round(average),
            message: this.getMessageForScore(Math.round(average)),
            breakdown: {
                nameCompatibility: scores[0],
                birthdateHarmony: scores[1],
                personalityMatch: scores[2]
            }
        };
    }
    
    nameCompatibility(name1, name2) {
        // Simple algorithm based on name lengths and common letters
        const combined = (name1 + name2).toLowerCase();
        const uniqueLetters = new Set(combined).size;
        return Math.min(95, (uniqueLetters / combined.length) * 100 + Math.random() * 20);
    }
    
    birthdateHarmony(name1, name2) {
        // Pseudo-random but consistent algorithm
        const seed = (name1 + name2).split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        return 70 + ((seed % 100) / 100) * 25;
    }
    
    personalityMatch(name1, name2) {
        // Another fun pseudo-algorithm
        const vowels = 'aeiou';
        const vowelCount = (name1 + name2).toLowerCase().split('').filter(char => vowels.includes(char)).length;
        return Math.min(98, vowelCount * 8 + Math.random() * 15 + 60);
    }
    
    getMessageForScore(score) {
        if (score >= 90) return "Perfect match! You're soulmates! 💕✨";
        if (score >= 80) return "Amazing compatibility! Love is in the air! 💖";
        if (score >= 70) return "Great potential! Keep nurturing your love! 💝";
        if (score >= 60) return "Good foundation! Love grows with time! 🌱💕";
        return "Every love story is unique! Make your own magic! ✨";
    }
}

// Sample: Usage Examples and Initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌟 Romantic Web App Sample Code Loaded! 🌟');
    
    // Example usage:
    // const loveLetterGen = new LoveLetterGenerator();
    // const letter = loveLetterGen.generateLetter('Beautiful');
    // console.log(letter);
    
    // const countdown = new RomanticCountdown('2025-02-14', 'countdown-container');
    // countdown.start();
    
    // const loveQuiz = new LoveQuiz();
    // document.getElementById('quiz-container').innerHTML = loveQuiz.renderQuestion();
    
    // const timeline = new MemoryTimeline();
    // document.getElementById('timeline-container').innerHTML = timeline.generateTimeline();
    
    // const heartParticles = new HeartParticles('hearts-canvas');
    // heartParticles.start();
    
    // const loveCalc = new LoveCalculator();
    // const result = loveCalc.calculate('John', 'Jane');
    // console.log('Love Score:', result);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LoveLetterGenerator,
        RomanticCountdown,
        LoveQuiz,
        MemoryTimeline,
        HeartParticles,
        LoveCalculator
    };
}