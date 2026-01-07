// Landing Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animate features on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe value cards
    document.querySelectorAll('.value-card').forEach(card => {
        observer.observe(card);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Stats counter animation
    const statElements = document.querySelectorAll('.stat-item h3');
    const statsSection = document.querySelector('.stats-section');

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statElements.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 30);
    }

    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Update copyright year
    const yearElement = document.querySelector('.main-footer p');
    if (yearElement && yearElement.textContent.includes('2024')) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2024', currentYear);
    }

        // ===== FUNGSI AUTENTIKASI TAMBAHAN =====
    // Periksa apakah user sudah login
    function checkLoginStatus() {
        // Cek di localStorage (cara paling umum)
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        // Jika ada salah satu tanda login, return true
        return !!(token || userData || isLoggedIn === 'true');
    }

    // Update tombol auth berdasarkan status login
    function updateAuthButtons() {
        const isLoggedIn = checkLoginStatus();
        const loginButtons = document.querySelectorAll('a[href="login.html"]');
        const registerButtons = document.querySelectorAll('a[href="register.html"]');
        
        if (isLoggedIn) {
            // Jika SUDAH LOGIN: ubah "Masuk" jadi "Dashboard"
            loginButtons.forEach(btn => {
                btn.textContent = 'Dashboard';
                btn.href = 'dashboard.html';
                btn.classList.add('btn-primary');
                btn.classList.remove('btn-secondary');
            });
            
            // Jika SUDAH LOGIN: ubah "Daftar Gratis" jadi "Logout"
            registerButtons.forEach(btn => {
                btn.textContent = 'Logout';
                btn.href = '#';
                btn.onclick = function(e) {
                    e.preventDefault();
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userData');
                    localStorage.removeItem('isLoggedIn');
                    window.location.href = 'index.html';
                };
            });
        } else {
            // Jika BELUM LOGIN: pastikan tombol normal
            loginButtons.forEach(btn => {
                btn.textContent = 'Masuk';
                btn.href = 'login.html';
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-secondary');
            });
            
            registerButtons.forEach(btn => {
                btn.textContent = 'Daftar Gratis';
                btn.href = 'register.html';
                btn.onclick = null;
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-secondary');
            });
        }
    }

    // Panggil saat halaman load
    document.addEventListener('DOMContentLoaded', function() {
        updateAuthButtons();
        
        // Juga panggil saat ada perubahan storage (login/logout di tab lain)
        window.addEventListener('storage', updateAuthButtons);
    });

    // ===== FUNGSI LOGOUT GLOBAL =====
    function logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    }
});