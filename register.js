document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ambil data dari form input
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validasi input
        if (password !== confirmPassword) {
            alert('Kata sandi tidak cocok');
            return;
        }

        // Simpan data ke localStorage
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password // Untuk keperluan simulasi, di dunia nyata jangan simpan password seperti ini
        };
        
        // Menyimpan data pengguna ke localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');  // Tandai sebagai sudah login

        // Redirect ke halaman Dashboard
        window.location.href = 'dashboard.html'; // Pindah ke dashboard setelah sukses
    });
});
