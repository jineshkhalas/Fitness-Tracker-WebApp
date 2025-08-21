document.addEventListener('DOMContentLoaded', () => {
    const page = window.location.pathname;

    initThemeToggle();

    if (page.endsWith('index.html') || page === '/') {
        initHomePage();
    } else if (page.endsWith('workout.html')) {
        initWorkoutPage();
    } else if (page.endsWith('bmi.html')) {
        initBmiPage();
    } else if (page.endsWith('calorie.html')) {
        initCaloriePage();
    } else if (page.endsWith('sleep.html')) {
        initSleepPage();
    } else if (page.endsWith('water.html')) {
        initWaterPage();
    } else if (page.endsWith('profile.html')) {
        initProfilePage();
    }

    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    hamburgerMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });
    }
});


function getLocalDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    } else {
        body.classList.remove('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            } else {
                localStorage.setItem('theme', 'light');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }
        });
    }
}

function initHomePage() {
    const tips = [
        "Stay hydrated! Drink at least 8 glasses of water a day.",
        "Incorporate at least 30 minutes of moderate exercise into your daily routine.",
        "Prioritize sleep. Aim for 7-9 hours of quality sleep per night.",
        "Eat a balanced diet rich in fruits, vegetables, and lean proteins.",
        "Practice mindfulness or meditation for 10 minutes a day to reduce stress."
    ];
    const quotes = [
        "The only bad workout is the one that didn't happen.",
        "Your body can stand almost anything. It’s your mind that you have to convince.",
        "Success isn’t always about greatness. It’s about consistency. Consistent hard work gains success.",
        "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
        "The journey of a thousand miles begins with a single step."
    ];

    const healthTipEl = document.getElementById('health-tip');
    const quoteEl = document.getElementById('quote');

    if (healthTipEl) {
        healthTipEl.innerHTML = `<p>${tips[Math.floor(Math.random() * tips.length)]}</p>`;
    }
    if (quoteEl) {
        quoteEl.innerHTML = `<p>"${quotes[Math.floor(Math.random() * quotes.length)]}"</p>`;
    }
}

function initBmiPage() {
    const defaultTab = document.querySelector('.tab-link[onclick*="openTab(event, \'metric\')"]');
    if (defaultTab) {
        defaultTab.click();
    }

    const metricForm = document.getElementById('bmi-form-metric');
    const imperialForm = document.getElementById('bmi-form-imperial');
    const bmiValueEl = document.getElementById('bmi-value');
    const bmiCategoryEl = document.getElementById('bmi-category');

    if (metricForm) {
        metricForm.addEventListener('submit', e => {
            e.preventDefault();
            const height = parseFloat(document.getElementById('metric-height').value);
            const weight = parseFloat(document.getElementById('metric-weight').value);
            if (height > 0 && weight > 0 && !isNaN(height) && !isNaN(weight)) {
                const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
                displayBmiResult(bmi);
            } else {
                // Replaced alert with console.error or a custom message display if available
                console.error('Please enter valid positive numbers for height and weight.');
            }
        });
    }

    if (imperialForm) {
        imperialForm.addEventListener('submit', e => {
            e.preventDefault();
            const feet = parseFloat(document.getElementById('imperial-height-ft').value);
            const inches = parseFloat(document.getElementById('imperial-height-in').value);
            const weight = parseFloat(document.getElementById('imperial-weight').value);
            if (feet >= 0 && inches >= 0 && weight > 0 && !isNaN(feet) && !isNaN(inches) && !isNaN(weight)) {
                const totalInches = (feet * 12) + inches;
                const bmi = ((weight / (totalInches ** 2)) * 703).toFixed(1);
                displayBmiResult(bmi);
            } else {
                // Replaced alert with console.error or a custom message display if available
                console.error('Please enter valid positive numbers for height and weight.');
            }
        });
    }

    function displayBmiResult(bmi) {
        if (bmiValueEl) bmiValueEl.textContent = bmi;
        let category = '';
        if (bmi < 18.5) category = 'Underweight';
        else if (bmi < 24.9) category = 'Normal weight';
        else if (bmi < 29.9) category = 'Overweight';
        else category = 'Obesity';
        if (bmiCategoryEl) bmiCategoryEl.textContent = category;

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('users').doc(user.uid).update({
                    latestBmi: bmi
                }).catch(err => console.error("Error updating BMI: ", err));
            }
            unsubscribe();
        });
    }
}

