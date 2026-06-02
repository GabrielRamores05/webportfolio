/*============= MENU SHOW & HIDDEN =============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*============= MENU SHOW =============*/
if(navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
    document.getElementById('header').classList.add('show-menu-header');
    document.body.classList.add('no-scroll');
  });
}

/*============= MENU HIDDEN =============*/
if(navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    document.getElementById('header').classList.remove('show-menu-header');
    document.body.classList.remove('no-scroll');
  });
}

/*============= REMOVE MENU MOBILE =============*/
const navLink = document.querySelectorAll('.nav-link');

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show-menu');
  document.getElementById('header').classList.remove('show-menu-header');
  document.body.classList.remove('no-scroll');
};

navLink.forEach((n) => n.addEventListener('click', linkAction));

/*============= CHANGE BACKGROUND HEADER =============*/
const scrollHeader = () => {
  const header = document.getElementById('header');
  window.scrollY >= 50
    ? header.classList.add('scroll-header')
    : header.classList.remove('scroll-header');
};
window.addEventListener('scroll', scrollHeader);

/*============= SCROLL SECTIONS ACTIVE LINK =============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 100,
          sectionId = current.getAttribute('id'),
          sectionClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

    if(sectionClass) {
      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        sectionClass.classList.add('active-link');
      } else {
        sectionClass.classList.remove('active-link');
      }
    }
  });
};
window.addEventListener('scroll', scrollActive);

/* GSAP animations are handled in the window 'load' event below */

/*============= MOUSE TRACKING GLOW (Top 1% Interaction) =============*/
document.querySelectorAll('.project-card').forEach(card => {
  card.onmousemove = e => {
    const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };
});

/*============= INTERACTIVE HUE SLIDER (Unified Logic) =============*/
const hueSlider = document.getElementById('hue-slider');
const hueValueText = document.getElementById('hue-value');
const favoriteColorField = document.getElementById('favorite-color');
const dynamicStyles = document.getElementById('dynamic-styles');

const updateHue = (hue) => {
  // Requirement: adjust background color of the 1st section as visitor drags
  // We'll use a very subtle, premium tinted version of the hue for the background
  const heroBg = `hsla(${hue}, 70%, 42%, 0.15)`;
  
  // Set CSS variables via a <style> tag to avoid inline styles on elements
  if (dynamicStyles) {
    dynamicStyles.textContent = `:root { --first-hue: ${hue}; --hero-bg: ${heroBg}; }`;
  }
  
  const colorNames = [
    {h: 30, n: 'Crimson Peak'}, {h: 60, n: 'Solar Flare'}, {h: 90, n: 'Electric Lime'},
    {h: 120, n: 'Jade Forest'}, {h: 150, n: 'Emerald Night'}, {h: 180, n: 'Arctic Frost'},
    {h: 210, n: 'Electric Sapphire'}, {h: 240, n: 'Deep Ocean'}, {h: 270, n: 'Royal Amethyst'},
    {h: 300, n: 'Neon Orchid'}, {h: 330, n: 'Midnight Rose'}, {h: 360, n: 'Crimson Peak'}
  ];

  const colorName = colorNames.find(c => hue < c.h)?.n || 'Custom';
  
  if(hueValueText) hueValueText.textContent = colorName;
  if(favoriteColorField) favoriteColorField.value = `${colorName} (${hue}°)`;
};

if(hueSlider) {
  hueSlider.addEventListener('input', (e) => updateHue(e.target.value));
  // Initialize
  updateHue(hueSlider.value);
}

/*============= THEME TOGGLE =============*/
const themeButton = document.getElementById('theme-toggle');
const lightThemeClass = 'light-theme';
const iconMoon = 'ri-moon-line';
const iconSun = 'ri-sun-line';

let selectedTheme = localStorage.getItem('selected-theme');

// Default to light theme if no preference is saved
if (!selectedTheme) {
  selectedTheme = 'light';
  localStorage.setItem('selected-theme', 'light');
}

