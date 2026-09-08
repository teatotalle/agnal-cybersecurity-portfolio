const typed = document.getElementById("typed");
const progress = document.getElementById("progress");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const phrases = [
  "whoami",
  "learn cybersecurity",
  "build practical projects",
  "secure the future"
];

let phrase = 0, char = 0, deleting = false;

function typeLoop(){
  const text = phrases[phrase];
  typed.textContent = text.slice(0, char);

  if(!deleting && char < text.length){
    char++;
    setTimeout(typeLoop, 70);
  }else if(!deleting){
    deleting = true;
    setTimeout(typeLoop, 1100);
  }else if(char > 0){
    char--;
    setTimeout(typeLoop, 35);
  }else{
    deleting = false;
    phrase = (phrase + 1) % phrases.length;
    setTimeout(typeLoop, 250);
  }
}
typeLoop();

menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll("#navLinks a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: .12});
reveals.forEach(el => observer.observe(el));

const sections = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".slide-nav a");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      dots.forEach(d => d.classList.toggle("active", d.dataset.target === entry.target.id));
    }
  });
}, {threshold: .55});
sections.forEach(s => sectionObserver.observe(s));

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(window.scrollY / max) * 100}%`;
});
