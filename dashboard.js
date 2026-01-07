// Dashboard Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    loadUserData();
    
    // Initialize charts
    initializeCharts();
    
    // Load recommended scholarships
    loadRecommendedScholarships();
    
    // Load deadlines
    loadDeadlines();
    
    // Load activities
    loadActivities();
    
    // Event listeners
    setupEventListeners();
});

function loadUserData() {
    if (typeof AuthService !== 'undefined' && AuthService.isAuthenticated && AuthService.isAuthenticated()) {
        const storedUser = AuthService.getUser() || {};
        updateUserProfile({
            name: storedUser.name || 'User',
            email: storedUser.email || '',
            institution: storedUser.institution || '',
            major: storedUser.major || '',
            gpa: storedUser.gpa || ''
        });
        return;
    }

    // Fallback: simulasi API
    setTimeout(() => {
        const userInfo = {
            name: "John Doe",
            email: "john@example.com",
            institution: "Universitas Indonesia",
            major: "Computer Science",
            gpa: "3.8"
        };
        updateUserProfile(userInfo);
    }, 500);
}

function updateUserProfile(user) {
    const nameEls = document.querySelectorAll('.user-name, .user-highlight');
    if (user.name) nameEls.forEach(el => el.textContent = user.name);

    const emailEl = document.getElementById('user-email');
    const institutionEl = document.getElementById('user-institution');
    const majorEl = document.getElementById('user-major');
    const gpaEl = document.getElementById('user-gpa');

    if (emailEl && user.email) emailEl.textContent = user.email;
    if (institutionEl && user.institution) institutionEl.textContent = user.institution;
    if (majorEl && user.major) majorEl.textContent = user.major;
    if (gpaEl && user.gpa) gpaEl.textContent = user.gpa;
}

