// Data siswa contoh (bisa diganti dengan data asli dari database)
const students = [
    { 
        name: "Aisha Nurul Imani", 
        academic: 95, 
        nonAcademic: 90, 
        attendance: 98,
        achievements: ["Juara 1 Olimpiade Matematika Nasional", "Juara 2 Lomba Pidato Bahasa Inggris"]
    },
    { 
        name: "Bryan Santoso", 
        academic: 92, 
        nonAcademic: 95, 
        attendance: 95,
        achievements: ["Juara 1 Turnamen Basket Provinsi", "Juara 3 Lomba Robotik"]
    },
    { 
        name: "Citra Dewi Lestari", 
        academic: 97, 
        nonAcademic: 85, 
        attendance: 99,
        achievements: ["Juara 1 Olimpiade Biologi", "Juara 2 Lomba Menulis Cerpen"]
    },
    { 
        name: "Daffa Pratama Putra", 
        academic: 89, 
        nonAcademic: 92, 
        attendance: 97,
        achievements: ["Juara 1 Lomba Debat", "Juara 2 Taekwondo Tingkat Kota"]
    },
    { 
        name: "Elsa Fitriani", 
        academic: 94, 
        nonAcademic: 88, 
        attendance: 96,
        achievements: ["Juara 1 Lomba Melukis", "Juara 3 Olimpiade Kimia"]
    },
    { 
        name: "Fahri Ramadhan", 
        academic: 91, 
        nonAcademic: 94, 
        attendance: 94,
        achievements: ["Juara 1 Turnamen Futsal", "Juara 2 Lomba Coding"]
    },
    { 
        name: "Gita Saraswati", 
        academic: 96, 
        nonAcademic: 82, 
        attendance: 100,
        achievements: ["Juara 1 Olimpiade Fisika", "Juara 1 Lomba Baca Puisi"]
    },
    { 
        name: "Hendra Kurniawan", 
        academic: 88, 
        nonAcademic: 96, 
        attendance: 93,
        achievements: ["Juara 1 Lomba Fotografi", "Juara 2 Basket Tingkat Provinsi"]
    },
    { 
        name: "Indah Permata Sari", 
        academic: 93, 
        nonAcademic: 89, 
        attendance: 98,
        achievements: ["Juara 1 Lomba Menyanyi", "Juara 3 Olimpiade Astronomi"]
    },
    { 
        name: "Johan Setiawan", 
        academic: 90, 
        nonAcademic: 91, 
        attendance: 97,
        achievements: ["Juara 2 Lomba Chess", "Juara 1 Paskibra Tingkat Kota"]
    }
];

// Bobot kriteria
const weights = {
    academic: 0.40,
    nonAcademic: 0.35,
    attendance: 0.25
};

// Hitung skor WP untuk setiap siswa
function calculateWPScore(student) {
    // Rumus Weighted Product
    const score = Math.pow(student.academic, weights.academic) * 
                 Math.pow(student.nonAcademic, weights.nonAcademic) * 
                 Math.pow(student.attendance, weights.attendance);
    return score;
}

// Tambahkan skor WP ke data siswa
students.forEach(student => {
    student.wpScore = calculateWPScore(student);
});

// Urutkan siswa berdasarkan skor WP (descending)
students.sort((a, b) => b.wpScore - a.wpScore);

// Tampilkan ranking di halaman
function displayRankings() {
    const rankingList = document.getElementById("rankingList");
    rankingList.innerHTML = "";
    
    // Cari skor maksimum untuk normalisasi persentase
    const maxScore = students[0].wpScore;
    
    students.forEach((student, index) => {
        const rankClass = index < 3 ? `rank-${index+1}` : "";
        const percentage = (student.wpScore / maxScore) * 100;
        
        const studentCard = document.createElement("div");
        studentCard.className = "student-card";
        studentCard.innerHTML = `
            <div class="rank-badge ${rankClass}">${index + 1}</div>
            <div class="student-info">
                <h3 class="student-name">${student.name}</h3>
                <div class="student-details">
                    <div class="detail-item">
                        <i class="fas fa-graduation-cap"></i>
                        <span>${student.academic}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-medal"></i>
                        <span>${student.nonAcademic}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-calendar-check"></i>
                        <span>${student.attendance}%</span>
                    </div>
                </div>
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Skor Prestasi</span>
                        <span>${student.wpScore.toFixed(4)}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
                <div style="margin-top: 10px; font-size: 0.9rem;">
                    <strong>Prestasi:</strong> ${student.achievements.join(", ")}
                </div>
            </div>
            <div class="wp-score">
                <i class="fas fa-star"></i>
                <span>${student.wpScore.toFixed(4)}</span>
            </div>
        `;
        
        rankingList.appendChild(studentCard);
    });
}

// Fungsi pencarian siswa
function searchStudent() {
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    const resultDiv = document.getElementById("searchResult");
    const resultContent = document.getElementById("resultContent");
    
    if (!searchInput) {
        alert("Silakan masukkan nama siswa yang ingin dicari!");
        return;
    }

    // Cari siswa yang cocok
    const foundStudent = students.find(student => 
        student.name.toLowerCase().includes(searchInput));

    // Tampilkan hasil
    if (foundStudent) {
        const rank = students.findIndex(s => s.name === foundStudent.name) + 1;
        const maxScore = students[0].wpScore;
        const percentage = (foundStudent.wpScore / maxScore) * 100;
        
        document.getElementById("resultRank").textContent = rank;
        document.getElementById("resultRank").className = `rank-badge ${rank <= 3 ? `rank-${rank}` : ""}`;
        document.getElementById("resultName").textContent = foundStudent.name;
        document.getElementById("resultAcademic").textContent = foundStudent.academic;
        document.getElementById("resultNonAcademic").textContent = foundStudent.nonAcademic;
        document.getElementById("resultAttendance").textContent = `${foundStudent.attendance}%`;
        document.getElementById("resultScore").textContent = foundStudent.wpScore.toFixed(4);
        document.getElementById("resultWPScore").textContent = foundStudent.wpScore.toFixed(4);
        document.getElementById("resultProgress").style.width = `${percentage}%`;
        
        resultDiv.style.display = "block";
        
        // Scroll ke hasil pencarian
        document.getElementById("results").scrollIntoView({ behavior: 'smooth' });
    } else {
        alert("Siswa dengan nama tersebut tidak ditemukan dalam ranking!");
        resultDiv.style.display = "none";
    }
}

// Enable search on Enter key
document.getElementById("searchInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        searchStudent();
    }
});

// Tampilkan ranking saat halaman dimuat
window.onload = displayRankings;