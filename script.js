document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. RAMADAN COUNTDOWN (Runs on Home Page)
    // ==========================================
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const countdownDate = new Date("March 1, 2025 00:00:00").getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            if (distance < 0) {
                clearInterval(timer);
                countdownElement.innerHTML = "<h3>Ramadan Mubarak! 🌙</h3>";
                return;
            }
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }, 1000);
    }

    // ==========================================
    // 2. LIVE UPDATES FETCHER (Runs on Home Page)
    // ==========================================
    const updatesContainer = document.getElementById('updates-container');
    if (updatesContainer) {
        // MOCK DATA - We will connect Google Sheets here later!
        const mockData = [
            {
                date: "May 15, 2024",
                title: "Ramadan Preparation Meeting",
                content: "All students are invited to the Jamaa office this Friday after Asr prayer.",
                image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=600&q=80",
                badge: "Important"
            },
            {
                date: "May 10, 2024",
                title: "New Qur'an Class Started",
                content: "We are excited to announce a new Tajweed class for beginners. Classes every Saturday.",
                image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=600&q=80",
                badge: "Education"
            }
        ];

        updatesContainer.innerHTML = ''; 
        mockData.forEach(update => {
            updatesContainer.innerHTML += `
                <div class="update-card">
                    <div class="update-img-wrapper">
                        <img src="${update.image}" alt="${update.title}" class="update-img">
                        <span class="update-badge">${update.badge || 'News'}</span>
                    </div>
                    <div class="update-content">
                        <h3>${update.title}</h3>
                        <p>${update.content}</p>
                        <div class="update-date">📅 ${update.date}</div>
                    </div>
                </div>
            `;
        });
    }

    // ==========================================
    // 3. VIDEO MODAL LOGIC (Runs on Media Page)
    // ==========================================
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeModal = document.getElementById('closeModal');

    if (videoModal) {
        videoCards.forEach(card => {
            card.addEventListener('click', () => {
                videoFrame.src = card.getAttribute('data-video') + "?autoplay=1";
                videoModal.classList.add('active');
            });
        });
        closeModal.addEventListener('click', () => {
            videoModal.classList.remove('active');
            videoFrame.src = ""; 
        });
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                videoFrame.src = "";
            }
        });
    }

    // ==========================================
    // 4. LEGACY FILTER LOGIC (Runs on Legacy Page)
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const legacyItems = document.querySelectorAll('.legacy-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');

                legacyItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                        item.style.animation = 'none';
                        item.offsetHeight; 
                        item.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    // ==========================================
    // 5. ADMIN LOGIN (Runs on Admin Page)
    // ==========================================
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('adminUser').value;
            const pass = document.getElementById('adminPass').value;
            
            // Simple frontend check (In real life, you need a backend for security)
            if (user === "admin" && pass === "nural2024") {
                document.querySelector('.admin-login').style.display = 'none';
                document.querySelector('.admin-dashboard').style.display = 'block';
            } else {
                alert("Access Denied. Incorrect Credentials.");
            }
        });
    }
});