function initializeCharts() {
    // Initialize match percentage chart
    const matchCtx = document.getElementById('matchChart');
    if (matchCtx) {
        new Chart(matchCtx, {
            type: 'doughnut',
            data: {
                labels: ['Sesuai', 'Cukup', 'Kurang'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: [
                        '#73ABBC',
                        '#F5D68B',
                        '#E2DDB7'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Initialize timeline chart
    const timelineCtx = document.getElementById('timelineChart');
    if (timelineCtx) {
        const currentMonth = new Date().getMonth();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        new Chart(timelineCtx, {
            type: 'line',
            data: {
                labels: months.slice(currentMonth, currentMonth + 6),
                datasets: [{
                    label: 'Beasiswa Aktif',
                    data: [12, 19, 15, 25, 22, 30],
                    borderColor: '#73ABBC',
                    backgroundColor: 'rgba(115, 171, 188, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

function loadRecommendedScholarships() {
    const scholarships = [
        {
            id: 1,
            title: "Beasiswa KIP Kuliah",
            institution: "Kemendikbudristek",
            match: 95,
            deadline: "2024-07-15",
            amount: "Rp 2.400.000/semester",
            level: "S1/D4"
        },
        {
            id: 2,
            title: "Beasiswa LPDP",
            institution: "Kementerian Keuangan",
            match: 85,
            deadline: "2024-06-30",
            amount: "Full Scholarship",
            level: "S2/S3"
        },
        {
            id: 3,
            title: "Beasiswa Bidikmisi",
            institution: "Kemendikbudristek",
            match: 75,
            deadline: "2024-08-01",
            amount: "Rp 1.500.000/bulan",
            level: "S1"
        }
    ];
    
    const container = document.querySelector('.scholarships-grid');
    if (!container) return;
    
    scholarships.forEach(scholarship => {
        const card = createScholarshipCard(scholarship);
        container.appendChild(card);
    });
}

function createScholarshipCard(scholarship) {
    const div = document.createElement('div');
    div.className = 'scholarship-card';
    
    const matchClass = scholarship.match >= 90 ? 'match-high' : 
                       scholarship.match >= 70 ? 'match-medium' : 'match-low';
    
    const daysLeft = Math.ceil((new Date(scholarship.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    const deadlineClass = daysLeft <= 7 ? 'warning' : '';
    
    div.innerHTML = `
        <div class="scholarship-header">
            <span class="badge ${matchClass}">${scholarship.match >= 90 ? 'Cocok Tinggi' : scholarship.match >= 70 ? 'Cocok Sedang' : 'Cocok Rendah'}</span>
            <span class="deadline ${deadlineClass}">H-${daysLeft}</span>
        </div>
        <h3>${scholarship.title}</h3>
        <p class="institution">${scholarship.institution}</p>
        <div class="scholarship-details">
            <p><i class="fas fa-money-bill-wave"></i> ${scholarship.amount}</p>
            <p><i class="fas fa-graduation-cap"></i> ${scholarship.level}</p>
        </div>
        <div class="match-meter">
            <div class="match-label">Kecocokan Profil: ${scholarship.match}%</div>
            <div class="meter-bar">
                <div class="meter-fill" style="width: ${scholarship.match}%"></div>
            </div>
        </div>
        <button class="btn btn-primary" onclick="viewScholarship(${scholarship.id})">Lihat Detail</button>
    `;
    
    return div;
}

function loadDeadlines() {
    const deadlines = [
        { title: "Beasiswa LPDP 2024", days: 3 },
        { title: "Beasiswa Yayasan Bina Nusantara", days: 5 },
        { title: "Beasiswa Bank Indonesia", days: 10 },
        { title: "Beasiswa Djarum", days: 14 }
    ];
    
    const container = document.querySelector('.deadline-list');
    if (!container) return;
    
    deadlines.forEach(deadline => {
        const item = createDeadlineItem(deadline);
        container.appendChild(item);
    });
}

function createDeadlineItem(deadline) {
    const div = document.createElement('div');
    div.className = 'deadline-item';
    
    div.innerHTML = `
        <div class="deadline-info">
            <h3>${deadline.title}</h3>
            <p><i class="fas fa-clock"></i> Tutup dalam ${deadline.days} hari</p>
        </div>
        <button class="btn btn-secondary" onclick="applyScholarship('${deadline.title}')">Daftar Sekarang</button>
    `;
    
    return div;
}

function loadActivities() {
    const activities = [
        { 
            type: 'search', 
            text: 'Anda melihat detail <strong>Beasiswa KIP Kuliah</strong>',
            time: '2 jam yang lalu' 
        },
        { 
            type: 'heart', 
            text: 'Anda menambahkan <strong>Beasiswa LPDP</strong> ke favorit',
            time: '1 hari yang lalu' 
        },
        { 
            type: 'upload', 
            text: 'Anda mengunggah dokumen pendaftaran untuk <strong>Beasiswa Bidikmisi</strong>',
            time: '2 hari yang lalu' 
        },
        { 
            type: 'check', 
            text: 'Anda melengkapi profil pendidikan',
            time: '3 hari yang lalu' 
        }
    ];
    
    const container = document.querySelector('.activity-timeline');
    if (!container) return;
    
    activities.forEach(activity => {
        const item = createActivityItem(activity);
        container.appendChild(item);
    });
}

function createActivityItem(activity) {
    const div = document.createElement('div');
    div.className = 'activity-item';
    
    const icons = {
        search: 'fas fa-search',
        heart: 'fas fa-heart',
        upload: 'fas fa-file-upload',
        check: 'fas fa-check-circle'
    };
    
    div.innerHTML = `
        <div class="activity-icon">
            <i class="${icons[activity.type]}"></i>
        </div>
        <div class="activity-content">
            <p>${activity.text}</p>
            <span class="activity-time">${activity.time}</span>
        </div>
    `;
    
    return div;
}

function setupEventListeners() {
    // Logout button
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Apakah Anda yakin ingin keluar?')) {
                AuthService.logout();
            }
        });
    }
    
    // Apply scholarship buttons
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        if (btn.textContent.includes('Daftar')) {
            btn.addEventListener('click', function() {
                const scholarship = this.closest('.deadline-item').querySelector('h3').textContent;
                applyScholarship(scholarship);
            });
        }
    });
    
    // View scholarship buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Detail')) {
            btn.addEventListener('click', function() {
                const scholarship = this.closest('.scholarship-card').querySelector('h3').textContent;
                viewScholarship(scholarship);
            });
        }
    });
}

// Global functions
function viewScholarship(id) {
    alert(`Melihat detail beasiswa ID: ${id}`);
    // window.location.href = `pages/scholarship-detail.html?id=${id}`;
}

function applyScholarship(title) {
    if (confirm(`Apakah Anda yakin ingin mendaftar ${title}?`)) {
        alert(`Pendaftaran ${title} berhasil dikirim!`);
    }
}

function updateProfile() {
    const newName = prompt('Masukkan nama baru:');
    if (newName && newName.trim()) {
        const user = AuthService.getUser();
        user.name = newName.trim();
        AuthService.setUser(user);
        
        // Update UI
        document.querySelectorAll('.user-name, .user-highlight').forEach(el => {
            el.textContent = newName.trim();
        });
        
        alert('Profil berhasil diperbarui!');
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        loadUserData, 
        updateUserProfile,
        loadRecommendedScholarships
    };
}
