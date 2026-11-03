(() => {
  const R = window.REPORT;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const pad = n => String(n).padStart(2, '0');
  const fig = n => `assets/fig-${pad(n)}.png`;
  const cap = n => R.captions[n] || `Рисунок ${n}`;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const KIND = { v: 'Вертикальна ескалація', h: 'Горизонтальна · IDOR' };
  const vh = () => innerHeight;
  // headline lines slide up out of a mask, one after another
  const ln = (arr, i0 = 0) => arr.map(([t, c = ''], k) =>
    `<span class="ln" style="--l:${i0 + k}"><span class="${c}">${t}</span></span>`).join('');

  /* ───────────────── Sections ───────────────── */
  const S = [];   // { type, label, html, lab?, steps? }

  S.push({
    type: 'hero', label: 'Вступ',
    html: `
      <div class="hero-t">
        <div class="label rv" style="--i:0;margin-bottom:3vh">${R.meta.course} — Лабораторна робота №5</div>
        <h1 class="display lines">${ln([['Broken'], ['Access', 'o'], ['Control']], 1)}</h1>
      </div>
      <div class="hero-v vert rv" style="--i:3">Уразливості контролю доступу<small>ЛР 5 · ${R.meta.city.replace(/\D+/g, '')}</small></div>
      <div class="hero-f rv" style="--i:4">
        <div><span class="k">Виконав(ла)</span><b>${R.meta.author}</b>ст. гр. ${R.meta.group}</div>
        <div><span class="k">Прийняв</span><b>${R.meta.teacher}</b>${R.meta.teacherTitle}</div>
        <div><span class="k">${R.meta.org}</span>${R.meta.city}</div>
        <span class="sp"></span>
        <div class="cue"><i></i>Гортайте вниз</div>
      </div>`
  });

  const ids = k => R.labs.map((l, i) => l.kind === k ? i + 1 : 0).filter(Boolean);
  const range = a => a.length > 1 ? `${pad(a[0])}–${pad(a[a.length - 1])}` : a.map(pad).join('');

  S.push({
    type: 'goal', label: 'Мета',
    html: `
      <div class="goal-l">
        <div class="label rv" style="--i:0">01 — Мета роботи</div>
        <h2 class="rv" style="--i:1">${R.meta.goal.replace('Практичне дослідження', '<em>Практичне дослідження</em>')}</h2>
        <div class="tools rv" style="--i:2"><span>Burp Suite · Proxy, Repeater</span><span>DevTools</span><span>PortSwigger Web Security Academy</span></div>
      </div>
      <div class="goal-r">
        <div class="esc lg rv" style="--i:2">
          <div class="row"><h3>Вертикальна ескалація</h3><span class="labs">ЛАБИ ${range(ids('v'))}</span></div>
          <div class="esc-viz"><span class="u">user</span><span class="ar"></span><span class="u hot">admin</span></div>
          <p>Звичайний користувач отримує доступ до функцій вищого рівня привілеїв.</p>
        </div>
        <div class="esc lg rv" style="--i:3">
          <div class="row"><h3>Горизонтальна · IDOR</h3><span class="labs">ЛАБИ ${range(ids('h'))}</span></div>
          <div class="esc-viz"><span class="u">wiener</span><span class="ar both"></span><span class="u hot">carlos</span></div>
          <p>Користувач отримує доступ до даних іншого користувача того ж рівня.</p>
        </div>
      </div>`
  });

  S.push({
    type: 'over', label: 'Завдання',
    html: `
      <div class="over-h">
        <div style="display:flex;flex-direction:column;gap:2vh">
          <div class="label rv" style="--i:0">02 — Завдання</div>
          <h2 class="display lines">${ln([['Дев’ять&nbsp;'], ['завдань', 'm']], 1)}</h2>
        </div>
        <div class="legend rv" style="--i:2"><span>Вертикальна</span><span class="h">Горизонтальна · IDOR</span></div>
      </div>
      <ol class="list">
        ${R.labs.map((l, i) => `
          <li class="rv" style="--i:${2 + i * .4}"><a href="#${4 + i}" data-go="${3 + i}">
            <span class="n">${pad(i + 1)}</span><h3>${l.uk}</h3><span class="en">${l.en}</span>
            <span class="k ${l.kind}">${l.kind === 'v' ? 'Vertical' : 'IDOR'}</span>
          </a></li>`).join('')}
      </ol>`
  });

  R.labs.forEach((l, i) => {
    const n = l.steps.length;
    S.push({
      type: 'lab', label: `Лаба ${pad(i + 1)}`, lab: l, steps: n,
      html: `
        ${l.steps.map((_, k) => `<i class="snap" style="top:${k * 100}vh"></i>`).join('')}
        <div class="stage">
          <div class="lab-l">
            <div class="label rv" style="--i:0">Завдання ${pad(i + 1)} — ${KIND[l.kind]}</div>
            <div class="lab-num rv" style="--i:1">${pad(i + 1)}</div>
            <h2 class="rv" style="--i:2">${l.uk}</h2>
            <a class="lab-en rv" style="--i:2.5" href="${l.url}" target="_blank" rel="noopener">Lab: ${l.en} ↗</a>
            ${l.desc ? `<p class="desc rv" style="--i:3">${l.desc}</p>` : ''}
            <ol class="steps rv" style="--i:3.5">
              <span class="fill"></span>
              ${l.steps.map((s, k) => `
                <li><button class="step" data-step="${k}">
                  <span class="sn">${pad(k + 1)}</span>
                  <span>${s.t || '<span class="ph">Вставте текст кроку зі звіту</span>'}<span class="fr">Рис. ${s.f.join(', ')}</span></span>
                </button></li>`).join('')}
            </ol>
          </div>
          <div class="vwrap rv" style="--i:2">
            <figure class="viewer lg">
              <div class="vimg" role="button" tabindex="0" aria-label="Відкрити скріншот на весь екран"><img alt=""><img alt=""><span class="vzoom">⤢</span></div>
              <figcaption class="vfoot"><span class="vcap"></span><span class="vstep"><b></b><i>/ ${pad(n)}</i></span></figcaption>
            </figure>
          </div>
        </div>`
    });
  });

  const C = R.conclusions;
  S.push({
    type: 'end', label: 'Висновки',
    html: `
      <div class="label rv" style="--i:0">Висновки</div>
      <h2 class="display rv" style="--i:1">${C.intro}</h2>
      <div class="cards4">
        ${C.cards.map((c, i) => `<div class="c4 lg rv" style="--i:${2 + i * .5}"><span class="k">${c.k}</span><h3>${c.h}</h3><p>${c.p}</p></div>`).join('')}
      </div>
      <div class="principles rv" style="--i:4.5">${C.principles.map(p => `<span>${p}</span>`).join('')}</div>`
  });

  S.push({
    type: 'thx', label: 'Кінець',
    html: `
      <h1 class="display lines">${ln([['Дякую'], ['за увагу.', 'o']])}</h1>
      <div class="thx-f rv" style="--i:2">
        <span>${R.meta.author} · ${R.meta.group}</span>
        <a href="https://portswigger.net/web-security/access-control" target="_blank" rel="noopener">PortSwigger · Access control ↗</a>
        <button class="lg" data-go="0">На початок ↑</button>
      </div>`
  });

  const deck = $('#deck');
  deck.innerHTML = S.map((s, i) => `
    <section class="sec s-${s.type}" id="s${i}" aria-label="${s.label}"
      ${s.steps ? `style="height:${s.steps * 100}vh"` : ''}>${s.html}</section>`).join('');
  const secs = $$('.sec', deck);

  $('#rail').innerHTML = S.map((s, i) => `<a href="#${i + 1}" data-go="${i}"><span>${s.label}</span><i></i></a>`).join('');
  const railLinks = $$('#rail a');

  /* ───────────────── Scroll state ───────────────── */
  let cur = -1;
  const labState = new Map();   // section index → { step, fig }

  function snapPoints() {
    const pts = [];
    secs.forEach((el, i) => {
      const top = el.offsetTop;
      if (S[i].steps) for (let k = 0; k < S[i].steps; k++) pts.push({ y: top + k * vh(), i, k });
      else pts.push({ y: top, i, k: 0 });
    });
    return pts;
  }
  const scrollToY = (y, smooth = true) => scrollTo({ top: y, behavior: smooth && !reduced ? 'smooth' : 'auto' });
  function goTo(i, k = 0, smooth) {
    const p = snapPoints().find(p => p.i === i && p.k === k) || snapPoints().find(p => p.i === i);
    if (p) scrollToY(p.y, smooth);
  }

  function onScroll() {
    const y = scrollY, H = vh();
    let i = 0;
    secs.forEach((el, k) => { if (el.offsetTop <= y + H * .5) i = k; });
    if (i !== cur) {
      cur = i;
      secs[i].classList.add('in');
      railLinks.forEach((a, k) => a.classList.toggle('on', k === i));
      $('#count').textContent = `${pad(i + 1)} — ${pad(S.length)}`;
    }
    // lab step from scroll position
    secs.forEach((el, k) => {
      if (!S[k].steps) return;
      const rel = (y - el.offsetTop) / H;
      if (rel < -1 || rel > S[k].steps) return;
      const st = Math.max(0, Math.min(S[k].steps - 1, Math.round(rel)));
      const prev = labState.get(k);
      if (!prev || prev.step !== st) renderLab(k, st, S[k].lab.steps[st].f[0], prev ? st > prev.step : true);
    });
    const max = document.documentElement.scrollHeight - H;
    $('#bar').style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    $('#bar').style.width = '100%';
    const st = labState.get(i);
    const hash = `#${i + 1}${S[i].steps && st ? '.' + (st.step + 1) : ''}`;
    if (location.hash !== hash) history.replaceState(null, '', hash);
  }

  function renderLab(i, step, figN, forward = true) {
    const el = secs[i], s = S[i];
    labState.set(i, { step, fig: figN });
    const btns = $$('.step', el);
    btns.forEach((b, k) => { b.classList.toggle('is-on', k === step); b.classList.toggle('done', k < step); });
    const list = $('.steps', el), on = btns[step];
    if (on) {
      const li = on.parentElement;
      $('.fill', el).style.height = (li.offsetTop + li.offsetHeight / 2 - 6) + 'px';
      if (list.scrollHeight > list.clientHeight) list.scrollTo({ top: li.offsetTop - list.clientHeight / 2 + li.offsetHeight / 2, behavior: reduced ? 'auto' : 'smooth' });
    }
    $('.vcap', el).textContent = cap(figN);
    const num = $('.vstep b', el);
    if (num.textContent !== pad(step + 1)) {
      num.textContent = pad(step + 1);
      num.classList.remove('tick'); void num.offsetWidth; num.classList.add('tick');
    }

    const [a, b] = $$('.vimg img', el);
    const shown = a.classList.contains('show') ? a : b.classList.contains('show') ? b : null;
    const src = fig(figN);
    if (shown && shown.getAttribute('src') === src) return;
    const nxt = shown === a ? b : a;
    el.dataset.dir = forward ? 'down' : 'up';
    nxt.onload = () => {
      fitViewer(i, nxt.naturalWidth, nxt.naturalHeight);
      requestAnimationFrame(() => {
        nxt.classList.remove('out'); nxt.classList.add('show');
        if (shown) { shown.classList.remove('show'); shown.classList.add('out'); }
      });
    };
    nxt.alt = cap(figN);
    nxt.src = src;
    if (nxt.complete && nxt.naturalWidth) nxt.onload();
    // warm the cache for the next screenshot
    const nf = s.lab.steps[step + 1]?.f[0];
    if (nf) new Image().src = fig(nf);
  }

  // The frame takes the exact aspect of the screenshot, so there is never an empty band around it.
  const dims = new Map();   // section → [w, h] of the shown screenshot
  function fitViewer(i, w, h) {
    if (!w || !h) return;
    dims.set(i, [w, h]);
    const el = secs[i], wrap = $('.vwrap', el), box = $('.vimg', el);
    const pad = 20, foot = $('.vfoot', el).offsetHeight || 44;
    const AW = wrap.clientWidth - pad, AH = wrap.clientHeight - pad - foot;
    const s = Math.min(AW / w, AH / h, 1.6);
    box.style.width = Math.round(w * s) + 'px';
    box.style.height = Math.round(h * s) + 'px';
  }

  addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
  addEventListener('resize', () => requestAnimationFrame(() => {
    onScroll();
    dims.forEach(([w, h], i) => fitViewer(i, w, h));
  }));

  /* ───────────────── Input ───────────────── */
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-go],[data-step],.vimg');
    if (!t) return;
    e.preventDefault();
    if (t.dataset.go != null) goTo(+t.dataset.go);
    else if (t.dataset.step != null) goTo(cur, +t.dataset.step);
    else openLb(labState.get(cur)?.fig);
  });

  function stepBy(dir) {
    const y = scrollY, pts = snapPoints();
    const p = dir > 0 ? pts.find(p => p.y > y + 4) : [...pts].reverse().find(p => p.y < y - 4);
    if (p) scrollToY(p.y);
  }
  document.addEventListener('keydown', e => {
    if (!$('#lb').hidden) { if (e.key === 'Escape') closeLb(); return; }
    if (e.key === 'Enter' && e.target.classList?.contains('vimg')) { openLb(labState.get(cur)?.fig); return; }
    const k = e.key;
    if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(k)) { e.preventDefault(); stepBy(1); }
    else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(k)) { e.preventDefault(); stepBy(-1); }
    else if (k === 'Home') { e.preventDefault(); goTo(0); }
    else if (k === 'End') { e.preventDefault(); goTo(S.length - 1); }
    else if (/^[fFаА]$/.test(k)) toggleFs();
  });

  function toggleFs() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  }

  // Lightbox
  const lb = $('#lb');
  function openLb(n) {
    if (!n) return;
    $('#lbImg').src = fig(n); $('#lbImg').alt = cap(n); $('#lbCap').textContent = cap(n);
    lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add('open'));
    $('#lbClose').focus();
  }
  function closeLb() { lb.classList.remove('open'); setTimeout(() => { lb.hidden = true; }, 320); }
  lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('#lbClose')) closeLb(); });

  /* ───────────────── Liquid glass refraction (Chromium) ─────────────────
     Each .lg element gets its own SVG filter: a displacement map built from the
     signed distance to its rounded edge, so the backdrop bends along the rim. */
  const chromium = !!navigator.userAgentData?.brands?.some(b => /Chromium/i.test(b.brand));
  const defs = $('#lgDefs');
  let fid = 0;
  function lens(el) {
    const w = el.offsetWidth, h = el.offsetHeight;
    if (w < 8 || h < 8) return;
    const cs = getComputedStyle(el);
    let rad = cs.borderTopLeftRadius;
    rad = rad.endsWith('%') ? Math.min(w, h) * parseFloat(rad) / 100 : parseFloat(rad) || 0;
    const hw = w / 2, hh = h / 2, rr = Math.min(rad, hw, hh);
    const bezel = Math.min(26, Math.min(w, h) * .3);
    const sc = Math.min(1, 180 / Math.max(w, h));            // map resolution
    const cw = Math.max(2, Math.round(w * sc)), ch = Math.max(2, Math.round(h * sc));
    const cv = document.createElement('canvas'); cv.width = cw; cv.height = ch;
    const ctx = cv.getContext('2d'), img = ctx.createImageData(cw, ch), d = img.data;
    for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
      const px = (x + .5) / sc - hw, py = (y + .5) / sc - hh;
      const qx = Math.abs(px) - (hw - rr), qy = Math.abs(py) - (hh - rr);
      let dist, nx, ny;
      if (qx > 0 || qy > 0) {
        const mx = Math.max(qx, 0), my = Math.max(qy, 0), L = Math.hypot(mx, my) || 1;
        dist = L - rr; nx = mx / L; ny = my / L;
      } else {
        dist = Math.max(qx, qy) - rr;
        if (qx > qy) { nx = 1; ny = 0; } else { nx = 0; ny = 1; }
      }
      nx *= px < 0 ? -1 : 1; ny *= py < 0 ? -1 : 1;
      const e = -dist;
      let m = 0;
      if (e > 0 && e < bezel) { const t = 1 - e / bezel; m = t * t; }
      const o = (y * cw + x) * 4;
      d[o] = 128 - nx * m * 127; d[o + 1] = 128 - ny * m * 127; d[o + 2] = 128; d[o + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    let id = el.dataset.lens;
    if (!id) { id = el.dataset.lens = 'lg' + (fid++); }
    let f = defs.querySelector('#' + id);
    if (!f) { f = document.createElementNS('http://www.w3.org/2000/svg', 'filter'); f.id = id; defs.appendChild(f); }
    f.setAttribute('x', 0); f.setAttribute('y', 0); f.setAttribute('width', w); f.setAttribute('height', h);
    f.setAttribute('filterUnits', 'userSpaceOnUse'); f.setAttribute('primitiveUnits', 'userSpaceOnUse');
    f.setAttribute('color-interpolation-filters', 'sRGB');
    f.innerHTML = `<feImage href="${cv.toDataURL()}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="none" result="m"/>
      <feDisplacementMap in="SourceGraphic" in2="m" scale="${Math.round(bezel * 2.2)}" xChannelSelector="R" yChannelSelector="G"/>`;
    const blur = Math.max(w, h) > 300 ? 10 : 4;
    el.style.backdropFilter = `url(#${id}) blur(${blur}px) saturate(170%) brightness(1.05)`;
  }
  if (chromium) {
    // frames morph between screenshot sizes, so rebuild the lens at most every 140 ms
    const pending = new Set();
    let timer = 0;
    const ro = new ResizeObserver(entries => {
      entries.forEach(en => {
        pending.add(en.target);
        en.target.style.backdropFilter = '';   // plain glass while the size is changing
      });
      clearTimeout(timer);
      timer = setTimeout(() => { pending.forEach(lens); pending.clear(); }, 140);
    });
    $$('.lg').forEach(el => ro.observe(el));
  }

  // Cursor ring: follows the pointer with a critically damped lag, grows over anything clickable
  const cursor = $('#cursor');
  const fine = matchMedia('(pointer: fine)').matches && !reduced;
  if (fine) {
    let cx = -100, cy = -100, tx = -100, ty = -100, k = 1, tk = 1, prevT = performance.now();
    addEventListener('pointermove', e => {
      tx = e.clientX; ty = e.clientY;
      tk = e.target.closest('a, button, .vimg, [data-go], [data-step]') ? 1.9 : 1;
      cursor.classList.add('on');
    }, { passive: true });
    document.addEventListener('pointerleave', () => cursor.classList.remove('on'));
    document.addEventListener('pointerdown', () => { tk *= .8; });
    (function loop(now) {
      const dt = Math.min(.05, (now - prevT) / 1000); prevT = now;
      const a = 1 - Math.exp(-dt * 18), b = 1 - Math.exp(-dt * 12);
      cx += (tx - cx) * a; cy += (ty - cy) * a; k += (tk - k) * b;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) scale(${k})`;
      requestAnimationFrame(loop);
    })(prevT);
  }

  // specular light follows the pointer
  let mx = 0, my = 0;
  addEventListener('pointermove', e => {
    const g = e.target.closest?.('.lg');
    if (g) {
      const r = g.getBoundingClientRect();
      g.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      g.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }
    mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5;
  }, { passive: true });

  /* ───────────────── Background: flowing silk ───────────────── */
  const bg = $('#bg');
  const gl = bg.getContext('webgl', { antialias: false, alpha: false });
  let U = null;
  if (gl) {
    const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    const fs = `
      precision highp float;
      uniform vec2 R; uniform float T; uniform float Y; uniform vec2 M; uniform float E;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+1.),f.x),f.y);}
      float fbm(vec2 p){float s=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);
        for(int i=0;i<4;i++){s+=a*n(p);p=m*p;a*=.5;}return s;}
      void main(){
        vec2 uv=gl_FragCoord.xy/R.y;
        float asp=R.x/R.y;
        vec2 p=uv*.95+vec2(0.,Y*.22)+M*vec2(.12,-.08);
        float t=T;
        vec2 q=vec2(fbm(p+vec2(0.,t*.9)),fbm(p+vec2(5.2,1.3)-t*.7));
        vec2 r=vec2(fbm(p+2.4*q+vec2(1.7,9.2)+t*1.1),fbm(p+2.4*q+vec2(8.3,2.8)-t*.9));
        vec2 w=p+2.1*r;
        float f=fbm(w);
        float glow=smoothstep(.3,.72,f+.32*(r.x-.5));
        glow=glow*glow*(3.-2.*glow);
        float fold=pow(.5+.5*sin(f*11.+r.y*6.-t*2.),5.);
        vec2 cw=p+.9*r;   // milder warp: lines comb along the flow instead of curling into rings
        float lines=.5+.5*sin(cw.y*160.+cw.x*30.+t*3.);
        float edge=smoothstep(.02,.4,glow)*(1.-smoothstep(.62,1.,glow));
        float zone=smoothstep(.35,.7,n(p*1.3+t*.4));
        float I=glow*(1.-(.6+.3*E)*edge*zone*(1.-lines))+fold*glow*.35;
        vec3 c=vec3(0.);
        c=mix(c,vec3(.22,.035,.0),smoothstep(.0,.2,I));
        c=mix(c,vec3(.95,.3,.04),smoothstep(.15,.6,I));
        c=mix(c,vec3(1.,.58,.16),smoothstep(.55,.9,I));
        c=mix(c,vec3(1.,.86,.6),smoothstep(.92,1.25,I));
        float pr=smoothstep(.62,.9,r.x)*smoothstep(.55,1.,uv.x/asp)*smoothstep(.6,.0,uv.y);
        c=mix(c,c*vec3(.75,.45,1.6)+vec3(.12,.0,.22)*I,pr*.8);
        c+=(h(gl_FragCoord.xy+fract(T*13.)*97.)-.5)*.035;
        gl_FragColor=vec4(c,1.);
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
      U = Object.fromEntries(['R', 'T', 'Y', 'M', 'E'].map(k => [k, gl.getUniformLocation(pr, k)]));
    }
  }
  function resize() {
    if (!gl) return;
    const s = innerWidth < 900 ? .6 : Math.min(1, 1600 / innerWidth);
    bg.width = Math.round(innerWidth * s); bg.height = Math.round(innerHeight * s);
    gl.viewport(0, 0, bg.width, bg.height);
  }
  resize(); addEventListener('resize', resize);

  let last = performance.now(), tt = 0, sy = scrollY, lastY = scrollY, energy = 0, smx = 0, smy = 0;
  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const vel = (scrollY - lastY) / Math.max(dt, .001); lastY = scrollY;
    energy += (Math.min(1, Math.abs(vel) / 2500) - energy) * (1 - Math.exp(-dt * 4));
    tt += dt * (reduced ? .02 : .085) * (1 + energy * 5);
    sy += (scrollY / vh() - sy) * (1 - Math.exp(-dt * 3));
    smx += (mx - smx) * (1 - Math.exp(-dt * 2)); smy += (my - smy) * (1 - Math.exp(-dt * 2));
    if (U) {
      gl.uniform2f(U.R, bg.width, bg.height);
      gl.uniform1f(U.T, tt);
      gl.uniform1f(U.Y, sy);
      gl.uniform2f(U.M, smx, smy);
      gl.uniform1f(U.E, energy);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ───────────────── Start ───────────────── */
  history.scrollRestoration = 'manual';
  const m = location.hash.match(/^#(\d+)(?:\.(\d+))?/);
  if (m) goTo(+m[1] - 1, m[2] ? +m[2] - 1 : 0, false);
  onScroll();
  secs[0].classList.add('in');
})();
