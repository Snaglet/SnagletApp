/* ===== SNAGLET APP.JS ===== */

// ── State ──────────────────────────────────────────────────────────────────
const state = {
  role: 'teacher',
  currentScreen: 'screen-onboard',
  animStep: 0,
  animTimer: null,
};

const STUDENTS = [
  { initials:'EM', name:'Emma M.',   color:'av-blue',   followers:3, joined:true,  emoji:'🌻', grad:'#FFE4E6,#FEF3C7,#DBEAFE' },
  { initials:'LK', name:'Liam K.',   color:'av-purple', followers:2, joined:true,  emoji:'🚀', grad:'#E0E7FF,#F3E8FF,#FCE7F3' },
  { initials:'SR', name:'Sofia R.',  color:'av-orange', followers:4, joined:true,  emoji:'🦋', grad:'#FFEDD5,#FEF3C7,#D1FAE5' },
  { initials:'JT', name:'James T.',  color:'av-yellow', followers:0, joined:false, emoji:'🌊', grad:'#DBEAFE,#E0E7FF,#D1FAE5' },
  { initials:'AP', name:'Ava P.',    color:'av-pink',   followers:2, joined:true,  emoji:'🌈', grad:'#FCE7F3,#EDE9FE,#FEF3C7' },
  { initials:'NO', name:'Noah O.',   color:'av-red',    followers:3, joined:true,  emoji:'🦁', grad:'#FEE2E2,#FFEDD5,#FEF3C7' },
];

const ARTWORKS = [
  { student: STUDENTS[0], title:'Watercolor Sunflower', timeAgo:'2h ago',  reactions:[{e:'❤️',n:8,active:true},{e:'⭐',n:5},{e:'🎉',n:3},{e:'😍',n:6},{e:'👏',n:4}], comments:12 },
  { student: STUDENTS[1], title:'Space Collage',        timeAgo:'Yesterday', reactions:[{e:'❤️',n:12},{e:'🚀',n:7},{e:'⭐',n:9}], comments:7 },
  { student: STUDENTS[2], title:'Oil Pastel Rainbow',   timeAgo:'3 days',  reactions:[{e:'❤️',n:14,active:true},{e:'🌈',n:9},{e:'😍',n:7}], comments:9 },
];

// ── Utilities ──────────────────────────────────────────────────────────────
function goScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const s = document.getElementById(id);
  if (s) { s.classList.add('active'); try { s.querySelector('.scroll-area').scrollTop = 0; } catch(e){} }
  state.currentScreen = id;
}

function navTo(screenId, navId, btn) {
  goScreen(screenId);
  const nav = document.getElementById(navId);
  if (nav) {
    nav.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (btn) btn.classList.add('active');
  }
}

function showModal(id) {
  document.getElementById(id).classList.remove('hidden');
}

function hideModal(id) {
  document.getElementById(id).classList.add('hidden');
  if (id === 'modal-anim') resetAnim();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 2600);
}

// ── Clock ──────────────────────────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const h = now.getHours() % 12 || 12;
  const m = String(now.getMinutes()).padStart(2, '0');
  const el = document.getElementById('status-time');
  if (el) el.textContent = `${h}:${m}`;
}
updateClock();
setInterval(updateClock, 30000);

// ── Onboarding ─────────────────────────────────────────────────────────────
function selectRole(btn) {
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const role = btn.dataset.role;
  state.role = role;
  document.getElementById('fields-teacher').style.display = role === 'teacher' ? 'block' : 'none';
  document.getElementById('fields-family').style.display  = role === 'family'  ? 'block' : 'none';
  document.getElementById('fields-student').style.display = role === 'student' ? 'block' : 'none';
}

function handleSignup() {
  const role = state.role;
  if (role === 'teacher') {
    setupTeacherProfile();
    buildArtworkFeed();
    goScreen('screen-teacher-home');
  } else if (role === 'family') {
    setupFamilyProfile();
    buildFamilyFeed();
    goScreen('screen-family-feed');
  } else {
    showToast('✅ Logged in as student!');
    buildArtworkFeed();
    goScreen('screen-teacher-home'); // student sees read-only feed
  }
}

