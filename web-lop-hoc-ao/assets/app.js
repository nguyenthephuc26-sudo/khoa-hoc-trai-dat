/* Lớp học ảo Khoa học Trái Đất – ứng dụng tĩnh, chạy được trên GitHub Pages */
(function () {
  'use strict';

  /* ---------- Danh mục chương (theo lộ trình 5 tuần) ---------- */
  const WEEKS = [
    { n: 1, title: 'Trái Đất làm từ gì và vận động thế nào', goal: 'Nắm bức tranh tổng thể của môn; biết các lớp của Trái Đất; nhận biết khoáng vật; giải thích vì sao lục địa di chuyển.' },
    { n: 2, title: 'Vòng tuần hoàn đá', goal: 'Hiểu magma sinh ra và phun trào ra sao; gọi tên, phân biệt ba nhóm đá bằng mắt thường (phục vụ thí nghiệm buổi 2).' },
    { n: 3, title: 'Bề mặt bị phá huỷ, vỏ bị biến dạng, đá kể chuyện', goal: 'Hiểu phong hoá; đọc được nếp uốn, đứt gãy; xác định đá nào già hơn đá nào.' },
    { n: 4, title: 'Nước và trọng lực tạo hình bề mặt', goal: 'Hiểu sông đào và bồi thế nào; nước ngầm nằm và chảy ở đâu; vì sao đất đá trượt xuống.' },
    { n: 5, title: 'Khí quyển, con người và tài nguyên', goal: 'Hiểu gió và các vành đai khí hậu; biến đổi khí hậu, tài nguyên và kinh tế tuần hoàn.' }
  ];
  const CH = [
    { id: 'c01', num: '1', w: 1, t: 'Giới thiệu môn học', d: 'Thông tin môn, bản đồ kiến thức, thí nghiệm và thực tập' },
    { id: 'c02b', num: '2B', w: 1, t: 'Cấu tạo Trái Đất', d: 'Trái Đất hình thành, các lớp vỏ – manti – nhân' },
    { id: 'c02a', num: '2A', w: 1, t: 'Vật chất & Khoáng vật', d: 'Định nghĩa, tính chất vật lý, thang Mohs, ứng dụng' },
    { id: 'c03', num: '3', w: 1, t: 'Kiến tạo mảng', d: 'Trôi dạt lục địa, tách giãn đáy biển, 3 kiểu ranh giới mảng' },
    { id: 'c04', num: '4', w: 2, t: 'Núi lửa', d: 'Bộ phận, nguyên nhân, loại magma, tác động môi trường' },
    { id: 'c05', num: '5', w: 2, t: 'Đá magma', d: 'Magma, kiến trúc, 3 cặp đá, khối xâm nhập, chuỗi Bowen' },
    { id: 'c06', num: '6', w: 2, t: 'Đá trầm tích', d: 'Quá trình thành đá, đá vụn theo cỡ hạt, đá hoá học, tướng' },
    { id: 'c07', num: '7', w: 2, t: 'Đá biến chất', d: 'Nhiệt – áp suất, phân phiến, các đá và kiểu biến chất' },
    { id: 'c08', num: '8', w: 3, t: 'Phong hoá', d: 'Cơ học – hoá học – sinh học, 4 giai đoạn, đất và xói mòn' },
    { id: 'c09', num: '9', w: 3, t: 'Biến dạng vỏ Trái Đất', d: 'Ứng suất, nếp uốn, khe nứt, đứt gãy, tạo núi, bẫy dầu' },
    { id: 'c10', num: '10', w: 3, t: 'Niên đại địa chất', d: 'Tuổi tương đối – tuyệt đối, nguyên lý địa tầng, thang thời gian' },
    { id: 'c11', num: '11', w: 4, t: 'Nước trên mặt', d: 'Chu trình thuỷ văn, Q = A×V, kiểu lòng sông, xâm thực – bồi tụ' },
    { id: 'c12', num: '12', w: 4, t: 'Nước dưới đất', d: 'Độ lỗ hổng, tính thấm, tầng chứa nước, artesi, karst, ô nhiễm' },
    { id: 'c13', num: '13', w: 4, t: 'Trượt lở đất', d: 'Dịch chuyển khối: nhân tố, vai trò của nước, chảy – bò – trượt – rơi' },
    { id: 'c14', num: '14', w: 5, t: 'Khí quyển & khí hậu', d: 'Bức xạ Mặt Trời, tuần hoàn khí quyển, lốc xoáy, các tầng, mây' },
    { id: 'c15', num: '15', w: 5, t: 'Biến đổi khí hậu & tài nguyên', d: 'Khái niệm BĐKH, hiệu ứng nhà kính, khoáng sản, hệ số tập trung' },
    { id: 'c16', num: '16', w: 5, t: 'Kinh tế tuần hoàn', d: 'Khái niệm, 3 nguyên tắc, chính sách, ví dụ VAC, Gomi, Heineken' }
  ];
  const byId = Object.fromEntries(CH.map(c => [c.id, c]));
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const view = $('#view');

  /* ---------- Lưu trữ an toàn ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  };
  let done = new Set(store.get('khtd-done', []));
  const saveDone = () => { store.set('khtd-done', [...done]); renderNav(); };

  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2600); }

  /* ---------- Giao diện sáng/tối ---------- */
  const theme = store.get('khtd-theme', null);
  if (theme) document.documentElement.dataset.theme = theme;
  $('#themeBtn').addEventListener('click', () => {
    const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next; store.set('khtd-theme', next);
  });

  /* ---------- Menu ---------- */
  function renderNav() {
    let html = '';
    WEEKS.forEach(w => {
      html += `<div class="nav-week">Tuần ${w.n}</div>`;
      CH.filter(c => c.w === w.n).forEach(c => {
        html += `<a href="#/c/${c.id}" data-nav="${c.id}"><span class="num">Ch.${c.num}</span><span>${c.t}</span>${done.has(c.id) ? '<span class="done" title="Đã học">✓</span>' : ''}</a>`;
      });
    });
    $('#navChapters').innerHTML = html;
    $('#progText').textContent = `Đã học ${done.size}/${CH.length} chương`;
    $('#progBar').style.width = (done.size / CH.length * 100) + '%';
    markActive();
  }
  function markActive() {
    const key = currentNavKey();
    $$('.sidebar a').forEach(a => a.classList.toggle('active', a.dataset.nav === key));
  }
  function currentNavKey() {
    const h = location.hash.replace(/^#\/?/, '');
    if (!h) return 'home';
    if (h.startsWith('c/')) return h.slice(2).split(/[?#/]/)[0];
    return h.split(/[?/]/)[0];
  }
  const closeNav = () => { document.body.classList.remove('nav-open'); $('#menuBtn').setAttribute('aria-expanded', 'false'); };
  $('#menuBtn').addEventListener('click', () => { const o = document.body.classList.toggle('nav-open'); $('#menuBtn').setAttribute('aria-expanded', String(o)); });
  $('#scrim').addEventListener('click', closeNav);
  $('#sidebar').addEventListener('click', e => { if (e.target.closest('a')) closeNav(); });
  $('#searchBtn').addEventListener('click', () => { location.hash = '#/tim-kiem'; });

  /* ---------- Tải nội dung chương ---------- */
  const cache = {};
  async function getChapter(id) {
    if (cache[id]) return cache[id];
    const r = await fetch(`chapters/${id}.html`);
    if (!r.ok) throw new Error('Không tải được ' + id);
    cache[id] = await r.text();
    return cache[id];
  }

  /* ---------- Router ---------- */
  window.addEventListener('hashchange', route);
  async function route() {
    const h = location.hash.replace(/^#\/?/, '');
    const [path, qs] = h.split('?');
    const parts = path.split('/');
    document.body.classList.toggle('on-chat-page', parts[0] === 'hoi-dap');
    $('.read-bar') && $('.read-bar').remove();
    try {
      if (!path) renderHome();
      else if (parts[0] === 'c' && byId[parts[1]]) await renderChapter(parts[1], parts[2]);
      else if (parts[0] === 'lo-trinh') renderPlan();
      else if (parts[0] === 'hoi-dap') renderChatPage(new URLSearchParams(qs || '').get('q'));
      else if (parts[0] === 'on-tap') renderQuiz();
      else if (parts[0] === 'tong-on') await renderReview();
      else if (parts[0] === 'tim-kiem') renderSearch(new URLSearchParams(qs || '').get('q') || '');
      else renderHome();
    } catch (err) {
      view.innerHTML = `<div class="empty"><p>Không tải được nội dung (${err.message}). Hãy kiểm tra kết nối mạng rồi thử lại.</p></div>`;
    }
    markActive();
    if (!(parts[0] === 'c' && parts[2])) window.scrollTo(0, 0);
    $('#main').focus({ preventScroll: true });
  }

  function chapterCard(c) {
    return `<a class="card" href="#/c/${c.id}"><span class="n">Chương ${c.num}</span><b>${c.t}</b><small>${c.d}</small>${done.has(c.id) ? '<span class="ok" title="Đã học">✓</span>' : ''}</a>`;
  }

  function renderHome() {
    document.title = 'Lớp học ảo Khoa học Trái Đất';
    const next = CH.find(c => !done.has(c.id)) || CH[0];
    let html = `<section class="hero">
      <span class="kicker"><span style="background:rgba(255,255,255,.15);color:#fff">GE1013 · 4 tín chỉ · Khoa Kỹ thuật Địa chất và Dầu khí</span></span>
      <h1>Lớp học ảo Khoa học Trái Đất</h1>
      <p>Toàn bộ môn học được diễn giải lại từ slide bài giảng: 16 chương, ví dụ dễ nhớ, hình minh hoạ, câu hỏi tự kiểm tra và trợ lý hỏi đáp.</p>
      <div class="hero-row"><a class="btn" href="#/c/${next.id}">${done.size ? 'Học tiếp' : 'Bắt đầu học'}: Ch.${next.num} ${next.t}</a><a class="btn ghost" href="#/lo-trinh">Xem lộ trình 5 tuần</a></div>
    </section>
    <div class="stats">
      <div class="stat"><b>17</b><span>bài học (16 chương + ôn tập)</span></div>
      <div class="stat"><b>5 tuần</b><span>lộ trình học cấp tốc</span></div>
      <div class="stat"><b id="qaCount">200+</b><span>câu hỏi trong trợ lý</span></div>
      <div class="stat"><b>${done.size}/${CH.length}</b><span>chương bạn đã đánh dấu học xong</span></div>
    </div>
    <div class="box note"><h4>Cách học hiệu quả</h4><p>Mỗi chương có: <b>Mục tiêu</b> → <b>Diễn giải chi tiết</b> (kèm hình từ slide, bấm vào hình để phóng to) → <b>Ví dụ</b> (nhãn <span class="tag slide">Từ slide</span> là ví dụ có trong bài giảng, <span class="tag hd">Hình dung</span> là cách liên tưởng đời thường để dễ nhớ) → <b>Ghi nhớ nhanh</b> → <b>Tự kiểm tra</b> (bấm để xem đáp án). Gặp chỗ chưa hiểu, bấm nút 💬 ở góc phải để hỏi.</p></div>`;
    WEEKS.forEach(w => {
      html += `<div class="week-h"><h2>Tuần ${w.n}</h2><span>${w.title}</span></div><div class="cards">${CH.filter(c => c.w === w.n).map(chapterCard).join('')}${w.n === 5 ? '<a class="card" href="#/tong-on"><span class="n">Ôn tập</span><b>Ôn tập tổng</b><small>Sơ đồ liên kết các chương và checklist trước khi thi</small></a>' : ''}</div>`;
    });
    view.innerHTML = html;
    loadQA().then(q => { const el = $('#qaCount'); if (el) el.textContent = q.length; });
  }

  function renderPlan() {
    document.title = 'Lộ trình 5 tuần · KHTĐ';
    let html = `<span class="kicker"><span>Lộ trình</span></span><h1>Lộ trình học 5 tuần</h1>
    <p class="lead">Mỗi tuần 3–4 chương, đi theo chiều "từ trong ra ngoài": từ lõi Trái Đất, lên vỏ, xem vỏ bị xô đẩy và bào mòn, rồi lên bầu trời và quay về con người.</p>
    <div class="box goal"><h4>Nhịp học mỗi tuần</h4><ul>
      <li><b>Ngày 1 → 5:</b> mỗi ngày 1 chương: đọc phần diễn giải → xem kỹ hình → đọc ví dụ → tự trả lời câu hỏi cuối chương. Tuần có 3 chương thì dùng ngày dư để làm lại phần khó.</li>
      <li><b>Ngày 6:</b> ôn cả tuần, chỉ đọc các khung "Ghi nhớ nhanh", vẽ lại sơ đồ bằng tay.</li>
      <li><b>Ngày 7:</b> nghỉ, hoặc hỏi trợ lý các câu tự kiểm tra của cả tuần mà không nhìn tài liệu.</li></ul></div>
    <div class="plan">`;
    WEEKS.forEach(w => {
      html += `<div class="wk"><h3>Tuần ${w.n} · ${w.title}</h3><p>${w.goal}</p><div class="cards">${CH.filter(c => c.w === w.n).map(chapterCard).join('')}</div></div>`;
    });
    html += `</div><div class="box note" style="margin-top:20px"><h4>Lưu ý về số chương</h4><p>Số chương ở đây là thứ tự học, có thể khác số in trên slide (ví dụ slide Khí quyển ghi "Chương 2", slide Biến dạng ghi "Chương 7"). Slide giới thiệu có nhắc chủ đề "Địa hình và công cụ giám sát Trái Đất" nhưng chưa có file bài giảng, nên web chỉ nêu mục tiêu của phần này ở Chương 1.</p></div>`;
    view.innerHTML = html;
  }

  async function renderChapter(id, anchor) {
    const c = byId[id];
    document.title = `Ch.${c.num} ${c.t} · KHTĐ`;
    view.innerHTML = '<div class="loading">Đang tải chương…</div>';
    const body = await getChapter(id);
    const i = CH.indexOf(c), prev = CH[i - 1], next = CH[i + 1];
    view.innerHTML = `<article class="chapter">
      <div class="ch-head"><span class="kicker"><span>Tuần ${c.w}</span><span>Chương ${c.num}</span></span></div>
      ${body}
      <div class="ch-actions">
        <button class="btn ${done.has(id) ? 'done' : 'primary'}" id="doneBtn">${done.has(id) ? '✓ Đã học xong chương này' : 'Đánh dấu đã học xong'}</button>
        <a class="btn" href="#/hoi-dap?q=${encodeURIComponent(c.t)}">💬 Hỏi trợ lý về chương này</a>
      </div>
      <nav class="pager">${prev ? `<a href="#/c/${prev.id}"><small>← Chương trước</small>Ch.${prev.num} ${prev.t}</a>` : '<span></span>'}
      ${next ? `<a class="next" href="#/c/${next.id}"><small>Chương sau →</small>Ch.${next.num} ${next.t}</a>` : `<a class="next" href="#/tong-on"><small>Tiếp theo →</small>Ôn tập tổng</a>`}</nav>
    </article>`;
    enhanceArticle();
    $('#doneBtn').addEventListener('click', e => {
      if (done.has(id)) done.delete(id); else { done.add(id); toast('Tuyệt! Đã đánh dấu chương ' + c.num + ' là học xong.'); }
      saveDone();
      e.currentTarget.className = 'btn ' + (done.has(id) ? 'done' : 'primary');
      e.currentTarget.textContent = done.has(id) ? '✓ Đã học xong chương này' : 'Đánh dấu đã học xong';
    });
    if (anchor) { const el = document.getElementById(anchor); if (el) el.scrollIntoView(); }
  }

  async function renderReview() {
    document.title = 'Ôn tập tổng · KHTĐ';
    const body = await getChapter('tong-on');
    view.innerHTML = `<article class="chapter"><div class="ch-head"><span class="kicker"><span>Tuần 5</span><span>Ôn tập tổng</span></span></div>${body}</article>`;
    enhanceArticle();
  }

  /* Mục lục, thanh tiến độ đọc, phóng to hình */
  function enhanceArticle() {
    const art = $('.chapter');
    const hs = $$('h2', art);
    hs.forEach((h, i) => { if (!h.id) h.id = 'muc-' + (i + 1); });
    const tocHost = $('[data-toc]', art);
    if (tocHost && hs.length > 2) {
      const base = location.hash.split('/').slice(0, 3).join('/');
      tocHost.outerHTML = `<nav class="toc"><b>Trong chương này</b><ol>${hs.map(h => `<li><a href="${base}/${h.id}" data-jump="${h.id}">${h.textContent.replace(/^\d+[.)]\s*/, '')}</a></li>`).join('')}</ol></nav>`;
      $$('[data-jump]', art).forEach(a => a.addEventListener('click', e => { e.preventDefault(); const t = document.getElementById(a.dataset.jump); t && t.scrollIntoView({ behavior: 'smooth' }); history.replaceState(null, '', a.getAttribute('href')); }));
    } else if (tocHost) tocHost.remove();
    $$('figure.slide img', art).forEach(img => { img.loading = 'lazy'; img.decoding = 'async'; });
    if (!$('.read-bar')) { const bar = document.createElement('div'); bar.className = 'read-bar'; document.body.appendChild(bar); }
    const boxes = $$('.checklist input[type=checkbox]', art);
    if (boxes.length) {
      const saved = store.get('khtd-check', []);
      boxes.forEach((b, i) => { b.checked = saved.includes(i); b.addEventListener('change', () => store.set('khtd-check', boxes.map((x, j) => x.checked ? j : -1).filter(j => j >= 0))); });
    }
  }
  window.addEventListener('scroll', () => {
    const bar = $('.read-bar'); if (!bar) return;
    const d = document.documentElement; const p = d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight);
    bar.style.width = (p * 100) + '%';
  }, { passive: true });

  /* Lightbox */
  const lb = $('#lightbox');
  document.addEventListener('click', e => {
    const img = e.target.closest('figure.slide img');
    if (img) { $('img', lb).src = img.currentSrc || img.src; $('.lb-cap', lb).textContent = (img.closest('figure').querySelector('figcaption') || {}).textContent || ''; lb.hidden = false; }
  });
  lb.addEventListener('click', e => { if (e.target.tagName !== 'IMG') lb.hidden = true; });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { lb.hidden = true; } });

  /* ---------- Ôn luyện (chờ đề cũ) ---------- */
  function renderQuiz() {
    document.title = 'Ôn luyện · KHTĐ';
    view.innerHTML = `<span class="kicker"><span>Ôn luyện</span></span><h1>Ngân hàng đề & chế độ ôn luyện</h1>
    <div class="empty"><p style="font-size:40px;margin:0">📝</p><p><b>Phần này đang chờ đề cũ.</b><br>Khi có các đề thi, đề luyện tập cũ, ngân hàng câu hỏi trắc nghiệm sẽ được soạn và gắn vào đây, có chế độ luyện theo chương, thi thử tính giờ và xem lại câu sai.</p></div>
    <h2>Trong lúc chờ, bạn có thể</h2>
    <ul><li>Làm phần <b>Tự kiểm tra</b> ở cuối mỗi chương (bấm vào câu hỏi để xem đáp án).</li>
    <li>Hỏi <a href="#/hoi-dap">trợ lý</a> những câu bạn hay nhầm.</li>
    <li>Dùng <a href="#/tong-on">Ôn tập tổng</a> và checklist trước khi thi.</li></ul>`;
  }

  /* ---------- Tìm kiếm toàn bộ bài học ---------- */
  const strip = html => html.replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  async function allChapterBlocks() {
    if (allChapterBlocks._c) return allChapterBlocks._c;
    const out = [];
    await Promise.all([...CH.map(c => c.id), 'tong-on'].map(async id => {
      try {
        const html = await getChapter(id);
        const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
        let sec = '', secId = '', n = 0;
        doc.body.firstChild.querySelectorAll('h2, p, li, td, figcaption, .box').forEach(el => {
          if (el.tagName === 'H2') { n++; sec = el.textContent; secId = 'muc-' + n; return; }
          if (el.classList.contains('box')) return;
          const t = el.textContent.replace(/\s+/g, ' ').trim();
          if (t.length > 25) out.push({ id, sec, secId, t, nA: norm(t, true), nU: norm(t, false) });
        });
      } catch (e) { }
    }));
    return (allChapterBlocks._c = out);
  }
  function renderSearch(q) {
    document.title = 'Tìm kiếm · KHTĐ';
    view.innerHTML = `<h1>Tìm trong bài học</h1><form class="search-box" id="sform"><input id="sq" type="search" placeholder="Ví dụ: đứt gãy thuận, thang Mohs, karst…" value="${escapeHtml(q)}" autofocus><button class="btn primary">Tìm</button></form><div id="sres"></div>`;
    $('#sform').addEventListener('submit', e => { e.preventDefault(); location.hash = '#/tim-kiem?q=' + encodeURIComponent($('#sq').value.trim()); });
    if (q) doSearch(q);
  }
  async function doSearch(q) {
    const res = $('#sres'); res.innerHTML = '<p class="src">Đang tìm…</p>';
    const blocks = await allChapterBlocks();
    const acc = hasAcc(q), terms = tokens(q, acc), nq = norm(q, acc), key = acc ? 'nA' : 'nU';
    const scored = blocks.map(b => {
      const n = ' ' + b[key] + ' ';
      let s = 0; terms.forEach(t => { if (n.includes(' ' + t + ' ')) s += t.includes(' ') ? 3 : 1; else if (n.includes(t)) s += 0.5; });
      if (nq.length > 3 && n.includes(nq)) s += 5;
      return { b, s };
    }).filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 30);
    if (!scored.length) { res.innerHTML = `<div class="empty">Không tìm thấy "${escapeHtml(q)}". Thử từ khoá ngắn hơn, hoặc <a href="#/hoi-dap?q=${encodeURIComponent(q)}">hỏi trợ lý</a>.</div>`; return; }
    res.innerHTML = `<p class="src">${scored.length} kết quả</p>` + scored.map(({ b }) => {
      const c = byId[b.id];
      const name = c ? `Ch.${c.num} ${c.t}` : 'Ôn tập tổng';
      const href = c ? `#/c/${b.id}/${b.secId}` : '#/tong-on';
      return `<div class="result"><a href="${href}">${name}${b.sec ? ' · ' + escapeHtml(b.sec) : ''}</a><p>${highlight(b.t, terms)}</p></div>`;
    }).join('');
  }

  /* ---------- Chuẩn hoá tiếng Việt ----------
     Giữ dấu khi người dùng gõ có dấu (tránh nhầm "bán rã" với "bạn ra"),
     bỏ dấu khi người dùng gõ không dấu. Gộp kiểu bỏ dấu cũ/mới (hóa = hoá) và i/y (kỳ = kì). */
  const YMAP = { 'ỳ': 'ì', 'ý': 'í', 'ỷ': 'ỉ', 'ỹ': 'ĩ', 'ỵ': 'ị', 'y': 'i' };
  const SYN = { granit: 'granite', bazan: 'basalt', andesit: 'andesite', riolit: 'rhyolite', ryolit: 'rhyolite', diorit: 'diorite', gabro: 'gabbro', ozon: 'ozone', macma: 'magma', bauxite: 'bauxit', boxit: 'bauxit' };
  function canon(s) {
    return (s || '').toLowerCase().normalize('NFD')
      .replace(/([ou])([̣̀́̃̉])([aey])(?![̀-ͯ])/g, '$1$3$2')
      .normalize('NFC')
      .replace(/(^|[^\p{L}])([klm])([ỳýỷỹỵy])(?![\p{L}])/gu, (m, a, b, c) => a + b + YMAP[c])
      .replace(/(\p{L})-(\d)/gu, '$1$2')
      .replace(/[^\p{L}\p{N}+ ]+/gu, ' ').replace(/\s+/g, ' ').trim();
  }
  const unacc = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
  const hasAcc = q => /[^\x00-\x7f]/.test(canon(q));
  function norm(s, acc) { const c = canon(s); return acc ? c : unacc(c); }
  const STOP_A = new Set('là gì của và các những một nào thế như có không được cho với trong ở tại sao vì bao nhiêu hay hoặc để khi thì mà này đó đến từ ra lên xuống về làm bị sẽ đã đang nhất hơn rất cũng còn ai câu hỏi giải thích trình bày mình tôi bạn em à ơi nhé vậy chứ nhỉ cái thành ý nghĩa khái niệm biệt so sánh khác nhau giống ví dụ kể tên nêu tả gồm ạ hả thì sự'.split(' '));
  const STOP_U = new Set([...STOP_A].map(unacc).filter(w => !['ban', 'ra', 'chu', 'mo', 'nhat', 'bi', 'thanh', 'da', 'dang', 'den', 'tu', 'cho', 'cai', 'tai', 'con', 'ai', 'hon', 'lam'].includes(w)));
  function tokens(q, acc) {
    if (acc === undefined) acc = hasAcc(q);
    const stop = acc ? STOP_A : STOP_U;
    const all = norm(q, acc).split(' ').filter(Boolean).map(w => SYN[w] || w);
    const out = new Set(all.filter(x => !stop.has(x)));
    for (let i = 0; i < all.length - 1; i++) { const a = all[i], b = all[i + 1]; if (!(stop.has(a) && stop.has(b))) out.add(a + ' ' + b); }
    return [...out];
  }
  function escapeHtml(s) { return (s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function highlight(text, terms) {
    let t = text.length > 280 ? text.slice(0, 280) + '…' : text;
    // so khớp không dấu, giữ nguyên vị trí từng ký tự
    const n = t.split('').map(ch => (ch.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace('đ', 'd')[0]) || ' ').join('');
    const marks = [];
    terms.map(unacc).filter(x => x.length > 1).forEach(term => {
      const re = new RegExp('(^|[^a-z0-9])(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s+') + ')(?![a-z0-9])', 'g');
      let m; while ((m = re.exec(n))) { const a = m.index + m[1].length; marks.push([a, a + m[2].length]); }
    });
    if (!marks.length) return escapeHtml(t);
    marks.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
    let out = '', last = 0;
    marks.forEach(([a, b]) => { if (a < last) return; out += escapeHtml(t.slice(last, a)) + '<mark>' + escapeHtml(t.slice(a, b)) + '</mark>'; last = b; });
    return out + escapeHtml(t.slice(last));
  }

  /* ---------- Trợ lý hỏi đáp ---------- */
  let QA = null, IDX = null;
  async function loadQA() {
    if (QA) return QA;
    const r = await fetch('data/qa.json');
    QA = await r.json();
    buildIndex();
    return QA;
  }
  function buildIndex() {
    const N = QA.length;
    const mk = acc => {
      const df = new Map();
      const docs = QA.map((e, i) => {
        const f = new Map();
        const add = (txt, w) => tokens(txt, acc).forEach(t => f.set(t, Math.max(f.get(t) || 0, w)));
        add(e.a.replace(/<[^>]+>/g, ' '), 1);
        add(e.k || '', 3);
        [e.q, ...(e.alt || [])].forEach(x => add(x, 3.2));
        f.forEach((_, t) => df.set(t, (df.get(t) || 0) + 1));
        return { i, f, nq: [e.q, ...(e.alt || [])].map(x => norm(x, acc)) };
      });
      return { docs, df, idf: t => Math.log(1 + N / (df.get(t) || 0.5)) };
    };
    IDX = { A: mk(true), U: mk(false) };
  }
  function answer(q) {
    const acc = hasAcc(q), X = acc ? IDX.A : IDX.U;
    const terms = tokens(q, acc);
    if (!terms.length) return { best: null, list: [] };
    const nq = norm(q, acc);
    const tw = t => X.idf(t) * (t.includes(' ') ? 1.4 : 1);
    // cụm hai từ không có trong ngân hàng thì không tính vào mẫu số (tránh phạt câu hỏi diễn đạt khác)
    const qWeight = terms.reduce((s, t) => s + (t.includes(' ') && !X.df.has(t) ? 0 : tw(t)), 0) || 1;
    const scored = X.docs.map(d => {
      let s = 0, cov = 0, uni = 0;
      terms.forEach(t => { const w = d.f.get(t); if (w) { const v = tw(t); s += v * w; cov += v; if (!t.includes(' ')) uni++; } });
      if (d.nq.includes(nq)) s += 50; else if (nq.length > 8 && d.nq.some(x => x.includes(nq))) s += 8;
      return { d, s, uni, cov: cov / qWeight };
    }).filter(x => x.s > 0).sort((a, b) => b.s - a.s);
    const top = scored[0];
    // câu ngắn phải khớp gần hết từ khoá (câu 1–2 từ thì phải khớp đủ)
    const nUni = terms.filter(t => !t.includes(' ')).length, need = nUni <= 3 ? 0.6 : 0.45;
    const best = top && (top.s >= 50 || (top.cov >= need && top.s > 6 && (nUni > 2 || top.uni === nUni))) ? QA[top.d.i] : null;
    const rel = scored.filter(x => x.cov >= 0.3 && x.s > 4);
    return { best, list: rel.slice(best ? 1 : 0, best ? 4 : 5).map(x => QA[x.d.i]) };
  }

  let chatHistory = [];
  try { chatHistory = JSON.parse(sessionStorage.getItem('khtd-chat') || '[]'); } catch (e) { }
  const saveChat = () => { try { sessionStorage.setItem('khtd-chat', JSON.stringify(chatHistory.slice(-40))); } catch (e) { } };

  function chatShell(host) {
    host.innerHTML = `<div class="chat-log" aria-live="polite"></div>
      <form class="chat-form"><input type="text" placeholder="Hỏi về bất kỳ phần nào của môn học…" aria-label="Câu hỏi" enterkeyhint="send"><button type="submit">Gửi</button></form>`;
    const log = $('.chat-log', host);
    const form = $('form', host);
    form.addEventListener('submit', e => { e.preventDefault(); const inp = $('input', form); const v = inp.value.trim(); if (!v) return; inp.value = ''; ask(v); });
    host.addEventListener('click', e => { const chip = e.target.closest('[data-ask]'); if (chip) ask(chip.dataset.ask); });
    host._render = () => {
      if (!chatHistory.length) {
        log.innerHTML = `<div class="msg bot"><p>Xin chào 👋 Mình là trợ lý môn <b>Khoa học Trái Đất</b>. Mình trả lời dựa trên ngân hàng câu hỏi soạn từ slide bài giảng. Bạn có thể gõ câu hỏi, hoặc bấm thử:</p>
        <div class="chips">${['Khoáng vật là gì?', 'Thang Mohs gồm những khoáng vật nào?', 'Đứt gãy thuận và nghịch khác nhau thế nào?', 'Vì sao nước gây trượt lở?', 'Hệ số tập trung là gì?', 'Karst hình thành thế nào?'].map(x => `<button class="chip" data-ask="${x}">${x}</button>`).join('')}</div></div>`;
      } else log.innerHTML = chatHistory.map(m => `<div class="msg ${m.r}">${m.h}</div>`).join('');
      log.scrollTop = log.scrollHeight;
    };
    host._render();
    return host;
  }
  function renderAllChats() { $$('[data-chat]').forEach(h => h._render && h._render()); }

  async function ask(q) {
    chatHistory.push({ r: 'user', h: escapeHtml(q) });
    renderAllChats();
    await loadQA();
    const { best, list } = answer(q);
    let h = '';
    if (best) {
      const c = byId[best.c];
      h = best.a + (c ? `<span class="meta">📖 Xem thêm: <a href="#/c/${c.id}">Chương ${c.num} · ${c.t}</a></span>` : best.c === 'tong-on' ? `<span class="meta">📖 Xem thêm: <a href="#/tong-on">Ôn tập tổng</a></span>` : '');
      if (list.length) h += `<div class="chips" style="margin-top:8px">${list.map(x => `<button class="chip" data-ask="${escapeHtml(x.q)}">${escapeHtml(x.q)}</button>`).join('')}</div>`;
    } else {
      const blocks = await allChapterBlocks();
      const acc = hasAcc(q), terms = tokens(q, acc), key = acc ? 'nA' : 'nU';
      const hit = blocks.map(b => { const n = ' ' + b[key] + ' '; let s = 0; terms.forEach(t => { if (n.includes(' ' + t + ' ')) s += t.includes(' ') ? 3 : 1; }); return { b, s }; }).sort((a, b) => b.s - a.s)[0];
      if (list.length) {
        h = `<p>Mình chưa chắc đã hiểu đúng câu hỏi. Có phải bạn muốn hỏi một trong các câu sau?</p><div class="chips">${list.map(x => `<button class="chip" data-ask="${escapeHtml(x.q)}">${escapeHtml(x.q)}</button>`).join('')}</div>`;
      } else h = `<p>Câu này chưa có trong ngân hàng câu hỏi của mình.</p>`;
      if (hit && hit.s >= 2) {
        const c = byId[hit.b.id];
        h += `<p style="margin-top:8px">Đoạn liên quan trong bài${c ? ` <a href="#/c/${c.id}/${hit.b.secId}">Ch.${c.num} ${c.t}</a>` : ''}:</p><p><i>${highlight(hit.b.t, terms)}</i></p>`;
      } else h += `<p>Bạn thử hỏi ngắn gọn hơn, dùng thuật ngữ trong bài (ví dụ "độ lỗ hổng", "chuỗi Bowen"), hoặc dùng <a href="#/tim-kiem?q=${encodeURIComponent(q)}">tìm kiếm</a>.</p>`;
    }
    chatHistory.push({ r: 'bot', h });
    saveChat();
    renderAllChats();
  }

  // Khung chat nổi
  const panel = $('#chatPanel'), panelBody = $('[data-chat="panel"]');
  let panelReady = false;
  $('#chatFab').addEventListener('click', () => {
    if (!panelReady) { chatShell(panelBody); panelReady = true; loadQA(); }
    panel.hidden = !panel.hidden;
    if (!panel.hidden) { panelBody._render(); setTimeout(() => $('input', panelBody).focus(), 50); }
  });
  $('#chatClose').addEventListener('click', () => { panel.hidden = true; });
  $('.chat-full').addEventListener('click', () => { panel.hidden = true; });

  async function renderChatPage(q) {
    document.title = 'Trợ lý hỏi đáp · KHTĐ';
    panel.hidden = true;
    view.innerHTML = `<span class="kicker"><span>Trợ lý</span></span><h1>Hỏi đáp Khoa học Trái Đất</h1>
      <p class="src">Trợ lý trả lời từ <b id="qan">200+</b> câu hỏi soạn sẵn theo slide. Nó không phải AI tạo sinh, nên hãy hỏi ngắn gọn bằng thuật ngữ trong bài. Bấm một chương để xem gợi ý câu hỏi.</p>
      <div class="chat-filter" id="cfilter"></div>
      <div class="chat-page" data-chat="page"></div>`;
    const host = chatShell($('[data-chat="page"]'));
    const qa = await loadQA();
    $('#qan').textContent = qa.length;
    $('#cfilter').innerHTML = CH.map(c => `<button class="chip" data-ch="${c.id}">Ch.${c.num} ${c.t}</button>`).join('');
    $('#cfilter').addEventListener('click', e => {
      const b = e.target.closest('[data-ch]'); if (!b) return;
      const c = byId[b.dataset.ch];
      const qs = qa.filter(x => x.c === c.id);
      chatHistory.push({ r: 'bot', h: `<p>Một số câu hỏi thuộc <b>Chương ${c.num} · ${c.t}</b> (${qs.length} câu):</p><div class="chips">${qs.slice(0, 14).map(x => `<button class="chip" data-ask="${escapeHtml(x.q)}">${escapeHtml(x.q)}</button>`).join('')}</div>` });
      saveChat(); renderAllChats();
    });
    if (q) { history.replaceState(null, '', '#/hoi-dap'); ask(q); }
    host._render();
  }

  /* ---------- Cài đặt app (PWA) ---------- */
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; $('#installBtn').hidden = false; });
  $('#installBtn').addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice; deferredPrompt = null; $('#installBtn').hidden = true;
  });
  window.addEventListener('appinstalled', () => { $('#installBtn').hidden = true; toast('Đã cài app Khoa học Trái Đất lên máy.'); });

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { }));
  }
  $('#offlineBtn').addEventListener('click', async () => {
    try {
      const list = await (await fetch('data/assets.json')).json();
      let n = 0; toast('Đang tải ' + list.length + ' hình…');
      for (let i = 0; i < list.length; i += 6) {
        await Promise.all(list.slice(i, i + 6).map(u => fetch(u).then(() => n++).catch(() => { })));
      }
      await Promise.all([...CH.map(c => c.id), 'tong-on'].map(getChapter));
      toast(`Xong! Đã lưu ${n} hình và toàn bộ bài học để dùng offline.`);
    } catch (e) { toast('Chưa tải được, hãy kiểm tra mạng rồi thử lại.'); }
  });

  renderNav();
  route();
})();
