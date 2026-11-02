(() => {
  const R = window.REPORT;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const pad = n => String(n).padStart(2, '0');
  const fig = n => `assets/fig-${pad(n)}.png`;
  const cap = n => R.captions[n] || `Рисунок ${n}`;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const KIND = { v: 'Вертикальна ескалація', h: 'Горизонтальна · IDOR' };

  /* ───────────────── Build slides ───────────────── */
  // Each slide: { html, type, steps? } — type drives background placement.
  const slides = [];

  slides.push({
    type: 'title',
    html: `
      <div class="t-left">
        <div class="label rv" style="--i:0">${R.meta.course} · ЛР №5</div>
        <h1 class="display rv" style="--i:1"><span>Broken</span><span>Access Control</span></h1>
        <button class="pill glass cta rv" style="--i:3" data-next>Почати <span class="dot">→</span></button>
      </div>
      <div class="t-right">
        <p class="t-sub rv" style="--i:2">${R.meta.topic}</p>
        <h1 class="display rv" style="--i:2"><span>крок</span><span class="m">за кроком.</span></h1>
      </div>
      <div class="t-meta rv" style="--i:4">
        <img src="assets/logo.png" alt="Львівська політехніка">
        <div><span class="k">Виконав(ла)</span><b>${R.meta.author}</b>, ст. гр. ${R.meta.group}</div>
        <div><span class="k">Прийняв</span><b>${R.meta.teacher}</b>, ${R.meta.teacherTitle}</div>
        <span class="sp"></span>
        <div><span class="k">${R.meta.org}</span>${R.meta.city}</div>
      </div>`
  });

  const vLabs = R.labs.map((l, i) => l.kind === 'v' ? i + 1 : 0).filter(Boolean);
  const hLabs = R.labs.map((l, i) => l.kind === 'h' ? i + 1 : 0).filter(Boolean);
  const range = a => a.length ? (a.length > 1 ? `${pad(a[0])}–${pad(a[a.length - 1])}` : pad(a[0])) : '';

  slides.push({
    type: 'goal',
    html: `
      <div class="goal-l">
        <div class="label rv" style="--i:0">01 · Мета роботи</div>
        <h2 class="rv" style="--i:1">${R.meta.goal.replace('Практичне дослідження', '<em>Практичне дослідження</em>')}</h2>
        <div class="tools rv" style="--i:2">
          <span class="chip glass">Burp Suite<i>Proxy · Repeater</i></span>
          <span class="chip glass">DevTools<i>Elements · Cookies</i></span>
          <span class="chip glass">PortSwigger<i>Web Security Academy</i></span>
        </div>
      </div>
      <div class="goal-r">
        <div class="esc glass rv" style="--i:2">
          <h3>Вертикальна ескалація</h3><span class="labs">ЛАБИ ${range(vLabs)}</span>
          <div class="esc-viz"><span class="u">user</span><span class="ar"></span><span class="u hot">admin</span></div>
          <p>Звичайний користувач отримує доступ до функцій вищого рівня привілеїв.</p>
        </div>
        <div class="esc glass rv" style="--i:3">
          <h3>Горизонтальна · IDOR</h3><span class="labs">ЛАБИ ${range(hLabs)}</span>
          <div class="esc-viz"><span class="u">wiener</span><span class="ar both"></span><span class="u hot">carlos</span></div>
          <p>Користувач отримує доступ до даних іншого користувача того ж рівня.</p>
        </div>
      </div>`
  });

  slides.push({
    type: 'over',
    html: `
      <div class="over-head">
        <div style="display:flex;flex-direction:column;gap:14px">
          <div class="label rv" style="--i:0">02 · Завдання</div>
          <h2 class="display rv" style="--i:1">9 лабораторних<span class="m">PortSwigger Academy</span></h2>
        </div>
        <div class="legend rv" style="--i:2"><span>Вертикальна</span><span class="h">Горизонтальна · IDOR</span></div>
      </div>
      <div class="grid9">
        ${R.labs.map((l, i) => `
          <button class="card glass rv" style="--i:${2 + i * .5}" data-go="${3 + i}">
            <div class="row"><span class="n">${pad(i + 1)}</span><span class="k ${l.kind}">${l.kind === 'v' ? 'Vertical' : 'IDOR'}</span></div>
            <h3>${l.uk}</h3>
            <p>Lab: ${l.en}</p>
          </button>`).join('')}
      </div>`
  });

  R.labs.forEach((l, i) => {
    const figs = [...new Set(l.steps.flatMap(s => s.f))];
    slides.push({
      type: 'lab', lab: l, figs, steps: l.steps.length,
      html: `
        <div class="lab-l">
          <div class="label rv" style="--i:0">Завдання ${pad(i + 1)} · ${KIND[l.kind]}</div>
          <div class="lab-h rv" style="--i:1"><span class="num">${pad(i + 1)}</span><h2>${l.uk}</h2></div>
          <a class="lab-en rv" style="--i:1.5" href="${l.url}" target="_blank" rel="noopener">Lab: ${l.en} ↗</a>
          ${l.desc ? `<div class="desc glass rv" style="--i:2"><b>Опис вразливості</b>${l.desc}</div>` : ''}
          <ol class="steps rv" style="--i:3">
            ${l.steps.map((s, k) => `
              <li><button class="step" data-step="${k}">
                <span class="sn">${k + 1}</span>
                <span class="st">${s.t || '<span class="ph">Вставте текст кроку зі звіту</span>'}<span class="fr">РИС. ${s.f.join(', ')}</span></span>
              </button></li>`).join('')}
          </ol>
        </div>
        <figure class="viewer glass rv" style="--i:2">
          <div class="vbar"><i></i><i></i><i></i><span class="vtitle"></span><span class="vstep"></span></div>
          <div class="vimg" role="button" tabindex="0" aria-label="Відкрити скріншот на весь екран">
            <img alt=""><img alt=""><span class="vzoom">Натисніть, щоб збільшити</span>
          </div>
          <figcaption class="vcap"></figcaption>
          <div class="vthumbs">
            ${figs.map(n => `<button data-fig="${n}" aria-label="Рисунок ${n}"><img loading="lazy" src="${fig(n)}" alt=""><span>${n}</span></button>`).join('')}
          </div>
        </figure>`
    });
  });

  const C = R.conclusions;
  slides.push({
    type: 'end',
    html: `
      <div class="label rv" style="--i:0">Висновки</div>
      <h2 class="display rv" style="--i:1">${C.intro}</h2>
      <div class="cards4">
        ${C.cards.map((c, i) => `<div class="c4 glass rv" style="--i:${2 + i * .6}"><span class="k">${c.k}</span><h3>${c.h}</h3><p>${c.p}</p></div>`).join('')}
      </div>
      <div class="principles glass rv" style="--i:5">${C.principles.map(p => `<span>${p}</span>`).join('')}</div>`
  });

  slides.push({
    type: 'thx',
    html: `
      <h1 class="display rv" style="--i:0"><span>Дякую</span><span>за увагу.</span></h1>
      <div class="thx-r">
        <h1 class="display rv" style="--i:1"><span class="m">Питання?</span></h1>
        <p class="rv" style="--i:2">${R.meta.author} · ${R.meta.group}<br>Лабораторні: <a href="https://portswigger.net/web-security/access-control" target="_blank" rel="noopener">PortSwigger · Access control</a></p>
        <button class="pill glass cta rv" style="--i:3" data-go="0">На початок <span class="dot">↺</span></button>
      </div>`
  });

  const deck = $('#deck');
  deck.innerHTML = slides.map((s, i) =>
    `<section class="slide s-${s.type}" aria-roledescription="слайд" aria-label="${i + 1} з ${slides.length}">${s.html}</section>`).join('');
  const els = $$('.slide', deck);

  // Fix dock targets to real indices
  const endIdx = slides.findIndex(s => s.type === 'end');
  $('#dock [data-go="12"]').dataset.go = endIdx;

  /* ───────────────── State & navigation ───────────────── */
  let cur = -1, step = 0;
  const labStep = new Map();   // slide → shown fig within multi-fig step

  function go(i, st = 0, fromHash) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    const s = slides[i];
    st = s.steps ? Math.max(0, Math.min(s.steps - 1, st)) : 0;
    const changed = i !== cur;
    cur = i; step = st;

    els.forEach((el, k) => {
      el.classList.toggle('on', k === i);
      el.classList.toggle('before', k < i);
      el.setAttribute('aria-hidden', k === i ? 'false' : 'true');
      el.inert = k !== i;
    });
    if (changed) els[i].scrollTop = 0;
    if (s.type === 'lab') renderLab(i, s.lab.steps[st].f[0]);

    $('#count').textContent = `${pad(i + 1)} / ${pad(slides.length)}`;
    const total = slides.reduce((a, x) => a + (x.steps || 1), 0);
    const done = slides.slice(0, i).reduce((a, x) => a + (x.steps || 1), 0) + st + 1;
    $('#bar').style.width = (done / total * 100) + '%';
    moveDock();
    setAnchor(s, i);
    if (!fromHash) history.replaceState(null, '', `#${i + 1}${s.steps ? '.' + (st + 1) : ''}`);
  }

  function next() {
    const s = slides[cur];
    if (s.steps && step < s.steps - 1) go(cur, step + 1);
    else if (cur < slides.length - 1) go(cur + 1, 0);
  }
  function prev() {
    if (slides[cur].steps && step > 0) go(cur, step - 1);
    else if (cur > 0) { const p = slides[cur - 1]; go(cur - 1, p.steps ? p.steps - 1 : 0); }
  }

  function renderLab(i, figN) {
    const el = els[i], s = slides[i];
    labStep.set(i, figN);
    $$('.step', el).forEach((b, k) => {
      b.classList.toggle('is-on', k === step);
      b.classList.toggle('done', k < step);
    });
    const on = $$('.step', el)[step];
    const list = $('.steps', el);
    if (on && list.scrollHeight > list.clientHeight) {
      const top = on.offsetTop - list.offsetTop - list.clientHeight / 2 + on.offsetHeight / 2;
      list.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    }
    $('.vtitle', el).textContent = `fig-${pad(figN)}.png`;
    $('.vstep', el).textContent = `КРОК ${step + 1} / ${s.steps}`;
    $('.vcap', el).textContent = cap(figN);
    $$('.vthumbs button', el).forEach(b => {
      const isOn = +b.dataset.fig === figN;
      b.classList.toggle('on', isOn);
      if (isOn) b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduced ? 'auto' : 'smooth' });
    });
    // crossfade between the two stacked images
    const [a, b] = $$('.vimg img', el);
    const shown = a.classList.contains('show') ? a : b.classList.contains('show') ? b : null;
    const src = fig(figN);
    if (shown && shown.getAttribute('src') === src) return;
    const nxt = shown === a ? b : a;
    nxt.onload = () => { nxt.classList.add('show'); if (shown) shown.classList.remove('show'); };
    nxt.alt = cap(figN);
    nxt.src = src;
    if (nxt.complete && nxt.naturalWidth) nxt.onload();
  }

  /* ───────────────── Events ───────────────── */
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-go],[data-next],[data-step],[data-fig],.vimg');
    if (!t) return;
    if (t.dataset.go != null) go(+t.dataset.go);
    else if (t.hasAttribute('data-next')) next();
    else if (t.dataset.step != null) go(cur, +t.dataset.step);
    else if (t.dataset.fig != null) {
      const n = +t.dataset.fig, s = slides[cur];
      go(cur, s.lab.steps.findIndex(x => x.f.includes(n)));
      renderLab(cur, n);
    } else if (t.classList.contains('vimg')) openLb(labStep.get(cur));
  });

  $('#next').onclick = next;
  $('#prev').onclick = prev;

  document.addEventListener('keydown', e => {
    if (!$('#lb').hidden) {
      if (e.key === 'Escape') closeLb();
      return;
    }
    if (e.target.closest('input, textarea')) return;
    if (e.key === 'Enter' && e.target.classList?.contains('vimg')) { openLb(labStep.get(cur)); return; }
    const k = e.key;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(k)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0);
    else if (k === 'End') go(slides.length - 1);
    else if (k === 'f' || k === 'F' || k === 'а' || k === 'А') toggleFs();
  });

  // Wheel: native scroll wins while the hovered area can still scroll that way.
  let wheelLock = 0, wheelAcc = 0;
  addEventListener('wheel', e => {
    if (!$('#lb').hidden) return;
    const dy = e.deltaY;
    for (let n = e.target; n && n !== document.body; n = n.parentElement) {
      if (n.scrollHeight > n.clientHeight + 2 && /(auto|scroll)/.test(getComputedStyle(n).overflowY)) {
        if ((dy > 0 && n.scrollTop + n.clientHeight < n.scrollHeight - 2) || (dy < 0 && n.scrollTop > 2)) return;
      }
    }
    const now = performance.now();
    if (now < wheelLock) return;
    wheelAcc += dy;
    if (Math.abs(wheelAcc) > 40) {
      wheelAcc > 0 ? next() : prev();
      wheelAcc = 0; wheelLock = now + 650;
    }
  }, { passive: true });

  // Horizontal swipe on touch
  let tx = 0, ty = 0;
  addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4 && !e.target.closest('.vthumbs')) dx < 0 ? next() : prev();
  }, { passive: true });

  addEventListener('hashchange', readHash);
  function readHash() {
    const m = location.hash.match(/^#(\d+)(?:\.(\d+))?/);
    if (m) go(+m[1] - 1, m[2] ? +m[2] - 1 : 0, true);
  }

  // Fullscreen
  function toggleFs() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  }
  $('#fs').onclick = toggleFs;
  document.addEventListener('fullscreenchange', () => {
    $('#fs .pill-label').textContent = document.fullscreenElement ? 'Вийти' : 'На весь екран';
  });

  // Dock indicator
  const dockBtns = $$('#dock button');
  function moveDock() {
    const t = slides[cur].type;
    const idx = t === 'title' ? 0 : t === 'goal' ? 1 : (t === 'over' || t === 'lab') ? 2 : 3;
    dockBtns.forEach((b, k) => b.classList.toggle('on', k === idx));
    const b = dockBtns[idx], ind = $('#dockInd');
    ind.style.width = b.offsetWidth + 'px';
    ind.style.transform = `translateX(${b.offsetLeft}px)`;
  }
  addEventListener('resize', moveDock);

  // Lightbox
  const lb = $('#lb');
  function openLb(n) {
    if (!n) return;
    $('#lbImg').src = fig(n);
    $('#lbImg').alt = cap(n);
    $('#lbCap').textContent = cap(n);
    lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add('open'));
    $('#lbClose').focus();
  }
  function closeLb() {
    lb.classList.remove('open');
    setTimeout(() => { lb.hidden = true; }, 300);
  }
  lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('#lbClose')) closeLb(); });

  // Specular highlight follows the pointer on glass
  let lastGlass = null;
  addEventListener('pointermove', e => {
    const g = e.target.closest?.('.glass');
    if (lastGlass && lastGlass !== g) { lastGlass.style.removeProperty('--mx'); lastGlass.style.removeProperty('--my'); }
    lastGlass = g;
    if (g) {
      const r = g.getBoundingClientRect();
      g.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      g.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }
    mouse.tx = e.clientX / innerWidth - .5;
    mouse.ty = e.clientY / innerHeight - .5;
  }, { passive: true });

  /* ───────────────── Background: anchor per slide ───────────────── */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const A = {
    title: { x: .54, y: .44, s: .26, o: 1 },
    goal: { x: .86, y: .24, s: .17, o: .75 },
    over: { x: .5, y: .58, s: .44, o: .32 },
    end: { x: .88, y: .84, s: .2, o: .7 },
    thx: { x: .6, y: .42, s: .3, o: 1 }
  };
  const anchor = { x: .56, y: .46, s: .3, o: 1 };
  const live = { ...anchor };
  function setAnchor(s, i) {
    let a = A[s.type];
    // labs: the rock sits behind the glass viewer, so the frosted glass refracts its glow
    if (s.type === 'lab') a = (i % 2) ? { x: .74, y: .5, s: .3, o: .6 } : { x: .66, y: .42, s: .28, o: .6 };
    const mob = innerWidth < 900;
    Object.assign(anchor, a, mob ? { x: .5, y: s.type === 'title' ? .42 : .9, s: a.s * 1.2, o: a.o * .7 } : {});
  }

  /* WebGL liquid shader */
  const bg = $('#bg');
  const gl = bg.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false });
  let U = null;
  if (gl) {
    const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    const fs = `
      precision highp float;
      uniform vec2 R; uniform float T; uniform vec2 F; uniform vec2 M; uniform float K; uniform float S;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+1.),f.x),f.y);}
      float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<5;i++){s+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return s;}
      void main(){
        vec2 uv=(gl_FragCoord.xy-.5*R)/R.y; float asp=R.x/R.y;
        vec2 fc=vec2((F.x-.5)*asp,.5-F.y);
        vec2 p=(uv-fc)/max(S*2.6,.25)+M*.05;
        float t=T;
        vec2 q=vec2(fbm(p*1.4+t*.06),fbm(p*1.4-t*.05+4.));
        vec2 r=vec2(fbm(p*2.+q*2.2+t*.04),fbm(p*2.+q*2.2-t*.03+7.));
        float f=fbm(p*1.7+r*1.7);
        float d=length(p*vec2(1.,1.15));
        vec3 deep=vec3(.5,.1,.015), org=vec3(1.,.4,.03), amb=vec3(1.,.74,.42);
        vec3 col=vec3(.035,.02,.014);
        col+=deep*exp(-d*d*3.2)*.5*K;
        float body=smoothstep(.62,.0,d+(f-.5)*.75);
        col+=mix(deep,org,smoothstep(.4,.85,f))*body*.5*K;
        col+=amb*pow(body*f,3.)*.8*K;
        vec2 w=uv*1.05+vec2(t*.015,-t*.01);
        float liq=fbm(w+r*1.1);
        float band=smoothstep(.6,.72,liq)*smoothstep(.84,.72,liq);
        col+=mix(deep,org,liq)*pow(liq,4.5)*.38+org*band*.06;
        vec2 rp=uv-vec2(fc.x*.7,.9);
        float a=atan(rp.x,-rp.y);
        float ray=pow(n(vec2(a*16.,t*.18)),3.)*smoothstep(-.6,.5,uv.y)*smoothstep(1.1,.0,abs(a));
        col+=amb*ray*.13*(.4+.6*K);
        col*=1.-.6*smoothstep(.35,1.25,length(uv*vec2(.75,1.)));
        col+=(h(gl_FragCoord.xy+fract(t*7.)*91.)-.5)*.02;
        gl_FragColor=vec4(col,1.);
      }`;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(pr);
    if (gl.getProgramParameter(pr, gl.LINK_STATUS)) {
      gl.useProgram(pr);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(pr, 'p');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      U = Object.fromEntries(['R', 'T', 'F', 'M', 'K', 'S'].map(k => [k, gl.getUniformLocation(pr, k)]));
    }
  }

  /* Particle "rock" */
  const dust = $('#dust'), cx = dust.getContext('2d');
  const N = innerWidth < 900 ? 1600 : 3400;
  const P = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, rad = Math.sqrt(1 - y * y), th = golden * i;
    const isDust = Math.random() < .2;
    P.push({
      x: Math.cos(th) * rad, y, z: Math.sin(th) * rad,
      d: isDust ? 1.12 + Math.random() * .9 : 1,
      s: Math.random() * 6.28, v: .3 + Math.random() * .9, dust: isDust
    });
  }
  const COL = ['#a8360a', '#e0560a', '#ff8a2a', '#ffc68f'];

  let W = 0, H = 0, dpr = 1;
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 1.6);
    W = innerWidth; H = innerHeight;
    dust.width = W * dpr; dust.height = H * dpr;
    if (gl) { bg.width = Math.round(W * .5); bg.height = Math.round(H * .5); gl.viewport(0, 0, bg.width, bg.height); }
  }
  resize();
  addEventListener('resize', resize);

  const t0 = performance.now();
  let last = t0;
  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const t = (now - t0) / 1000 * (reduced ? .15 : 1);
    // critically-damped-ish follow toward the slide anchor
    const k = 1 - Math.exp(-dt * 2.6);
    for (const key of ['x', 'y', 's', 'o']) live[key] += (anchor[key] - live[key]) * k;
    mouse.x += (mouse.tx - mouse.x) * (1 - Math.exp(-dt * 3));
    mouse.y += (mouse.ty - mouse.y) * (1 - Math.exp(-dt * 3));

    if (U) {
      gl.uniform2f(U.R, bg.width, bg.height);
      gl.uniform1f(U.T, t);
      gl.uniform2f(U.F, live.x + mouse.x * .02, live.y + mouse.y * .02);
      gl.uniform2f(U.M, mouse.x, -mouse.y);
      gl.uniform1f(U.K, live.o);
      gl.uniform1f(U.S, live.s);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx.clearRect(0, 0, W, H);
    cx.globalCompositeOperation = 'lighter';
    const Rr = Math.min(W, H) * live.s;
    const ox = W * live.x + mouse.x * 30, oy = H * live.y + mouse.y * 20;
    const ya = t * .09 + mouse.x * .6, pa = .35 + mouse.y * .35;
    const cy = Math.cos(ya), sy = Math.sin(ya), cp = Math.cos(pa), sp = Math.sin(pa);
    for (const p of P) {
      let r = 1 + .17 * Math.sin(3 * p.x + t * .7) * Math.sin(3 * p.y + t * .5) * Math.cos(3 * p.z - t * .6)
        + .07 * Math.sin(8 * p.x + 5 * p.y + t * 1.3);
      if (p.dust) r *= p.d + .1 * Math.sin(t * p.v + p.s);
      const x = p.x * r * 1.18, y = p.y * r * .82, z = p.z * r;
      const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
      const y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
      const per = 2.8 / (2.8 + z2);
      const depth = (1 - z2) * .5;             // 0 back … 1 front
      const al = (.18 + .82 * depth * depth) * live.o * (p.dust ? .65 : 1);
      if (al < .02) continue;
      const sz = (p.dust ? 1.1 : 2) * per * (.7 + depth * .9);
      cx.globalAlpha = al;
      cx.fillStyle = COL[Math.min(3, (depth * 3.6) | 0)];
      cx.fillRect(ox + x1 * Rr * per, oy + y1 * Rr * per, sz, sz);
    }
    cx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }

  /* ───────────────── Start ───────────────── */
  go(0, 0, true);
  readHash();
  // skip the anchor glide on first paint
  Object.assign(live, anchor);
  requestAnimationFrame(frame);
})();
