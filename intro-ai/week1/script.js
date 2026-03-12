const navbar = document.querySelector(".navbar");

// 1. Scroll Effect
window.onscroll = () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
    navbar.style.padding = "15px 50px"; 
  } else {
    navbar.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
    navbar.style.padding = "25px 50px";
  }
};

// 2. Load Animations & Event Listeners
window.addEventListener("load", () => {
  const heroContent = document.querySelector(".hero-content");
  
  if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(30px)";
    heroContent.style.transition = "all 1s ease-out";

    setTimeout(() => {
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
    }, 100);
  }

  const projectBtn = document.querySelector(".cta-button");
  if (projectBtn) {
    projectBtn.addEventListener("click", () => {
      console.log("Redirecting to projects section...");
    });
  }

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});