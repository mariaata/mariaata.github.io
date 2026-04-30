function initCursor() {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.append(ring);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    document.addEventListener("mousemove", (e) => {
        mx = e.clientX; my = e.clientY;
    });

    function loop() {
        rx += (mx - rx) * 0.22;
        ry += (my - ry) * 0.22;
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
        requestAnimationFrame(loop);
    }
    loop();

    const interactiveSel = "a, button, .tile, .pj-card, .lang-cell, .stack-row, .tk, .pj-filter, .btn";
    document.querySelectorAll(interactiveSel).forEach((el) => {
        el.addEventListener("mouseenter", () => document.body.classList.add("cursor-active"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-active"));
    });
}

const descriptors = [
    "an aspiring product manager",
    "a Barnard senior at Columbia University",
    "passionate about data ethics",
    "building interfaces",
    "a foodie & traveler (@teetravelbites)",
    "a problem-solver", 
    "a creative thinker",
    "passionate about media and entertainment",
    "a researcher", 
    "passionate about tech advocacy", 
    "a Computer Science and Political Science student"
];
function initRotator() {
    const el = document.querySelector(".rotator");
    if (!el) return;
    let i = 0, c = 0, del = false;
    function tick() {
        const w = descriptors[i];
        if (!del) {
            el.textContent = w.slice(0, c + 1);
            c++;
            if (c === w.length) { del = true; return setTimeout(tick, 2200); }
            return setTimeout(tick, 55);
        } else {
            el.textContent = w.slice(0, c - 1);
            c--;
            if (c === 0) { del = false; i = (i + 1) % descriptors.length; return setTimeout(tick, 350); }
            return setTimeout(tick, 28);
        }
    }
    tick();
}

function tickClock() {
    const opts = { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/New_York" };
    const time = new Date().toLocaleTimeString("en-US", opts);
    document.querySelectorAll("[data-localtime]").forEach((el) => { el.textContent = time + " EST"; });
    document.querySelectorAll("[data-clock]").forEach((el) => { el.textContent = time; });
}

function initReveal() {
    const targets = document.querySelectorAll(
        ".tile, .pj-card, .pj-hero > *, .pj-tools, .contact-block"
    );
    const reveal = (el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
    };
    targets.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(14px)";
        el.style.transition = "opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)";
    });

    const io = new IntersectionObserver((entries) => {
        entries.forEach((e, idx) => {
            if (e.isIntersecting) {
                const i = [...targets].indexOf(e.target);
                setTimeout(() => reveal(e.target), Math.min(i * 35, 280));
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });

    targets.forEach((el) => io.observe(el));

    requestAnimationFrame(() => {
        targets.forEach((el, i) => {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0) {
                setTimeout(() => reveal(el), Math.min(i * 35, 280));
                io.unobserve(el);
            }
        });
    });

    setTimeout(() => targets.forEach(reveal), 1800);
}

function initTilt() {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.querySelectorAll(".tile").forEach((tile) => {
        tile.addEventListener("mousemove", (e) => {
            const r = tile.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            tile.style.transform = `perspective(900px) rotateX(${-y * 2.2}deg) rotateY(${x * 2.2}deg) translateY(-2px)`;
        });
        tile.addEventListener("mouseleave", () => {
            tile.style.transform = "";
        });
    });
}

function initFilters() {
    const filters = document.querySelectorAll(".pj-filter");
    if (!filters.length) return;
    const cards = document.querySelectorAll(".pj-card[data-cat]");
    const count = document.querySelector("[data-count]");

    function apply(cat) {
        let visible = 0;
        cards.forEach((c) => {
            const show = cat === "all" || c.dataset.cat.includes(cat);
            c.style.display = show ? "" : "none";
            if (show) visible++;
        });
        if (count) count.textContent = String(visible).padStart(2, "0");
    }

    filters.forEach((f) => {
        f.addEventListener("click", () => {
            filters.forEach((x) => x.classList.remove("active"));
            f.classList.add("active");
            apply(f.dataset.filter);
        });
    });
    apply("all");
}

function initTerminal() {
    const term = document.querySelector(".t-terminal .tile-body");
    if (!term) return;
    const lines = [
        { type: "cmd", txt: "whoami" },
        { type: "out", html: 'maria — senior @ <em>barnard / columbia</em> · cs + polisci · concentration in data science' },
        { type: "cmd", txt: "cat ./now.md" },
        { type: "out", html: 'building <em>humor study</em> · ranking system for memes · live at <a href="https://humor-project-5.vercel.app" target="_blank" rel="noopener">humor-project-5.vercel.app</a>' },
        { type: "cmd", txt: "ls ./interests" },
        { type: "out", html: '<em>data ethics/</em>  <em>product/</em>  <em>interfaces/</em>  <em>research/</em>  <em>civic-tech/</em>  <em>travel/</em>' },
        { type: "cmd", txt: "echo $STATUS" },
        { type: "out", html: 'open to <em>summer 2026 internships</em> · product, design, research · NYC or remote' },
        { type: "cmd", txt: "contact --me", cursor: true },
    ];

    term.innerHTML = "";
    let i = 0;
    function next() {
        if (i >= lines.length) return;
        const l = lines[i];
        const div = document.createElement("div");
        if (l.type === "cmd") {
            div.className = "term-line";
            div.innerHTML = `<span class="pr">maria@portfolio ~ %</span> <span class="cm">${l.txt}</span>${l.cursor ? '<span class="term-cursor"></span>' : ""}`;
        } else {
            div.className = "term-line";
            div.innerHTML = `<span class="term-out">${l.html}</span>`;
        }
        term.appendChild(div);
        term.scrollTop = term.scrollHeight;
        i++;
        setTimeout(next, l.type === "cmd" ? 600 : 380);
    }
    // Start once visible
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) { next(); io.disconnect(); }
        });
    }, { threshold: 0.2 });
    io.observe(term);
}

window.addEventListener("DOMContentLoaded", () => {
    initCursor();
    initRotator();
    tickClock();
    setInterval(tickClock, 30 * 1000);
    initReveal();
    initTilt();
    initFilters();
    initTerminal();
});
