document.addEventListener('DOMContentLoaded', () => {
    const quizEditor = document.querySelector('.quiz-editor');
    const addQuestionButton = document.querySelector('.add-question-button');
    const previewButton = document.querySelector('.preview-button');
    const saveButton = document.querySelector('.save-button');

    let questionCounter = 0; // Track the number of questions added

    // Function to add a new question
    function addQuestion() {
        questionCounter++; // Increment the question counter

        const newQuestionDiv = document.createElement('div');
        newQuestionDiv.classList.add('question');

        // Create input field for the question
        const questionInput = document.createElement('input');
        questionInput.setAttribute('type', 'text');
        questionInput.setAttribute('placeholder', `Question ${questionCounter}`);
        
        // Create options container
        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');

        // Create four input fields for options
        for (let i = 1; i <= 4; i++) {
            const optionInput = document.createElement('input');
            optionInput.setAttribute('type', 'text');
            optionInput.setAttribute('placeholder', `Option ${i}`);
            optionsContainer.appendChild(optionInput);
        }

        // Append question input and options to the new question div
        newQuestionDiv.appendChild(questionInput);
        newQuestionDiv.appendChild(optionsContainer);

        // Append the new question div to the quiz editor
        quizEditor.appendChild(newQuestionDiv);
    }

    // Function to preview the quiz
    function previewQuiz() {
        const questions = document.querySelectorAll('.quiz-editor .question');
        const quizTitle = document.querySelector('.quiz-editor input[type="text"]').value;

        let quizContent = `
            <html>
            <head>
                <title>${quizTitle}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-image: url(https://images.unsplash.com/photo-1539628399213-d6aa89c93074?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
                        background-size: cover;
                        color: #333;
                        padding: 20px;
                        text-align: center;
                        margin: 0;
                        height: 100vh;
                        display: flex;
                        text-color: white;
                    }
                    h2 {
                        color: #fff; /* Text color for quiz title */
                        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background for title */
                        padding: 10px;
                        border-radius: 5px;
                        margin-bottom: 20px;
                    }
                    label {
                        color: #fff; /* Text color for form labels */
                    }
                    input[type="text"] {
                        width: 100%;
                        padding: 10px;
                        margin-bottom: 20px;
                        box-sizing: border-box;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                    }
                    button[type="submit"] {
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: #fff;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    button[type="submit"]:hover {
                        background-color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <h2>${quizTitle}</h2>
                <form id="quiz-form">
                    <label for="name">Name:</label>
                    <input type="text" id="name" required><br>
                    <label for="roll-number">Roll Number:</label>
                    <input type="text" id="roll-number" required><br>
        `;
        
        questions.forEach((question, index) => {
            const questionText = question.querySelector('input[type="text"]').value;
            const options = question.querySelectorAll('.options-container input[type="text"]');
            
            quizContent += `
                <div class="question">
                    <p><strong>Question ${index + 1}:</strong> ${questionText}</p>
                    <ul class="options">
            `;
            
            options.forEach((option, idx) => {
                quizContent += `<li><input type="radio" name="question-${index}" value="${option.value}"> ${option.value}</li>`;
            });
            
            quizContent += `</ul></div>`;
        });

        quizContent += `<button type="submit">Submit Quiz</button></form></body></html>`;

        // Open a new window or tab to display the quiz content
        const previewWindow = window.open('', '_blank');
        previewWindow.document.write(quizContent);

        // Handle form submission
        const quizForm = previewWindow.document.getElementById('quiz-form');
        quizForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = previewWindow.document.getElementById('name').value;
            const rollNumber = previewWindow.document.getElementById('roll-number').value;
            alert(`Thank you, ${name} (${rollNumber}), for taking the quiz!`);
            // Additional logic to process quiz submission (e.g., scoring)
        });
    }

    // Event listener for the "Add Question" button
    if (addQuestionButton) {
        addQuestionButton.addEventListener('click', addQuestion);
    }

    // Event listener for the "Preview" button
    if (previewButton) {
        previewButton.addEventListener('click', previewQuiz);
    }

    // Event listener for the "Save Quiz" button (placeholder)
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            // Placeholder for saving the quiz data
            alert('Quiz Saved Successfully!');
        });
    }
});



