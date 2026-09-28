/* =========================
   CÀI ĐẶT CHUNG
========================= */

const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* =========================
   FORM LIÊN HỆ
========================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Kiểm tra dữ liệu
    if (name === "" || email === "" || message === "") {

        formMessage.textContent =
            "⚠️ Vui lòng nhập đầy đủ thông tin!";

        formMessage.style.color = "#d45b5b";

        return;
    }


    // Kiểm tra email
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        formMessage.textContent =
            "⚠️ Email không hợp lệ!";

        formMessage.style.color = "#d45b5b";

        return;
    }


    // Thông báo thành công
    formMessage.textContent =
        "💌 Gửi tin nhắn thành công! Cảm ơn bạn nhé 🌸";

    formMessage.style.color = "#2c7a51";


    // Xóa form
    contactForm.reset();

});


/* =========================
   LỌC DỰ ÁN
========================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");


function showCard(card, index) {

    card.style.display = "";
    card.classList.remove("is-hiding");

    if (reduceMotion) return;

    card.style.animation = "none";
    void card.offsetWidth;

    card.style.animation =
        "cardIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) " +
        (index * 50) + "ms both";
}


function hideCard(card) {

    card.classList.add("is-hiding");
    card.style.animation = "none";

    window.setTimeout(function() {

        if (card.classList.contains("is-hiding")) {
            card.style.display = "none";
        }

    }, 280);
}


filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.getAttribute("data-filter");
        let visibleIndex = 0;

        projectCards.forEach(function(card) {

            const category = card.getAttribute("data-category");
            const match = filter === "all" || category === filter;

            if (match) {
                showCard(card, visibleIndex);
                visibleIndex++;
            } else {
                hideCard(card);
            }

        });

    });

});


/* =========================
   MENU MOBILE
========================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

const navLinks =
    document.querySelectorAll(".navbar a");


function closeMenu() {

    navbar.classList.remove("show");

    menuToggle.setAttribute("aria-expanded", false);
    menuToggle.textContent = "☰";
}


menuToggle.addEventListener("click", function() {

    navbar.classList.toggle("show");

    const isOpen = navbar.classList.contains("show");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";

});


navLinks.forEach(function(link) {

    link.addEventListener("click", closeMenu);

});


document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") closeMenu();

});


document.addEventListener("click", function(event) {

    if (!navbar.classList.contains("show")) return;
    if (navbar.contains(event.target)) return;
    if (menuToggle.contains(event.target)) return;

    closeMenu();

});


/* =========================
   HEADER + MENU ACTIVE KHI CUỘN
========================= */

const header = document.querySelector(".header");
const sections = document.querySelectorAll("section");

let ticking = false;