window.openTab = function (evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.style.display = "block";
    }
    if (evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
}

function initCaloriePage() {
    const form = document.getElementById('calorie-form');
    const resultDiv = document.getElementById('calorie-result');

    const showMessage = (message, type = 'info') => {
        if (resultDiv) {
            resultDiv.innerHTML = `
                <div class="message ${type === 'error' ? 'text-red-600' : 'text-green-600'} bg-${type === 'error' ? 'red-100' : 'green-100'} p-3 rounded-lg mt-4 shadow-sm">
                    ${message}
                </div>
            `;
        }
    };

    if (form) {
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const foodInputEl = document.getElementById('food-input');
            const foodInput = foodInputEl ? foodInputEl.value.trim() : '';

            if (!foodInput) {
                showMessage("Please enter a food item to scan.", "error");
                return;
            }

            if (resultDiv) {
                resultDiv.innerHTML = `
                    <div class="flex items-center justify-center mt-4 text-gray-600">
                        <svg class="animate-spin h-5 w-5 mr-3 text-blue-500" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Scanning for nutritional information...
                    </div>
                `;
            }

            if (typeof GEMINI_API_KEY === 'undefined' || !GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
                showMessage("Error: Gemini API Key not configured. Please add it in firebase-config.js.", "error");
                return;
            }

            try {
                const prompt = `Provide detailed nutritional information for "${foodInput}" in a JSON format. Include the food name, estimated calories, fat (grams), protein (grams), carbohydrates (grams), and any other relevant notes. If you cannot provide a specific value, use "N/A".

                Example JSON structure:
                {
                    "foodName": "Medium Apple",
                    "calories": "95 kcal",
                    "fat": "0.3 g",
                    "protein": "0.5 g",
                    "carbohydrates": "25 g",
                    "notes": "Rich in fiber and Vitamin C."
                }`;

                const payload = {
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: "OBJECT",
                            properties: {
                                "foodName": { "type": "STRING" },
                                "calories": { "type": "STRING" },
                                "fat": { "type": "STRING" },
                                "protein": { "type": "STRING" },
                                "carbohydrates": { "type": "STRING" },
                                "notes": { "type": "STRING" }
                            },
                            required: ["foodName", "calories", "fat", "protein", "carbohydrates", "notes"]
                        }
                    }
                };

                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`API request failed with status ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
                }

                const data = await response.json();

                if (data.candidates && data.candidates.length > 0 &&
                    data.candidates[0].content && data.candidates[0].content.parts &&
                    data.candidates[0].content.parts.length > 0) {
                    const jsonText = data.candidates[0].content.parts[0].text;
                    let nutritionalInfo;
                    try {
                        nutritionalInfo = JSON.parse(jsonText);
                    } catch (parseError) {
                        console.error("Error parsing JSON from Gemini API:", parseError);
                        showMessage("Received malformed data from the scanner. Please try again or refine your query.", "error");
                        return;
                    }

                    if (resultDiv) {
                        resultDiv.innerHTML = `
                            <div class="calorie-info bg-blue-50 p-4 rounded-lg mt-4 shadow-md">
                                <h3 class="text-xl font-bold text-blue-700 mb-3">${nutritionalInfo.foodName || 'N/A'}</h3>
                                <div class="grid grid-cols-2 gap-3 text-gray-700">
                                    <p><strong>Calories:</strong> ${nutritionalInfo.calories || 'N/A'}</p>
                                    <p><strong>Fat:</strong> ${nutritionalInfo.fat || 'N/A'}</p>
                                    <p><strong>Protein:</strong> ${nutritionalInfo.protein || 'N/A'}</p>
                                    <p><strong>Carbohydrates:</strong> ${nutritionalInfo.carbohydrates || 'N/A'}</p>
                                </div>
                                <p class="text-sm text-gray-600 mt-3"><strong>Notes:</strong> ${nutritionalInfo.notes || 'No additional notes.'}</p>
                            </div>
                        `;
                    }
                } else {
                    showMessage("Could not retrieve detailed nutritional information. Please try a different description.", "error");
                }
            } catch (error) {
                console.error("Error fetching from Gemini API:", error);
                showMessage(`Failed to get nutritional information: ${error.message}. Please check your input or try again later.`, "error");
            }
        });
    }

    const style = document.createElement('style');
    style.innerHTML = `
        .calorie-result-section {
            margin-top: 20px;
            padding: 15px;
            border-radius: 8px;
            background-color: var(--light-color);
            border: 1px solid var(--border-color);
        }
        .calorie-result-section .calorie-info {
            background-color: #e0f2f7;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #b3e5fc;
        }
        .dark-mode .calorie-result-section .calorie-info {
            background-color: #3182ce;
            border: 1px solid #2b6cb0;
            color: #e2e8f0;
        }
        .calorie-result-section .message {
            padding: 10px;
            border-radius: 5px;
            font-weight: 500;
        }
        .calorie-result-section .message.text-red-600 {
            background-color: #fee2e2;
        }
        .dark-mode .calorie-result-section .message.text-red-600 {
            background-color: #c53030;
            color: #fff;
        }
        .calorie-result-section .message.text-green-600 {
            background-color: #d1fae5;
        }
        .dark-mode .calorie-result-section .message.text-green-600 {
            background-color: #2f855a;
            color: #fff;
        }
        .flex.items-center.justify-center.mt-4.text-gray-600 {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 1rem;
            color: var(--text-color);
        }
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .h-5 { height: 1.25rem; }
        .w-5 { width: 1.25rem; }
        .mr-3 { margin-right: 0.75rem; }
        .text-blue-500 { color: #3b82f6; }
        .opacity-25 { opacity: 0.25; }
        .opacity-75 { opacity: 0.75; }
    `;
    document.head.appendChild(style);
}

function initSleepPage() {
    const form = document.getElementById('sleep-form');
    const resultDiv = document.getElementById('sleep-result');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const startEl = document.getElementById('sleep-start');
            const endEl = document.getElementById('sleep-end');

            const start = startEl ? startEl.value : '';
            const end = endEl ? endEl.value : '';

            if (!start || !end) {
                if (resultDiv) resultDiv.innerHTML = '<p class="text-red-600">Please enter both start and end times.</p>';
                return;
            }

            const startTime = new Date(`1970-01-01T${start}:00`);
            let endTime = new Date(`1970-01-01T${end}:00`);

            if (endTime < startTime) {
                endTime.setDate(endTime.getDate() + 1);
            }

            const durationMs = endTime - startTime;
            const durationHours = (durationMs / (1000 * 60 * 60)).toFixed(1);

            let feedback = '';
            if (durationHours >= 7 && durationHours <= 9) {
                feedback = "Great job! This is within the recommended range for adults.";
            } else if (durationHours < 7) {
                feedback = "You might need more sleep. Aim for 7-9 hours for optimal health.";
            } else {
                feedback = "You've had plenty of rest. Ensure it's quality sleep.";
            }

            if (resultDiv) {
                resultDiv.innerHTML = `
                    <h3>Sleep Duration: ${durationHours} hours</h3>
                    <p>${feedback}</p>
                `;
            }

            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user) {
                    const today = getLocalDateString();
                    db.collection('users').doc(user.uid).collection('sleepLog').doc(today).set({
                        start: start,
                        end: end,
                        duration: parseFloat(durationHours),
                        date: firebase.firestore.Timestamp.now()
                    }, { merge: true }).catch(err => console.error("Error saving sleep log: ", err));
                }
                unsubscribe();
            });
        });
    }
}

function initWaterPage() {
    const waterLevel = document.getElementById('water-level');
    const totalWaterEl = document.getElementById('total-water');
    const waterBtns = document.querySelectorAll('.water-btn');
    const resetBtn = document.getElementById('reset-water-btn');
    const goal = 2500;
    let currentAmount = 0;

    function updateWaterUI() {
        if (totalWaterEl) totalWaterEl.textContent = currentAmount;
        const percentage = Math.min((currentAmount / goal) * 100, 100);
        if (waterLevel) waterLevel.style.height = `${percentage}%`;
    }

    function saveWaterData() {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const today = getLocalDateString();
                db.collection('users').doc(user.uid).collection('waterLog').doc(today).set({
                    amount: currentAmount
                }, { merge: true }).catch(err => console.error("Error saving water data: ", err));
            }
            unsubscribe();
        });
    }

    waterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const amount = parseInt(btn.dataset.amount);
            if (!isNaN(amount)) {
                currentAmount += amount;
                updateWaterUI();
                saveWaterData();
            }
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentAmount = 0;
            updateWaterUI();
            saveWaterData();
        });
    }

    const unsubscribeLoad = auth.onAuthStateChanged(user => {
        if (user) {
            const today = getLocalDateString();
            db.collection('users').doc(user.uid).collection('waterLog').doc(today).get().then(doc => {
                if (doc.exists && typeof doc.data().amount === 'number') {
                    currentAmount = doc.data().amount;
                } else {
                    currentAmount = 0;
                }
                updateWaterUI();
            }).catch(err => console.error("Error loading water data: ", err));
        }
        unsubscribeLoad();
    });
}

function initWorkoutPage() {
    const exercises = [
        'Push-ups', 'Squats', 'Plank', 'Jumping Jacks', 'Lunges', 'Burpees', 'Crunches',
        'Leg Raises', 'Bicep Curls', 'Tricep Dips', 'Overhead Press', 'Rows', 'Deadlifts',
        'Glute Bridges', 'Calf Raises', 'Mountain Climbers', 'High Knees', 'Side Plank',
        'Russian Twists', 'Bird Dog', 'Wall Sit', 'Pull-ups', 'Chin-ups', 'Dumbbell Flys'
    ];
    const exerciseListEl = document.getElementById('exercise-list');
    const workoutPlanEl = document.getElementById('workout-plan');
    const pointsEl = document.getElementById('points-count');
    const streakEl = document.getElementById('streak-count');

    // Create the "Remove Selected" button
    const removeSelectedBtn = document.createElement('button');
    removeSelectedBtn.id = 'remove-selected-btn';
    removeSelectedBtn.className = 'btn btn-danger mb-4'; // Add margin-bottom for spacing
    removeSelectedBtn.textContent = 'Remove Selected Exercise';
    removeSelectedBtn.disabled = true; // Initially disabled

    let userWorkoutData = {
        points: 0,
        streak: 0,
        lastWorkoutDate: null,
        dailyPlan: [],
        completedToday: []
    };
    let selectedExerciseForRemoval = null; // State to track selected exercise

    if (exerciseListEl) {
        exerciseListEl.innerHTML = exercises.map(ex => `
            <div class="exercise-card" data-exercise="${ex}">${ex}</div>
        `).join('');

        exerciseListEl.addEventListener('click', e => {
            if (e.target.classList.contains('exercise-card')) {
                const exerciseName = e.target.dataset.exercise;
                if (!userWorkoutData.dailyPlan.includes(exerciseName)) {
                    userWorkoutData.dailyPlan.push(exerciseName);
                    saveWorkoutData();
                    renderWorkoutPlan();
                }
            }
        });
    }

    function renderWorkoutPlan() {
        if (!workoutPlanEl) return;

        // Clear existing content
        workoutPlanEl.innerHTML = '';

        // Add the "Remove Selected" button to the top of the workout plan section
        const workoutPlanSection = document.querySelector('.workout-plan-section');
        if (workoutPlanSection && !document.getElementById('remove-selected-btn')) { // Check if already added
            workoutPlanSection.insertBefore(removeSelectedBtn, workoutPlanEl);
        }
        removeSelectedBtn.disabled = (selectedExerciseForRemoval === null); // Update button state

        if (userWorkoutData.dailyPlan.length === 0) {
            workoutPlanEl.innerHTML += '<p>Select exercises from the left to build your plan.</p>';
            removeSelectedBtn.disabled = true;
            selectedExerciseForRemoval = null;
            return;
        }

        userWorkoutData.dailyPlan.forEach(ex => {
            const isDone = userWorkoutData.completedToday.includes(ex);
            const isSelected = (selectedExerciseForRemoval === ex) ? 'selected-for-removal' : '';

            const planItemDiv = document.createElement('div');
            planItemDiv.className = `plan-item flex items-center justify-between p-3 rounded-lg shadow-sm bg-gray-100 dark:bg-gray-700 dark:text-white mb-2 ${isSelected}`;
            planItemDiv.dataset.exercise = ex; // Add data-exercise for selection

            planItemDiv.innerHTML = `
                <span>${ex}</span>
                <button class="btn ${isDone ? '' : 'btn-primary'} mark-done-btn" data-exercise="${ex}" ${isDone ? 'disabled' : ''}>
                    ${isDone ? 'Done ✓' : 'Mark as Done'}
                </button>
            `;
            workoutPlanEl.appendChild(planItemDiv);
        });
    }

    // Add event listener for the new "Remove Selected" button
    if (removeSelectedBtn) {
        removeSelectedBtn.addEventListener('click', () => {
            if (selectedExerciseForRemoval) {
                userWorkoutData.dailyPlan = userWorkoutData.dailyPlan.filter(ex => ex !== selectedExerciseForRemoval);
                userWorkoutData.completedToday = userWorkoutData.completedToday.filter(ex => ex !== selectedExerciseForRemoval);
                selectedExerciseForRemoval = null; // Clear selection after removal
                saveWorkoutData();
                renderWorkoutPlan(); // Re-render to reflect changes and disable button
            }
        });
    }

    if (workoutPlanEl) {
        workoutPlanEl.addEventListener('click', e => {
            // Handle Mark as Done
            if (e.target.classList.contains('mark-done-btn')) {
                const exerciseName = e.target.dataset.exercise;
                if (!userWorkoutData.completedToday.includes(exerciseName)) {
                    userWorkoutData.completedToday.push(exerciseName);
                    userWorkoutData.points = (userWorkoutData.points || 0) + 2;

                    const todayString = getLocalDateString();
                    const lastWorkoutDateString = userWorkoutData.lastWorkoutDate;

                    if (todayString !== lastWorkoutDateString) {
                        if (lastWorkoutDateString) {
                            const lastWorkoutDateObj = new Date(lastWorkoutDateString);
                            const todayDateObj = new Date(todayString);
                            const oneDay = 24 * 60 * 60 * 1000;
                            const diffTime = Math.abs(todayDateObj.getTime() - lastWorkoutDateObj.getTime());
                            const diffDays = Math.round(diffTime / oneDay);

                            if (diffDays === 1) {
                                userWorkoutData.streak = (userWorkoutData.streak || 0) + 1;
                            } else {
                                userWorkoutData.streak = 1;
                            }
                        } else {
                            userWorkoutData.streak = 1;
                        }
                        userWorkoutData.lastWorkoutDate = todayString;
                    }

                    const unsubscribe = auth.onAuthStateChanged(user => {
                        if (user) {
                            db.collection('users').doc(user.uid).collection('activityLog').doc(todayString).set({ workout: true }, { merge: true })
                                .catch(err => console.error("Error setting workout activity: ", err));
                        }
                        unsubscribe();
                    });

                    saveWorkoutData();
                    updateUI();
                }
            }
            // Handle Exercise Selection (new logic)
            else if (e.target.closest('.plan-item')) {
                const clickedItem = e.target.closest('.plan-item');
                const exerciseName = clickedItem.dataset.exercise;

                // Deselect previous if different item clicked
                if (selectedExerciseForRemoval && selectedExerciseForRemoval !== exerciseName) {
                    const prevSelected = workoutPlanEl.querySelector(`.plan-item[data-exercise="${selectedExerciseForRemoval}"]`);
                    if (prevSelected) {
                        prevSelected.classList.remove('selected-for-removal');
                    }
                }

                // Toggle selection
                if (selectedExerciseForRemoval === exerciseName) {
                    selectedExerciseForRemoval = null;
                    clickedItem.classList.remove('selected-for-removal');
                } else {
                    selectedExerciseForRemoval = exerciseName;
                    clickedItem.classList.add('selected-for-removal');
                }
                removeSelectedBtn.disabled = (selectedExerciseForRemoval === null); // Update button state
            }
        });
    }

    function updateUI() {
        if (pointsEl) pointsEl.textContent = userWorkoutData.points;
        if (streakEl) streakEl.textContent = userWorkoutData.streak;
        renderWorkoutPlan();
    }

    function saveWorkoutData() {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('users').doc(user.uid).set({ workoutData: userWorkoutData }, { merge: true })
                    .catch(err => console.error("Error saving workout data: ", err));
            }
            unsubscribe();
        });
    }

    const unsubscribeLoad = auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('users').doc(user.uid).get().then(doc => {
                if (doc.exists && doc.data().workoutData) {
                    const data = doc.data().workoutData;
                    const todayString = getLocalDateString();
                    const lastDateString = data.lastWorkoutDate;

                    if (todayString !== lastDateString) {
                        data.completedToday = [];

                        if (lastDateString) {
                            const lastWorkoutDateObj = new Date(lastDateString);
                            const todayDateObj = new Date(todayString);

                            const oneDay = 24 * 60 * 60 * 1000;
                            const diffTime = Math.abs(todayDateObj.getTime() - lastWorkoutDateObj.getTime());
                            const diffDays = Math.round(diffTime / oneDay);

                            if (diffDays > 1) {
                                data.streak = 0;
                            }
                        }
                    }
                    userWorkoutData = { ...userWorkoutData, ...data };
                }
                updateUI();
            }).catch(err => console.error("Error loading workout data: ", err));
        } else {
            if (workoutPlanEl) {
                workoutPlanEl.innerHTML = '<p>Please <a href="auth.html">sign in</a> to track your workouts.</p>';
            }
            if (exerciseListEl) {
                exerciseListEl.style.pointerEvents = 'none';
                exerciseListEl.style.opacity = '0.5';
            }
            updateUI();
        }
    });
}

function initProfilePage() {
    const profileForm = document.getElementById('profile-form');
    const editBtn = document.getElementById('edit-profile-btn');
    const saveBtn = document.getElementById('save-profile-btn');
    const inputs = profileForm ? profileForm.querySelectorAll('input') : [];
    const logoutBtn = document.getElementById('logout-btn');

    const dashPointsEl = document.getElementById('dash-points');
    const dashStreakEl = document.getElementById('dash-streak');
    const dashBmiEl = document.getElementById('dash-bmi');
    const dashWaterEl = document.getElementById('dash-water');
    const dashSleepEl = document.getElementById('dash-sleep');

    const currentMonthYearEl = document.getElementById('current-month-year');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const calendarGridEl = document.getElementById('calendar-grid');

    const moodSelector = document.getElementById('mood-selector');
    const logMoodBtn = document.getElementById('log-mood-btn');
    const currentMoodDisplayEl = document.getElementById('current-mood-display');
    const moodStatusMessageEl = document.getElementById('mood-status-message'); // Get the new message element

    let currentUserData = {};
    let currentCalendarDate = new Date();

    // Dynamically inject CSS for mood-logged background
    const style = document.createElement('style');
    style.innerHTML = `
        .calendar-day.mood-logged {
            background-color: #d1fae5; /* A light green background for days with mood logged */
            border: 1px solid #34d399; /* A slightly darker green border */
        }

        .dark-mode .calendar-day.mood-logged {
            background-color: #10b981; /* Darker green for dark mode */
            border: 1px solid #059669;
            color: #fff; /* Ensure text is visible in dark mode */
        }
    `;
    document.head.appendChild(style);

    function showMoodMessage(message, type = 'info') {
        if (moodStatusMessageEl) {
            moodStatusMessageEl.textContent = message;
            moodStatusMessageEl.className = `text-center mt-2 text-sm ${type === 'error' ? 'text-red-500' : 'text-green-500'}`;
            // Clear message after a few seconds
            setTimeout(() => {
                moodStatusMessageEl.textContent = '';
                moodStatusMessageEl.className = 'text-center mt-2 text-sm';
            }, 3000);
        }
    }

    function toggleEditMode(enable) {
        inputs.forEach(input => {
            input.disabled = !enable;
        });
        if (editBtn) editBtn.style.display = enable ? 'none' : 'inline-block';
        if (saveBtn) saveBtn.style.display = enable ? 'inline-block' : 'none';
    }

    toggleEditMode(false);

    if (editBtn) {
        editBtn.addEventListener('click', () => toggleEditMode(true));
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (typeof auth === 'undefined' || !auth.currentUser) {
                console.error('You must be logged in to save profile data.');
                return;
            }

            const name = document.getElementById('profile-name').value.trim();
            const dob = document.getElementById('profile-dob').value;
            const height = parseFloat(document.getElementById('profile-height').value);
            const weight = parseFloat(document.getElementById('profile-weight').value);

            if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
                console.error('Please enter valid positive numbers for height and weight.');
                return;
            }

            try {
                await db.collection('users').doc(auth.currentUser.uid).update({
                    name: name || null,
                    dob: dob || null,
                    height: height,
                    weight: weight
                });
                console.log('Profile updated successfully!');
                toggleEditMode(false);
            } catch (error) {
                console.error("Error updating profile: ", error);
                console.error('Failed to update profile. Please try again.');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await auth.signOut();
                console.log('Logged out successfully!');
                window.location.href = 'auth.html';
            } catch (error) {
                console.error("Error logging out: ", error);
                console.error('Failed to log out. Please try again.');
            }
        });
    }

    const moodSymbols = {
        'happy': '😊',
        'neutral': '😐', // Corrected to use a proper neutral emoji
        'sad': '😔',
        'angry': '😡',
        'strong': '💪',
        'calm': '🧘‍♀️',
        'stressed': '😩',
        'sick': '🤒'
    };

    if (logMoodBtn && moodSelector) {
        logMoodBtn.addEventListener('click', async () => {
            if (typeof auth === 'undefined' || !auth.currentUser) {
                showMoodMessage('Please sign in to log your mood.', 'error');
                return;
            }
            const selectedMood = moodSelector.value;
            if (!selectedMood) {
                showMoodMessage('Please select a mood.', 'error');
                return;
            }
            const today = getLocalDateString();
            try {
                await db.collection('users').doc(auth.currentUser.uid).collection('activityLog').doc(today).set({
                    mood: selectedMood,
                    date: firebase.firestore.Timestamp.now()
                }, { merge: true });
                showMoodMessage(`Mood set to ${moodSymbols[selectedMood] || selectedMood} for today!`, 'success');
                loadCalendar(auth.currentUser.uid, currentCalendarDate); // Re-fetch and re-render calendar
                updateCurrentMoodDisplay(selectedMood);
            } catch (error) {
                console.error("Error logging mood: ", error);
                showMoodMessage('Failed to log mood. Please try again.', 'error');
            }
        });
    }

    function updateCurrentMoodDisplay(moodKey) {
        if (currentMoodDisplayEl) {
            currentMoodDisplayEl.textContent = `Today's Mood: ${moodSymbols[moodKey] || moodKey}`;
        }
    }

    // Function to load calendar data for a specific month and render it
    async function loadCalendar(uid, date) {
        if (!calendarGridEl || !currentMonthYearEl) return;

        const year = date.getFullYear();
        const month = date.getMonth();

        // Calculate start and end of the month for the Firestore query
        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59); // End of month, 23:59:59

        try {
            const activityLogRef = db.collection('users').doc(uid).collection('activityLog');
            const snapshot = await activityLogRef
                .where('date', '>=', startOfMonth)
                .where('date', '<=', endOfMonth)
                .get();

            const activityMap = {};
            snapshot.forEach(doc => {
                const docDate = doc.data().date.toDate();
                activityMap[getLocalDateString(docDate)] = doc.data();
            });

            renderCalendar(date, activityMap); // Pass the date (for month/year) and fetched activity data
        } catch (err) {
            console.error("Error fetching activity log for calendar: ", err);
            // Optionally, display an error message to the user
            calendarGridEl.innerHTML = '<p class="text-center text-red-500 mt-4">Error loading calendar data.</p>';
        }
    }

    // Function to render the calendar grid with provided activity data
    function renderCalendar(date, activityData) {
        if (!calendarGridEl || !currentMonthYearEl) return;

        const year = date.getFullYear();
        const month = date.getMonth();

        currentMonthYearEl.textContent = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
        calendarGridEl.innerHTML = ''; // Clear previous calendar

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const startDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.

        // Add empty cells for days before the 1st
        for (let i = 0; i < startDayOfWeek; i++) {
            calendarGridEl.innerHTML += '<div class="calendar-day empty"></div>';
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            const dateString = getLocalDateString(currentDate);
            const dayActivity = activityData[dateString] || {};

            let workoutClass = dayActivity.workout ? 'workout-done' : '';
            let moodEmoji = '';
            let moodClass = ''; // New variable for mood class
            if (dayActivity.mood && moodSymbols[dayActivity.mood]) {
                moodEmoji = `<span class="mood-emoji">${moodSymbols[dayActivity.mood]}</span>`;
                moodClass = 'mood-logged'; // Add this class if mood is logged
            }

            const today = getLocalDateString();
            if (dateString === today && dayActivity.mood) {
                updateCurrentMoodDisplay(dayActivity.mood);
                if (moodSelector) moodSelector.value = dayActivity.mood;
            }

            calendarGridEl.innerHTML += `
                <div class="calendar-day ${workoutClass} ${moodClass}" data-date="${dateString}">
                    <span class="day-number">${day}</span>
                    ${moodEmoji}
                </div>
            `;
        }
    }


    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            if (auth.currentUser) loadCalendar(auth.currentUser.uid, currentCalendarDate);
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            if (auth.currentUser) loadCalendar(auth.currentUser.uid, currentCalendarDate);
        });
    }


    const unsubscribeAuth = auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('users').doc(user.uid).onSnapshot(doc => {
                if (doc.exists) {
                    currentUserData = doc.data();
                    const profileNameEl = document.getElementById('profile-name');
                    const profileEmailEl = document.getElementById('profile-email');
                    const profileDobEl = document.getElementById('profile-dob');
                    const profileHeightEl = document.getElementById('profile-height');
                    const profileWeightEl = document.getElementById('profile-weight');

                    if (profileNameEl) profileNameEl.value = currentUserData.name || '';
                    if (profileEmailEl) profileEmailEl.value = currentUserData.email || user.email || '';
                    if (profileDobEl) profileDobEl.value = currentUserData.dob || '';
                    if (profileHeightEl) profileHeightEl.value = currentUserData.height || '';
                    if (profileWeightEl) profileWeightEl.value = currentUserData.weight || '';

                    if (dashPointsEl) dashPointsEl.textContent = currentUserData.workoutData?.points || 0;
                    if (dashStreakEl) dashStreakEl.textContent = currentUserData.workoutData?.streak || 0;
                    if (dashBmiEl) dashBmiEl.textContent = currentUserData.latestBmi || 'N/A';

                    const today = getLocalDateString();
                    db.collection('users').doc(user.uid).collection('waterLog').doc(today).get().then(waterDoc => {
                        if (dashWaterEl) dashWaterEl.textContent = waterDoc.exists && typeof waterDoc.data().amount === 'number' ? `${waterDoc.data().amount}ml` : '0ml';
                    }).catch(err => console.error("Error fetching water data for dashboard:", err));

                    db.collection('users').doc(user.uid).collection('sleepLog').doc(today).get().then(sleepDoc => {
                        if (dashSleepEl) dashSleepEl.textContent = sleepDoc.exists && typeof sleepDoc.data().duration === 'number' ? `${sleepDoc.data().duration}h` : '0h';
                    }).catch(err => console.error("Error fetching sleep data for dashboard:", err));

                    // Initial load of calendar data for the current month
                    loadCalendar(user.uid, currentCalendarDate);

                } else {
                    console.log('User profile data not found, showing defaults.');
                    const profileEmailEl = document.getElementById('profile-email');
                    if (profileEmailEl) profileEmailEl.value = user.email || '';
                }
            }, err => {
                console.error("Error listening to profile document: ", err);
            });
        } else {
            console.log('User not logged in on profile page. Disabling forms and showing default stats.');
            toggleEditMode(false);
            if (profileForm) profileForm.reset();
            if (dashPointsEl) dashPointsEl.textContent = 'N/A';
            if (dashStreakEl) dashStreakEl.textContent = 'N/A';
            if (dashBmiEl) dashBmiEl.textContent = 'N/A';
            if (dashWaterEl) dashWaterEl.textContent = 'N/A';
            if (dashSleepEl) dashSleepEl.textContent = 'N/A';
            if (currentMonthYearEl) currentMonthYearEl.textContent = 'Sign In to View';
            if (calendarGridEl) calendarGridEl.innerHTML = '<p class="text-center text-gray-500 mt-4">Please sign in to view your activity calendar.</p>';

            if (profileForm) {
                const loginPrompt = document.createElement('p');
                loginPrompt.innerHTML = 'Please <a href="auth.html" class="text-blue-500 hover:underline">sign in</a> to manage your profile and view stats.';
                loginPrompt.className = 'text-center mt-4 text-gray-600';
                profileForm.parentNode.insertBefore(loginPrompt, profileForm.nextSibling);
            }
        }
    });
}
