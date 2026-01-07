// Home Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi cek login status
    function checkLoginStatus() {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        return !!(token || userData || isLoggedIn === 'true');
    }
    
    // Update tombol auth tanpa mengubah class CSS
    function updateAuthButtons() {
        const isLoggedIn = checkLoginStatus();
        const loginButtons = document.querySelectorAll('a[href="login.html"]');
        const registerButtons = document.querySelectorAll('a[href="register.html"]');
        
        if (isLoggedIn) {
            // Jika SUDAH LOGIN: ubah "Masuk" jadi "Dashboard"
            loginButtons.forEach(btn => {
                btn.textContent = 'Dashboard';
                btn.href = 'dashboard.html';
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
                btn.onclick = null;
            });
            
            registerButtons.forEach(btn => {
                btn.textContent = 'Daftar Gratis';
                btn.href = 'register.html';
                btn.onclick = null;
            });
        }
    }
    
    // Panggil fungsi
    updateAuthButtons();
    
    // Juga panggil saat ada perubahan storage (login/logout di tab lain)
    window.addEventListener('storage', updateAuthButtons);
    
    // Smooth scroll untuk anchor links (jika ada)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Animasi untuk team cards (jika ada di halaman home)
    const teamCards = document.querySelectorAll('.team-card');
    if (teamCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        teamCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }
});