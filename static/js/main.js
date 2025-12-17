        // --- 1. DARK MODE & LOCAL STORAGE ---
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const icon = themeToggle.querySelector('i');

        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if(body.classList.contains('dark-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });

        // --- 2. NAVBAR SCROLL ---
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // --- 3. SCROLL REVEAL ---
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(el => revealObserver.observe(el));

        // --- 4. FILTRAGE PROJETS (New Feature) ---
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Gestion classe active
                document.querySelector('.filter-btn.active').classList.remove('active');
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    // Reset animation
                    card.classList.remove('show');
                    
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hidden');
                        // Petit délai pour relancer l'animation
                        setTimeout(() => card.classList.add('show'), 10);
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });

        // --- 5. VISITE COUNTER (New Feature) ---
        const countSpan = document.getElementById('visitCount');
        let visits = localStorage.getItem('pageVisits');

        if (!visits) {
            visits = 0;
        }
        visits++;
        localStorage.setItem('pageVisits', visits);
        countSpan.innerText = visits;


        // --- 6. VALIDATION FORMULAIRE TEMPS RÉEL (New Feature) ---
        const form = document.getElementById('contactForm');
        const inputs = form.querySelectorAll('input, textarea');
        const emailInput = document.getElementById('email');
        const feedback = document.getElementById('form-feedback');
        const submitBtn = document.getElementById('submitBtn');

        // Regex simple email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation d'un champ
        function validateField(field) {
            let isValid = false;
            
            if (field.type === 'email') {
                isValid = emailRegex.test(field.value.trim());
            } else {
                isValid = field.value.trim() !== '';
            }

            if (isValid) {
                field.classList.remove('invalid');
                field.classList.add('valid');
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
            }
            return isValid;
        }

        // Écouteurs "input" (frappe) et "blur" (quitter le champ)
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                // On valide en temps réel seulement si le champ était déjà marqué invalide (UX moins agressive)
                if (input.classList.contains('invalid') || input.classList.contains('valid')) {
                    validateField(input);
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validation finale de tous les champs
            let formIsValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) formIsValid = false;
            });

            if (!formIsValid) {
                feedback.style.display = 'block';
                feedback.innerText = "Veuillez corriger les erreurs ci-dessus.";
                feedback.className = "error";
                return;
            }

            // Simulation d'envoi
            submitBtn.innerText = "Envoi...";
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerText = "Envoyer le message";
                submitBtn.disabled = false;
                
                feedback.style.display = 'block';
                feedback.innerText = "Message envoyé avec succès !";
                feedback.className = "success";
                
                form.reset();
                inputs.forEach(i => i.classList.remove('valid'));

                setTimeout(() => {
                    feedback.style.display = 'none';
                }, 5000);
            }, 1500);
        });


    // --- 7. MENU BURGER MOBILE ---
const burger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    // Animation de l'icône (optionnel : change bars en croix)
    burger.querySelector('i').classList.toggle('fa-bars');
    burger.querySelector('i').classList.toggle('fa-times');
});


// --- 8. ACTIVE LINK ON SCROLL ---
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // On active le lien si on a scrollé un tiers de la section
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active-link'); // Créez cette classe CSS
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active-link');
        }
    });
});

// --- 11. BACK TO TOP BUTTON ---
const toTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        toTopBtn.classList.add('active');
    } else {
        toTopBtn.classList.remove('active');
    }
});


// --- 10. SCROLL PROGRESS BAR ---
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    
    document.getElementById('progress-bar').style.width = scrolled + "%";
});


// --- 9. CUSTOM CURSOR ---
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

document.addEventListener('mousemove', function(e){
    cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
});



// --- INITIALISATION SWIPER CAROUSEL ---
// --- INITIALISATION SWIPER CAROUSEL ---
var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true, /* <--- AJOUTEZ CETTE LIGNE ICI (C'est la clé !) */
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        320: {
            effect: "slide",
            slidesPerView: 1,
            spaceBetween: 20
        },
        768: {
            effect: "coverflow",
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});

