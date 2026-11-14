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


const TEAM_PROFILES = [
  {
    "name": "Marco Francisco Martinez Diarte",
    "career": "Ingeniería en Nanotecnología y Materiales",
    "photo": "assets/team/author-000.jpg",
    "number": "01",
    "bio": "Mi nombre es Marco Francisco Martinez Diarte y soy estudiante de Ingeniería en Nanotecnología y Materiales en el Tecnológico de Monterrey. Realicé mis estudios de preparatoria en el CBTIS 224, donde destaqué académicamente y participé en actividades como la Olimpiada de Matemáticas y diversos proyectos escolares.\n\nActualmente, me enfoco en el estudio de nuevos materiales y sus propiedades a escala nanométrica, con interés en sus aplicaciones en la medicina, la industria automotriz y la tecnología. Mi objetivo es especializarme en esta área, participar en proyectos de investigación e innovación y desarrollar soluciones tecnológicas que contribuyan a resolver problemas reales."
  },
  {
    "name": "Sofía Mendoza Lagunas",
    "career": "Ingeniería · enfoque Industrial",
    "photo": "assets/team/author-001.jpg",
    "number": "02",
    "bio": "Soy Sofía Mendoza Lagunas, nací en Culiacán, Sin. y aquí he vivido toda mi vida.\n\nEstudié preparatoria en Tec de Monterrey Campus Sinaloa, y actualmente estoy cursando primer semestre de Ingeniería. Estoy rumbo a estudiar Ingeniería Industrial y pretendo trabajar en una empresa mejorando los procesos del área que ejerza y haciéndolos más sostenibles en todos los aspectos.\n\nMe gusta escuchar música, estar con mis amigos, leer, me encanta el café y ver vídeos de todo tipo."
  },
  {
    "name": "Maria Fernanda Ruiz Garcia",
    "career": "Ingeniería Industrial y de Sistemas",
    "photo": "assets/team/author-002.jpg",
    "number": "03",
    "bio": "Nací y crecí en Culiacán, Sinaloa, donde realicé mis estudios de preparatoria en el Centro de Bachillerato Tecnológico Industrial y de Servicios (CBTis 224), cursando la carrera técnica de Producción Industrial de Alimentos. Durante esta etapa, destaqué por mi participación en el desarrollo de programas y proyectos educativos que me permitieron descubrir mi interés por generar cambios positivos en mi entorno.\n\nActualmente, curso el primer semestre de Ingeniería Industrial y de Sistemas en el Tecnológico de Monterrey, Campus Sinaloa, donde busco desarrollar habilidades para optimizar procesos y mejorar su eficiencia.\n\nMi interés por el cuidado del medio ambiente también ha sido una parte importante de mi formación. A través de iniciativas como Cambiando Vidas y mi participación en Juventudes 2030, he aprendido que la colaboración y la participación ciudadana pueden transformar comunidades. Estas experiencias han fortalecido mi interés por impulsar una mayor conciencia ecológica, especialmente entre los jóvenes, y demostrarles que cuidar el medio ambiente puede ser una actividad dinámica y significativa.\n\nEn el ámbito profesional, me gustaría liderar equipos de trabajo que busquen mejorar procesos y desarrollar soluciones sostenibles dentro de las empresas. Aspiro a integrar la eficiencia industrial con el compromiso ambiental, contribuyendo a que el crecimiento y la innovación también generen beneficios para la sociedad.\n\nFuera del ámbito académico, disfruto cocinar, ver películas y participar en actividades de voluntariado, espacios que me permiten aprender, convivir y seguir contribuyendo a mi comunidad."
  },
  {
    "name": "Christopher David Ramírez García",
    "career": "Ingeniería Industrial",
    "photo": "assets/team/author-003.jpg",
    "number": "04",
    "bio": "Mi nombre es Christopher Ramírez. Realicé mis estudios de preparatoria en la Preparatoria Nueva Generación y actualmente curso la carrera de Ingeniería Industrial en el Tecnológico de Monterrey, Campus Sinaloa.\n\nMi inspiración es desarrollarme al máximo en mi área profesional, aprovechando las herramientas, conocimientos y oportunidades que me brinde la universidad para consolidarme como un ingeniero altamente competente."
  },
  {
    "name": "Abraham Jaim Alvarado Estrada",
    "career": "Ingeniería Industrial y de Sistemas",
    "photo": "assets/team/author-004.jpg",
    "number": "05",
    "bio": "Soy de Culiacán, Sinaloa, y actualmente estudio Ingeniería Industrial y de Sistemas en el Tecnológico de Monterrey. Desde pequeño me ha gustado practicar deporte, sobre todo triatlón, además de tocar el bajo eléctrico, hacer fotografía y aprender sobre tecnología. Estas actividades me han enseñado a ser constante y a buscar maneras de mejorar.\n\nTambién he participado en proyectos de marketing y administración, y a futuro me gustaría desarrollar mis propios proyectos y crear una empresa donde pueda combinar la ingeniería, los negocios y la creatividad."
  }
];

