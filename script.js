 document.addEventListener('DOMContentLoaded', function() {
            const ageSelector = document.getElementById('ageSelector');
            const quizContainer = document.getElementById('quizContainer');
            const resultsContainer = document.getElementById('resultsContainer');
            const startBtn = document.getElementById('startQuiz');
            const restartBtn = document.getElementById('restartQuiz');
            const quizCarousel = document.getElementById('quizCarousel');
            const carouselIndicators = document.getElementById('carouselIndicators');
            const scoreValue = document.getElementById('scoreValue');
            const finalScore = document.getElementById('finalScore');
            const highScore = document.getElementById('highScore');
            const totalQuizzes = document.getElementById('totalQuizzes');
            const averageScore = document.getElementById('averageScore');
            const bestCategory = document.getElementById('bestCategory');
            let selectedAgeGroup = null;
            let currentSlide = 0;
            let score = 0;
            let userAnswers = [];
            let questions = [];
            document.querySelectorAll('.age-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.age-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    selectedAgeGroup = this.dataset.age;
                });
            });
            startBtn.addEventListener('click', async function() {
                if (!selectedAgeGroup) {
                    alert('Please select an age group');
                    return;
                }
                
                try {
                    startBtn.disabled = true;
                    startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading Questions...';
                    questions = await fetchQuestions(selectedAgeGroup);
                    initializeQuiz();
                    ageSelector.style.display = 'none';
                    quizContainer.style.display = 'block';
                } catch (error) {
                    console.error('Error loading questions:', error);
                    alert('Failed to load questions. Please try again.');
                } finally {
                    startBtn.disabled = false;
                    startBtn.textContent = 'Start Quiz';
                }
            });
            restartBtn.addEventListener('click', function() {
                resultsContainer.style.display = 'none';
                ageSelector.style.display = 'block';
                quizContainer.style.display = 'none';
                selectedAgeGroup = null;
                document.querySelectorAll('.age-btn').forEach(b => b.classList.remove('active'));
            });
            async function fetchQuestions(ageGroup) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const questionSets = {
                    child: [
                        {
                            question: "What is the color of an apple?",
                            options: ["Red", "Blue", "Green", "Yellow"],
                            correctAnswer: "Red",
                            category: "General Knowledge"
                        },
                        {
                            question: "How many legs does a dog have?",
                            options: ["2", "4", "6", "8"],
                            correctAnswer: "4",
                            category: "Animals"
                        },
                        {
                            question: "Which of these is a fruit?",
                            options: ["Carrot", "Broccoli", "Apple", "Potato"],
                            correctAnswer: "Apple",
                            category: "General Knowledge"
                        },
                        {
                            question: "What do you use to write on paper?",
                            options: ["Spoon", "Pencil", "Fork", "Hammer"],
                            correctAnswer: "Pencil",
                            category: "General Knowledge"
                        },
                        {
                            question: "Which animal says 'meow'?",
                            options: ["Dog", "Cow", "Cat", "Lion"],
                            correctAnswer: "Cat",
                            category: "Animals"
                        }
                    ],
                    teen: [
                        {
                            question: "What is the capital of France?",
                            options: ["London", "Berlin", "Paris", "Madrid"],
                            correctAnswer: "Paris",
                            category: "Geography"
                        },
                        {
                            question: "Which planet is known as the Red Planet?",
                            options: ["Venus", "Mars", "Jupiter", "Saturn"],
                            correctAnswer: "Mars",
                            category: "Science"
                        },
                        {
                            question: "Who painted the Mona Lisa?",
                            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                            correctAnswer: "Leonardo da Vinci",
                            category: "Art"
                        },
                        {
                            question: "What is the largest mammal?",
                            options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
                            correctAnswer: "Blue Whale",
                            category: "Science"
                        },
                        {
                            question: "Which language is spoken in Brazil?",
                            options: ["Spanish", "Portuguese", "English", "French"],
                            correctAnswer: "Portuguese",
                            category: "Geography"
                        }
                    ],
                    'young-adult': [
                        {
                            question: "What does 'HTTP' stand for?",
                            options: ["HyperText Transfer Protocol", "High Tech Transfer Protocol", "Hyper Transfer Text Protocol", "Hyper Transfer Technology Protocol"],
                            correctAnswer: "HyperText Transfer Protocol",
                            category: "Technology"
                        },
                        {
                            question: "Which company developed the React JavaScript framework?",
                            options: ["Google", "Facebook", "Apple", "Microsoft"],
                            correctAnswer: "Facebook",
                            category: "Technology"
                        },
                        {
                            question: "What is the chemical symbol for gold?",
                            options: ["Go", "Gd", "Au", "Ag"],
                            correctAnswer: "Au",
                            category: "Science"
                        },
                        {
                            question: "Which country won the 2018 FIFA World Cup?",
                            options: ["Germany", "Brazil", "France", "Argentina"],
                            correctAnswer: "France",
                            category: "Sports"
                        },
                        {
                            question: "Who is the author of 'To Kill a Mockingbird'?",
                            options: ["J.K. Rowling", "Harper Lee", "Stephen King", "Ernest Hemingway"],
                            correctAnswer: "Harper Lee",
                            category: "Literature"
                        }
                    ],
                    adult: [
                        {
                            question: "What is the largest organ in the human body?",
                            options: ["Liver", "Brain", "Skin", "Heart"],
                            correctAnswer: "Skin",
                            category: "Science"
                        },
                        {
                            question: "Which economist wrote 'The Wealth of Nations'?",
                            options: ["John Maynard Keynes", "Adam Smith", "Karl Marx", "Milton Friedman"],
                            correctAnswer: "Adam Smith",
                            category: "Economics"
                        },
                        {
                            question: "What year did World War II end?",
                            options: ["1943", "1945", "1947", "1950"],
                            correctAnswer: "1945",
                            category: "History"
                        },
                        {
                            question: "Which element has the atomic number 1?",
                            options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
                            correctAnswer: "Hydrogen",
                            category: "Science"
                        },
                        {
                            question: "Who was the first woman to win a Nobel Prize?",
                            options: ["Marie Curie", "Mother Teresa", "Rosalind Franklin", "Jane Addams"],
                            correctAnswer: "Marie Curie",
                            category: "History"
                        }
                    ]
                };
                const allQuestions = questionSets[ageGroup];
                const shuffled = allQuestions.sort(() => 0.5 - Math.random());
                return shuffled.slice(0, 5);
            }
            function initializeQuiz() {
                quizCarousel.innerHTML = '';
                carouselIndicators.innerHTML = '';
                score = 0;
                userAnswers = new Array(questions.length).fill(null);
                currentSlide = 0;
                scoreValue.textContent = '0';
                questions.forEach((question, index) => {
                    const slide = document.createElement('div');
                    slide.className = 'quiz-slide';
                    slide.dataset.index = index;
                    
                    slide.innerHTML = `
                        <div class="question-container">
                            <div class="question-number">Question ${index + 1} of ${questions.length}</div>
                            <div class="question-text">${question.question}</div>
                        </div>
                        
                        <div class="options-container" id="options-${index}">
                            ${question.options.map((option, optIndex) => `
                                <div class="option" data-index="${optIndex}">
                                    <input type="radio" name="question-${index}" id="option-${index}-${optIndex}" value="${option}">
                                    <label for="option-${index}-${optIndex}">${option}</label>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="feedback" id="feedback-${index}"></div>
                        
                        <div class="navigation">
                            <button class="nav-btn" id="prev-${index}" ${index === 0 ? 'disabled' : ''}>
                                <i class="fas fa-arrow-left"></i> Previous
                            </button>
                            <button class="nav-btn" id="next-${index}" ${index === questions.length - 1 ? '' : 'disabled'}>
                                ${index === questions.length - 1 ? 'Submit' : 'Next <i class="fas fa-arrow-right"></i>'}
                            </button>
                        </div>
                    `;
                    
                    quizCarousel.appendChild(slide);
                    const indicator = document.createElement('div');
                    indicator.className = 'indicator';
                    indicator.dataset.index = index;
                    if (index === 0) indicator.classList.add('active');
                    indicator.addEventListener('click', () => goToSlide(index));
                    carouselIndicators.appendChild(indicator);
                    const options = slide.querySelectorAll('.option');
                    options.forEach(opt => {
                        opt.addEventListener('click', function() {
                            if (userAnswers[index] !== null) return; 
                            options.forEach(o => o.classList.remove('selected'));
                            this.classList.add('selected');
                            const selectedOption = this.querySelector('input').value;
                            userAnswers[index] = selectedOption;
                            const nextBtn = slide.querySelector(`#next-${index}`);
                            nextBtn.disabled = false;
                            const isCorrect = selectedOption === questions[index].correctAnswer;
                            const feedback = slide.querySelector(`#feedback-${index}`);
                            
                            if (isCorrect) {
                                feedback.textContent = 'Correct! Well done!';
                                feedback.className = 'feedback correct';
                                score++;
                                scoreValue.textContent = score;
                            } else {
                                feedback.textContent = `Incorrect. The correct answer is: ${questions[index].correctAnswer}`;
                                feedback.className = 'feedback incorrect';
                            }
                            options.forEach(opt => {
                                const optValue = opt.querySelector('input').value;
                                if (optValue === questions[index].correctAnswer) {
                                    opt.classList.add('correct');
                                } else if (optValue === selectedOption && !isCorrect) {
                                    opt.classList.add('incorrect');
                                }
                            });
                        });
                    });
                    const prevBtn = slide.querySelector(`#prev-${index}`);
                    const nextBtn = slide.querySelector(`#next-${index}`);
                    
                    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
                    
                    nextBtn.addEventListener('click', function() {
                        if (index === questions.length - 1) {
                            showResults();
                        } else {
                            goToSlide(currentSlide + 1);
                        }
                    });
                });
                
                updateCarousel();
            }
            function goToSlide(slideIndex) {
                if (slideIndex < 0 || slideIndex >= questions.length) return;
                
                currentSlide = slideIndex;
                updateCarousel();
            }
            function updateCarousel() {
                quizCarousel.style.transform = `translateX(-${currentSlide * 100}%)`;
                document.querySelectorAll('.indicator').forEach((ind, index) => {
                    ind.classList.toggle('active', index === currentSlide);
                });
            }
            function showResults() {
    const percentage = Math.round((score / questions.length) * 100);
    saveQuizResults(percentage, selectedAgeGroup);
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    finalScore.textContent = `Your score: ${score} out of ${questions.length} (${percentage}%)`;
    loadStats();
    triggerConfetti(percentage);
}

