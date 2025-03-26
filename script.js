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

        const addError = (fieldId, message) => {
            errors[fieldId] = message;
            isValid = false;
        };

        const realname = document.getElementById('login-realname')?.value?.trim() || '';
        const dob = document.getElementById('login-dob')?.value || '';
        const email = document.getElementById('login-email')?.value?.trim() || '';
        const username = document.getElementById('login-username')?.value?.trim() || '';
        const password = document.getElementById('login-password')?.value || '';
        const confirmPassword = document.getElementById('login-confirm-password')?.value || '';
        const signinIdentifier = document.getElementById('signin-identifier')?.value?.trim() || '';
        const signinPassword = document.getElementById('signin-password')?.value || '';

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
            event.preventDefault();
            if (validateForm(formId)) {
                alert(successMessage);
            }
        });
    };

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
        accountDropdownContent.style.display = 'none';
        accountDropdown.classList.remove('active');
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

    // --- Game Details Section ---
    const gameDetailsSection = document.getElementById('game-details');
    const gameVideoDiv = document.getElementById('game-video');
    const gameDescriptionDiv = document.getElementById('game-description');

    const gameData = {
        'monster-hunter-wilds': {
            video: 'https://www.youtube.com/watch?v=BRCJiOEGYY4',
            publisherLink: 'https://www.monsterhunter.com/wilds/en-asia/',
            steamLink: 'https://store.steampowered.com/app/2246340/Monster_Hunter_Wilds/',
            description: 'Monster Hunter Wilds là tựa game hành động nhập vai đỉnh cao từ Capcom, nơi bạn săn những con quái vật khổng lồ trong một thế giới mở đầy sống động.',
            backgroundImage: 'url("image/monster-hunter-wilds-1702048878670561605042.webp")'
        },
        'repo': {
            video: 'https://www.youtube.com/watch?v=oSfoK8eSeD8',
            publisherLink: 'https://semiwork.se/',
            steamLink: 'https://store.steampowered.com/app/3241660/REPO/', // Link giả, bro thay link thật
            description: 'R.E.P.O là một game indie độc đáo, mang đến trải nghiệm chiến đấu và khám phá trong một thế giới khoa học viễn tưởng.',
            backgroundImage: 'url("image/REPO.jpg")'
        },
        'assassins-creed-shadows': {
            video: 'https://www.youtube.com/watch?v=_JzywR97gUs',
            publisherLink: 'https://www.ubisoft.com/en-us/game/assassins-creed/shadows',
            steamLink: 'https://store.steampowered.com/app/3159330/Assassins_Creed_Shadows/', // Link giả, bro thay link thật
            description: 'Assassin’s Creed Shadows đưa bạn đến Nhật Bản thời phong kiến, nơi bạn hóa thân thành sát thủ và ninja trong một thế giới mở tuyệt đẹp.',
            backgroundImage: 'url("image/ACS.jpg")'
        },
        'counter-strike-2': {
            video: 'https://www.youtube.com/watch?v=c80dVYcL69E',
            publisherLink: 'https://www.valvesoftware.com/en/',
            steamLink: 'https://store.steampowered.com/app/730/CounterStrike_2/',
            description: 'Counter-Strike 2 là phiên bản nâng cấp của tựa game bắn súng huyền thoại, mang đến đồ họa hiện đại và lối chơi chiến thuật đỉnh cao.',
            backgroundImage: 'url("image/cs2.jpg")'
        }
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
            const publisherLinkElement = document.getElementById('publisher-link');
            publisherLinkElement.href = data.publisherLink || '#';

            const steamLinkElement = document.getElementById('steam-link');
            steamLinkElement.href = data.steamLink || '#';

            gameDescriptionDiv.textContent = data.description;
            gameDetailsSection.style.display = 'flex';
            document.body.style.backgroundImage = data.backgroundImage;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundAttachment = 'fixed';
        } else {
            console.error('Không tìm thấy dữ liệu cho game:', game);
            gameVideoDiv.innerHTML = '<p>Không tìm thấy video.</p>';
            document.getElementById('publisher-link').href = '#';
            document.getElementById('steam-link').href = '#';
            gameDescriptionDiv.textContent = 'Không tìm thấy mô tả.';
            gameDetailsSection.style.display = 'block';
            document.body.style.backgroundImage = '';
        }
    };

    const firstGameKey = Object.keys(gameData)[0];
    showGameDetails(firstGameKey);

    document.querySelectorAll('#game-thumbnails img').forEach(img => {
        img.addEventListener('click', () => {
            const game = img.dataset.game;
            showGameDetails(game);
        });
    });

    // --- Dropdown Logic for News, Communities, and Support ---
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            const parent = toggle.parentElement;
            const dropdownContent = parent.querySelector('.dropdown-content');
            document.querySelectorAll('.dropdown-content').forEach(content => {
                if (content !== dropdownContent) {
                    content.style.display = 'none';
                }
            });
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.style.display = 'none';
            });
        }
    });
});