const TARGET = new Date('2026-12-02T07:00:00-07:00').getTime();
const $ = id => document.getElementById(id);
const pad = n => String(n).padStart(2,'0');
function updateCountdown(){
  const diff = TARGET - Date.now();
  if(diff <= 0){
    $('days').textContent='00'; $('hours').textContent='00'; $('minutes').textContent='00'; $('seconds').textContent='00';
    $('launch-status').textContent='¡Es momento del lanzamiento!'; return;
  }
  $('days').textContent=pad(Math.floor(diff/86400000));
  $('hours').textContent=pad(Math.floor((diff%86400000)/3600000));
  $('minutes').textContent=pad(Math.floor((diff%3600000)/60000));
  $('seconds').textContent=pad(Math.floor((diff%60000)/1000));
}
updateCountdown(); setInterval(updateCountdown,1000);
const observer = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const btn=document.querySelector('.menu-btn'), links=document.querySelector('.nav-links');
btn.addEventListener('click',()=>{const open=links.classList.toggle('open');btn.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');btn.setAttribute('aria-expanded','false')}));
