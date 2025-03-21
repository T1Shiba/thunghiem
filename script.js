document.addEventListener('DOMContentLoaded', () => {
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

    document.addEventListener('click', event => {
        if (!event.target.closest('.menu')) {
            document.querySelectorAll('.menu li.active').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
            });
        }
    });

    const gameDetailsSection = document.getElementById('game-details');
    const gameVideoDiv = document.getElementById('game-video');
    const gameLinkDiv = document.getElementById('game-link');
    const gameDescriptionDiv = document.getElementById('game-description');

    const gameData = {
        'minecraft': {
            video: 'https://www.youtube.com/watch?v=MmB9b5njVbA',
            link: '<a href="https://www.minecraft.net/en-us" target="_blank">Minecraft</a>',
            description: 'Mô tả',
            backgroundImage: 'url("image/minecraft-background-cfljc4haleghnajo.jpg")'
        },
        'wuthering-waves': {
            video: 'https://www.youtube.com/watch?v=yQXQ3s3SuIs',
            link: '<a href="https://wutheringwaves.kurogame.com/" target="_blank">Wuthering Waves</a>',
            description: 'Mô tả',
            backgroundImage: 'url("image/WutheringWaves_Game_Rover_Wallpaper-1.jpg")'
        },
        'genshin-impact': {
            video: 'https://www.youtube.com/watch?v=VW7lkG8b74Q',
            link: '<a href="https://genshin.hoyoverse.com/" target="_blank">Genshin Impact</a>',
            description: 'Mô tả',
            backgroundImage: 'url("image/24d8dc550994d07a213acffa544f1296_8750053204747244787.webp")'
        },
        'arknights': {
            video: 'https://www.youtube.com/watch?v=--xJQ5oNcCA',
            link: '<a href="https://arknights.global/" target="_blank">Arknights</a>',
            description: 'Mô tả',
            backgroundImage: 'url("image/ark.jpg")'
        }
    };

    function youtube_parser(url) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    showGameDetails('minecraft');

    document.querySelectorAll('#game-thumbnails img').forEach(img => {
        img.addEventListener('click', () => {
            const game = img.dataset.game;
            showGameDetails(game);
        });
    });

    function showGameDetails(game) {
        const data = gameData[game];

        if (data) {
            const videoId = youtube_parser(data.video);
            let embedUrl = '<p>Không tìm thấy video.</p>';

            if (videoId) {
                embedUrl = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
            }

            gameVideoDiv.innerHTML = embedUrl;
            gameLinkDiv.innerHTML = data.link;
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
    }
});