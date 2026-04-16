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

    // --- 3. Leaderboard Simulation Logic ---
    const initialPlayers = [
        { name: "Carlos M.", score: 45, avatar: "CM" },
        { name: "Lucía R.", score: 42, avatar: "LR" },
        { name: "Roberto G.", score: 38, avatar: "RG" },
        { name: "Anaïs T.", score: 36, avatar: "AT" },
        { name: "Elena V.", score: 31, avatar: "EV" }
    ];

    const leaderboardEl = document.getElementById('leaderboard');

    function renderLeaderboard(players) {
        leaderboardEl.innerHTML = '';
        players.sort((a, b) => b.score - a.score);
        
        players.forEach(player => {
            const li = document.createElement('li');
            li.className = 'leaderboard-item';
            li.innerHTML = `
                <div class="lb-profile">
                    <div class="lb-avatar">${player.avatar}</div>
                    <span>${player.name}</span>
                </div>
                <div class="lb-score" id="score-${player.avatar}">${player.score} WB</div>
            `;
            leaderboardEl.appendChild(li);
        });
    }

    renderLeaderboard(initialPlayers);

    // Simulate live score updates every 3-8 seconds
    setInterval(() => {
        // Pick a random player to increase their score
        const randomPlayerIndex = Math.floor(Math.random() * initialPlayers.length);
        const player = initialPlayers[randomPlayerIndex];
        
        // Increase score by 1-3
        const increase = Math.floor(Math.random() * 3) + 1;
        player.score += increase;
        
        renderLeaderboard(initialPlayers);
        
        // Flash the score element that was updated to draw attention
        const updatedScoreEl = document.getElementById(`score-${player.avatar}`);
        if(updatedScoreEl) {
            updatedScoreEl.classList.add('score-flash');
            setTimeout(() => {
                updatedScoreEl.classList.remove('score-flash');
            }, 1000);
        }
        
    }, Math.floor(Math.random() * 5000) + 3000);

});
