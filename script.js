document.addEventListener('DOMContentLoaded', () => {
    // State
    const state = {
        partner1: '',
        partner2: '',
        startDate: null,
        musicPlaying: false,
        theme: 'light',
        language: 'en'
    };

    // DOM Elements
    const elements = {
        setupModal: document.getElementById('setup-modal'),
        setupForm: document.getElementById('setup-form'),
        app: document.getElementById('app'),
        hero: document.getElementById('hero'),
        coupleNames: document.getElementById('couple-names'),
        timeTogether: document.getElementById('time-together'),
        timelineList: document.getElementById('timeline-list'),
        musicToggle: document.getElementById('music-toggle'),
        themeToggle: document.getElementById('theme-toggle'),
        quizContainer: document.getElementById('quiz-container'),
        giftBox: document.getElementById('gift-box'),
        aiPoem: document.getElementById('ai-poem'),
        bloomSection: document.getElementById('bloom'),
        bloomBtn: document.getElementById('bloom-btn'),
        flowerCanvas: document.getElementById('flower-canvas')
    };

    // Localization
    const translations = {
        en: {
            title: "Begin Your Story",
            p1Label: "Your Name",
            p2Label: "Partner's Name",
            dateLabel: "Love Began On",
            btnCreate: "Create Magic ✨",
            heroTitle: "Happy Valentine's Day",
            journeyTitle: "Our Journey",
            addMemory: "+ Add Memory",
            quizTitle: "Love Quiz",
            giftTitle: "A Gift For You",
            tapOpen: "Tap to open",
            bloomTitle: "Our Love Blooms",
            bloomMsg: "Use \"Shake\" gesture on mobile or click below!",
            bloomBtn: "Bloom 🌸",
            shareTitle: "Share Our Love",
            downloadBtn: "Download Card 📸",
            footer: "Made with ❤️ by AI Artisan",
            loading: "Weaving magic...",
            timeFormat: "years and %days% days",
            timeline: [
                { title: "First Met", desc: "The moment our worlds collided.", icon: "✨" },
                { title: "First Date", desc: "Butterflies and endless conversation.", icon: "🥂" },
                { title: "Falling in Love", desc: "Realizing you were the one.", icon: "💘" },
                { title: "Today", desc: "Celebrating our unique story.", icon: "🌹" }
            ],
            questions: [
                { q: "What's your favorite thing to do together?", options: ["Travel", "Cuddle", "Eat", "Adventure"] },
                { q: "Which word describes us best?", options: ["Passionate", "Goofy", "Soulmates", "Unstoppable"] },
                { q: "Where is our dream date?", options: ["Beach", "Mountain", "City", "Home"] }
            ],
            poemTemplates: [
                "In a world of chaos, %p2% is my calm,\nA soothing melody, a healing balm.\nSince %date%, my heart has known,\nThat with you, I am never alone.",
                "Roses are red, violets are blue,\nNo one makes me smile like %p2% do.\n%p1% loves you, through and through."
            ],
            quizResult: "You two are a match made in the stars! 100% Compatible."
        },
        tr: {
            title: "Hikayenize Başlayın",
            p1Label: "Adınız",
            p2Label: "Partnerinizin Adı",
            dateLabel: "Aşkın Başlangıcı",
            btnCreate: "Sihri Yarat ✨",
            heroTitle: "Sevgililer Günün Kutlu Olsun",
            journeyTitle: "Yolculuğumuz",
            addMemory: "+ Anı Ekle",
            quizTitle: "Aşk Testi",
            giftTitle: "Sana Bir Hediyem Var",
            tapOpen: "Açmak için dokun",
            bloomTitle: "Aşkımız Çiçek Açıyor",
            bloomMsg: "Mobilde cihazı salla veya aşağıdaki butona tıkla!",
            bloomBtn: "Çiçek Açtır 🌸",
            shareTitle: "Aşkımızı Paylaş",
            downloadBtn: "Kartı İndir 📸",
            footer: "AI Artisan tarafından ❤️ ile yapıldı",
            loading: "Sihir örülüyor...",
            timeFormat: "yıl ve %days% gün",
            timeline: [
                { title: "Tanışma", desc: "Dünyalarımızın çarpıştığı an.", icon: "✨" },
                { title: "İlk Randevu", desc: "Kelebekler ve bitmeyen sohbetler.", icon: "🥂" },
                { title: "Aşık Olmak", desc: "Aradığımın sen olduğunu anladığım an.", icon: "💘" },
                { title: "Bugün", desc: "Eşsiz hikayemizi kutluyoruz.", icon: "🌹" }
            ],
            questions: [
                { q: "Birlikte yapmayı en sevdiğiniz şey ne?", options: ["Seyahat", "Sarılmak", "Yemek", "Macera"] },
                { q: "Bizi en iyi anlatan kelime hangisi?", options: ["Tutkulu", "Şapşal", "Ruh İkizi", "Durdurulamaz"] },
                { q: "Hayalinizdeki randevu nerede?", options: ["Plaj", "Dağ", "Şehir", "Ev"] }
            ],
            poemTemplates: [
                "Kaosun ortasında, %p2% benim huzurum,\nRahatlatıcı bir melodi, şifalı bir merhem.\n%date% tarihinden beri kalbim biliyor,\nSeninle asla yalnız değilim.",
                "Güller kırmızı, menekşeler mavi,\nKimse beni %p2% gibi güldüremez.\n%p1% seni çok seviyor, hem de çok."
            ],
            quizResult: "Yıldızlarda yazılmış bir eşleşmesiniz! %100 Uyumlu."
        }
    };

    // Initialization
    init();

    function init() {
        const lang = navigator.language.startsWith('tr') ? 'tr' : 'en';
        state.language = lang;
        loadState();
        setupEventListeners();
        checkSetup();
        applyLanguage();
        initParticles();
        initFlower();
    }

    function applyLanguage() {
        const t = translations[state.language];
        document.getElementById('setup-title').textContent = t.title;
        document.querySelector('label[for="partner1"]').textContent = t.p1Label;
        document.querySelector('label[for="partner2"]').textContent = t.p2Label;
        document.querySelector('label[for="startDate"]').textContent = t.dateLabel;
        document.querySelector('#setup-form button').textContent = t.btnCreate;
        document.querySelector('#hero h1').textContent = t.heroTitle;
        document.querySelector('#timeline h2').textContent = t.journeyTitle;
        document.getElementById('add-memory-btn').textContent = t.addMemory;
        document.querySelector('#quiz h2').textContent = t.quizTitle;
        document.querySelector('#gift h2').textContent = t.giftTitle;
        document.querySelector('.instruction').textContent = t.tapOpen;
        document.querySelector('.bloom-msg h3').textContent = t.bloomTitle;
        document.querySelector('.bloom-msg p').textContent = t.bloomMsg;
        document.getElementById('bloom-btn').textContent = t.bloomBtn;
        document.querySelector('#share h2').textContent = t.shareTitle;
        document.getElementById('download-btn').textContent = t.downloadBtn;
        document.querySelector('footer p').innerHTML = t.footer;
        const loadText = document.getElementById('loading-text');
        if (loadText) loadText.textContent = t.loading;
    }

    function loadState() {
        const saved = JSON.parse(localStorage.getItem('vday_state'));
        if (saved) {
            state.partner1 = saved.partner1;
            state.partner2 = saved.partner2;
            state.startDate = new Date(saved.startDate);
            state.theme = saved.theme || 'light';
            // state.language is set by navigator, but we could save it too if we had a lang toggle
        }
        applyTheme();
    }

    function saveState() {
        localStorage.setItem('vday_state', JSON.stringify(state));
    }

    function checkSetup() {
        if (state.partner1 && state.partner2 && state.startDate) {
            elements.setupModal.classList.remove('active');
            elements.app.classList.remove('hidden');
            startExperience();
        } else {
            elements.setupModal.classList.add('active');
            const loadScreen = document.getElementById('loading-screen');
            if (loadScreen) loadScreen.style.display = 'none';
        }
    }

    function setupEventListeners() {
        elements.setupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const p1 = document.getElementById('partner1').value;
            const p2 = document.getElementById('partner2').value;
            const date = document.getElementById('startDate').value;

            if (p1 && p2 && date) {
                state.partner1 = p1;
                state.partner2 = p2;
                state.startDate = new Date(date);
                saveState();

                // Transition
                elements.setupModal.style.opacity = '0';
                setTimeout(() => {
                    elements.setupModal.classList.remove('active');
                    elements.app.classList.remove('hidden');
                    startExperience();
                }, 500);
            }
        });

        elements.themeToggle.addEventListener('click', () => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            applyTheme();
            saveState();
        });

        elements.musicToggle.addEventListener('click', toggleMusic);

        elements.giftBox.addEventListener('click', openGift);

        elements.bloomBtn.addEventListener('click', triggerBloom);

        // Shake detection for mobile
        let lastX, lastY, lastZ;
        let lastUpdate = 0;
        window.addEventListener('devicemotion', (e) => {
            const current = e.accelerationIncludingGravity;
            if (!current) return;

            const time = new Date().getTime();
            if ((time - lastUpdate) > 100) {
                const diffTime = time - lastUpdate;
                lastUpdate = time;

                const speed = Math.abs(current.x + current.y + current.z - lastX - lastY - lastZ) / diffTime * 10000;

                if (speed > 800) { // Shake threshold
                    triggerBloom();
                }

                lastX = current.x;
                lastY = current.y;
                lastZ = current.z;
            }
        });

        // Intersection Observer for Timeline
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        // Add dummy timeline items for observer to pick up later
        setTimeout(() => {
            document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
        }, 100);
    }

    function applyTheme() {
        document.documentElement.setAttribute('data-theme', state.theme);
        elements.themeToggle.textContent = state.theme === 'light' ? '🌙' : '☀️';
    }

    function startExperience() {
        // Hide loading
        const loadScreen = document.getElementById('loading-screen');
        if (loadScreen) {
            loadScreen.style.opacity = '0';
            setTimeout(() => loadScreen.remove(), 500);
        }

        // Set Texts
        elements.coupleNames.textContent = `${state.partner1} & ${state.partner2}`;
        updateTimeTogether();
        setInterval(updateTimeTogether, 1000 * 60); // Update every minute

        // Generate Content
        generateTimeline();
        initQuiz();
        generatePoem();
    }

    function updateTimeTogether() {
        if (!state.startDate) return;
        const now = new Date();
        const diff = now - state.startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const years = Math.floor(days / 365);
        const remainingDays = days % 365;

        const t = translations[state.language];
        const timeStr = t.timeFormat.replace('%days%', remainingDays);
        elements.timeTogether.textContent = `${years > 0 ? years + ' ' : ''}${timeStr}`;
    }

    // --- Timeline Generator ---
    function generateTimeline() {
        const t = translations[state.language];
        elements.timelineList.innerHTML = '';
        t.timeline.forEach((event, index) => {
            const div = document.createElement('div');
            div.className = 'timeline-item';
            div.style.transitionDelay = `${index * 0.2}s`;
            div.innerHTML = `
                <h3>${event.icon} ${event.title}</h3>
                <p>${event.desc}</p>
            `;
            elements.timelineList.appendChild(div);
        });
    }

    // --- Particle System (Hero) ---
    function initParticles() {
        const canvas = document.getElementById('heart-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;
        const particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 15 + 5;
                this.speedY = Math.random() * 1 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.y -= this.speedY;
                if (this.y < -50) this.y = height + 50;
            }
            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.font = `${this.size}px serif`;
                ctx.fillStyle = '#fff';
                ctx.fillText('❤️', this.x, this.y);
            }
        }

        for (let i = 0; i < 50; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }

    // --- Audio System (Web Audio API) ---
    let audioCtx;

    function toggleMusic() {
        if (state.musicPlaying) {
            if (audioCtx) audioCtx.suspend();
            state.musicPlaying = false;
            elements.musicToggle.textContent = '🎵';
            elements.musicToggle.style.opacity = '0.7';
        } else {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                playMelody();
            } else {
                audioCtx.resume();
            }
            state.musicPlaying = true;
            elements.musicToggle.textContent = '⏸️';
            elements.musicToggle.style.opacity = '1';
        }
    }

    function playMelody() {
        // Simple generative melody
        const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88]; // C Major

        function playNote() {
            if (!state.musicPlaying) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            // Random pentatonic-ish selection
            const freq = notes[Math.floor(Math.random() * notes.length)];

            osc.frequency.value = freq;
            osc.type = 'sine';

            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 1.5);

            setTimeout(playNote, 400 + Math.random() * 1000);
        }
        playNote();
    }

    // --- Logic: Quiz & AI Poem ---
    function initQuiz() {
        const t = translations[state.language];
        let currentQ = 0;

        function showQuestion() {
            if (currentQ >= t.questions.length) {
                document.getElementById('quiz-question').textContent = "";
                document.getElementById('quiz-options').innerHTML = "";
                document.getElementById('quiz-result').textContent = t.quizResult;
                document.getElementById('quiz-result').classList.remove('hidden');
                return;
            }

            const q = t.questions[currentQ];
            document.getElementById('quiz-question').textContent = q.q;
            const opts = document.getElementById('quiz-options');
            opts.innerHTML = '';

            q.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'quiz-option';
                btn.textContent = opt;
                btn.onclick = () => {
                    currentQ++;
                    showQuestion();
                };
                opts.appendChild(btn);
            });
        }
        showQuestion();
    }

    function generatePoem() {
        const t = translations[state.language];
        const template = t.poemTemplates[Math.floor(Math.random() * t.poemTemplates.length)];
        let poem = template
            .replace('%p1%', state.partner1)
            .replace('%p2%', state.partner2)
            .replace('%date%', state.startDate ? state.startDate.toDateString() : '');

        elements.aiPoem.innerHTML = poem.replace(/\n/g, '<br>');
    }

    function openGift() {
        elements.giftBox.classList.toggle('open');
    }

    // --- Flower Bloom (Easter Egg) ---
    function triggerBloom() {
        elements.bloomSection.classList.remove('bloom-hidden');
        elements.bloomSection.classList.add('bloom-active');
        document.getElementById('bloom-btn').style.display = 'none'; // Hide button after trigger
        drawFlower();
    }

    function drawFlower() {
        const canvas = elements.flowerCanvas;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Fractal Tree Logic
        function drawBranch(startX, startY, len, angle, branchWidth) {
            ctx.beginPath();
            ctx.save();
            ctx.strokeStyle = '#4a0404'; // dark wood color
            ctx.fillStyle = '#ffc0cb'; // pink
            ctx.lineWidth = branchWidth;
            ctx.translate(startX, startY);
            ctx.rotate(angle * Math.PI / 180);
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -len);
            ctx.stroke();

            if (len < 10) {
                // Leaf/Flower
                ctx.beginPath();
                ctx.arc(0, -len, 5, 0, Math.PI / 2);
                ctx.fill();
                ctx.restore();
                return;
            }

            drawBranch(0, -len, len * 0.75, angle + 15, branchWidth * 0.7);
            drawBranch(0, -len, len * 0.75, angle - 15, branchWidth * 0.7);

            ctx.restore();
        }

        // Start from bottom center
        drawBranch(canvas.width / 2, canvas.height, 120, 0, 10);
    }

    // Share Button
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: 'Our Love Story',
                    text: `Check out the love story of ${state.partner1} & ${state.partner2}!`,
                    url: window.location.href
                });
            } else {
                alert('URL copied to clipboard!');
                navigator.clipboard.writeText(window.location.href);
            }
        });
    }
});
