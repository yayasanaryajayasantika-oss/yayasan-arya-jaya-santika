/**
 * YAYASAN ARYA JAYA SENTIKA - INTERACTIVE SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollHeader();
  initGuruFilter();
  initGuruModal();
  initPPDBForm();
  initContactForm();
  initAryaBot();
});

/* --------------------------------------------------------------------------
   1. THEME TOGGLE (DARK / LIGHT MODE)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('ypajs_theme') || 'light-theme';

  if (savedTheme === 'dark-theme') {
    document.body.classList.add('dark-theme');
    if (themeIcon) themeIcon.className = 'ri-sun-line';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('ypajs_theme', isDark ? 'dark-theme' : 'light-theme');
      if (themeIcon) {
        themeIcon.className = isDark ? 'ri-sun-line' : 'ri-moon-line';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. MOBILE NAV & DROPDOWN TOGGLE
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainnav = document.getElementById('mainnav');

  if (mobileToggle && mainnav) {
    mobileToggle.addEventListener('click', () => {
      mainnav.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = mainnav.classList.contains('active') ? 'ri-close-line' : 'ri-menu-line';
      }
    });

    const navLinks = mainnav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          mainnav.classList.remove('active');
          const icon = mobileToggle.querySelector('i');
          if (icon) icon.className = 'ri-menu-line';
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. SCROLL HEADER SHADOW EFFECT
   -------------------------------------------------------------------------- */
function initScrollHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   3.5. GURU & STAFF FILTER
   -------------------------------------------------------------------------- */
function initGuruFilter() {
  const filterBtns = document.querySelectorAll('.guru-filter-btn');
  const cards = document.querySelectorAll('.guru-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3.6. FLOATING GURU DETAIL MODAL
   -------------------------------------------------------------------------- */
function initGuruModal() {
  const modal = document.getElementById('guru-modal');
  const modalClose = document.getElementById('guru-modal-close');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const cards = document.querySelectorAll('.guru-card');

  if (!modal || !cards.length) return;

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalClose?.addEventListener('click', closeModal);
  modalCloseBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.guru-photo-container img');
      const badge = card.querySelector('.guru-badge-tag');
      const name = card.querySelector('.guru-title-name');
      const role = card.querySelector('.guru-role-sub');

      const values = card.querySelectorAll('.guru-detail-value');
      const ttl = values[0]?.textContent || '-';
      const pendidikan = values[1]?.textContent || '-';
      const masakerja = values[2]?.textContent || '-';

      const modalImg = document.getElementById('modal-guru-img');
      const modalBadge = document.getElementById('modal-guru-badge');
      const modalName = document.getElementById('modal-guru-name');
      const modalRole = document.getElementById('modal-guru-role');
      const modalTtl = document.getElementById('modal-guru-ttl');
      const modalPendidikan = document.getElementById('modal-guru-pendidikan');
      const modalMasaKerja = document.getElementById('modal-guru-masakerja');

      if (modalImg && img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
      }
      if (modalBadge && badge) modalBadge.textContent = badge.textContent.trim();
      if (modalName && name) modalName.textContent = name.textContent.trim();
      if (modalRole && role) modalRole.textContent = role.textContent.trim();
      if (modalTtl) modalTtl.textContent = ttl.trim();
      if (modalPendidikan) modalPendidikan.textContent = pendidikan.trim();
      if (modalMasaKerja) modalMasaKerja.textContent = masakerja.trim();

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });
}

/* --------------------------------------------------------------------------
   4. KABAR YPAJS TABS
   -------------------------------------------------------------------------- */
