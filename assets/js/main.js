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

/*============= GSAP ANIMATIONS (Premium Feel) =============*/
gsap.registerPlugin(ScrollTrigger);

// Hero Entrance
const tl = gsap.timeline();
tl.from('.landing-title', { duration: 1.2, y: 100, opacity: 0, ease: 'power4.out' })
  .from('.landing-headline', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' }, '-=0.8')
  .from('.landing-buttons', { duration: 0.8, y: 30, opacity: 0, ease: 'power2.out' }, '-=0.6')
  .from('.landing-slider', { duration: 0.8, opacity: 0 }, '-=0.4');

// Scroll Animations
gsap.utils.toArray('.section-title').forEach(title => {
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: 'top 85%',
    },
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power3.out'
  });
});

gsap.utils.toArray('.project-card').forEach(card => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 90%',
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
  });
});

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

const updateHue = (hue) => {
  document.documentElement.style.setProperty('--first-hue', hue);
  
  // Requirement: adjust background color of the 1st section as visitor drags
  // We'll use a very subtle, premium tinted version of the hue for the background
  const heroBg = `hsla(${hue}, 70%, 42%, 0.15)`;
  document.documentElement.style.setProperty('--hero-bg', heroBg);
  
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
const darkTheme = 'light-theme';
const iconTheme = 'ri-moon-line';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'light' : 'dark';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-sun-line' : 'ri-moon-line';

if (selectedTheme) {
  document.body.classList[selectedTheme === 'light' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'ri-sun-line' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
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

/*============= GSAP ANIMATIONS =============*/
window.addEventListener('load', () => {
  console.log('GSAP: Initializing animations...');
  
  try {
    gsap.registerPlugin(ScrollTrigger);

    // Safe-First: Hide elements only after GSAP is ready
    gsap.set('.landing-label, .landing-title, .landing-headline, .landing-buttons, .landing-slider, .project-card, .tools-group, .section-title', { 
      opacity: 0, 
      y: 30 
    });

    // Hero Entrance
    const tl = gsap.timeline();
    tl.to('.landing-label', { opacity: 1, y: 0, duration: 1, ease: 'power4.out' })
      .to('.landing-title', { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }, '-=0.8')
      .to('.landing-headline', { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, '-=0.8')
      .to('.landing-buttons', { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, '-=0.8')
      .to('.landing-slider', { opacity: 1, scale: 1, duration: 1, ease: 'power4.out' }, '-=0.6');

    console.log('GSAP: Hero animation fired.');

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

    // Tools Reveal
    gsap.to('.tools-group', {
      scrollTrigger: {
        trigger: '.tools-grid',
        start: 'top 95%',
      },
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    });

    // Section Title Reveal
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.to(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 95%',
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out'
      });
    });
    
    console.log('GSAP: Scroll animations initialized.');
  } catch (error) {
    console.error('GSAP Error:', error);
    // Elements are already opacity 1 by default in CSS, so no fallback needed.
  }
});