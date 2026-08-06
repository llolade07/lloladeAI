/*==================================================
  DATA ANALYTICS PORTFOLIO
  script.js
==================================================*/

/*==============================
    SMOOTH SCROLL (Fallback)
==============================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });
});


/*==============================
        STICKY NAVBAR
==============================*/

const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/*==============================
      ACTIVE NAVIGATION LINK
==============================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


/*==============================
      SCROLL REVEAL
==============================*/

const revealElements = document.querySelectorAll(
    ".card, .skill, .stat, #about p, h2"
);

function reveal() {

    revealElements.forEach(el => {

        const windowHeight = window.innerHeight;

        const revealTop = el.getBoundingClientRect().top;

        if (revealTop < windowHeight - 120) {

            el.classList.add("show");

        }

    });

}

window.addEventListener("scroll", reveal);

reveal();


/*==============================
        COUNTER
==============================*/

const counters = document.querySelectorAll(".counter");

const speed = 200;

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = +counter.dataset.target;

        const updateCounter = () => {

            const current = +counter.innerText;

            const increment = Math.ceil(target / speed);

            if (current < target) {

                counter.innerText = current + increment;

                setTimeout(updateCounter, 10);

            } else {

                counter.innerText = target;

            }

        };

        updateCounter();

        counterObserver.unobserve(counter);

    });

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});


/*==============================
        TYPEWRITER
==============================*/

const typingElement = document.querySelector(".typing");

if (typingElement) {

    const words = [

        "Data Analyst",

        "SQL Developer",

        "Power BI Specialist",

        "Excel Expert",

        "Python Analyst"

    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingElement.textContent =
                currentWord.substring(0, charIndex++);

            if (charIndex > currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1200);

                return;

            }

        } else {

            typingElement.textContent =
                currentWord.substring(0, charIndex--);

            if (charIndex === 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex >= words.length) {

                    wordIndex = 0;

                }

            }

        }

        setTimeout(typeEffect, deleting ? 60 : 120);

    }

    typeEffect();

}


/*==============================
     SCROLL TO TOP BUTTON
==============================*/

const topButton = document.querySelector(".top");

if (topButton) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topButton.classList.add("active");

        } else {

            topButton.classList.remove("active");

        }

    });

    topButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/*==============================
        PROJECT FILTER
==============================*/

const filterButtons = document.querySelectorAll(".filter-btn");

const projects = document.querySelectorAll(".card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.filter;

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        projects.forEach(project => {

            if (
                category === "all" ||
                project.dataset.category === category
            ) {

                project.style.display = "block";

            } else {

                project.style.display = "none";

            }

        });

    });

});


/*==============================
      CARD HOVER TILT
==============================*/

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = (x / rect.width - 0.5) * 12;

        const rotateX = (0.5 - y / rect.height) * 12;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});


/*==============================
      IMAGE PARALLAX
==============================*/

const heroImage = document.querySelector(".hero-image img");

window.addEventListener("scroll", () => {

    if (heroImage) {

        heroImage.style.transform =
            `translateY(${window.scrollY * 0.15}px)`;

    }

});


/*==============================
       PRELOADER
==============================*/

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 600);

    }

});


/*==============================
       COPYRIGHT YEAR
==============================*/

const year = document.querySelector(".year");

if (year) {

    year.textContent = new Date().getFullYear();

}

console.log(
"%cPortfolio Loaded Successfully",
"color:#38bdf8;font-size:18px;font-weight:bold;"
);
