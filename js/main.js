document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Intersection Observer for Smooth Scroll Fade Animations ---
    const faders = document.querySelectorAll('.scroll-fade');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- 2. Digital Timer Logic (End of the current month) ---
    const endDate = new Date();
    // Set to the end of the current month
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0); 
    endDate.setHours(23, 59, 59, 999);

    function updateTimer() {
        const now = new Date();
        const diff = endDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            document.getElementById('days').innerText = days.toString().padStart(2, '0');
            document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
        } else {
            document.getElementById('days').innerText = "00";
            document.getElementById('hours').innerText = "00";
            document.getElementById('minutes').innerText = "00";
            document.getElementById('seconds').innerText = "00";
        }
    }

    updateTimer(); // Initial call
    setInterval(updateTimer, 1000); // Update every second



});
