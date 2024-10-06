function changeTheme(theme) {
    if (theme === 'hack') {
        document.body.classList.add('theme-hack');
        document.body.classList.remove('art');
    } else if (theme === 'artistic') {
        document.body.classList.add('art');
        document.body.classList.remove('theme-hack');
    }
    localStorage.setItem('selectedTheme', theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        changeTheme(savedTheme);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadTheme();

    // Gestion du flou du bg :)
    window.addEventListener('scroll', function() {
        const introSection = document.querySelector('body.art .intro');
        if (introSection) {
            const scrollPercentage = window.scrollY / window.innerHeight;
            const blurOpacity = Math.min(scrollPercentage * 2, 1);
            introSection.style.setProperty('--blur-opacity', blurOpacity);
        }
    });
});
