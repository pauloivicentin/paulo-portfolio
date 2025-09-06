/* Portfolio logic — Paulo Vicentin */
const el = (sel) => document.querySelector(sel);
const els = (sel) => Array.from(document.querySelectorAll(sel));

const state = {
  data: [],
  tags: new Set(),
  activeTag: null,
  query: '',
  sort: 'featured',
};

function renderChips() {
  const wrap = el('#tagChips');
  wrap.innerHTML = '';
  const tags = Array.from(state.tags).sort((a,b)=>a.localeCompare(b));
  for (const t of tags) {
    const chip = document.createElement('button');
    chip.className = 'chip' + (state.activeTag === t ? ' active' : '');
    chip.textContent = t;
    chip.onclick = () => {
      state.activeTag = state.activeTag === t ? null : t;
      render();
    };
    wrap.appendChild(chip);
  }
}

function projectMatches(p) {
  const q = state.query.trim().toLowerCase();
  const tagOk = !state.activeTag || p.tags.includes(state.activeTag);
  const text = (p.title + ' ' + p.description + ' ' + p.tags.join(' ') + ' ' + p.tech.join(' ')).toLowerCase();
  const qOk = !q || text.includes(q);
  return tagOk && qOk;
}

function sortData(arr) {
  if (state.sort === 'recent') return arr.slice().sort((a,b)=> (b.year||0)-(a.year||0));
  if (state.sort === 'az') return arr.slice().sort((a,b)=> a.title.localeCompare(b.title));
  // featured default
  return arr.slice().sort((a,b)=> (b.featured?1:0)-(a.featured?1:0) || (b.year||0)-(a.year||0));
}

function render() {
  const grid = el('#grid');
  const list = sortData(state.data.filter(projectMatches));
  grid.innerHTML = '';
  el('#emptyState').hidden = list.length > 0;

  for (const p of list) {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb" aria-label="Prévia do projeto ${p.title}">${p.badge ?? 'PROJETO'}</div>
      <div class="meta">
        <span>${p.year || ''}</span>
        <span>${p.type ?? ''}</span>
      </div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      ${p.link ? `<a class="btn alt" href="${p.link}" target="_blank" rel="noopener">Abrir</a>` : ''}
    `;
    grid.appendChild(card);
  }
}

async function load() {
  try {
    const res = await fetch('projects.json');
    const data = await res.json();
    state.data = data;
    // collect tags
    state.tags = new Set(data.flatMap(p=>p.tags));
    renderChips();
    render();
  } catch (e) {
    console.error('Erro carregando projetos:', e);
  }
}

function initUI() {
  el('#year').textContent = new Date().getFullYear();

  // search
  el('#search').addEventListener('input', (ev)=>{ state.query = ev.target.value; render(); });
  el('#sortSelect').addEventListener('change', (ev)=>{ state.sort = ev.target.value; render(); });

  // theme
  const themeBtn = el('#themeToggle');
  themeBtn.addEventListener('click', ()=>{
    const light = document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', light ? 'light' : 'dark');
  });
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.documentElement.classList.add('light');

  // mobile menu
  const menuBtn = el('#menuBtn');
  const navLinks = el('#navLinks');
  menuBtn.addEventListener('click', ()=> navLinks.classList.toggle('open'));

  // close nav on link click (mobile)
  els('.nav-links a').forEach(a=> a.addEventListener('click', ()=> navLinks.classList.remove('open')));
}

document.addEventListener('DOMContentLoaded', ()=> {
  initUI();
  load();
});
