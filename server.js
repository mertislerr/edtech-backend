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
    { id: 10, question_image_url: "Ardışık üç doğal sayının toplamı 60 ise en büyük sayı kaçtır?", options: { "A": "19", "B": "20", "C": "20.5", "D": "21", "E": "22" }, correct_option: "D", video_solution_url: "https://ornekvideo.com/video10.mp4" },
    { id: 11, question_image_url: "Taban alanı 10 ve yüksekliği 6 olan üçgenin alanı kaçtır?", options: { "A": "30", "B": "60", "C": "15", "D": "45", "E": "20" }, correct_option: "A", video_solution_url: "https://ornekvideo.com/video11.mp4" },
    { id: 12, question_image_url: "Köşegen sayısı kaç olan çokgenin kenar sayısı 5'tir?", options: { "A": "5", "B": "2", "C": "9", "D": "6", "E": "4" }, correct_option: "A", video_solution_url: "https://ornekvideo.com/video12.mp4" },
    { id: 13, question_image_url: "Log2(8) ifadesinin değeri kaçtır?", options: { "A": "2", "B": "3", "C": "4", "D": "8", "E": "1" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video13.mp4" },
    { id: 14, question_image_url: "Bir esnaf 100 TL'ye aldığı malı %20 kârla kaç TL'ye satar?", options: { "A": "110", "B": "115", "C": "120", "D": "125", "E": "130" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video14.mp4" },
    { id: 15, question_image_url: "İki basamaklı en büyük asal sayı kaçtır?", options: { "A": "91", "B": "93", "C": "95", "D": "97", "E": "99" }, correct_option: "D", video_solution_url: "https://ornekvideo.com/video15.mp4" },
    { id: 16, question_image_url: "Birler basamağı 3 olan iki basamaklı kaç tane pozitif tam sayı vardır?", options: { "A": "9", "B": "10", "C": "11", "D": "8", "E": "12" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video16.mp4" },
    { id: 17, question_image_url: "f(x) = 2x + 1 olduğuna göre f(3) değeri kaçtır?", options: { "A": "5", "B": "6", "C": "7", "D": "8", "E": "9" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video17.mp4" },
    { id: 18, question_image_url: "Çevresi 36 cm olan karenin alanı kaç santimetrekaredir?", options: { "A": "64", "B": "81", "C": "100", "D": "36", "E": "49" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video18.mp4" },
    { id: 19, question_image_url: "Bir torbada 3 kırmızı, 4 mavi bilye vardır. Çekilen bir bilyenin kırmızı olma olasılığı nedir?", options: { "A": "3/7", "B": "4/7", "C": "1/3", "D": "3/4", "E": "1/2" }, correct_option: "A", video_solution_url: "https://ornekvideo.com/video19.mp4" },
    { id: 20, question_image_url: "İki sayının toplamı 45, farkı 15 ise büyük sayı kaçtır?", options: { "A": "25", "B": "28", "C": "30", "D": "32", "E": "35" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video20.mp4" }
];

const physicsQuestions = [
    { id: 21, question_image_url: "Sürtünmesiz yatay düzlemde duran bir cisme F kuvveti uygulanıyor. İvme bağıntısı nedir?", options: { "A": "0", "B": "F / m", "C": "m / F", "D": "F • m", "E": "2F / m" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video21.mp4" },
    { id: 22, question_image_url: "Işığın boşluktaki hızı yaklaşık olarak kaç km/s'dir?", options: { "A": "300.000", "B": "150.000", "C": "1.000.000", "D": "3.000", "E": "30.000" }, correct_option: "A", video_solution_url: "https://ornekvideo.com/video22.mp4" },
    { id: 23, question_image_url: "Enerjinin uluslararası birim sistemi (SI) birimi nedir?", options: { "A": "Newton", "B": "Joule", "C": "Watt", "D": "Pascal", "E": "Volt" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video23.mp4" },
    { id: 24, question_image_url: "Basıncın formülü aşağıdakilerden hangisidir?", options: { "A": "F • A", "B": "m • g", "C": "F / A", "D": "V / t", "E": "W / t" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video24.mp4" },
    { id: 25, question_image_url: "Akışkanların hızının arttığı yerde basıncın azalmasını ifade eden ilke hangisidir?", options: { "A": "Pascal İlkesi", "B": "Arşimet Prensibi", "C": "Bernoulli İlkesi", "D": "Newton Kanunu", "E": "Ohm Kanunu" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video25.mp4" },
    { id: 26, question_image_url: "Elektrik akımının birimi olan Amper ne tür bir büyüklüktür?", options: { "A": "Skaler / Türetilmiş", "B": "Vektörel / Temel", "C": "Skaler / Temel", "D": "Vektörel / Türetilmiş", "E": "Bileşke" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video26.mp4" },
    { id: 27, question_image_url: "Bir dalganın yayıldığı ortamın özellikleri değişmediği sürece neyi değişmez?", options: { "A": "Hızı", "B": "Frekansı", "C": "Boyu", "D": "Genliği", "E": "Periyodu" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video27.mp4" },
    { id: 28, question_image_url: "100 gram kütleli suyun sıcaklığını 1 °C artırmak için gereken ısı miktarına ne denir?", options: { "A": "Özısı", "B": "Isı sığası", "C": "Gizli ısı", "D": "Kalori", "E": "Entalpi" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video28.mp4" },
    { id: 29, question_image_url: "Düzlem aynaya gelen bir ışın 40 derecelik açı yapıyorsa yansıma açısı kaç derecedir?", options: { "A": "40", "B": "50", "C": "80", "D": "90", "E": "20" }, correct_option: "A", video_solution_url: "https://ornekvideo.com/video29.mp4" },
    { id: 30, question_image_url: "Serbest düşmeye bırakılan bir cisim ilk 1 saniyede kaç metre yol alır? (g=10)", options: { "A": "5", "B": "10", "C": "15", "D": "20", "E": "25" }, correct_option: "A", video_solution_url: "https://ornekvideo.com/video30.mp4" }
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

const testTitlePools = {
    "🔥 Günün Trend Denemeleri": ["Zirve Deneme", "ÖSYM Prova"],
    "📐 Matematik": ["Matematik Zirve", "Problem Avı"]
};

function generateCategoryTests(categoryTitle, author, color) {
    let list = [];
    let titles = testTitlePools[categoryTitle] || ["Özel Deneme"];
    for(let i = 1; i <= 2; i++) {
        list.push({
            id: parseInt(`4${i}`),
            title: `${titles[i-1]} #${i}`,
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

const analyticsData = {
    totalStudents: 1240,
    averageSuccessRate: "%68.4",
    hardestQuestions: [
        { question: "Sürtünmesiz yatay düzlemde duran bir cisme F kuvveti uygulanıyor...", errorRate: "%42 Yanlış" }
    ]
};

app.post('/api/login', (req, res) => {
    const { username, password, role } = req.body;
    if (role === 'student' && username === 'ogrenci' && password === '12345') {
        res.json({ success: true, role: 'student', name: 'Süper Öğrenci' });
    } else if (role === 'teacher' && username === 'ogretmen' && password === '12345') {
        res.json({ success: true, role: 'teacher', name: 'YKS Kurdu' });
    } else if (role === 'google') {
        res.json({ success: true, role: 'student', name: 'Google Oyuncusu' });
    } else {
        res.status(401).json({ success: false, message: 'Hatalı kullanıcı adı veya şifre!' });
    }
});

app.get('/api/tests/:id/questions', (req, res) => {
    res.json(mathQuestions);
});

// 1v1 Düello Başlatma Endpoint'i
app.post('/api/duel/start', (req, res) => {
    const opponents = [
        { name: "Gözde", avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Gozde", elo: 1650, level: 24 },
        { name: "Burak Çelik", avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Burak", elo: 1320, level: 18 },
        { name: "İrem Yılmaz", avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Irem", elo: 1410, level: 21 }
    ];
    const opponent = opponents[Math.floor(Math.random() * opponents.length)];
    const questions = mathQuestions.slice(0, 3);
    res.json({ opponent, questions });
});

// 1v1 Düello Sonuç Endpoint'i
app.post('/api/duel/finish', (req, res) => {
    const { won } = req.body;
    let gainedXp = won ? 150 : 30;
    let eloChange = won ? 30 : -15;
    stats.xp += gainedXp;
    stats.elo = Math.max(500, stats.elo + eloChange);

    // Görev tamamlama kontrolü (Düello kazanma görevi)
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

app.put('/api/profile', (req, res) => {
    const { name, bio, avatar } = req.body;
    if (name) stats.name = name;
    if (bio) stats.bio = bio;
    if (avatar) stats.avatar = avatar;
    res.json({ message: "Profil güncellendi!", stats });
});

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

app.get('/api/leaderboard', (req, res) => { res.json(leaderboardData); });

app.post('/api/answer', (req, res) => {
    const { questionId, isCorrect } = req.body;
    let gainedXp = 0;
    let eloChange = 0;
    
    if (!stats.answeredIds.includes(questionId)) {
        stats.answeredIds.push(questionId);
        if (isCorrect) { 
            stats.correct += 1; 
            gainedXp = 35; 
            eloChange = 25; 
            stats.elo += eloChange;
        } else { 
            stats.wrong += 1; 
            gainedXp = 10; 
            eloChange = -15;
            stats.elo = Math.max(500, stats.elo + eloChange);
        }
        stats.xp += gainedXp;

        stats.dailyQuests.forEach(q => {
            if (q.id === 1 && !q.completed) {
                q.progress += 1;
                if (q.progress >= q.target) {
                    q.completed = true;
                    stats.xp += q.reward;
                }
            }
        });
    }
    
    const rankInfo = getRankInfo(stats.elo);
    const levelInfo = getLevelInfo(stats.xp);
    res.json({ message: "Cevap kaydedildi!", gainedXp, eloChange, currentElo: stats.elo, rankTitle: rankInfo.title, levelInfo, dailyQuests: stats.dailyQuests });
});

app.get('/api/stats', (req, res) => {
    const rankInfo = getRankInfo(stats.elo);
    const levelInfo = getLevelInfo(stats.xp);
    res.json({ ...stats, rankTitle: rankInfo.title, levelInfo });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Sunucu ${PORT} portunda çalışıyor! 🚀`); });