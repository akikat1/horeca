// ============================================================
// HoReCa Автоматизация — SPA Application
// Routing, page rendering, interactivity
// ============================================================

(function() {
  'use strict';

  var D = window.SITE_DATA;
  var app = document.getElementById('app');

  // Local aliases for helpers defined in data.js
  var formatPrice     = window.formatPrice;
  var getWhatsAppUrl  = window.getWhatsAppUrl;
  var getWhatsAppInquiry = window.getWhatsAppInquiry;
  var findService     = window.findService;

  // ── NAV ITEMS ──────────────────────────────────────────
  var NAV_ITEMS = [];
  // First echelon sections
  D.sections.filter(function(s){ return s.priority === 1; }).forEach(function(s){
    NAV_ITEMS.push({ label: s.title.replace(/ и .*/, ''), href: '#/' + s.id, id: s.id });
  });
  // Key second echelon
  NAV_ITEMS.push({ label: 'Управление', href: '#/staff-management', id: 'staff-management' });
  NAV_ITEMS.push({ label: 'Ещё', href: '#/ecosystem', id: '__more', children: [
    { label: 'Лояльность', href: '#/loyalty', id: 'loyalty' },
    { label: 'Закупки и склад', href: '#/procurement', id: 'procurement' },
    { label: 'Зал и кассиры', href: '#/hall', id: 'hall' },
    { label: 'Финансы', href: '#/analytics', id: 'analytics' },
    { label: 'Доставка', href: '#/delivery', id: 'delivery' },
    { label: 'Спецрешения', href: '#/specialized', id: 'specialized' },
  ]});
  NAV_ITEMS.push({ label: 'Экосистема', href: '#/ecosystem', id: 'ecosystem' });
  NAV_ITEMS.push({ label: 'Пакеты', href: '#/packages', id: 'packages' });
  NAV_ITEMS.push({ label: 'Контакт', href: '#/contact', id: 'contact' });

  // ── BUILD NAV ──────────────────────────────────────────
  function buildNav() {
    var menu = document.getElementById('nav-menu');
    var mobile = document.getElementById('mobile-menu');
    var dHTML = '', mHTML = '';

    NAV_ITEMS.forEach(function(item) {
      if (item.children) {
        dHTML += '<div class="nav__dropdown">';
        dHTML += '<a class="nav__item nav__item--dropdown" href="javascript:void(0)">' + item.label + ' ▾</a>';
        dHTML += '<div class="nav__dropdown-menu">';
        item.children.forEach(function(c){
          dHTML += '<a class="nav__dropdown-item" href="' + c.href + '" data-nav="' + c.id + '">' + c.label + '</a>';
          mHTML += '<a class="nav__mobile-item" href="' + c.href + '" data-nav="' + c.id + '">' + c.label + '</a>';
        });
        dHTML += '</div></div>';
      } else {
        dHTML += '<a class="nav__item" href="' + item.href + '" data-nav="' + item.id + '">' + item.label + '</a>';
        mHTML += '<a class="nav__mobile-item" href="' + item.href + '" data-nav="' + item.id + '">' + item.label + '</a>';
      }
    });

    menu.innerHTML = dHTML;
    mobile.innerHTML = mHTML;

    // Dropdown click toggle (works on desktop AND mobile)
    var dd = menu.querySelectorAll('.nav__dropdown');
    dd.forEach(function(d){
      var btn = d.querySelector('.nav__item--dropdown');
      var ddMenu = d.querySelector('.nav__dropdown-menu');
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var isOpen = ddMenu.style.display === 'flex';
        // Close all other dropdowns
        menu.querySelectorAll('.nav__dropdown-menu').forEach(function(m){ m.style.display = 'none'; });
        ddMenu.style.display = isOpen ? 'none' : 'flex';
      });
    });

    // Close dropdown on outside click
    document.addEventListener('click', function(){
      menu.querySelectorAll('.nav__dropdown-menu').forEach(function(m){ m.style.display = 'none'; });
    });
  }

  // Add dropdown styles dynamically
  var ddStyle = document.createElement('style');
  ddStyle.textContent = '.nav__dropdown{position:relative}.nav__dropdown-menu{display:none;position:absolute;top:calc(100% + 8px);left:0;flex-direction:column;background:rgba(8,12,20,0.98);border:1px solid var(--border);border-radius:var(--radius-md);padding:8px;min-width:200px;box-shadow:var(--shadow-card);z-index:200;animation:fadeIn .15s ease-out}.nav__dropdown-item{padding:10px 16px;border-radius:var(--radius-sm);font-size:.88rem;color:var(--text-secondary);white-space:nowrap;transition:all var(--transition);display:block}.nav__dropdown-item:hover{color:var(--accent-amber);background:var(--bg-glass-hover)}.nav__item--dropdown{cursor:pointer;user-select:none}';
  document.head.appendChild(ddStyle);

  // ── FOOTER ─────────────────────────────────────────────
  function buildFooter() {
    var col = document.getElementById('footer-services');
    var h = '<h4>Услуги</h4>';
    D.sections.slice(0, 6).forEach(function(s){
      h += '<a href="#/' + s.id + '">' + s.title.split(' и ')[0] + '</a>';
    });
    col.innerHTML = h;
    document.getElementById('footer-whatsapp').href = getWhatsAppInquiry();
  }

  // ── ROUTER ─────────────────────────────────────────────
  function getRoute() {
    var hash = location.hash || '#/';
    var parts = hash.replace('#/', '').split('#');
    return { page: parts[0] || '', anchor: parts[1] || '' };
  }

  function navigate() {
    var r = getRoute();
    var html = '';

    if (!r.page || r.page === '') html = renderHome();
    else if (r.page === 'ecosystem') html = renderEcosystem();
    else if (r.page === 'packages') html = renderPackages();
    else if (r.page === 'contact') html = renderContact();
    else {
      var section = D.sections.find(function(s){ return s.id === r.page; });
      if (section) html = renderSection(section);
      else html = renderHome();
    }

    app.innerHTML = '<div class="page">' + html + '</div>';
    window.scrollTo(0, 0);
    updateActiveNav(r.page);
    initPageInteractions();
    observeSlideUp();

    // Anchor scroll
    if (r.anchor) {
      setTimeout(function(){
        var el = document.getElementById(r.anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  function updateActiveNav(page) {
    document.querySelectorAll('[data-nav]').forEach(function(el){
      el.classList.toggle('nav__item--active', el.getAttribute('data-nav') === page);
      el.classList.toggle('nav__mobile-item--active', el.getAttribute('data-nav') === page);
    });
    // Close mobile
    document.getElementById('mobile-menu').classList.remove('active');
    document.getElementById('nav-toggle').classList.remove('active');
    document.body.style.overflow = '';
  }

  // ── RENDER: HOME ───────────────────────────────────────
  function renderHome() {
    return renderHero() + renderEntryCards() + renderFlowChain() + renderPackagePreview() + renderDemos() + renderHomeCTA();
  }

  function renderHero() {
    return '<section class="hero">' +
      '<div class="hero__glow"></div>' +
      '<div class="hero__content">' +
        '<span class="hero__badge">Караганда</span>' +
        '<h1 class="hero__title"><span class="text-gradient">Автоматизация</span> кафе и ресторанов</h1>' +
        '<p class="hero__subtitle">От QR-меню до прогноза закупок — единой системой. Боты, ИИ, аналитика: рутина уходит к технологиям, вы занимаетесь гостями.</p>' +
        '<div class="hero__actions">' +
          '<a href="#/packages" class="btn btn--primary btn--large">Посмотреть пакеты</a>' +
          '<a href="' + getWhatsAppInquiry() + '" target="_blank" class="btn btn--whatsapp btn--large">💬 Написать в WhatsApp</a>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function renderEntryCards() {
    var cards = [
      { icon: '🍽', title: 'Гости ждут', desc: 'QR-меню, боты заказов, бронирование — гость обслуживает себя сам', href: '#/guest-service' },
      { icon: '⭐', title: 'Рейтинг не растёт', desc: 'Автосбор отзывов, AI-ответы, автопостинг и таргет без SMM-щика', href: '#/reviews-marketing' },
      { icon: '👨‍🍳', title: 'Кухня — хаос', desc: 'AI-техкарты, план заготовок, контроль качества, цифровой СанПиН', href: '#/kitchen' },
      { icon: '📦', title: 'Закупки на глаз', desc: 'Прогноз спроса, автозаказ поставщику, учёт остатков за секунды', href: '#/procurement' },
      { icon: '👥', title: 'Текучка и хаос', desc: 'Графики смен, онбординг, дайджест владельцу — в одном канале', href: '#/staff-management' },
      { icon: '📊', title: 'Цифры вслепую', desc: 'Почасовая аналитика, аномалии в чеках, предиктивные прогнозы', href: '#/analytics' },
    ];

    var h = '<section class="section section--border container"><div class="section__header slide-up">' +
      '<h2 class="section__title">Какую задачу решаете?</h2>' +
      '<p class="section__subtitle">Выберите — покажем, как автоматизация закрывает именно эту боль</p></div>' +
      '<div class="entry-cards">';

    cards.forEach(function(c, i){
      h += '<a href="' + c.href + '" class="entry-card slide-up" style="animation-delay:' + (i*80) + 'ms">' +
        '<span class="entry-card__icon">' + c.icon + '</span>' +
        '<div class="entry-card__title">' + c.title + '</div>' +
        '<div class="entry-card__desc">' + c.desc + '</div>' +
        '<span class="entry-card__arrow">→</span>' +
      '</a>';
    });

    return h + '</div></section>';
  }

  function renderFlowChain() {
    var nodes = [
      { icon: '👤', label: 'Гость' },
      { icon: '📱', label: 'QR-меню' },
      { icon: '🛒', label: 'Заказ' },
      { icon: '👨‍🍳', label: 'Кухня' },
      { icon: '📸', label: 'Контроль' },
      { icon: '⭐', label: 'Отзыв' },
      { icon: '📊', label: 'Дайджест' },
    ];

    var h = '<section class="section container"><div class="section__header slide-up">' +
      '<h2 class="section__title">Как всё работает вместе</h2>' +
      '<p class="section__subtitle">Единая цепочка: от входа гостя до отчёта владельцу</p></div>' +
      '<div class="flow-chain slide-up">';

    nodes.forEach(function(n, i){
      if (i > 0) h += '<span class="flow-chain__arrow">→</span>';
      h += '<div class="flow-chain__node"><span>' + n.icon + '</span> ' + n.label + '</div>';
    });

    h += '</div><div style="text-align:center;margin-top:24px" class="slide-up">' +
      '<a href="#/ecosystem" class="btn btn--secondary">Посмотреть полную схему →</a></div></section>';

    return h;
  }

  function renderPackagePreview() {
    var h = '<section class="section section--border container"><div class="section__header slide-up">' +
      '<h2 class="section__title">Пакеты и цены</h2>' +
      '<p class="section__subtitle">Пять готовых решений — от стартового до экосистемы для сети</p></div>' +
      '<div class="packages-grid">';

    D.packages.forEach(function(pkg){
      var cls = pkg.popular ? ' package-card--popular' : '';
      var services = pkg.serviceIds.slice(0, 4).map(function(sid){
        var found = findService(sid);
        return found ? found.service.title : sid;
      });

      h += '<div class="package-card' + cls + ' slide-up">' +
        '<div class="package-card__color-bar" style="background:' + pkg.color + '"></div>' +
        (pkg.popular ? '<span class="package-card__popular-badge">Популярный</span>' : '') +
        '<div class="package-card__name">' + pkg.name + '</div>' +
        '<div class="package-card__price">' + formatPrice(pkg.price) + '<span class="package-card__price-period">/мес</span></div>' +
        '<div class="package-card__for-whom">' + pkg.forWhom + '</div>' +
        '<div class="package-card__benefit">' + pkg.keyBenefit + '</div>' +
        '<div class="package-card__features"><ul>' +
          services.map(function(s){ return '<li>' + s + '</li>'; }).join('') +
          (pkg.serviceIds.length > 4 ? '<li>и ещё ' + (pkg.serviceIds.length - 4) + ' услуг...</li>' : '') +
        '</ul></div>' +
        '<a href="' + getWhatsAppUrl(pkg.name, pkg.price) + '" target="_blank" class="btn btn--whatsapp btn--full package-card__cta">Оплатить →</a>' +
      '</div>';
    });

    h += '</div><div style="text-align:center;margin-top:32px" class="slide-up">' +
      '<a href="#/packages" class="btn btn--secondary">Сравнить все пакеты подробно →</a></div></section>';

    return h;
  }

  function renderDemos() {
    var h = '<section class="section container"><div class="section__header slide-up">' +
      '<h2 class="section__title">Реальные примеры</h2>' +
      '<p class="section__subtitle">Это не макет — работающие продукты, откройте и попробуйте</p></div>' +
      '<div class="grid-2">';

    D.demos.forEach(function(demo){
      h += '<div class="demo-card slide-up">' +
        '<span class="demo-card__badge">' + demo.type + '</span>' +
        '<div class="demo-card__title">' + demo.title + '</div>' +
        '<div class="demo-card__desc">' + demo.desc + '</div>' +
        '<a href="' + demo.url + '" target="_blank" class="btn btn--secondary btn--small">Открыть →</a>' +
      '</div>';
    });

    return h + '</div></section>';
  }

  function renderHomeCTA() {
    return '<section class="section container"><div class="cta-block slide-up">' +
      '<h2 class="cta-block__title">Обсудить вашу задачу</h2>' +
      '<p class="cta-block__text">Расскажите, что болит — предложим решение и посчитаем стоимость за 15 минут</p>' +
      '<div class="cta-block__actions">' +
        '<a href="' + getWhatsAppInquiry() + '" target="_blank" class="btn btn--whatsapp btn--large">💬 Написать в WhatsApp</a>' +
        '<a href="#/contact" class="btn btn--secondary btn--large">Оставить заявку</a>' +
      '</div></div></section>';
  }

  // ── RENDER: SECTION PAGE ───────────────────────────────
  function renderSection(sec) {
    var h = '<div class="container">' +
      '<div class="breadcrumb"><a href="#/">Главная</a><span class="breadcrumb__separator">›</span><span>' + sec.title + '</span></div>' +
      '<div class="page-header slide-up">' +
        '<span class="page-header__icon">' + sec.icon + '</span>' +
        '<h1 class="page-header__title">' + sec.title + '</h1>' +
        '<p class="page-header__subtitle">' + sec.subtitle + '</p>' +
      '</div>';

    // Subsections (specialized page)
    if (sec.subsections) {
      sec.subsections.forEach(function(sub){
        h += '<div class="subsection"><h2 class="subsection__title"><span>' + sub.icon + '</span> ' + sub.title + '</h2>';
        var subServices = sec.services.filter(function(s){ return sub.serviceIds.indexOf(s.id) !== -1; });
        subServices.forEach(function(svc){ h += renderServiceCardCollapsed(svc, sec); });
        h += '</div>';
      });
    } else {
      sec.services.forEach(function(svc, i){
        h += renderServiceCard(svc, sec, i);
      });
    }

    // Connection mini
    h += renderConnectionMini(sec);

    // CTA
    var pkg = D.packages.find(function(p){ return p.id === sec.relatedPackage; });
    if (pkg) {
      h += '<div class="cta-block slide-up" style="margin-top:48px">' +
        '<h2 class="cta-block__title">Все эти услуги — в пакете «' + pkg.name + '»</h2>' +
        '<p class="cta-block__text">' + pkg.keyBenefit + '</p>' +
        '<div class="cta-block__actions">' +
          '<a href="' + getWhatsAppUrl(pkg.name, pkg.price) + '" target="_blank" class="btn btn--whatsapp btn--large">Оплатить ' + formatPrice(pkg.price) + '/мес →</a>' +
          '<a href="#/packages#' + pkg.id + '" class="btn btn--secondary">Сравнить пакеты</a>' +
        '</div></div>';
    }

    return h + '</div>';
  }

  function renderServiceCard(svc, sec, i) {
    var delay = i * 60;
    var h = '<div class="service-card slide-up" style="animation-delay:' + delay + 'ms">' +
      '<div class="service-card__header">' +
        '<h3 class="service-card__title">' + svc.title + '</h3>' +
        renderBadges(svc.badges) +
      '</div>';

    // Pain
    h += '<div class="service-card__block service-card__pain">' +
      '<div class="service-card__block-label">🔴 Боль</div>' + esc(svc.pain) + '</div>';

    // Mechanic
    h += '<div class="service-card__block service-card__mechanic">' +
      '<div class="service-card__block-label">🔵 Как работает</div>' + esc(svc.mechanic) + '</div>';

    // Connections
    if (svc.connections && svc.connections.length > 0) {
      h += '<div class="service-card__block service-card__connections">' +
        '<div class="service-card__block-label">🟣 Связи с другими сервисами</div><ul>';
      svc.connections.forEach(function(c){
        h += '<li><a href="#/' + c.sectionId + '">' + c.label + '</a></li>';
      });
      h += '</ul></div>';
    }

    // Effects
    var effects = [];
    if (svc.effects.guest) effects.push({ label: 'Гость', cls: 'guest', text: svc.effects.guest });
    if (svc.effects.staff) effects.push({ label: 'Персонал', cls: 'staff', text: svc.effects.staff });
    if (svc.effects.chef) effects.push({ label: 'Шеф / Повара', cls: 'chef', text: svc.effects.chef });
    if (svc.effects.owner) effects.push({ label: 'Владелец', cls: 'owner', text: svc.effects.owner });

    if (effects.length > 0) {
      h += '<div class="service-card__effects">';
      effects.forEach(function(e){
        h += '<div class="service-card__effect">' +
          '<div class="service-card__effect-label service-card__effect-label--' + e.cls + '">' + e.label + '</div>' +
          '<div class="service-card__effect-text">' + esc(e.text) + '</div></div>';
      });
      h += '</div>';
    }

    // Cross note
    if (svc.crossNote) {
      h += '<div class="service-card__cross-note">' + esc(svc.crossNote) + '</div>';
    }

    return h + '</div>';
  }

  function renderServiceCardCollapsed(svc, sec) {
    var h = '<div class="service-card service-card--collapsed slide-up">' +
      '<div class="service-card__header">' +
        '<h3 class="service-card__title">' + svc.title + '</h3>' +
        renderBadges(svc.badges) +
      '</div>' +
      '<div class="service-card__block service-card__pain">' +
        '<div class="service-card__block-label">🔴 Боль</div>' + esc(svc.pain) +
      '</div>';

    // Just the main effect
    var mainEffect = svc.effects.owner || svc.effects.guest || svc.effects.chef || svc.effects.staff;
    if (mainEffect) {
      h += '<div class="service-card__block service-card__mechanic">' +
        '<div class="service-card__block-label">✅ Результат</div>' + esc(mainEffect) +
      '</div>';
    }

    return h + '</div>';
  }

  function renderBadges(badges) {
    if (!badges || badges.length === 0) return '';
    var map = {
      'kz': { text: '🇰🇿 Қаз/Рус', cls: 'service-card__badge--kz' },
      'voice': { text: '🎙 Голосовой ИИ', cls: 'service-card__badge--voice' },
      'poster': { text: '⚠️ Пересечение с Poster', cls: 'service-card__badge--poster' },
    };
    var h = '<div class="service-card__badges">';
    badges.forEach(function(b){
      var info = map[b];
      if (info) h += '<span class="service-card__badge ' + info.cls + '">' + info.text + '</span>';
    });
    return h + '</div>';
  }

  function renderConnectionMini(sec) {
    var connected = [];
    sec.services.forEach(function(svc){
      if (!svc.connections) return;
      svc.connections.forEach(function(c){
        if (c.sectionId !== sec.id && connected.indexOf(c.sectionId) === -1) {
          connected.push(c.sectionId);
        }
      });
    });

    if (connected.length === 0) return '';

    var h = '<div class="section" style="margin-top:32px"><div class="section__header slide-up">' +
      '<h2 class="section__title" style="font-size:1.3rem">Связи с другими разделами</h2></div>' +
      '<div class="connection-mini slide-up">' +
      '<div class="connection-mini__node connection-mini__node--current">' + sec.icon + ' ' + sec.title.split(' и ')[0] + '</div>';

    connected.slice(0, 5).forEach(function(sid){
      var s = D.sections.find(function(x){ return x.id === sid; });
      if (s) {
        h += '<span class="connection-mini__arrow">⇄</span>' +
          '<a href="#/' + s.id + '" class="connection-mini__node">' + s.icon + ' ' + s.title.split(' и ')[0] + '</a>';
      }
    });

    return h + '</div></div>';
  }

  // ── RENDER: ECOSYSTEM ──────────────────────────────────
  function renderEcosystem() {
    var h = '<div class="container">' +
      '<div class="breadcrumb"><a href="#/">Главная</a><span class="breadcrumb__separator">›</span><span>Экосистема</span></div>' +
      '<div class="page-header slide-up">' +
        '<span class="page-header__icon">🔗</span>' +
        '<h1 class="page-header__title">Как всё работает как единая система</h1>' +
        '<p class="page-header__subtitle">~50 сервисов — не меню из 50 блюд, а одна связанная экосистема</p>' +
      '</div>';

    // Intro text
    h += '<div class="eco-text slide-up">' +
      '<p>Гость заходит через один из ботов — QR-меню, визитку, бронирование. Заказ падает на кухню, где уже работают техкарты с актуальной себестоимостью и план заготовок. Готовое блюдо проходит фотоконтроль, официант подаёт — вечером сверка кассы и разделение чаевых уходят одним отчётом.</p>' +
      '<p>После визита гость получает запрос на отзыв, ответ готовится автоматически, данные попадают в бота лояльности. Все события — заказ, смена, отзыв, списание — стекаются в один канал: ИИ-дайджест владельцу.</p>' +
      '<p>Это не подмена аналитики Poster, а ежедневная выжимка для тех, кому некогда туда заходить. Отдельным слоем работает администратор: график смен с учётом Трудового кодекса, онбординг через базу знаний.</p>' +
    '</div>';

    // Interactive diagram
    h += '<h2 class="section__title" style="text-align:center;margin-bottom:24px">Интерактивная схема связей</h2>';
    h += '<div class="ecosystem slide-up" id="eco-diagram">';
    h += '<svg class="ecosystem__svg" id="eco-svg"></svg>';

    D.ecosystemNodes.forEach(function(node){
      var typeCls = node.type === 'hub' ? ' ecosystem__node--hub' : (node.type === 'role' ? ' ecosystem__node--role' : '');
      var href = node.section ? '#/' + node.section : '#/';
      h += '<a href="' + href + '" class="ecosystem__node' + typeCls + '" id="eco-' + node.id + '" ' +
        'style="left:' + node.x + '%;top:' + node.y + '%" data-node="' + node.id + '">' +
        '<div class="ecosystem__node-icon">' + node.icon + '</div>' +
        '<span class="ecosystem__node-label">' + node.label + '</span>' +
      '</a>';
    });

    h += '</div>';

    // Principle block
    h += '<div class="eco-principle slide-up">' +
      '<h3>Принцип: достраивать, а не дублировать</h3>' +
      '<p><strong>Poster / Paloma365</strong> — если заведение уже на кассе такого уровня, там уже есть база клиентов, учёт времени, анализ меню. Наша роль — закрывать то, что касса не считает.</p>' +
      '<p><strong>Kaspi / Halyk Рестораны</strong> — оплата по QR уже есть. Мы — консалтинг по подключению и синхронизации, а не своя платёжная система.</p>' +
      '<p><strong>Wolt / Chocofood</strong> — доставка подключена. Роль — синхронизация меню и остатков с агрегаторами.</p>' +
    '</div>';

    // Staff interaction block
    h += '<div class="eco-principle slide-up">' +
      '<h3>Взаимодействие персонала через систему</h3>' +
      '<p>Кухня и зал больше не общаются криком через раздачу — их соединяет кухонный экран или голосовой помощник. Зал и администратор соединены сверкой смены и графиком. Администратор и владелец — дайджестом. Шеф и повара — техкартами и фотоконтролем.</p>' +
      '<p>Время, которое раньше уходило на рутину, освобождается для единственного, что автоматизировать нельзя: личного контакта в нестандартной ситуации.</p>' +
    '</div>';

    // CTA
    h += '<div class="cta-block slide-up" style="margin-top:48px">' +
      '<h2 class="cta-block__title">Собрать свою экосистему</h2>' +
      '<p class="cta-block__text">Выберите готовый пакет или соберём индивидуальный набор под ваше заведение</p>' +
      '<div class="cta-block__actions">' +
        '<a href="#/packages" class="btn btn--primary btn--large">Посмотреть пакеты</a>' +
        '<a href="' + getWhatsAppInquiry('Хочу обсудить экосистему автоматизации для моего заведения.') + '" target="_blank" class="btn btn--whatsapp btn--large">💬 Обсудить</a>' +
      '</div></div>';

    return h + '</div>';
  }

  function initEcosystemDiagram() {
    var svg = document.getElementById('eco-svg');
    var container = document.getElementById('eco-diagram');
    if (!svg || !container) return;

    var w = container.offsetWidth;
    var ht = container.offsetHeight;

    // Draw edges
    var paths = '';
    D.ecosystemEdges.forEach(function(edge, i){
      var fromNode = D.ecosystemNodes.find(function(n){ return n.id === edge.from; });
      var toNode = D.ecosystemNodes.find(function(n){ return n.id === edge.to; });
      if (!fromNode || !toNode) return;

      var x1 = fromNode.x / 100 * w;
      var y1 = fromNode.y / 100 * ht;
      var x2 = toNode.x / 100 * w;
      var y2 = toNode.y / 100 * ht;

      paths += '<line class="ecosystem__edge" data-from="' + edge.from + '" data-to="' + edge.to +
        '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>';
    });
    svg.innerHTML = paths;

    // Hover interaction
    var nodes = container.querySelectorAll('.ecosystem__node');
    var edges = container.querySelectorAll('.ecosystem__edge');

    nodes.forEach(function(nodeEl){
      var nodeId = nodeEl.getAttribute('data-node');

      nodeEl.addEventListener('mouseenter', function(){
        var connectedIds = [nodeId];
        D.ecosystemEdges.forEach(function(e){
          if (e.from === nodeId) connectedIds.push(e.to);
          if (e.to === nodeId) connectedIds.push(e.from);
        });

        nodes.forEach(function(n){
          var nid = n.getAttribute('data-node');
          if (connectedIds.indexOf(nid) === -1) n.classList.add('ecosystem__node--dimmed');
          else n.classList.add('ecosystem__node--highlighted');
        });

        edges.forEach(function(e){
          var ef = e.getAttribute('data-from');
          var et = e.getAttribute('data-to');
          if (ef === nodeId || et === nodeId) e.classList.add('ecosystem__edge--highlighted');
          else e.classList.add('ecosystem__edge--dimmed');
        });
      });

      nodeEl.addEventListener('mouseleave', function(){
        nodes.forEach(function(n){ n.classList.remove('ecosystem__node--dimmed', 'ecosystem__node--highlighted'); });
        edges.forEach(function(e){ e.classList.remove('ecosystem__edge--highlighted', 'ecosystem__edge--dimmed'); });
      });
    });
  }

  // ── RENDER: PACKAGES ───────────────────────────────────
  function renderPackages() {
    var h = '<div class="container">' +
      '<div class="breadcrumb"><a href="#/">Главная</a><span class="breadcrumb__separator">›</span><span>Пакеты и цены</span></div>' +
      '<div class="page-header slide-up">' +
        '<span class="page-header__icon">💰</span>' +
        '<h1 class="page-header__title">Пакеты и цены</h1>' +
        '<p class="page-header__subtitle">Пять готовых решений — выберите подходящий или соберём индивидуальный</p>' +
      '</div>';

    // Package cards
    h += '<div class="packages-grid">';
    D.packages.forEach(function(pkg){
      var cls = pkg.popular ? ' package-card--popular' : '';
      var services = pkg.serviceIds.map(function(sid){
        var found = findService(sid);
        return found ? found.service.title : sid;
      });

      h += '<div class="package-card' + cls + ' slide-up" id="' + pkg.id + '">' +
        '<div class="package-card__color-bar" style="background:' + pkg.color + '"></div>' +
        (pkg.popular ? '<span class="package-card__popular-badge">Популярный</span>' : '') +
        '<div class="package-card__name">' + pkg.name + '</div>' +
        '<div class="package-card__price">' + formatPrice(pkg.price) + '<span class="package-card__price-period">/мес</span></div>' +
        '<div class="package-card__for-whom">' + pkg.forWhom + '</div>' +
        '<div class="package-card__benefit">' + pkg.keyBenefit + '</div>' +
        '<div class="package-card__features"><ul>' +
          services.map(function(s){ return '<li>' + s + '</li>'; }).join('') +
        '</ul></div>' +
        '<a href="' + getWhatsAppUrl(pkg.name, pkg.price) + '" target="_blank" class="btn btn--whatsapp btn--full package-card__cta">Оплатить →</a>' +
      '</div>';
    });
    h += '</div>';

    // Comparison table
    h += '<div class="section" style="margin-top:64px"><div class="section__header slide-up">' +
      '<h2 class="section__title">Сравнение пакетов</h2></div>' +
      '<div class="comparison-wrapper slide-up"><table class="comparison-table">' +
      '<thead><tr><th>Услуга</th>';
    D.packages.forEach(function(p){ h += '<th style="color:' + p.color + '">' + p.name + '</th>'; });
    h += '</tr></thead><tbody>';

    // Group by section
    D.sections.forEach(function(sec){
      if (sec.id === 'specialized') return;
      var sectionHasServices = false;
      sec.services.forEach(function(svc){
        D.packages.forEach(function(p){
          if (p.serviceIds.indexOf(svc.id) !== -1) sectionHasServices = true;
        });
      });
      if (!sectionHasServices) return;

      h += '<tr class="comparison-table__section-row"><td colspan="' + (D.packages.length + 1) + '">' + sec.icon + ' ' + sec.title + '</td></tr>';
      sec.services.forEach(function(svc){
        var anyPkg = false;
        D.packages.forEach(function(p){ if (p.serviceIds.indexOf(svc.id) !== -1) anyPkg = true; });
        if (!anyPkg) return;

        h += '<tr><td>' + svc.title + '</td>';
        D.packages.forEach(function(p){
          if (p.serviceIds.indexOf(svc.id) !== -1) {
            h += '<td><span class="comparison-table__check">✓</span></td>';
          } else {
            h += '<td><span class="comparison-table__dash">—</span></td>';
          }
        });
        h += '</tr>';
      });
    });

    h += '</tbody></table></div></div>';

    // Custom
    h += '<div class="cta-block slide-up" style="margin-top:48px">' +
      '<h2 class="cta-block__title">Не нашли подходящий?</h2>' +
      '<p class="cta-block__text">Соберём индивидуальный набор под ваше заведение</p>' +
      '<div class="cta-block__actions">' +
        '<a href="' + getWhatsAppInquiry('Хочу обсудить индивидуальный набор услуг для моего заведения.') + '" target="_blank" class="btn btn--whatsapp btn--large">💬 Обсудить индивидуально</a>' +
      '</div></div>';

    return h + '</div>';
  }

  // ── RENDER: CONTACT ────────────────────────────────────
  function renderContact() {
    var h = '<div class="container">' +
      '<div class="breadcrumb"><a href="#/">Главная</a><span class="breadcrumb__separator">›</span><span>Контакт</span></div>' +
      '<div class="page-header slide-up">' +
        '<span class="page-header__icon">📞</span>' +
        '<h1 class="page-header__title">Обсудить вашу задачу</h1>' +
        '<p class="page-header__subtitle">Расскажите, что нужно — предложим решение за 15 минут</p>' +
      '</div>';

    h += '<div class="contact-grid">' +
      '<div class="contact-form slide-up" id="contact-form">' +
        '<div class="contact-form__field">' +
          '<label class="contact-form__label">Ваше имя</label>' +
          '<input class="contact-form__input" type="text" id="cf-name" placeholder="Как к вам обращаться">' +
        '</div>' +
        '<div class="contact-form__field">' +
          '<label class="contact-form__label">Телефон</label>' +
          '<input class="contact-form__input" type="tel" id="cf-phone" placeholder="+7 7XX XXX-XX-XX">' +
        '</div>' +
        '<div class="contact-form__field">' +
          '<label class="contact-form__label">Название заведения</label>' +
          '<input class="contact-form__input" type="text" id="cf-place" placeholder="Кафе, ресторан, столовая...">' +
        '</div>' +
        '<div class="contact-form__field">' +
          '<label class="contact-form__label">Что хотите автоматизировать?</label>' +
          '<div class="contact-form__checkboxes">';

    var checkOptions = [
      'Гостевой сервис (QR-меню, боты, бронь)',
      'Отзывы и маркетинг',
      'Кухня и производство',
      'Закупки и склад',
      'Управление персоналом',
      'Аналитика и финансы',
      'Доставка',
      'Решение для столовой / сети',
    ];
    checkOptions.forEach(function(opt, i){
      h += '<label class="contact-form__checkbox"><input type="checkbox" value="' + opt + '" class="cf-check"> ' + opt + '</label>';
    });

    h += '</div></div>' +
      '<button class="btn btn--whatsapp btn--large btn--full" id="cf-submit">💬 Отправить в WhatsApp</button>' +
    '</div>';

    // Contact info sidebar
    h += '<div class="contact-info slide-up">' +
      '<div class="contact-info__card">' +
        '<h3>💬 WhatsApp</h3>' +
        '<p class="text-secondary">Самый быстрый способ — напишите прямо сейчас</p>' +
        '<a href="' + getWhatsAppInquiry() + '" target="_blank" class="btn btn--whatsapp" style="margin-top:12px">Написать в WhatsApp</a>' +
      '</div>' +
      '<div class="contact-info__card">' +
        '<h3>📞 Телефон</h3>' +
        '<a href="tel:+77086558518" style="font-size:1.2rem;font-weight:600">+7 708 655-85-18</a>' +
      '</div>' +
      '<div class="contact-info__card">' +
        '<h3>📍 Город</h3>' +
        '<p class="text-secondary">Караганда, Казахстан</p>' +
      '</div>' +
    '</div></div>';

    return h + '</div>';
  }

  // ── PAGE INTERACTIONS ──────────────────────────────────
  function initPageInteractions() {
    // Contact form submit
    var cfSubmit = document.getElementById('cf-submit');
    if (cfSubmit) {
      cfSubmit.addEventListener('click', function(){
        var name = (document.getElementById('cf-name').value || '').trim();
        var phone = (document.getElementById('cf-phone').value || '').trim();
        var place = (document.getElementById('cf-place').value || '').trim();
        var checks = [];
        document.querySelectorAll('.cf-check:checked').forEach(function(cb){ checks.push(cb.value); });

        var msg = 'Здравствуйте!';
        if (name) msg += '\nМеня зовут ' + name + '.';
        if (place) msg += '\nЗаведение: ' + place + '.';
        if (phone) msg += '\nТелефон: ' + phone + '.';
        if (checks.length > 0) msg += '\n\nИнтересует:\n• ' + checks.join('\n• ');
        msg += '\n\nХочу обсудить автоматизацию.';

        window.open(getWhatsAppInquiry(msg), '_blank');
      });
    }

    // Ecosystem diagram
    if (document.getElementById('eco-diagram')) {
      setTimeout(initEcosystemDiagram, 200);
    }
  }

  // ── SCROLL OBSERVER (slide-up) ─────────────────────────
  function observeSlideUp() {
    var els = document.querySelectorAll('.slide-up');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function(el){ el.classList.add('visible'); });
      return;
    }
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function(el){ obs.observe(el); });
  }

  // ── GLOBAL INTERACTIONS ────────────────────────────────
  function initGlobal() {
    // Mobile nav toggle
    var toggle = document.getElementById('nav-toggle');
    var mobileMenu = document.getElementById('mobile-menu');
    toggle.addEventListener('click', function(){
      toggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile on link click
    mobileMenu.addEventListener('click', function(e){
      if (e.target.classList.contains('nav__mobile-item')) {
        mobileMenu.classList.remove('active');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Nav scroll effect
    window.addEventListener('scroll', function(){
      var nav = document.getElementById('main-nav');
      var btt = document.getElementById('back-to-top');
      var scrolled = window.scrollY > 50;
      nav.classList.toggle('nav--scrolled', scrolled);
      btt.classList.toggle('visible', window.scrollY > 300);
    });

    // Back to top
    document.getElementById('back-to-top').addEventListener('click', function(){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Hash change
    window.addEventListener('hashchange', navigate);
  }

  // ── HELPERS ────────────────────────────────────────────
  function esc(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ── INIT ───────────────────────────────────────────────
  buildNav();
  buildFooter();
  initGlobal();
  navigate();

})();