function onScroll() {

    header.classList.toggle(
        "scrolled",
        window.scrollY > 8
    );

    let current = "";

    sections.forEach(function(section) {

        const sectionTop = section.offsetTop - 160;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(function(link) {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + current
        );

    });

    ticking = false;
}


window.addEventListener("scroll", function() {

    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(onScroll);

}, { passive: true });


onScroll();


/* =========================
   HIỆN DỊCH CHUYÊN MỤC
========================= */

const revealTargets = document.querySelectorAll("" +
    ".home-card > *, " +
    ".section-title, " +
    ".sub-title, " +
    ".about-left, " +
    ".about-box, " +
    ".hobbies, " +
    ".timeline, " +
    ".skill-card, " +
    ".soft-skill-card, " +
    ".language-card, " +
    ".project-filter, " +
    ".project-card, " +
    ".project-contact, " +
    ".achievement-card, " +
    ".academic-grid > div, " +
    ".activity, " +
    ".contact-info, " +
    ".contact-form"
);


const delayGroups = new Map();

revealTargets.forEach(function(el) {

    const parent = el.parentElement;
    const index = delayGroups.get(parent) || 0;

    delayGroups.set(parent, index + 1);

    el.setAttribute("data-reveal", "");
    el.style.setProperty(
        "--d",
        Math.min(index * 70, 350) + "ms"
    );

});


const hasIO = "IntersectionObserver" in window;

const revealObserver = hasIO
    ? new IntersectionObserver(function(entries) {

        entries.forEach(function(entry) {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);

        });

    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" })
    : null;


revealTargets.forEach(function(el) {

    const rect = el.getBoundingClientRect();
    const inFirstScreen =
        rect.top < window.innerHeight * 0.95 &&
        rect.bottom > 0;

    if (inFirstScreen || !revealObserver) {
        el.classList.add("is-visible");
    } else {
        revealObserver.observe(el);
    }

});


/* =========================
   THANH KỸ NĂNG
========================= */

const progressBars =
    document.querySelectorAll(".progress-bar");

progressBars.forEach(function(bar) {

    bar.dataset.target = bar.style.width;

    if (!reduceMotion) {
        bar.style.width = "0%";
    }

});


function animateBar(bar, delay) {

    window.setTimeout(function() {
        bar.style.width = bar.dataset.target;
    }, delay);
}


if (hasIO) {

    const barObserver = new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (!entry.isIntersecting) return;

                const bars =
                    entry.target.querySelectorAll(".progress-bar");

                bars.forEach(function(bar, index) {
                    animateBar(bar, index * 90);
                });

                barObserver.unobserve(entry.target);

            });

        },
        { threshold: 0.3 }
    );

    document.querySelectorAll(".skill-card").forEach(function(card) {
        barObserver.observe(card);
    });

} else {

    progressBars.forEach(function(bar) {
        bar.style.width = bar.dataset.target;
    });

}


/* =========================
   VÒNG KỸ NĂNG MỀM
========================= */

const circles = document.querySelectorAll(".circle");

function animateCircle(circle) {

    const label = circle.querySelector("strong");
    const target = parseFloat(label.textContent) || 0;

    if (reduceMotion) {
        circle.style.setProperty("--p", target);
        return;
    }

    const duration = 1100;
    const start = performance.now();

    function step(now) {

        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        circle.style.setProperty(
            "--p",
            (target * eased).toFixed(2)
        );

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}


if (hasIO) {

    const circleObserver = new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (!entry.isIntersecting) return;

                animateCircle(entry.target);
                circleObserver.unobserve(entry.target);

            });

        },
        { threshold: 0.5 }
    );

    circles.forEach(function(circle) {
        circleObserver.observe(circle);
    });

} else {

    circles.forEach(animateCircle);

}


/* =========================
   ĐẾM SỐ
========================= */

function animateCount(element) {

    const raw = element.textContent.trim();
    const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);

    if (!match || reduceMotion) return;

    const target = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = (match[1].split(".")[1] || "").length;

    const duration = 1200;
    const start = performance.now();

    let stopped = false;

    // Bảo vệ: luôn trả về đúng số gốc nếu animation bị gián đoạn
    window.setTimeout(function() {
        stopped = true;
        element.textContent = raw;
    }, duration + 400);

    function step(now) {

        if (stopped) return;

        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        element.textContent =
            (target * eased).toFixed(decimals) + suffix;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            stopped = true;
            element.textContent = raw;
        }
    }

    window.requestAnimationFrame(step);
}


function bindCounter(container) {

    if (!container) return;

    const numbers = container.querySelectorAll("strong");
    if (!numbers.length) return;

    if (!hasIO || reduceMotion) return;

    const observer = new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (!entry.isIntersecting) return;

                numbers.forEach(function(number, index) {
                    window.setTimeout(function() {
                        animateCount(number);
                    }, index * 90);
                });

                observer.unobserve(entry.target);

            });

        },
        { threshold: 0.4 }
    );

    observer.observe(container);
}


bindCounter(document.querySelector(".statistics"));
bindCounter(document.querySelector(".academic-grid"));
