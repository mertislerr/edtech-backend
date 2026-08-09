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

// --- 2. FİZİK SORULARI (20 Adet) ---
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
    { id: 30, question_image_url: "Serbest düşmeye bırakılan bir cisim ilk 1 saniyede kaç metre yol alır? (g=10)", options: { "A": "5", "B": "10", "C": "15", "D": "20", "E": "25" }, correct_option: "A", video_solution_url: "https://ornekvideo.com/video30.mp4" },
    { id: 31, question_image_url: "Direnci R olan bir iletkenden geçen akım i ise harcanan güç formülü nedir?", options: { "A": "i • R", "B": "i² • R", "C": "i / R", "D": "R / i", "E": "i • R²" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video31.mp4" },
    { id: 32, question_image_url: "Momentumun korunum kanunu hangi temel yasaya dayanır?", options: { "A": "Newton'un İlk Yasası", "B": "Newton'un İkinci Yasası", "C": "Newton'un Üçüncü Yasası", "D": "Enerjinin Korunumu", "E": "Termodinamik Yasası" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video32.mp4" },
    { id: 33, question_image_url: "Hangisi katı haldeki maddelerin ortak özelliklerinden biri değildir?", options: { "A": "Belirli hacimleri vardır", "B": "Tanecikleri öteleme hareketi yapar", "C": "Belirli şekilleri vardır", "D": "Sıkıştırılamazlar", "E": "Tanecikleri titreşim hareketi yapar" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video33.mp4" },
    { id: 34, question_image_url: "Trafo cihazları hangi akım türüyle çalışır?", options: { "A": "Doğru Akım (DC)", "B": "Alternatif Akım (AC)", "C": "Statik Elektrik", "D": "Kesikli Akım", "E": "Pil Akımı" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video34.mp4" },
    { id: 35, question_image_url: "Ses dalgaları hangi ortamda en hızlı yayılır?", options: { "A": "Boşluk", "B": "Hava", "C": "Su", "D": "Demir (Katı)", "E": "Gaz" }, correct_option: "D", video_solution_url: "https://ornekvideo.com/video35.mp4" },
    { id: 36, question_image_url: "Bir merceğin odak uzaklığı neye bağlı değildir?", options: { "A": "Merceğin yapıldığı maddenin cinsine", "B": "Ortamın kırılma indeksine", "C": "Yüzeyin eğrilik yarıçapına", "D": "Üzerine düşen ışığın rengine", "E": "Işığın şiddetine" }, correct_option: "E", video_solution_url: "https://ornekvideo.com/video36.mp4" },
    { id: 37, question_image_url: "Yerçekimi ivmesinin en büyük olduğu yer neresidir?", options: { "A": "Ekvator", "B": "Kutuplar", "C": "Dağ tepesi", "D": "Atmosfer sınırı", "E": "Dünya'nın merkezi" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video37.mp4" },
    { id: 38, question_image_url: "Öz kütle (d) formülü aşağıdakilerden hangisidir?", options: { "A": "m • V", "B": "V / m", "C": "m / V", "D": "F / m", "E": "G / V" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video38.mp4" },
    { id: 39, question_image_url: "İdeal bir sarkacın periyodu neye bağlı değildir?", options: { "A": "İpin boyuna", "B": "Yerçekimi ivmesine", "C": "Cismin kütlesine", "D": "Salınım genliğine", "E": "Hiçbiri" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video39.mp4" },
    { id: 40, question_image_url: "Manyetik akının birimi aşağıdakilerden hangisidir?", options: { "A": "Tesla", "B": "Weber", "C": "Henry", "D": "Farad", "E": "Coulomb" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video40.mp4" }
];

// --- 3. TÜRKÇE SORULARI (20 Adet) ---
const turkceQuestions = [
    { id: 41, question_image_url: "Aşağıdaki cümlelerin hangisinde yazım yanlışı vardır?", options: { "A": "Herkes buradaydı.", "B": "Yalnız kelimesi önemlidir.", "C": "Heryerde seni aradım.", "D": "Birkaç kişi kaldı.", "E": "Hiçbir şey bildiğimiz gibi değil." }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video41.mp4" },
    { id: 42, question_image_url: "'Kitap' kelimesinin yönelme hâli ek almış biçimi hangisidir?", options: { "A": "Kitapta", "B": "Kitaptan", "C": "Kitaba", "D": "Kitabı", "E": "Kitaplar" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video42.mp4" },
    { id: 43, question_image_url: "Aşağıdakilerden hangisi bir fiil (eylem) cümlesidir?", options: { "A": "Bugün hava çok güzeldi.", "B": "Kapıdaki çocuk çok yorgundu.", "C": "Öğrenciler bahçede koşuyor.", "D": "En sevdiğim renk mavidir.", "E": "Burası oldukça sakindi." }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video43.mp4" },
    { id: 44, question_image_url: "Aşağıdaki sözcüklerden hangisi yapı bakımından türemiştir?", options: { "A": "Kitaplık", "B": "Evler", "C": "Masa", "D": "Kalem", "E": "Okul" }, correct_option: "A", video_solution_url: "https://ornekvideo.com/video44.mp4" },
    { id: 45, question_image_url: "Hangisi bir ses olayına (ünsüz yumuşaması) örnektir?", options: { "A": "Gözlük", "B": "Ağacı", "C": "Simitçi", "D": "Yoldan", "E": "Kalemler" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video45.mp4" },
    { id: 46, question_image_url: "'Başkent' sözcüğü nasıl bir kelimedir?", options: { "A": "Basit", "B": "Türemiş", "C": "Birleşik", "D": "Yansıma", "E": "Deyim" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video46.mp4" },
    { id: 47, question_image_url: "Aşağıdaki cümlelerin hangisinde 'de / da' bağlacı yanlış yazılmıştır?", options: { "A": "Sen de bizimle gel.", "B": "Ev de kimse yoktu.", "C": "Çocuk da geldi.", "D": "Kitap da masadaymış.", "E": "Ben de isterim." }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video47.mp4" },
    { id: 48, question_image_url: "Anlamca birbirinin zıttı olan sözcükler aşağıdakilerden hangisidir?", options: { "A": "Eş sesli", "B": "Eş anlamlı", "C": "Zıt anlamlı", "D": "Yakın anlamlı", "E": "Terim anlamlı" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video48.mp4" },
    { id: 49, question_image_url: "Hangisi bir cümlenin öğesi olamaz?", options: { "A": "Özne", "B": "Nesne", "C": "Tümleç", "D": "Edat", "E": "Yüklem" }, correct_option: "D", video_solution_url: "https://ornekvideo.com/video49.mp4" },
    { id: 50, question_image_url: "Aşağıdaki cümlelerin hangisinde ünlem işareti yanlış kullanılmıştır?", options: { "A": "Eyvah, anahtarı unuttum!", "B": "Ne mutlu türküm diyene!", "C": "Aferin, çok başarılısın!", "D": "Hava çok sıcak, ne yazık ki!", "E": "Dur, yolcu!" }, correct_option: "D", video_solution_url: "https://ornekvideo.com/video50.mp4" },
    { id: 51, question_image_url: "'Gül' sözcüğü hem çiçek adı hem de gülmek eylemi olarak kullanılır. Buna ne denir?", options: { "A": "Zıt anlam", "B": "Eş sesli (Sesteş)", "C": "Mecaz anlam", "D": "Terim", "E": "Yan anlam" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video51.mp4" },
    { id: 52, question_image_url: "Hangisi bir isim (ad) tamlamasıdır?", options: { "A": "Kırmızı araba", "B": "Uzun yol", "C": "Okulun kapısı", "D": "Koşan çocuk", "E": "Güzel gün" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video52.mp4" },
    { id: 53, question_image_url: "'Acı' sözcüğü hangi cümlede mecaz anlamda kullanılmıştır?", options: { "A": "Çorba çok acı olmuş.", "B": "Biberin acısı hala dilimde.", "C": "Aldığı haber onu çok acıttı.", "D": "Ayrılığın acısını yıllarca çekti.", "E": "Acı sosu çok severim." }, correct_option: "D", video_solution_url: "https://ornekvideo.com/video53.mp4" },
    { id: 54, question_image_url: "Aşağıdaki eklerden hangisi yapım eki değildir?", options: { "A": "-lık", "B": "-cı", "C": "-lar", "D": "-lı", "E": "-ımsı" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video54.mp4" },
    { id: 55, question_image_url: "'Pazardan iki kilo elma aldı.' cümlesinde belirtili nesne hangisidir?", options: { "A": "Pazardan", "B": "İki kilo", "C": "Elma aldı", "D": "İki kilo elma", "E": "Aldı" }, correct_option: "D", video_solution_url: "https://ornekvideo.com/video55.mp4" },
    { id: 56, question_image_url: "Hangisinde büyük harflerin kullanımında yanlışlık yapılmıştır?", options: { "A": "Ankara'ya gittik.", "B": "Türk Dil Kurumu", "C": "Ay, dünyamızın uydusudur.", "D": "Doğu Anadolu Bölgesi", "E": "Atatürk Bulvarı" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video56.mp4" },
    { id: 57, question_image_url: "'Yaz' kelimesi aşağıdaki atasözlerinin hangisinde farklı bir anlamda kullanılmıştır?", options: { "A": "Yazın başı pişenin kışın aşı pişer.", "B": "Yazı var kışı var.", "C": "Deftere güzelce yaz.", "D": "Yaz kış demeden çalıştı.", "E": "Yaz mevsimini severim." }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video57.mp4" },
    { id: 58, question_image_url: "Aşağıdaki cümlelerin hangisinde 'ile' sözcüğü edat görevindedir?", options: { "A": "Kalem ile silgi aldım.", "B": "Annesiyle pazara gitti.", "C": "Ahmet ile Mehmet geldi.", "D": "Kitap ile defter masada.", "E": "Süt ile peynir." }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video58.mp4" },
    { id: 59, question_image_url: "Noktalama işaretlerinden hangisi seslenme ve hitap sözlerinden sonra konur?", options: { "A": "Nokta", "B": "Virgül", "C": "Ünlem işareti", "D": "Soru işareti", "E": "İki nokta" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video59.mp4" },
    { id: 60, question_image_url: "Hangisi bir paragrafın giriş cümlesi olmaya en uygundur?", options: { "A": "Öte yandan, bu durum pek çok sorunu tetikler.", "B": "Sanat, insan ruhunu besleyen en önemli unsurdur.", "C": "Bu yüzden her zaman dikkatli olmalıyız.", "D": "Sonuç olarak başarı azimle gelir.", "E": "Ancak bu teoriler her zaman geçerli değildir." }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video60.mp4" }
];

// --- 4. İNGİLİZCE SORULARI (20 Adet) ---
const englishQuestions = [
    { id: 61, question_image_url: "Choose the correct form: 'She ___ to school every day.'", options: { "A": "go", "B": "goes", "C": "going", "D": "gone", "E": "is go" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video61.mp4" },
    { id: 62, question_image_url: "What is the past tense of the verb 'run'?", options: { "A": "runed", "B": "ran", "C": "running", "D": "runs", "E": "run" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video62.mp4" },
    { id: 63, question_image_url: "Fill in the blank: 'If I had money, I ___ a new car.'", options: { "A": "will buy", "B": "bought", "C": "would buy", "D": "can buy", "E": "have bought" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video63.mp4" },
    { id: 64, question_image_url: "Which of the following is a synonym for 'happy'?", options: { "A": "sad", "B": "angry", "C": "joyful", "D": "tired", "E": "cold" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video64.mp4" },
    { id: 65, question_image_url: "Choose the correct preposition: 'He is good ___ playing tennis.'", options: { "A": "at", "B": "in", "C": "on", "D": "with", "E": "for" }, correct_option: "A", video_solution_url: "https://ornekvideo.com/video65.mp4" },
    { id: 66, question_image_url: "What is the superlative form of the adjective 'good'?", options: { "A": "gooder", "B": "more good", "C": "best", "D": "the best", "E": "better" }, correct_option: "D", video_solution_url: "https://ornekvideo.com/video66.mp4" },
    { id: 67, question_image_url: "Complete the sentence: 'They ___ TV when I arrived.'", options: { "A": "watched", "B": "were watching", "C": "watch", "D": "are watching", "E": "have watched" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video67.mp4" },
    { id: 68, question_image_url: "Which word means 'to succeed in reaching a goal'?", options: { "A": "fail", "B": "achieve", "C": "destroy", "D": "prevent", "E": "ignore" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video68.mp4" },
    { id: 69, question_image_url: "Choose the correct modal verb: 'You ___ wear a helmet while riding a bike.'", options: { "A": "must", "B": "might", "C": "can't", "D": "may", "E": "could" }, correct_option: "A", video_solution_url: "https://ornekvideo.com/video69.mp4" },
    { id: 70, question_image_url: "What is the plural form of 'child'?", options: { "A": "childs", "B": "childes", "C": "children", "D": "childrens", "E": "child" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video70.mp4" },
    { id: 71, question_image_url: "Translate to English: 'O, üç yıldır burada yaşıyor.'", options: { "A": "He lives here for 3 years.", "B": "He has been living here for 3 years.", "C": "He is living here since 3 years.", "D": "He lived here for 3 years.", "E": "He had lived here." }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video71.mp4" },
    { id: 72, question_image_url: "Which of these is an antonym of 'ancient'?", options: { "A": "old", "B": "antique", "C": "modern", "D": "historic", "E": "aged" }, correct_option: "C", video_solution_url: "https://ornekvideo.com/video72.mp4" },
    { id: 73, question_image_url: "Choose the correct passive voice: 'They built this house in 1990.'", options: { "A": "This house is built in 1990.", "B": "This house was built in 1990.", "C": "This house has built in 1990.", "D": "This house builds in 1990.", "E": "They was built this house." }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video73.mp4" },
    { id: 74, question_image_url: "Fill in the blank: 'I prefer tea ___ coffee.'", options: { "A": "than", "B": "to", "C": "over", "D": "more", "E": "rather" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video74.mp4" },
    { id: 75, question_image_url: "Which sentence is correct?", options: { "A": "I have too much homeworks.", "B": "I have a lot of homework.", "C": "I have many homeworks.", "D": "I has much homework.", "E": "I much homework have." }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video75.mp4" },
    { id: 76, question_image_url: "What is the meaning of 'abandon'?", options: { "A": "korumak", "B": "terk etmek", "C": "kabul etmek", "D": "başlamak", "E": "sürdürmek" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video76.mp4" },
    { id: 77, question_image_url: "Choose the correct relative pronoun: 'The man ___ stole my car was caught.'", options: { "A": "which", "B": "whom", "C": "whose", "D": "who", "E": "where" }, correct_option: "D", video_solution_url: "https://ornekvideo.com/video77.mp4" },
    { id: 78, question_image_url: "'Hardly had I arrived home ___ the phone rang.'", options: { "A": "when", "B": "than", "C": "then", "D": "after", "E": "while" }, correct_option: "A", video_solution_url: "https://ornekvideo.com/video78.mp4" },
    { id: 79, question_image_url: "Which prefix means 'not' in the word 'impossible'?", options: { "A": "im-", "B": "un-", "C": "dis-", "D": "mis-", "E": "re-" }, correct_option: "A", video_solution_url: "https://ornekvideo.com/video79.mp4" },
    { id: 80, question_image_url: "What does the idiom 'break a leg' mean in English?", options: { "A": "Bacağını kırmak", "B": "İyi şanslar dilerim", "C": "Kötü şans", "D": "Çok yorulmak", "E": "Hızlı koşmak" }, correct_option: "B", video_solution_url: "https://ornekvideo.com/video80.mp4" }
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
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=500&q=80"
];

const testTitlePools = {
    "🔥 Günün Trend Denemeleri": ["Zirve Deneme", "ÖSYM Prova", "Kritik Eşik", "Büyük Buluşma", "Son Viraj", "Başarı Odaklı", "Fenomen Sorular", "Prestij Sınavı", "Altın Karma", "Puan Uçuran"],
    "🚀 Yeni Çıkanlar": ["2026 Model Set", "Yeni Nesil Öncü", "Zorluk Derecesi", "Beceri Temelli", "Yepyeni Fasikül", "Vizyon Bankası", "Sınav Ötesi", "Dönüm Noktası", "Fark Yaratan", "Gelecek Sorular"],
    "⏳ Yakında Çıkacaklar": ["Kurumsal Deneme", "Birlik Sınavı", "Gelecek Dönem", "Mega Karma", "Prototip Sınav", "Öncü Yayınlar", "Akademi Özel", "Süper Kapsamlı", "Gelişmiş Düzey", "Master Banka"],
    "📐 Matematik": ["Matematik Zirve", "Problem Avı", "Geometri Nokta", "Türev Özel", "Fonksiyon Ustası", "Problemler Şifresi", "Net Uçuran Mat", "Sayısal Güç", "Kritik Matematik", "ÖSYM Mat Analiz"],
    "📖 Türkçe": ["Paragraf Şifresi", "Dil Bilgisi Nokta", "Sözel Güç", "Anlam Bilgisi", "Paragraf Hız", "Türkçe Full", "Sözcükte Anlam", "Yazım Kuralları", "Sözel Mantık", "ÖSYM Türkçe"],
    "⚡ Fizik": ["Fizik Mekanik", "Elektrik Manyetizma", "Optik Dalgalar", "Modern Fizik", "Fizik Net Artıran", "Kuvvet Hareket", "Enerji Momentum", "Fizik Deneme", "Zor Fizik", "ÖSYM Fizik"]
};

function generateCategoryTests(categoryTitle, author, color) {
    let list = [];
    let titles = testTitlePools[categoryTitle] || ["Özel Deneme"];
    for(let i = 1; i <= 10; i++) {
        let prefixId = categoryTitle.includes("Trend") ? 1 : categoryTitle.includes("Yeni") ? 2 : categoryTitle.includes("Yakında") ? 3 : categoryTitle.includes("Matematik") ? 4 : categoryTitle.includes("Türkçe") ? 5 : 6;
        list.push({
            id: parseInt(`${prefixId}${i}`),
            title: `${titles[i-1]} #${i}`,
            author: author,
            color: color,
            price: `${(35 + (i * 2)).toFixed(2)} ₺`,
            description: `${author} tarafından hazırlanan özel içerik seti.`,
            instructorAvatar: "https://api.dicebear.com/7.x/avataaars/png?seed=" + author,
            imageUrl: demoImages[(i - 1) % demoImages.length],
            category: categoryTitle.includes("Matematik") ? "Matematik" : categoryTitle.includes("Türkçe") ? "Türkçe" : categoryTitle.includes("Fizik") ? "Fizik" : "Trend"
        });
    }
    return list;
}

let homeCategories = [
    { title: "🔥 Günün Trend Denemeleri", tests: generateCategoryTests("🔥 Günün Trend Denemeleri", "YKS Kurdu", "FF6366F1") },
    { title: "🚀 Yeni Çıkanlar", tests: generateCategoryTests("🚀 Yeni Çıkanlar", "Türkçe Merkezi", "FF10B981") },
    { title: "⏳ Yakında Çıkacaklar", tests: generateCategoryTests("⏳ Yakında Çıkacaklar", "Fizik Kulübü", "FFF59E0B") },
    { title: "📐 Matematik", tests: generateCategoryTests("📐 Matematik", "YKS Kurdu", "FF8B5CF6") },
    { title: "📖 Türkçe", tests: generateCategoryTests("📖 Türkçe", "Türkçe Merkezi", "FFEF4444") },
    { title: "⚡ Fizik", tests: generateCategoryTests("⚡ Fizik", "Fizik Kulübü", "FF06B6D4") }
];

let stats = {
    name: "Süper Öğrenci",
    bio: "çözbakalım. öğrencisi",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Felix",
    totalQuestions: 132, 
    correct: 105, 
    wrong: 27, 
    xp: 1250, 
    elo: 1250, 
    streak: 5,
    answeredIds: [],
    subjectStats: {
        "Matematik": { correct: 42, wrong: 8, target: 100 },
        "Fizik": { correct: 18, wrong: 12, target: 80 },
        "Türkçe": { correct: 35, wrong: 5, target: 80 },
        "İngilizce": { correct: 10, wrong: 2, target: 50 }
    },
    dailyQuests: [
        { id: 1, title: "Bugün 5 Soru Çöz", target: 5, progress: 0, completed: false, reward: 50 },
        { id: 2, title: "1 Feynman Notu Ekle", target: 1, progress: 0, completed: false, reward: 80 },
        { id: 3, title: "1 Düello Maçı Kazan", target: 1, progress: 0, completed: false, reward: 100 }
    ],
    feynmanNotes: [
        { id: 1, concept: "Pisagor Teoremi", explanation: "Bir dik üçgende dik kenarların karelerinin toplamı hipotenüsün karesine eşittir." }
    ],
    library: [
        { id: 41, title: "Matematik Zirve #1", category: "Matematik", progress: 0, correct: 0, wrong: 0, total: 20, color: "FF8B5CF6", imageUrl: demoImages[0] },
        { id: 61, title: "Fizik Mekanik #1", category: "Fizik", progress: 0, correct: 0, wrong: 0, total: 20, color: "FF06B6D4", imageUrl: demoImages[1] },
        { id: 51, title: "Paragraf Şifresi #1", category: "Türkçe", progress: 0, correct: 0, wrong: 0, total: 20, color: "FFEF4444", imageUrl: demoImages[2] },
        { id: 11, title: "Zirve Deneme #1", category: "Trend", progress: 0, correct: 0, wrong: 0, total: 20, color: "FF6366F1", imageUrl: demoImages[3] }
    ],
    friends: [
        { id: 1, name: "Gözde", avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Gozde", league: "Altın Lig 🥇", xp: 3400, elo: 1650 }
    ]
};

// --- GÜNÜN HAP BİLGİSİ VERİLERİ ---
const dailyTips = [
    { title: "Günün Hap Bilgisi 💡", content: "Paragraf sorularında önce soru kökünü oku. Zihnin metni okurken doğrudan cevabı arayacaktır. Zaman kazandırır!", category: "Taktik" },
    { title: "ÖSYM Ne Sorar? 🎯", content: "Fizikte 'İş-Güç-Enerji' konusundan her yıl istisnasız en az 1 soru geliyor. W = F.x formülünü duvarına as!", category: "Fizik" },
    { title: "Günün Kısayolu ⚡", content: "Matematikte sonu 5 ile biten sayıların karesini alırken: Son iki hane daima 25'tir. İlk haneyi bir fazlasıyla çarpıp başa yaz! (Örn: 35² -> 3x4=12 -> 1225)", category: "Matematik" }
];

let nationalList = [];
let regionalList = [];
for(let i = 1; i <= 50; i++) {
    let natXp = 20000 - (i * 250);
    nationalList.push({
        rank: i,
        name: getRandomName(i + 5),
        avatar: `https://api.dicebear.com/7.x/avataaars/png?seed=nat${i}`,
        xp: natXp,
        level: Math.floor(natXp / 200) + 1,
        elo: 2600 - (i * 35),
        league: i <= 3 ? "Şampiyonlar Ligi 🏆" : "Altın Lig 🥇",
        city: i % 2 === 0 ? "İstanbul" : "Ankara"
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
        { question: "Sürtünmesiz yatay düzlemde duran bir cisme F kuvveti uygulanıyor...", errorRate: "%42 Yanlış" },
        { question: "2x + 4 = 10 ise x kaçtır?", errorRate: "%31 Yanlış" }
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
    const testId = parseInt(req.params.id);
    const prefix = Math.floor(testId / 10);
    
    if (prefix === 6) {
        res.json(physicsQuestions);
    } else if (prefix === 5) {
        res.json(turkceQuestions);
    } else if (prefix === 4) {
        res.json(mathQuestions);
    } else {
        res.json(englishQuestions);
    }
});

// Günün Hap Bilgisi
app.get('/api/daily-tip', (req, res) => {
    const tip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
    res.json(tip);
});

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

app.get('/api/instructors/:name', (req, res) => {
    const name = req.params.name;
    const instructor = instructors[name] || { name: name, bio: "Eğitmen", avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=" + name, specialty: "Genel", rating: "4.8" };
    let publishedTests = [];
    homeCategories.forEach(cat => {
        cat.tests.forEach(t => { if (t.author === name) publishedTests.push(t); });
    });
    res.json({ ...instructor, tests: publishedTests });
});

app.post('/api/tests/import', (req, res) => {
    const { title, author, categoryTitle, price, description } = req.body;
    const newTestId = Date.now();
    const newTest = {
        id: newTestId,
        title: title || "Öğretmen Testi",
        author: author || "YKS Kurdu",
        color: "FF6366F1",
        price: price || "49.99 ₺",
        description: description || "Eğitmen özel testidir.",
        instructorAvatar: instructors[author]?.avatar || "https://api.dicebear.com/7.x/avataaars/png?seed=teacher",
        imageUrl: demoImages[Math.floor(Math.random() * demoImages.length)],
        category: "Trend"
    };

    let targetCategory = homeCategories.find(c => c.title === categoryTitle);
    if (targetCategory) {
        targetCategory.tests.push(newTest);
    } else {
        homeCategories.push({ title: categoryTitle || "📚 Eğitmen Özel Serileri", tests: [newTest] });
    }

    res.json({ message: "Test başarıyla sisteme import edildi!", testId: newTestId });
});

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
        
        let category = "İngilizce";
        if(questionId >= 1 && questionId <= 20) category = "Matematik";
        else if(questionId >= 21 && questionId <= 40) category = "Fizik";
        else if(questionId >= 41 && questionId <= 60) category = "Türkçe";

        if (!stats.subjectStats[category]) {
            stats.subjectStats[category] = { correct: 0, wrong: 0, target: 100 };
        }

        if (isCorrect) { 
            stats.correct += 1; 
            stats.subjectStats[category].correct += 1;
            gainedXp = 35; 
            eloChange = 25; 
            stats.elo += eloChange;
        } else { 
            stats.wrong += 1; 
            stats.subjectStats[category].wrong += 1;
            gainedXp = 10; 
            eloChange = -15;
            stats.elo = Math.max(500, stats.elo + eloChange);
        }
        stats.totalQuestions = stats.correct + stats.wrong;
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