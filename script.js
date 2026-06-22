document.addEventListener('DOMContentLoaded', () => {
    
    // 1. React-Style Loading Screen Animation (0 to 100)
    const loaderScreen = document.getElementById('loader-screen');
    const loaderCount = document.getElementById('loader-count');
    
    let count = 0;
    // Creates a rapid interval that counts up like the video
    const updateLoader = setInterval(() => {
        count += Math.floor(Math.random() * 5) + 1; // Count up randomly between 1-5
        
        if (count >= 100) {
            count = 100;
            loaderCount.textContent = count;
            clearInterval(updateLoader);
            
            // Wait a fraction of a second, then hide the loader
            setTimeout(() => {
                loaderScreen.classList.add('hide-loader');
                
                // Manually trigger the first viewport reveal immediately after loading
                checkReveal();
            }, 300);
        } else {
            loaderCount.textContent = count;
        }
    }, 30); // Speed of the numbers ticking


    // 2. Scroll Reveal Animations (Elements sliding up into view)
    const reveals = document.querySelectorAll('.reveal');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Triggers when element is 100px from the bottom

        reveals.forEach(revealElement => {
            const elementTop = revealElement.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                revealElement.classList.add('active');
            }
        });
    }

    // Attach scroll event listener
    window.addEventListener('scroll', checkReveal);


    // 3. System Menu Clock
    function updateClock() {
        const clockElement = document.getElementById('mac-clock');
        if (!clockElement) return;

        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; 
        minutes = minutes < 10 ? '0' + minutes : minutes;

        clockElement.textContent = `${hours}:${minutes} ${ampm}`;
    }

    updateClock();
    setInterval(updateClock, 60000);
});