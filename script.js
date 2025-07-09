const questions = [
  {
  question: "Why is CSS called 'Cascading Style Sheets'?",
  options: [
    "Because styles cascade based on priority and specificity",
    "Because it flows like a waterfall",
    "Because it's used for Java apps",
    "Because it changes HTML structure"
  ],
  answer: "Because styles cascade based on priority and specificity"
},

  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What year was JavaScript created?",
    options: ["1995", "2005", "2015", "1990"],
    answer: "1995"
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<style>", "<script>", "<css>", "<head>"],
    answer: "<style>"
  }
];

   

        let currentQuestion = 0;
        let score = 0;
        let selectedOption = null;
        let answered = false;

        const quizContent = document.getElementById('quizContent');
        const resultsContainer = document.getElementById('resultsContainer');
        const questionText = document.getElementById('questionText');
        const questionNumber = document.getElementById('questionNumber');
        const optionsContainer = document.getElementById('optionsContainer');
        const nextBtn = document.getElementById('nextBtn');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const currentScore = document.getElementById('currentScore');
        const totalQuestions = document.getElementById('totalQuestions');
        const finalScore = document.getElementById('finalScore');
        const scoreMessage = document.getElementById('scoreMessage');
        const restartBtn = document.getElementById('restartBtn');
        const quizContainer = document.getElementById('quizContainer');

        function loadQuestion() {
            const question = questions[currentQuestion];
            questionNumber.textContent = `Question ${currentQuestion + 1}`;
            questionText.textContent = question.question;
            
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.textContent = option;
                optionElement.addEventListener('click', () => selectOption(index, optionElement));
                optionsContainer.appendChild(optionElement);
            });

            updateProgress();
            nextBtn.disabled = true;
            answered = false;
            selectedOption = null;
        }

        function selectOption(index, element) {
            if (answered) return;

            // Remove previous selections
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });

            element.classList.add('selected');
            selectedOption = index;
            nextBtn.disabled = false;
        }

        function checkAnswer() {
            if (selectedOption === null) return;

            answered = true;
            const question = questions[currentQuestion];
            const options = document.querySelectorAll('.option');

            options.forEach((option, index) => {
                option.style.pointerEvents = 'none';
                if (index === question.correct) {
                    option.classList.add('correct');
                } else if (index === selectedOption && index !== question.correct) {
                    option.classList.add('incorrect');
                }
            });

            if (selectedOption === question.correct) {
                score++;
                currentScore.textContent = score;
                quizContainer.classList.add('celebration');
                setTimeout(() => quizContainer.classList.remove('celebration'), 600);
            }

            nextBtn.textContent = currentQuestion === questions.length - 1 ? 'View Results' : 'Next Question';
        }

        function nextQuestion() {
            if (!answered) {
                checkAnswer();
                return;
            }

            currentQuestion++;
            
            if (currentQuestion < questions.length) {
                loadQuestion();
                nextBtn.textContent = 'Next Question';
            } else {
                showResults();
            }
        }

        function updateProgress() {
            const progress = ((currentQuestion + 1) / questions.length) * 100;
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
        }

        function showResults() {
            quizContent.classList.add('hidden');
            resultsContainer.style.display = 'block';
            
            finalScore.textContent = `${score}/${questions.length}`;
            
            const percentage = (score / questions.length) * 100;
            let message = '';
            
            if (percentage >= 80) {
                message = '🏆 Excellent! You\'re a quiz master!';
            } else if (percentage >= 60) {
                message = '👍 Good job! Keep up the great work!';
            } else if (percentage >= 40) {
                message = '📚 Not bad! A little more study will help!';
            } else {
                message = '💪 Keep trying! Practice makes perfect!';
            }
            
            scoreMessage.textContent = message;
        }

        function restartQuiz() {
            currentQuestion = 0;
            score = 0;
            selectedOption = null;
            answered = false;
            
            currentScore.textContent = '0';
            progressFill.style.width = '0%';
            
            quizContent.classList.remove('hidden');
            resultsContainer.style.display = 'none';
            
            loadQuestion();
            nextBtn.textContent = 'Next Question';
        }

        // Event listeners
        nextBtn.addEventListener('click', nextQuestion);
        restartBtn.addEventListener('click', restartQuiz);

        // Initialize quiz
        totalQuestions.textContent = questions.length;
        loadQuestion();