const cards = document.querySelectorAll(
".project-card, .education-card, .experience-card, .contact-card, .hero-text, .hero-image, .about-image, .about-content");

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.2
});

cards.forEach(card=>{
    observer.observe(card);
});

const root = document.documentElement;
const themeToggleBtn = document.getElementById("themeToggle");

function applyTheme(theme){
    root.setAttribute("data-theme", theme);
    localStorage.setItem("riche-theme", theme);
}

function getInitialTheme(){
    const saved = localStorage.getItem("riche-theme");
    if(saved === "light" || saved === "dark"){
        return saved;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
}

applyTheme(getInitialTheme());

if(themeToggleBtn){
    themeToggleBtn.addEventListener("click", ()=>{
        const current = root.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
    });
}
const sideDots = document.querySelectorAll(".side-dot");
const sections = document.querySelectorAll("section[id]");

function updateActiveDot(){
    let current = "";
    sections.forEach(section=>{
        const sectionTop = section.offsetTop - 200;
        if(window.scrollY >= sectionTop){
            current = section.getAttribute("id");
        }
    });

    sideDots.forEach(dot=>{
        dot.classList.remove("active");
        const href = dot.getAttribute("href").replace("#","");
        if(href === current){
            dot.classList.add("active");
        }
    });
}

if(sideDots.length){
    window.addEventListener("scroll", updateActiveDot);
    updateActiveDot();
}