function switchTab(element, category) {
  const tabs = document.querySelectorAll('.tabs span');
  tabs.forEach(t => t.classList.remove('active'));
  element.classList.add('active');

  const newsGrid = document.getElementById('news-grid');
  if (!newsGrid) return;

  if (category === 'berita') {
    newsGrid.innerHTML = `
      <div class="card news-card">
        <div class="thumb"><i class="ri-news-line"></i></div>
        <div class="nbody">
          <div class="date">10 Agustus 2026</div>
          <h4>Pembukaan PPDB Tahun Ajaran 2026/2027</h4>
          <p>Pendaftaran peserta didik baru unit TK & SD Arya Jaya Sentika resmi dibuka dengan berbagai program keringanan biaya.</p>
        </div>
      </div>
      <div class="card news-card">
        <div class="thumb"><i class="ri-trophy-line"></i></div>
        <div class="nbody">
          <div class="date">22 Juli 2026</div>
          <h4>Juara Lomba Mewarnai & Seni Anak</h4>
          <p>Siswa TK Arya Jaya Sentika berhasil mengukir prestasi gemilang meraih Juara I pada Fest Kreativitas PAUD/TK.</p>
        </div>
      </div>
      <div class="card news-card">
        <div class="thumb"><i class="ri-compass-line"></i></div>
        <div class="nbody">
          <div class="date">5 Juli 2026</div>
          <h4>Kegiatan Outing Class & Edukasi Alam</h4>
          <p>Program pembelajaran luar kelas siswa SD Arya Jaya Sentika melatih kepedulian lingkungan dan kemandirian.</p>
        </div>
      </div>
    `;
  } else if (category === 'prestasi') {
    newsGrid.innerHTML = `
      <div class="card news-card">
        <div class="thumb" style="background:linear-gradient(135deg, #fceabb, #f8b500); color:#5c4300;"><i class="ri-medal-fill"></i></div>
        <div class="nbody">
          <div class="date">15 Juni 2026</div>
          <h4>Juara 1 Olimpiade Matematika SD Tingkat Kabupaten</h4>
          <p>Ananda Raihan kelas 5 SD Arya Jaya Sentika meraih medali emas pada ajang kompetisi sains & matematika dasar.</p>
        </div>
      </div>
      <div class="card news-card">
        <div class="thumb" style="background:linear-gradient(135deg, #fceabb, #f8b500); color:#5c4300;"><i class="ri-palette-line"></i></div>
        <div class="nbody">
          <div class="date">28 Mei 2026</div>
          <h4>Piala Bergilir Festival Tari & Seni Budaya</h4>
          <p>Tim Seni TK Arya Jaya Sentika memboyong piala favorit kategori penampilan busana dan tarian kreasi.</p>
        </div>
      </div>
      <div class="card news-card">
        <div class="thumb" style="background:linear-gradient(135deg, #fceabb, #f8b500); color:#5c4300;"><i class="ri-award-line"></i></div>
        <div class="nbody">
          <div class="date">10 Mei 2026</div>
          <h4>Penghargaan Sekolah Sehat & Berkarakter</h4>
          <p>Yayasan Arya Jaya Sentika menerima penganugerahan sebagai role model sekolah bersih dan ramah anak.</p>
        </div>
      </div>
    `;
  } else if (category === 'buletin') {
    newsGrid.innerHTML = `
      <div class="card news-card">
        <div class="thumb" style="background:linear-gradient(135deg, #e0c3fc, #8ec5fc); color:#2b1845;"><i class="ri-article-line"></i></div>
        <div class="nbody">
          <div class="date">Edisi Agustus 2026</div>
          <h4>Buletin Pendidikan Karakter Anak Usia Dini</h4>
          <p>Panduan penting bagi orang tua dalam membangun kemandirian, kedisiplinan, dan empati anak di rumah.</p>
        </div>
      </div>
      <div class="card news-card">
        <div class="thumb" style="background:linear-gradient(135deg, #e0c3fc, #8ec5fc); color:#2b1845;"><i class="ri-file-paper-line"></i></div>
        <div class="nbody">
          <div class="date">Edisi Juli 2026</div>
          <h4>Katalog Ekstrakurikuler SD TA 2026/2027</h4>
          <p>Informasi jadwal dan pendaftaran ekskul Pramuka, Tahfidz, Futsal, Tari, dan English Club SD Arya Jaya Sentika.</p>
        </div>
      </div>
      <div class="card news-card">
        <div class="thumb" style="background:linear-gradient(135deg, #e0c3fc, #8ec5fc); color:#2b1845;"><i class="ri-booklet-line"></i></div>
        <div class="nbody">
          <div class="date">Edisi Juni 2026</div>
          <h4>Panduan Layanan Antar-Jemput Siswa YPAJS</h4>
          <p>Informasi rute area penjemputan, standar keselamatan kendaraan, dan nomor kontak driver resmi yayasan.</p>
        </div>
      </div>
    `;
  }
}

