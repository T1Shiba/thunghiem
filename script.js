document.addEventListener('DOMContentLoaded', () => {
    // --- Helper Functions ---
    const isValidEmailFormat = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (formId) => {
        const form = document.getElementById(formId);
        let isValid = true;
        const errors = {};

        // Helper function to add an error message
        const addError = (fieldId, message) => {
            errors[fieldId] = message;
            isValid = false;
        };

        // Get all input values and trim
        const realname = document.getElementById('login-realname')?.value?.trim() || '';
        const dob = document.getElementById('login-dob')?.value || '';
        const email = document.getElementById('login-email')?.value?.trim() || '';
        const username = document.getElementById('login-username')?.value?.trim() || '';
        const password = document.getElementById('login-password')?.value || '';
        const confirmPassword = document.getElementById('login-confirm-password')?.value || '';
        const signinIdentifier = document.getElementById('signin-identifier')?.value?.trim() || '';
        const signinPassword = document.getElementById('signin-password')?.value || '';

        // --- Validation Logic ---
        if (formId === 'login-form') {
            if (!realname) addError('login-realname', "Real Name cannot be empty!");
            if (!dob) addError('login-dob', "Date of Birth cannot be empty!");
            if (!email) addError('login-email', "Email cannot be empty!");
            else if (!isValidEmailFormat(email)) addError('login-email', "Email is not a valid format!");
            if (!username) addError('login-username', "Username cannot be empty!");
            if (!password) addError('login-password', "Password cannot be empty!");
            if (!confirmPassword) addError('login-confirm-password', "Confirm Password cannot be empty!");
            if (password !== confirmPassword) addError('login-confirm-password', "Passwords do not match!");
        } else if (formId === 'signin-form') {
            if (!signinIdentifier) addError('signin-identifier', "Username or Email cannot be empty!");
            if (!signinPassword) addError('signin-password', "Password cannot be empty!");
        }

        // Display Errors
        if (!isValid) {
            const errorMessages = Object.values(errors).join('\n');
            alert(errorMessages);
        }

        return isValid;
    };

    // --- Form Submission Handlers ---
    const handleFormSubmit = (formId, successMessage) => {
        const form = document.getElementById(formId);

        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default submission

            if (validateForm(formId)) {
                alert(successMessage); // Display the success message
                // In a real application, you would submit data to the server here.
            }
        });
    };

    // --- Event Listeners for Form Submissions ---
    handleFormSubmit('login-form', "Registration successful! (Note: No real server-side processing or email verification is implemented.)");
    handleFormSubmit('signin-form', "Sign-in successful! (Note: No real server-side processing.)");

    // --- Account Dropdown and Form Logic ---
    const accountDropdown = document.getElementById('account-dropdown');
    const accountDropdownToggle = accountDropdown.querySelector('.dropdown-toggle');
    const accountDropdownContent = accountDropdown.querySelector('.dropdown-content');

    const signinLink = document.getElementById('signin-link');
    const loginLink = document.getElementById('login-link');
    const signinForm = document.getElementById('signin-form');
    const loginForm = document.getElementById('login-form');
    const overlay = document.getElementById('overlay');

    const showForm = (form) => {
        form.classList.add('active');
        overlay.classList.add('active');
        accountDropdownContent.style.display = 'none'; // Hide dropdown content directly
        accountDropdown.classList.remove('active'); // Deactivate the dropdown
    };

    const hideForm = (form) => {
        form.classList.remove('active');
        overlay.classList.remove('active');
    };

    signinLink.addEventListener('click', (e) => {
        e.preventDefault();
        showForm(signinForm);
    });

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showForm(loginForm);
    });

    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', () => {
            const form = button.closest('.auth-form');
            hideForm(form);
        });
    });

    overlay.addEventListener('click', () => {
        document.querySelectorAll('.auth-form.active').forEach(form => {
            hideForm(form);
        });
    });

    accountDropdownToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        accountDropdown.classList.toggle('active');
        accountDropdownContent.style.display = accountDropdown.classList.contains('active') ? 'block' : 'none';
    });

    document.addEventListener('click', (event) => {
        if (!accountDropdown.contains(event.target)) {
            accountDropdown.classList.remove('active');
            accountDropdownContent.style.display = 'none';
        }
    });

    // --- Regular dropdown close ---
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const listItem = toggle.parentElement;
            document.querySelectorAll('.menu li').forEach(item => {
                if (item !== listItem) {
                    item.classList.remove('active');
                    item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
                }
            });
            listItem.classList.toggle('active');
            toggle.setAttribute('aria-expanded', listItem.classList.contains('active').toString());
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.menu')) {
            document.querySelectorAll('.menu li.active').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
            });
        }
    });

    // --- Game Details Section ---
    const gameDetailsSection = document.getElementById('game-details');
    const gameVideoDiv = document.getElementById('game-video');
    const gameLinkDiv = document.getElementById('game-link');
    const gameDescriptionDiv = document.getElementById('game-description');

    const gameData = {
        'Monster-Hunter-Wilds': {
            video: 'https://www.youtube.com/watch?v=BRCJiOEGYY4',
            developerLink: '<a href="https://www.monsterhunter.com/wilds/en-asia/" target="_blank">Monster Hunter Wilds</a>',
            steamLink: '<a href="https://store.steampowered.com/app/2246340/Monster_Hunter_Wilds/" target="_blank">Steam Page</a>',
            description: 'Mô tả',
            backgroundImage: 'url("image/Monster Hunter Wilds.jpg")'
        },
        'wuthering-waves': {
            video: 'https://www.youtube.com/watch?v=jT_dCQhT-ZI&pp=ygUXd3V0aGVyaW5nIHdhdmVzIHRyYWlsZXI%3D',
            developerLink: '<a href="https://wutheringwaves.kurogame.com/" target="_blank">Wuthering Waves</a>',
            steamLink: '<a href="https://store.steampowered.com/app/221100/DayZ/" target="_blank">Steam Page</a>',
            description: 'Mô tả',
            backgroundImage: 'url("image/WutheringWaves_Game_Rover_Wallpaper-1.jpg")'
        },
        'genshin-impact': {
            video: 'https://www.youtube.com/watch?v=VW7lkG8b74Q',
            developerLink: '<a href="https://genshin.hoyoverse.com/" target="_blank">Genshin Impact</a>',
            steamLink: '<a href="https://store.steampowered.com/app/221100/DayZ/" target="_blank">Steam Page</a>',
            description: 'Mô tả',
            backgroundImage: 'url("image/thumb-1920-1099191.jpg")'
        },
        'arknights': {
            video: 'https://www.youtube.com/watch?v=--xJQ5oNcCA',
            developerLink: '<a href="https://arknights.global/" target="_blank">Arknights</a>',
            steamLink: '<a href="https://store.steampowered.com/app/221100/DayZ/" target="_blank">Steam Page</a>',
            description: 'Mô tả',
            backgroundImage: 'url("image/1034459.jpg")'
        },
    };

    const youtubeParser = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    };

    const showGameDetails = (game) => {
        const data = gameData[game];

        if (data) {
            const videoId = youtubeParser(data.video);
            let embedUrl = '<p>Không tìm thấy video.</p>';

            if (videoId) {
                embedUrl = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
            }

            gameVideoDiv.innerHTML = embedUrl;
            gameLinkDiv.innerHTML = `
                ${data.developerLink ? `<div class="developer-link">${data.developerLink}</div>` : ''}
                ${data.steamLink ? `<div class="steam-link">${data.steamLink}</div>` : ''}
            `;
            gameDescriptionDiv.textContent = data.description;
            gameDetailsSection.style.display = 'flex';
            document.body.style.backgroundImage = data.backgroundImage;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundAttachment = 'fixed';
        } else {
            console.error('Không tìm thấy dữ liệu cho game:', game);
            gameVideoDiv.innerHTML = '<p>Không tìm thấy video.</p>';
            gameLinkDiv.innerHTML = '';
            gameDescriptionDiv.textContent = 'Không tìm thấy mô tả.';
            gameDetailsSection.style.display = 'block';
            document.body.style.backgroundImage = '';
        }
    };

    showGameDetails('minecraft');

    document.querySelectorAll('#game-thumbnails img').forEach(img => {
        img.addEventListener('click', () => {
            const game = img.dataset.game;
            showGameDetails(game);
        });
    });
});