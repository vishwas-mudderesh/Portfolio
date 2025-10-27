document.getElementById('year').textContent = new Date().getFullYear();

// Contact form stub
// const form = document.getElementById('contactForm');
// const status = document.getElementById('formStatus');
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   status.textContent = 'Sending...';
//   setTimeout(() => {status.textContent = 'Message sent!';form.reset();}, 800);
// });

// Carousel logic - show one card at a time, moves left/right
(function(){
  const slides = document.getElementById('slides');
  const slideCount = slides.children.length;
  let idx = 0;
  const dotsWrap = document.getElementById('dots');
  function renderDots(){
    dotsWrap.innerHTML = '';
    for(let i=0;i<slideCount;i++){
      const d = document.createElement('div');d.className='small-dot'+(i===idx? ' active':'');d.addEventListener('click',()=>go(i));dotsWrap.appendChild(d);
    }
  }
  function update(){
    slides.style.transform = `translateX(${-idx*100}%)`;
    renderDots();
  }
  function prev(){ idx = (idx-1+slideCount)%slideCount; update(); }
  function next(){ idx = (idx+1)%slideCount; update(); }
  function go(i){ idx = i; update(); }
  document.getElementById('prev').addEventListener('click',prev);
  document.getElementById('next').addEventListener('click',next);
  update();
})();

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(href.startsWith('#')){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  })
})

const skillIcons = document.querySelectorAll('.skill-icon');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillIcons.forEach((icon, index) => {
        setTimeout(() => {
          icon.classList.add('active');
        }, index * 200); // stagger by 0.2s
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

observer.observe(document.querySelector('.skills-grid'));