/* --------------------------------------------------------------------------
   5. PPDB FORM SUBMISSION
   -------------------------------------------------------------------------- */
function initPPDBForm() {
  const form = document.getElementById('ppdb-form');
  const resultBox = document.getElementById('ppdb-result');
  const regIdSpan = document.getElementById('ppdb-regid');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const regId = `YPAJS-2026-${randNum}`;
      
      if (regIdSpan) regIdSpan.textContent = regId;
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   6. CONTACT FORM SUBMISSION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Terima kasih! Pesan Anda telah terkirim ke sekretariat Yayasan Arya Jaya Sentika. Kami akan membalas segera.');
      form.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   7. CAREER JOB APPLY ACTION
   -------------------------------------------------------------------------- */
function applyJob(position) {
  const name = prompt(`Lamar Posisi: ${position}\n\nMasukkan Nama Lengkap Anda:`);
  if (name) {
    const hp = prompt('Masukkan Nomor WhatsApp / Telepon Anda:');
    if (hp) {
      alert(`Terima kasih Sdr/i ${name}! Lamaran Anda untuk posisi "${position}" telah terdaftar. Tim HRD Yayasan Arya Jaya Sentika akan menghubungi nomor ${hp} untuk tahap wawancara.`);
    }
  }
}

/* --------------------------------------------------------------------------
   8. ARYABOT AI ASSISTANT CHATBOT
   -------------------------------------------------------------------------- */
function initAryaBot() {
  const toggleBtn = document.getElementById('chat-toggle');
  const closeBtn = document.getElementById('chat-close');
  const windowEl = document.getElementById('chat-window');
  const sendBtn = document.getElementById('chat-send');
  const inputEl = document.getElementById('chat-input');
  const messagesEl = document.getElementById('chat-messages');

  if (!toggleBtn || !windowEl) return;

  toggleBtn.addEventListener('click', () => {
    windowEl.classList.toggle('active');
  });

  closeBtn?.addEventListener('click', () => {
    windowEl.classList.remove('active');
  });

  function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = text;
    messagesEl.appendChild(userMsg);
    inputEl.value = '';
    messagesEl.scrollTop = messagesEl.scrollHeight;

    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'msg bot';
      botMsg.innerHTML = getAryaBotReply(text);
      messagesEl.appendChild(botMsg);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }, 600);
  }

  sendBtn?.addEventListener('click', sendMessage);
  inputEl?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

