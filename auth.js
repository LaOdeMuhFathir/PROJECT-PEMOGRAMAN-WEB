// Authentication Functions
const API_URL = 'http://localhost:3000/api'; // Dummy API

class AuthService {
    static setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
    }

    static getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    static isAuthenticated() {
        return localStorage.getItem('isAuthenticated') === 'true';
    }

    static logout() {
        // Verifikasi penghapusan localStorage
        console.log(localStorage.getItem('user'));  // Pastikan sudah null
        console.log(localStorage.getItem('isAuthenticated')); // Pastikan sudah null
        
        // Tambahkan timeout untuk memberi waktu sebelum pengalihan
        setTimeout(() => {
            // Gunakan path absolut untuk pengalihan
            window.location.replace(window.location.origin + '/index.html'); // Path absolut
        }, 100); // Tunggu 100 ms
    }

    // 🔒 PROTEKSI HALAMAN (FIX UTAMA)
    static checkAuth() {
        const page = window.location.pathname.split('/').pop();
        console.log('Page:', page); // Debugging log
        console.log('Is Authenticated:', this.isAuthenticated()); // Debugging log

        if (!this.isAuthenticated() && page === 'dashboard.html') {
            console.log('Redirecting to login...'); // Debugging log
            window.location.replace('login.html');
            return;
        }

        if (this.isAuthenticated() && (page === 'login.html' || page === 'register.html')) {
            console.log('Redirecting to dashboard...'); // Debugging log
            window.location.replace('dashboard.html');
        }
    }
}

// Validator (TIDAK DIUBAH)
class FormValidator {
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePassword(password) {
        return password.length >= 6;
    }

    static validateName(name) {
        return name.trim().length >= 2;
    }

    static validatePhone(phone) {
        return /^[0-9]{10,13}$/.test(phone);
    }
}

// 🔐 AUTO CHECK SAAT HALAMAN DIBUKA
document.addEventListener('DOMContentLoaded', () => {
    AuthService.checkAuth();

    // Update nama user jika login
    if (AuthService.isAuthenticated()) {
        const user = AuthService.getUser();
        document.querySelectorAll('.user-name').forEach(el => {
            el.textContent = user?.name || 'User';
        });
    }

    // Tombol logout (jika ada)
    const logoutBtn = document.getElementById('tombol-keluar');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            AuthService.logout();
        });
    }

class AuthService {
    static isAuthenticated() {
        return localStorage.getItem('isAuthenticated') === 'true';
    }

    static logout() {
        // Menghapus data pengguna saat logout
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        window.location.replace('index.html');  // Redirect ke halaman utama
    }

    static checkAuth() {
        const page = window.location.pathname.split('/').pop();
        
        // Cegah akses ke dashboard tanpa login
        if (!this.isAuthenticated() && page === 'dashboard.html') {
            window.location.replace('login.html');
        }

        // Cegah akses ke login/register jika sudah login
        if (this.isAuthenticated() && (page === 'login.html' || page === 'register.html')) {
            window.location.replace('dashboard.html');
        }
    }
}
});