// Effet hover sur tous les liens et boutons
const links = document.querySelectorAll('a, button, .theme-toggle, .filter-btn');

links.forEach(link => {
    link.addEventListener('mouseover', () => {
        document.body.classList.add('hover-active');
    });
    link.addEventListener('mouseleave', () => {
        document.body.classList.remove('hover-active');
    });
});
AOS.init({
  duration: 1000, // Durée de l'animation (en ms)
  once: true,     // L'animation ne se joue qu'une fois
})


var typed = new Typed('#typed-text', {
  strings: ['Étudiant à Ynov', 'Développeur Web', 'Créateur sur Unreal Engine 5'],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true
});

// Animation du texte "Machine à écrire"
var typed = new Typed('#typed-text', {
  strings: [
    'Étudiant à Ynov.', 
    'Passionné par le Web.', 
    'Créateur sur Unreal Engine 5.'
  ],
  typeSpeed: 50,   // Vitesse de frappe
  backSpeed: 30,   // Vitesse d'effacement
  backDelay: 1500, // Temps de pause avant d'effacer
  loop: true       // Répéter à l'infini
});

// Initialisation de AOS (Rappel : doit être à la fin)
AOS.init({
  duration: 1000,
  once: true,
});


// --- KONAMI CODE (Version Finale avec Confettis & Notif) ---
const konamiCode = [
    'arrowup', 'arrowdown', 
    'arrowup', 'arrowdown'
];
let konamiIndex = 0;
const successAudio = new Audio('https://www.myinstants.com/media/sounds/level-up-sound-effect.mp3');

document.addEventListener('keydown', (e) => {
    let key = e.key.toLowerCase();

    if (key === konamiCode[konamiIndex]) {
        konamiIndex++;

        if (konamiIndex === konamiCode.length) {
            
            // 1. Jouer le son
            successAudio.volume = 0.5;
            successAudio.play().catch(e => console.log("Audio bloqué"));

            // 2. Changer les couleurs en OR
            document.documentElement.style.setProperty('--accent', '#FFD700');
            document.documentElement.style.setProperty('--text-main', '#FFD700');
            
            // 3. LANCER LES CONFETTIS (Explosion)
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#FFA500', '#FFFFFF'] // Couleurs or/blanc
            });

            // 4. AFFICHER LA BELLE NOTIFICATION
            const banner = document.getElementById('achievement-banner');
            banner.classList.add('visible');

            // La cacher après 4 secondes
            setTimeout(() => {
                banner.classList.remove('visible');
            }, 4000);
            
            // Reset
            konamiIndex = 0;
        }
    } else {
        if (key === 'arrowup') {
            konamiIndex = 1;
        } else {
            konamiIndex = 0;
        }
    }
});


// --- TITRE DYNAMIQUE (Onglet) ---
let docTitle = document.title;
window.addEventListener("blur", () => {
    document.title = "Revenez ! 😭";
});
window.addEventListener("focus", () => {
    document.title = docTitle;
});

// --- 12. INITIALISATION MANUELLE VANILLA TILT (3D) ---
// On vérifie si la librairie est bien chargée pour éviter les erreurs
if (typeof VanillaTilt !== 'undefined') {
    
    // Liste des éléments à animer (ajoutez vos classes ici)
    const tiltElements = document.querySelectorAll(".image-wrapper, .carousel-card, .soft-tag, .skill-item");
    
    VanillaTilt.init(tiltElements, {
        max: 15,            // Inclinaison maximale (plus c'est haut, plus ça penche)
        speed: 400,         // Vitesse de l'effet
        glare: true,        // Ajoute un reflet lumineux (très classe)
        "max-glare": 0.3,   // Intensité du reflet (0 à 1)
        scale: 1.05,        // Zoom léger au survol
        gyroscope: true     // Fonctionne aussi avec le téléphone qui bouge !
    });
    
} else {
    console.warn("Attention : VanillaTilt ne s'est pas chargé correctement.");
}