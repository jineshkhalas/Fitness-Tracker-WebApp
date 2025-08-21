document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const showSignup = document.getElementById('show-signup');
    const showSignin = document.getElementById('show-signin');
    const signinContainer = document.getElementById('signin-form-container');
    const signupContainer = document.getElementById('signup-form-container');
    const authError = document.getElementById('auth-error');

    // Toggle between forms
    if (showSignup && showSignin && signinContainer && signupContainer) {
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            signinContainer.style.display = 'none';
            signupContainer.style.display = 'block';
        });

        showSignin.addEventListener('click', (e) => {
            e.preventDefault();
            signupContainer.style.display = 'none';
            signinContainer.style.display = 'block';
        });
    }

    // Firebase auth
    auth.onAuthStateChanged(user => {
        const authLinkContainer = document.getElementById('auth-link-container');
        const logoutBtn = document.getElementById('logout-btn');

        if (user) {
            if (authLinkContainer) {
                authLinkContainer.innerHTML = `<a href="profile.html" class="btn">Profile</a>`;
            }
            if (window.location.pathname.endsWith('auth.html')) {
                window.location.href = 'profile.html';
            }
        } else {
            if (authLinkContainer) {
                authLinkContainer.innerHTML = `<a href="auth.html" class="btn">SignUp/SignIn</a>`;
            }
            const protectedPages = ['profile.html', 'workout.html', 'sleep.html', 'water.html'];
            if (protectedPages.some(page => window.location.pathname.endsWith(page))) {
                window.location.href = 'auth.html';
            }
        }

        // Logout
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                auth.signOut().then(() => {
                    window.location.href = 'index.html';
                });
            });
        }
    });

    // Sign Up
    signupForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        authError.textContent = '';
        const name = signupForm['signup-name'].value;
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;
        const dob = signupForm['signup-dob'].value;
        const height = signupForm['signup-height'].value;
        const weight = signupForm['signup-weight'].value;

        auth.createUserWithEmailAndPassword(email, password)
            .then(cred => {
                return db.collection('users').doc(cred.user.uid).set({
                    name,
                    email,
                    dob,
                    height,
                    weight,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            })
            .then(() => {
                signupForm.reset();
                window.location.href = 'profile.html';
            })
            .catch(err => {
                authError.textContent = err.message;
            });
    });

    // Sign In
    signinForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        authError.textContent = '';
        const email = signinForm['signin-email'].value;
        const password = signinForm['signin-password'].value;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                signinForm.reset();
                window.location.href = 'profile.html';
            })
            .catch(err => {
                authError.textContent = err.message;
            });
    });
});
