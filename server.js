const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. MATEMATİK SORULARI (20 Adet) ---
const mathQuestions = [
    { id: 1, question_image_url: "2x + 4 = 10 ise x kaçtır?", options: { "A": "1", "B": "2", "C": "3", "D": "4", "E": "5" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video1.mp4" },
    { id: 2, question_image_url: "3x - 5 = 16 ise x kaçtır?", options: { "A": "5", "B": "6", "C": "7", "D": "8", "E": "9" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video2.mp4" },
    { id: 3, question_image_url: "5 faktöriyel (5!) kaça eşittir?", options: { "A": "60", "B": "100", "C": "120", "D": "24", "E": "720" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video3.mp4" },
    { id: 4, question_image_url: "Bir üçgenin iç açılarının toplamı kaç derecedir?", options: { "A": "180", "B": "360", "C": "90", "D": "270", "E": "120" }, correct_option: "A", video_solution_url: "https://ornekvideo.com/video4.mp4" },
    { id: 5, question_image_url: "Yarıçapı 3 cm olan dairenin alanı nedir? (Pi = 3)", options: { "A": "18", "B": "27", "C": "36", "D": "54", "E": "9" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video5.mp4" },
    { id: 6, question_image_url: "10 sayısının karekökü hangi iki tam sayı arasındadır?", options: { "A": "2 ile 3", "B": "3 ile 4", "C": "4 ile 5", "D": "1 ile 2", "E": "9 ile 11" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video6.mp4" },
    { id: 7, question_image_url: "40 sayısının %20'si kaçtır?", options: { "A": "8", "B": "10", "C": "12", "D": "15", "E": "20" }, correct_option: "A", video_solution_url: "https://ornekvideo.com/video7.mp4" },
    { id: 8, question_image_url: "(-3)ün karesi ile (-2)nin küpünün toplamı kaçtır?", options: { "A": "-1", "B": "0", "C": "1", "D": "17", "E": "-17" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video8.mp4" },
    { id: 9, question_image_url: "Bir araç saatte 60 km hızla 3 saatte kaç km gider?", options: { "A": "120", "B": "180", "C": "200", "D": "240", "E": "300" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video9.mp4" },
    { id: 10, question_image_url: "Ardışık üç doğal sayının toplamı 60 ise en büyük sayı kaçtır?", options: { "A": "19", "B": "20", "C": "20.5", "D": "21", "E": "22" }, correct_option: "D", video_solution_url: "https://ornekvideo.com/video10.mp4" }
];

const instructors = {
    "YKS Kurdu": { name: "YKS Kurdu", bio: "12 yıllık YKS matematik koçu.", avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=ykskurdu", specialty: "Matematik & TYT", rating: "4.9" },
    "Fizik Kulübü": { name: "Fizik Kulübü", bio: "Fiziği mantığıyla kavratan eğitmen.", avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=fizik", specialty: "Fizik & Mekanik", rating: "4.9" },
    "Türkçe Merkezi": { name: "Türkçe Merkezi", bio: "Paragraf ve dil bilgisi uzmanı.", avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=turkce", specialty: "Türkçe & Dil Bilgisi", rating: "4.7" },
    "İngilizce Akademisi": { name: "İngilizce Akademisi", bio: "YDT ve yabancı dil koçu.", avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=english", specialty: "İngilizce & YDT", rating: "5.0" }
};

const firstNames = ["Ahmet", "Zeynep", "Mehmet", "Elif", "Mustafa", "Ayşe", "Emre", "Fatma", "Burak", "Merve", "Can", "Ceren", "Mert", "İrem", "Kerem", "Esra", "Tolga", "Gizem", "Onur", "Melisa"];
const lastNames = ["Yılmaz", "Kaya", "Demir", "Şahin", "Çelik", "Yıldız", "Yıldırım", "Öztürk", "Aydın", "Özdemir"];
function getRandomName(index) { return `${firstNames[index % firstNames.length]} ${lastNames[(index * 3) % lastNames.length]}`; }

const demoImages = [
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=500&q=80"
];

function generateCategoryTests(categoryTitle, author, color) {
    let list = [];
    for(let i = 1; i <= 2; i++) {
        list.push({
            id: parseInt(`4${i}`),
            title: `Matematik Zirve #${i}`,
            author: author,
            color: color,
            price: "49.99 ₺",
            description: `${author} tarafından hazırlanan özel içerik seti.`,
            instructorAvatar: "https://api.dicebear.com/7.x/avataaars/png?seed=" + author,
            imageUrl: demoImages[(i - 1) % demoImages.length],
            category: "Matematik"
        });
    }
    return list;
}

let homeCategories = [
    { title: "🔥 Günün Trend Denemeleri", tests: generateCategoryTests("🔥 Günün Trend Denemeleri", "YKS Kurdu", "FF6366F1") },
    { title: "📐 Matematik", tests: generateCategoryTests("📐 Matematik", "YKS Kurdu", "FF8B5CF6") }
];

let stats = {
    name: "Süper Öğrenci",
    bio: "çözbakalım. öğrencisi",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Felix",
    totalQuestions: 80, 
    correct: 0, 
    wrong: 0, 
    xp: 1250, 
    elo: 1250, 
    streak: 5,
    answeredIds: [],
    dailyQuests: [
        { id: 1, title: "Bugün 5 Soru Çöz", target: 5, progress: 0, completed: false, reward: 50 },
        { id: 2, title: "1 Feynman Notu Ekle", target: 1, progress: 0, completed: false, reward: 80 },
        { id: 3, title: "1 Düello Maçı Kazan", target: 1, progress: 0, completed: false, reward: 100 }
    ],
    feynmanNotes: [
        { id: 1, concept: "Pisagor Teoremi", explanation: "Bir dik üçgende dik kenarların karelerinin toplamı hipotenüsün karesine eşittir." }
    ],
    library: [
        { id: 41, title: "Matematik Zirve #1", category: "Matematik", progress: 0, correct: 0, wrong: 0, total: 20, color: "FF8B5CF6", imageUrl: demoImages[0] }
    ],
    friends: [
        { id: 1, name: "Gözde", avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Gozde", league: "Altın Lig 🥇", xp: 3400, elo: 1650 }
    ]
};

let nationalList = [];
let regionalList = [];
for(let i = 1; i <= 20; i++) {
    let natXp = 20000 - (i * 250);
    nationalList.push({
        rank: i,
        name: getRandomName(i + 5),
        avatar: `https://api.dicebear.com/7.x/avataaars/png?seed=nat${i}`,
        xp: natXp,
        level: Math.floor(natXp / 200) + 1,
        elo: 2600 - (i * 35),
        league: i <= 3 ? "Şampiyonlar Ligi 🏆" : "Altın Lig 🥇",
        city: "İstanbul"
    });
    
    let regXp = 15000 - (i * 200);
    regionalList.push({
        rank: i,
        name: i === 12 ? "Süper Öğrenci (Sen)" : getRandomName(i + 15),
        avatar: `https://api.dicebear.com/7.x/avataaars/png?seed=izm${i}`,
        xp: regXp,
        level: Math.floor(regXp / 200) + 1,
        elo: 2200 - (i * 25),
        league: "Elmas Lig 💎",
        city: "İzmir",
        isMe: i === 12
    });
}

const leaderboardData = { national: nationalList, regional: regionalList };
const analyticsData = { totalStudents: 1240, averageSuccessRate: "%68.4", hardestQuestions: [] };

app.post('/api/login', (req, res) => {
    const { username, password, role } = req.body;
    if (role === 'student' && username === 'ogrenci' && password === '12345') {
        res.json({ success: true, role: 'student', name: 'Süper Öğrenci' });
    } else if (role === 'teacher' && username === 'ogretmen' && password === '12345') {
        res.json({ success: true, role: 'teacher', name: 'YKS Kurdu' });
    } else if (role === 'google') {
        res.json({ success: true, role: 'student', name: 'Google Oyuncusu' });
    } else {
        res.status(401).json({ success: false, message: 'Hatalı şifre!' });
    }
});

app.get('/api/tests/:id/questions', (req, res) => { res.json(mathQuestions); });

// AI Bot Düello Başlatma
app.post('/api/duel/start', (req, res) => {
    const aiBots = [
        { name: "YKS Robotu 🤖", avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Bot1", elo: 1500, accuracy: 0.65 },
        { name: "Matematik Dahisi Bot 🧠", avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Bot2", elo: 1750, accuracy: 0.80 },
        { name: "Fizik Canavarı Bot ⚡", avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Bot3", elo: 1600, accuracy: 0.70 }
    ];
    const opponent = aiBots[Math.floor(Math.random() * aiBots.length)];
    const questions = mathQuestions.slice(0, 3); // 3 soruluk hızlı düello
    res.json({ opponent, questions });
});

// AI Bot Düello Bitiş
app.post('/api/duel/finish', (req, res) => {
    const { won } = req.body;
    let gainedXp = won ? 150 : 30;
    let eloChange = won ? 30 : -15;
    stats.xp += gainedXp;
    stats.elo = Math.max(500, stats.elo + eloChange);

    if (won) {
        stats.dailyQuests.forEach(q => {
            if(q.id === 3 && !q.completed) {
                q.progress += 1;
                if(q.progress >= q.target) { q.completed = true; stats.xp += q.reward; }
            }
        });
    }

    res.json({ success: true, gainedXp, eloChange, currentElo: stats.elo, rankTitle: getRankInfo(stats.elo).title, levelInfo: getLevelInfo(stats.xp) });
});

function getRankInfo(elo) {
    if (elo < 1100) return { title: "Bronz III 🥉" };
    if (elo < 1250) return { title: "Bronz I 🥉" };
    if (elo < 1400) return { title: "Gümüş II 🥈" };
    if (elo < 1600) return { title: "Altın I 🥇" };
    return { title: "Elmas Şampiyon 💎" };
}

function getLevelInfo(xp) {
    const xpPerLevel = 200;
    const level = Math.floor(xp / xpPerLevel) + 1;
    const currentLevelXp = xp % xpPerLevel;
    const progress = currentLevelXp / xpPerLevel;
    return { level, currentLevelXp, xpPerLevel, progress };
}

app.get('/api/home', (req, res) => { res.json(homeCategories); });
app.get('/api/instructors-list', (req, res) => { res.json(Object.values(instructors)); });
app.get('/api/analytics', (req, res) => { res.json(analyticsData); });
app.get('/api/leaderboard', (req, res) => { res.json(leaderboardData); });
app.get('/api/feynman', (req, res) => { res.json(stats.feynmanNotes); });

app.post('/api/feynman', (req, res) => {
    const { concept, explanation } = req.body;
    const newNote = { id: Date.now(), concept, explanation };
    stats.feynmanNotes.push(newNote);
    stats.dailyQuests.forEach(q => {
        if(q.id === 2 && !q.completed) {
            q.progress += 1;
            if(q.progress >= q.target) { q.completed = true; stats.xp += q.reward; }
        }
    });
    res.json({ success: true, note: newNote, stats });
});

app.post('/api/answer', (req, res) => {
    const { questionId, isCorrect } = req.body;
    let gainedXp = 0;
    let eloChange = 0;
    
    if (!stats.answeredIds.includes(questionId)) {
        stats.answeredIds.push(questionId);
        if (isCorrect) { stats.correct += 1; gainedXp = 35; eloChange = 25; stats.elo += eloChange; }
        else { stats.wrong += 1; gainedXp = 10; eloChange = -15; stats.elo = Math.max(500, stats.elo + eloChange); }
        stats.xp += gainedXp;

        stats.dailyQuests.forEach(q => {
            if (q.id === 1 && !q.completed) {
                q.progress += 1;
                if (q.progress >= q.target) { q.completed = true; stats.xp += q.reward; }
            }
        });
    }
    res.json({ message: "OK", gainedXp, eloChange, currentElo: stats.elo, rankTitle: getRankInfo(stats.elo).title, levelInfo: getLevelInfo(stats.xp), dailyQuests: stats.dailyQuests });
});

app.get('/api/stats', (req, res) => {
    res.json({ ...stats, rankTitle: getRankInfo(stats.elo).title, levelInfo: getLevelInfo(stats.xp) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Sunucu ${PORT} portunda çalışıyor! 🚀`); });