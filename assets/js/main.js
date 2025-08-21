// main.js

// 1. AOS Animation
AOS.init({
  duration: 800,
  once: true,
});

// 2. Toggle FAQ
function toggleFaq(element) {
  const answer = element.querySelector('.faq-answer');
  answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
}

// 3. Scroll to Top
const scrollBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. Mobile Menu
function toggleMenu() {
  const navLinks = document.querySelector('.topbar .nav-links');
  if (navLinks) navLinks.classList.toggle('show');
}

// 5. Header Hide on Scroll
let lastScrollTop = 0;
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// 6. Header Reveal Animation
const animatedRevealHeader = document.querySelector(".animated-header-reveal");
window.addEventListener("load", () => {
  setTimeout(() => {
    animatedRevealHeader.classList.add("visible");
  }, 200);
});

// 7. Particles.js (μόνο σε desktop)
if(window.innerWidth > 480 && window.particlesJS) {
  particlesJS('particles-bg', {
    "particles": {
      "number": { "value": 30 },
      "color": { "value": "#ffffff" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.12 },
      "size": { "value": 2 },
      "move": { "enable": true, "speed": 0.7 }
    },
    "interactivity": {
      "events": { "onhover": { "enable": true, "mode": "repulse" } }
    }
  });
}

// 8. Typing Effect
document.addEventListener("DOMContentLoaded", function() {
  const text = "Επαγγελματικό, δυναμικό, επεξεργάσιμο";
  const el = document.getElementById("typed-effect");
  let i = 0;
  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 70);
    }
  }
  type();
});


// Footer include
document.addEventListener("DOMContentLoaded", function() {
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    });
});



document.querySelectorAll('.topbar .nav-links a').forEach(link => {
  link.addEventListener('click', function() {
    const navLinks = document.querySelector('.topbar .nav-links');
    if (window.innerWidth <= 768) {
      navLinks.classList.remove('show');
    }
  });
});



document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('formUnavailableMsg').style.display = 'block';
});