function triggerConfetti(percentage) {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
    if (percentage >= 80) {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });
        setTimeout(() => {
            confetti({
                particleCount: 200,
                angle: 60,
                spread: 70,
                origin: { x: 0 }
            });
            
            confetti({
                particleCount: 200,
                angle: 120,
                spread: 70,
                origin: { x: 1 }
            });
        }, 300);
    }
    
    if (percentage === 100) {
        setTimeout(() => {
            const duration = 3000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
            
            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }
            
            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();
                
                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }
                
                const particleCount = 50 * (timeLeft / duration);
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);
        }, 500);
    }
}
            function saveQuizResults(scorePercentage, category) {
                const quizHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
                quizHistory.push({
                    date: new Date().toISOString(),
                    score: scorePercentage,
                    category: category
                });
                if (quizHistory.length > 10) {
                    quizHistory.shift();
                }
                
                localStorage.setItem('quizHistory', JSON.stringify(quizHistory));
            }
            function loadStats() {
                const quizHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
                
                totalQuizzes.textContent = quizHistory.length;
                
                if (quizHistory.length > 0) {
                    const totalScore = quizHistory.reduce((sum, quiz) => sum + quiz.score, 0);
                    const avgScore = Math.round(totalScore / quizHistory.length);
                    averageScore.textContent = `${avgScore}%`;
                    const highestScore = Math.max(...quizHistory.map(q => q.score));
                    highScore.textContent = `Your highest score: ${highestScore}%`;
                    const categoryCounts = {};
                    quizHistory.forEach(quiz => {
                        categoryCounts[quiz.category] = (categoryCounts[quiz.category] || 0) + 1;
                    });
                    const bestCat = Object.keys(categoryCounts).reduce((a, b) => 
                        categoryCounts[a] > categoryCounts[b] ? a : b);
                    const categoryDisplayNames = {
                        'child': 'Kids Knowledge',
                        'teen': 'Teen Trivia',
                        'young-adult': 'Young Adult',
                        'adult': 'Adult Expertise'
                    };
                    
                    bestCategory.textContent = categoryDisplayNames[bestCat] || bestCat;
                } else {
                    averageScore.textContent = '0%';
                    highScore.textContent = 'No previous scores';
                    bestCategory.textContent = '-';
                }
            }
        });