function setupTeacherProfile() {
  document.getElementById('profile-name').textContent = 'Mrs. Rivera';
  document.getElementById('profile-role').textContent = 'Lincoln Elementary · 4th Grade Art';
  document.getElementById('profile-avatar').textContent = '👩‍🏫';
  document.getElementById('pnav-mid-icon').textContent = '🧒';
  document.getElementById('pnav-mid-lbl').textContent = 'Students';
  document.getElementById('pnav-mod-icon').textContent = '🛡️';
  document.getElementById('pnav-mod-lbl').textContent = 'Moderate';
  document.getElementById('pnav-self-icon').textContent = '👩‍🏫';
  document.getElementById('pricing-block').innerHTML = `
    <div class="pricing-tier-label">Teacher Account</div>
    <div class="pricing-amount">Free <span class="pricing-period">forever</span></div>
    <div class="pricing-tagline">You keep Snaglet free so students can share their art 🎨</div>
    <div class="pricing-features">
      <div class="pricing-feat">✓ Unlimited student roster management</div>
      <div class="pricing-feat">✓ Post unlimited artwork</div>
      <div class="pricing-feat">✓ AI moderation dashboard</div>
      <div class="pricing-feat">✓ SMS family invitations</div>
      <div class="pricing-feat">✓ Classroom supply fund tracking</div>
    </div>`;
}

function setupFamilyProfile() {
  document.getElementById('profile-name').textContent = 'Sarah Johnson';
  document.getElementById('profile-role').textContent = 'Following Emma M. · Mom';
  document.getElementById('profile-avatar').textContent = '👩';
  document.getElementById('pnav-mid-icon').textContent = '🔔';
  document.getElementById('pnav-mid-lbl').textContent = 'Alerts';
  document.getElementById('pnav-mod-icon').textContent = '🎨';
  document.getElementById('pnav-mod-lbl').textContent = 'Emma';
  document.getElementById('pnav-self-icon').textContent = '👤';
  document.getElementById('pricing-block').innerHTML = `
    <div class="pricing-tier-label">Snaglet Family</div>
    <div class="pricing-amount">$4.99 <span class="pricing-period">/month</span></div>
    <div class="pricing-tagline">Thank you for supporting Emma's classroom! 🏫</div>
    <div class="pricing-features">
      <div class="pricing-feat">✓ View all of Emma's artwork</div>
      <div class="pricing-feat">✓ Comment, react, and share GIFs</div>
      <div class="pricing-feat">✓ 2 free AI animations per month</div>
      <div class="pricing-feat">✓ Download animations as MP4</div>
      <div class="pricing-feat">✓ 10% goes to Emma's classroom fund</div>
    </div>`;
}

// ── Build Feeds ────────────────────────────────────────────────────────────
function buildArtworkCard(art, isFamilyFeed) {
  const reactionHTML = art.reactions.map(r => `
    <div class="reaction-pill ${r.active ? 'active' : ''}" onclick="toggleReaction(this)">
      ${r.e} ${r.n}
    </div>`).join('');

  return `
    <div class="artwork-card">
      <div class="artwork-header">
        <div class="avatar av-md ${art.student.color}">${art.student.initials}</div>
        <div class="artwork-meta">
          <div class="artwork-student">${art.student.name}</div>
          <div class="artwork-class">Mrs. Rivera's 4th Grade Art</div>
        </div>
        <div class="artwork-time">${art.timeAgo}</div>
      </div>
      <div class="artwork-img" style="background:linear-gradient(135deg,${art.student.grad})">
        <div class="artwork-emoji">${art.student.emoji}</div>
        <div class="artwork-caption">${art.title}</div>
      </div>
      <div class="artwork-reactions">${reactionHTML}</div>
      <div class="artwork-actions">
        <button class="action-btn" onclick="showModal('modal-comments')">💬 ${art.comments}</button>
        <button class="action-btn" onclick="showModal('modal-gif')">🎭 GIF</button>
        <button class="action-btn ai-btn" onclick="startAnim('${art.student.emoji}')">✨ Bring to Life</button>
      </div>
    </div>`;
}