if (selectedTheme === 'light') {
  document.body.classList.add(lightThemeClass);
  themeButton.classList.add(iconMoon);
  themeButton.classList.remove(iconSun);
} else {
  document.body.classList.remove(lightThemeClass);
  themeButton.classList.add(iconSun);
  themeButton.classList.remove(iconMoon);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(lightThemeClass);
    
    if (document.body.classList.contains(lightThemeClass)) {
      themeButton.classList.add(iconMoon);
      themeButton.classList.remove(iconSun);
      localStorage.setItem('selected-theme', 'light');
    } else {
      themeButton.classList.add(iconSun);
      themeButton.classList.remove(iconMoon);
      localStorage.setItem('selected-theme', 'dark');
    }
});

/*============= EMAIL JS =============*/
const contactForm = document.getElementById('contact-form');
const message = document.getElementById('message');

if(contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    emailjs.sendForm('service_8bt8akq', 'template_bbuikbr', '#contact-form', 'UAD5a48rFPLgFavcC')
      .then(() => {
        message.textContent = 'Message sent successfully!';
        message.style.color = 'var(--first-color)';
        contactForm.reset();
        setTimeout(() => message.textContent = '', 5000);
      }, (error) => {
        message.textContent = 'Oops! Something went wrong.';
        message.style.color = '#ef4444';
      });
  });
}

/*============= PRELOADER & GSAP ANIMATIONS =============*/
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const progress = document.querySelector('.preloader-progress');
  
   if (preloader && progress) {
     // Animate progress bar
     setTimeout(() => {
       progress.classList.add('full');
     }, 100);

     // Remove preloader and start animations faster
     setTimeout(() => {
       preloader.classList.add('loaded');
       initGSAP();
     }, 400);
   } else {
     initGSAP();
   }
});

function initGSAP() {
  console.log('GSAP: Initializing animations...');
  
  try {
    gsap.registerPlugin(ScrollTrigger);

    // Safe-First: Hide elements only after GSAP is ready
    gsap.set('.landing-label, .landing-title, .landing-headline, .landing-buttons, .landing-slider', { 
      opacity: 0, 
      y: 30 
    });
    gsap.set('.project-card', { 
      opacity: 0, 
      y: 40 
    });
    gsap.set('.section-title, .section-subtitle', { 
      opacity: 0
    });

    // Hero Entrance (Faster)
    const tl = gsap.timeline();
    tl.to('.landing-label', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to('.landing-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .to('.landing-headline', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to('.landing-buttons', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to('.landing-slider', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');

    console.log('GSAP: Hero animation fired.');

    // Section Header Reveal (title + subtitle together)
    document.querySelectorAll('.section').forEach(section => {
      const title = section.querySelector('.section-title');
      const subtitle = section.querySelector('.section-subtitle');
      if (title) {
        gsap.to(title, {
          scrollTrigger: { trigger: section, start: 'top 85%' },
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
      if (subtitle) {
        gsap.to(subtitle, {
          scrollTrigger: { trigger: section, start: 'top 85%' },
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out'
        });
      }
    });

    // Staggered Project Reveal
    gsap.to('.project-card', {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 92%',
      },
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });



    // Journey Timeline Fill
    gsap.utils.toArray('.timeline-fill').forEach(fill => {
      gsap.to(fill, {
        scrollTrigger: {
          trigger: fill.parentElement,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        },
        height: '100%',
        ease: 'none'
      });
    });
    
    console.log('GSAP: Scroll animations initialized.');
  } catch (error) {
    console.error('GSAP Error:', error);
  }
}

/*============= CUSTOM CURSOR LOGIC =============*/
const customCursor = document.getElementById('custom-cursor');

if (customCursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
  });

  // Expand cursor on interactive elements
  const interactives = document.querySelectorAll('a, button, input, textarea, .project-card, .tool-item, .hue-slider');
  
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      customCursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      customCursor.classList.remove('hover');
    });
  });
}

/*============= MAGNETIC BUTTONS =============*/
const magneticButtons = document.querySelectorAll('.button');

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Move the button slightly towards the cursor (strength: 0.3)
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}