const profileModal = document.getElementById('profile-modal');
const profileName = document.getElementById('profile-name');
const profileCareer = document.getElementById('profile-career');
const profilePhoto = document.getElementById('profile-photo');
const profileNumber = document.getElementById('profile-number');
const profileBio = document.getElementById('profile-bio');
const profileClose = profileModal.querySelector('.profile-close');
let lastProfileTrigger = null;

function openProfile(index, trigger){
  const profile = TEAM_PROFILES[index];
  if(!profile) return;

  lastProfileTrigger = trigger || null;
  profileName.textContent = profile.name;
  profileCareer.textContent = profile.career;
  profilePhoto.src = profile.photo;
  profilePhoto.alt = profile.name;
  profileNumber.textContent = profile.number;

  profileBio.replaceChildren();
  profile.bio.split(/\n\s*\n/).forEach(text => {
    const p = document.createElement('p');
    p.textContent = text.trim();
    profileBio.appendChild(p);
  });

  profileModal.classList.add('open');
  profileModal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  profileClose.focus();
}

function closeProfile(){
  profileModal.classList.remove('open');
  profileModal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
  if(lastProfileTrigger) lastProfileTrigger.focus();
}

document.querySelectorAll('.profile-card').forEach(card => {
  card.addEventListener('click', () => openProfile(Number(card.dataset.profile), card));
  card.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' '){
      event.preventDefault();
      openProfile(Number(card.dataset.profile), card);
    }
  });
});

profileModal.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeProfile));
document.addEventListener('keydown', event => {
  if(event.key === 'Escape' && profileModal.classList.contains('open')) closeProfile();
});
\n\n// ---------- SPACE TEC sound design ----------\nconst ambientAudio = document.getElementById('ambient-audio');\nconst audioControl = document.getElementById('audio-control');\nambientAudio.volume = 0.24;\nlet ambientEnabled = false;\nlet uiAudioContext = null;\nlet lastHoverSound = 0;\n\nfunction getAudioContext(){\n  if(!uiAudioContext) uiAudioContext = new (window.AudioContext || window.webkitAudioContext)();\n  if(uiAudioContext.state === 'suspended') uiAudioContext.resume();\n  return uiAudioContext;\n}\n\nfunction tone(freq, start, duration, gainValue, type='sine'){\n  const ctx = getAudioContext();\n  const osc = ctx.createOscillator();\n  const gain = ctx.createGain();\n  osc.type = type; osc.frequency.setValueAtTime(freq, start);\n  gain.gain.setValueAtTime(0.0001, start);\n  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.012);\n  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);\n  osc.connect(gain); gain.connect(ctx.destination);\n  osc.start(start); osc.stop(start + duration + .03);\n}\n\nfunction playHoverSound(){\n  const nowMs = performance.now();\n  if(nowMs-lastHoverSound < 100) return;\n  lastHoverSound = nowMs;\n  const ctx=getAudioContext(), now=ctx.currentTime;\n  tone(740,now,.055,.018,'sine');\n  tone(1110,now+.018,.07,.010,'sine');\n}\n\nfunction playProfileOpenSound(){\n  const ctx=getAudioContext(), now=ctx.currentTime;\n  // Open fifth + ninth: spacious, consonant, short.\n  tone(293.66,now,.34,.028,'sine');\n  tone(440.00,now+.025,.38,.022,'sine');\n  tone(659.25,now+.055,.42,.014,'sine');\n}\n\nfunction syncAudioControl(){\n  const playing=!ambientAudio.paused;\n  audioControl.classList.toggle('playing',playing);\n  audioControl.setAttribute('aria-pressed',String(playing));\n  audioControl.setAttribute('aria-label',playing?'Pausar música ambiental':'Activar música ambiental');\n}\n\nasync function startAmbient(){\n  try{\n    await ambientAudio.play();\n    ambientEnabled=true; syncAudioControl();\n  }catch(e){ /* Browser is waiting for a user gesture. */ }\n}\n\naudioControl.addEventListener('click', async (event)=>{\n  event.stopPropagation(); getAudioContext();\n  if(ambientAudio.paused){ await startAmbient(); }\n  else { ambientAudio.pause(); ambientEnabled=false; syncAudioControl(); }\n});\nambientAudio.addEventListener('play',syncAudioControl);\nambientAudio.addEventListener('pause',syncAudioControl);\n\n// Browsers block autoplay with sound. Start the pad on the visitor's first intentional interaction.\nfunction firstInteraction(){\n  getAudioContext();\n  if(!ambientEnabled) startAmbient();\n  window.removeEventListener('pointerdown',firstInteraction,true);\n  window.removeEventListener('keydown',firstInteraction,true);\n}\nwindow.addEventListener('pointerdown',firstInteraction,true);\nwindow.addEventListener('keydown',firstInteraction,true);\n\n// Attach sound to the existing profile animations.\ndocument.querySelectorAll('.profile-card').forEach(card=>{\n  card.addEventListener('mouseenter',playHoverSound);\n  card.addEventListener('focus',playHoverSound);\n  card.addEventListener('click',playProfileOpenSound);\n  card.addEventListener('keydown',event=>{\n    if(event.key==='Enter' || event.key===' ') playProfileOpenSound();\n  });\n});\n