function buildArtworkFeed() {
  const feed = document.getElementById('artwork-feed');
  if (feed) feed.innerHTML = ARTWORKS.map(a => buildArtworkCard(a, false)).join('');
}

function buildFamilyFeed() {
  const feed = document.getElementById('family-feed');
  if (feed) feed.innerHTML = ARTWORKS.map(a => buildArtworkCard(a, true)).join('');
}

function buildStudentGrid() {
  const grid = document.getElementById('student-grid');
  if (!grid) return;
  grid.innerHTML = STUDENTS.map(s => `
    <div class="student-card">
      <div class="avatar av-lg ${s.color}">${s.initials}</div>
      <div class="student-name">${s.name}</div>
      <div class="student-sub">${s.followers} follower${s.followers !== 1 ? 's' : ''}</div>
      ${s.joined
        ? `<span class="tag tag-green" style="font-size:10px">Family joined ✓</span>`
        : `<div style="display:flex;flex-direction:column;gap:4px;align-items:center">
             <span class="tag tag-yellow" style="font-size:10px">⏳ Invite pending</span>
             <button class="btn btn-secondary btn-sm resend-btn" onclick="resendSMS('${s.name}')">Resend SMS</button>
           </div>`}
    </div>`).join('');
}

// Initialise feeds on load
buildArtworkFeed();
buildFamilyFeed();
buildStudentGrid();

// ── Reactions ──────────────────────────────────────────────────────────────
function toggleReaction(el) {
  const wasActive = el.classList.contains('active');
  el.classList.toggle('active');
  const parts = el.textContent.trim().split(' ');
  const emoji = parts[0];
  let count = parseInt(parts[1]) || 0;
  el.textContent = `${emoji} ${wasActive ? count - 1 : count + 1}`;
}

// ── Post Modal ─────────────────────────────────────────────────────────────
function togglePhotoPreview() {
  const preview = document.getElementById('photo-preview');
  const placeholder = document.getElementById('photo-placeholder');
  preview.classList.toggle('hidden');
  placeholder.style.display = preview.classList.contains('hidden') ? 'flex' : 'none';
}

function toggleChip(el) {
  el.classList.toggle('active');
  const active = document.querySelectorAll('#tag-chips .chip.active');
  const names = Array.from(active).map(c => c.textContent);
  const notice = document.getElementById('tagged-notice');
  if (names.length === 0) {
    notice.textContent = 'No students tagged yet';
    notice.style.background = 'var(--bg)';
    notice.style.color = 'var(--text2)';
  } else {
    notice.textContent = `👤 ${names.join(', ')} — followers will be notified`;
    notice.style.background = 'var(--blue-light)';
    notice.style.color = 'var(--blue)';
  }
}

function submitPost() {
  hideModal('modal-post');
  showToast('✅ Posted! Push notifications sent to 3 followers.');
}