function getAryaBotReply(query) {
  const q = query.toLowerCase();

  if (q.includes('visi') || q.includes('misi')) {
    return '<strong>Visi:</strong> “Terwujudnya siswa beriman dan taqwa, berprestasi, mandiri & berwawasan lingkungan”.<br><br><strong>Misi:</strong><br>1. Menciptakan peserta didik yang berakhlak mulia dan tekun.<br>2. Meningkatkan prestasi akademik dan non akademik.<br>3. Menanamkan sikap mandiri, kreatif dan berkarakter.<br>4. Mengembangkan sekolah sebagai lingkungan yang baik untuk sarana pembangunan kehidupan belajar & sosial.<br>5. Mengembangkan profesionalisme pendidik dan tenaga kependidikan.';
  } else if (q.includes('sejarah') || q.includes('pendiri') || q.includes('djaman') || q.includes('1987')) {
    return 'Cikal bakal sekolah berawal dari perjuangan <strong>H. Djaman Bin H. Risin</strong> dan istri <strong>Hj. Amah Bin H. Atip</strong> pada tahun 1987 yang mengikhlaskan dapur rumah disulap menjadi ruang kelas belajar, yang kemudian berkembang pesat menjadi Yayasan Pendidikan terpercaya.';
  } else if (q.includes('ppdb') || q.includes('daftar') || q.includes('syarat') || q.includes('pendaftaran')) {
    return 'Pendaftaran PPDB TA 2026/2027 untuk <strong>TK Arya Jaya Sentika</strong> & <strong>SD Arya Jaya Sentika</strong> telah dibuka! Anda bisa mengisi formulir langsung pada section <a href="#ppdb" style="color:var(--primary); font-weight:bold;">PPDB Online</a> di website ini.';
  } else if (q.includes('jemputan') || q.includes('antar') || q.includes('mobil') || q.includes('bus')) {
    return 'Yayasan Arya Jaya Sentika menyediakan <strong>Layanan Jemputan Armada Ber-AC</strong> yang aman dan tepat waktu untuk wilayah sekitarnya. Anda dapat mengonfirmasi rute ke sekretariat.';
  } else if (q.includes('tk') || q.includes('paud') || q.includes('balita')) {
    return 'Unit <strong>TK Arya Jaya Sentika</strong> berfokus pada pendidikan anak usia dini (4-6 tahun) dengan pendekatan bermain sambil belajar, pengenalan adab, serta pengembangan motorik & kreativitas.';
  } else if (q.includes('sd') || q.includes('sekolah dasar') || q.includes('akademik')) {
    return 'Unit <strong>SD Arya Jaya Sentika</strong> menerapkan Kurikulum Merdeka yang menyeimbangkan akademik, keahlian digital dasar, pembiasaan ibadah/adab, serta ekstrakurikuler minat bakat.';
  } else if (q.includes('alamat') || q.includes('lokasi') || q.includes('dimana')) {
    return 'Kampus Yayasan Arya Jaya Sentika berlokasi di <strong>Jl. Arya Jaya Sentika No. 88, Balaraja - Tigaraksa, Kab. Tangerang, Banten 15720</strong>.';
  } else if (q.includes('kontak') || q.includes('telepon') || q.includes('wa') || q.includes('hp')) {
    return 'Anda dapat menghubungi Sekretariat Yayasan di nomor <strong>(021) 555-0199</strong> / WhatsApp <strong>0812-3456-7890</strong> atau email <strong>info@ypajs.sch.id</strong>.';
  } else if (q.includes('guru') || q.includes('kepala sekolah') || q.includes('staf') || q.includes('pendidik')) {
    return 'Yayasan Arya Jaya Sentika memiliki jajaran pendidik & staf berdedikasi tinggi, dipimpin oleh <strong>Ibu Ayu Wulandari, S.Pd.</strong> selaku Kepala Sekolah. Anda dapat melihat profil lengkap pada bagian <a href="#guru" style="color:var(--primary); font-weight:bold;">Dewan Guru & Staf</a>!';
  } else if (q.includes('biaya') || q.includes('spp') || q.includes('uang pangkal')) {
    return 'Untuk rincian biaya SPP dan Uang Pangkal TK & SD Arya Jaya Sentika, silakan isi form PPDB atau kunjungi kantor sekretariat kami pada jam kerja (Senin-Jumat, 07.00-15.00 WIB).';
  } else {
    return 'Terima kasih atas pertanyaannya! Untuk informasi lebih detail mengenai Yayasan Arya Jaya Sentika, silakan hubungi tim kami di <strong>(021) 555-0199</strong> atau WhatsApp <strong>0812-3456-7890</strong>.';
  }
}