// ── Animation Modal ────────────────────────────────────────────────────────
function startAnim(emoji) {
  document.getElementById('anim-emoji').textContent = emoji;
  document.getElementById('anim-preview-emoji').textContent = emoji;
  document.getElementById('anim-loading-state').classList.remove('hidden');
  document.getElementById('anim-done-state').classList.add('hidden');
  const step3 = document.getElementById('anim-step-3');
  const step4 = document.getElementById('anim-step-4');
  step3.classList.remove('done');
  step3.querySelector('.anim-step-dot').className = 'anim-step-dot spinning';
  step4.classList.remove('done');
  step4.querySelector('.anim-step-dot').className = 'anim-step-dot';
  step4.querySelector('.anim-step-dot').textContent = '4';
  showModal('modal-anim');

  state.animTimer = setTimeout(() => {
    step3.classList.add('done');
    step3.querySelector('.anim-step-dot').className = 'anim-step-dot done';
    step3.querySelector('.anim-step-dot').textContent = '✓';
  }, 1500);

  state.animTimer = setTimeout(() => {
    step4.classList.add('done');
    step4.querySelector('.anim-step-dot').className = 'anim-step-dot done';
    step4.querySelector('.anim-step-dot').textContent = '✓';
  }, 2800);

  state.animTimer = setTimeout(() => {
    document.getElementById('anim-loading-state').classList.add('hidden');
    document.getElementById('anim-done-state').classList.remove('hidden');
  }, 3300);
}

function resetAnim() {
  clearTimeout(state.animTimer);
}

// ── GIF Modal ──────────────────────────────────────────────────────────────
function selectGif(emoji) {
  hideModal('modal-gif');
  showToast(`${emoji} GIF added! Awaiting teacher review.`);
}

// ── Comments Modal ─────────────────────────────────────────────────────────
function setReply(name) {
  const input = document.getElementById('comment-text');
  input.placeholder = `Replying to ${name}...`;
  input.focus();
}

function postComment() {
  const input = document.getElementById('comment-text');
  const text = input.value.trim();
  if (!text) return;
  const list = document.getElementById('comments-list');
  const div = document.createElement('div');
  div.className = 'comment-item';
  div.innerHTML = `
    <div class="avatar av-sm av-orange">ME</div>
    <div class="comment-bubble">
      <div class="comment-name">Me</div>
      <div class="comment-text">${text}</div>
    </div>`;
  list.appendChild(div);
  div.scrollIntoView({ behavior: 'smooth' });
  input.value = '';
  input.placeholder = 'Add a comment...';
  showToast('💬 Comment sent! Awaiting teacher review.');
}

// ── Moderation ─────────────────────────────────────────────────────────────
function moderateItem(id, action) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = 'translateX(30px)';
  setTimeout(() => {
    el.remove();
    const msg = action === 'approve'
      ? '✓ Approved — comment is now visible to students'
      : '✗ Rejected — commenter has been notified';
    showToast(msg);
  }, 300);
}

// ── Students ───────────────────────────────────────────────────────────────
function copyCode() {
  try { navigator.clipboard.writeText('ART-4B9'); } catch(e) {}
  showToast('📋 Class code copied: ART-4B9');
}

function resendSMS(name) {
  showToast(`📱 SMS resent to ${name}'s parent`);
}

// ── Profile nav ────────────────────────────────────────────────────────────
function profileNav(which) {
  if (state.role === 'teacher') {
    if (which === 'home') goScreen('screen-teacher-home');
    else if (which === 'mid') goScreen('screen-students');
    else if (which === 'mod') goScreen('screen-mod');
  } else {
    if (which === 'home') goScreen('screen-family-feed');
    else if (which === 'mid') goScreen('screen-notifs');
    else if (which === 'mod') goScreen('screen-family-feed');
  }
}

// ── PWA install banner (iOS hint) ──────────────────────────────────────────
function showInstallHint() {
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = window.navigator.standalone;
  if (isIOS && !isStandalone) {
    const hint = document.createElement('div');
    hint.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#1E293B;color:white;padding:10px 16px;border-radius:12px;font-size:12px;font-family:Nunito,sans-serif;font-weight:700;z-index:9999;text-align:center;max-width:280px;line-height:1.4;';
    hint.innerHTML = '📲 Add Snaglet to your home screen:<br>tap <strong>Share</strong> then <strong>"Add to Home Screen"</strong>';
    document.body.appendChild(hint);
    setTimeout(() => hint.remove(), 6000);
  }
}
setTimeout(showInstallHint, 1500);

// ── Service Worker ─────────────────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
