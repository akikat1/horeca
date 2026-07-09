// ============================================================
// HoReCa Автоматизация — Полный каталог услуг и пакеты
// ============================================================

window.SITE_DATA = {
  meta: {
    agencyName: 'HoReCa Автоматизация',
    tagline: 'Автоматизация кафе и ресторанов в Караганде',
    description: 'От QR-меню до прогноза закупок — единой системой',
    whatsapp: '77086558518',
    whatsappDisplay: '+7 708 655-85-18',
  },

  // ──────────────────────────────────────────────
  // SECTIONS  (10 website sections from 13 catalog sections)
  // ──────────────────────────────────────────────
  sections: [

    // ═══════ 1. ГОСТЕВОЙ СЕРВИС ═══════
    {
      id: 'guest-service',
      title: 'Гостевой сервис и заказы',
      subtitle: 'Всё, что гость видит первым — от QR-меню до голосового бота',
      icon: '🍽',
      priority: 1,
      painEntry: 'Гости ждут официанта, звонки занимают администратора, заказы теряются',
      relatedPackage: 'starter',
      services: [
        {
          id: 'qr-menu',
          title: 'QR-меню',
          pain: 'Гость ждёт бумажное меню или официанта; заведению дорого перепечатывать меню при каждом изменении цены.',
          mechanic: 'Сканирует QR на столе — открывается интерактивное меню с фото, категориями и ценами. Обновление из одного места, без типографии.',
          connections: [
            { serviceId: 'ai-descriptions', sectionId: 'reviews-marketing', label: 'Описания блюд берутся из AI-генерации' },
            { serviceId: 'ai-techcards', sectionId: 'kitchen', label: 'Состав и аллергены — из техкарт' },
            { serviceId: 'order-bot', sectionId: 'guest-service', label: 'Первый шаг к заказу через бота' }
          ],
          effects: {
            guest: 'Сам разбирается в меню, не дожидаясь официанта',
            staff: 'Официант свободен от вопросов «что у вас есть»',
            chef: null,
            owner: 'Экономия на печати меню, мгновенные обновления цен'
          },
          badges: ['kz'],
          crossNote: null
        },
        {
          id: 'bot-vizitka',
          title: 'Бот-визитка',
          pain: 'Администратор весь день отвечает на одни и те же вопросы по телефону — адрес, часы, меню. Ночью отвечать некому.',
          mechanic: 'Бот в Telegram/WhatsApp отвечает на базовые вопросы 24/7 без участия человека.',
          connections: [
            { serviceId: 'qr-menu', sectionId: 'guest-service', label: 'Перенаправляет на QR-меню' },
            { serviceId: 'booking', sectionId: 'guest-service', label: 'Переводит на бронирование' },
            { serviceId: 'voice-bot-orders', sectionId: 'guest-service', label: 'Дополняет голосовой бот для звонков' }
          ],
          effects: {
            guest: 'Получает ответы даже ночью, когда заведение закрыто',
            staff: 'Администратор не отвлекается на рутинные сообщения',
            chef: null,
            owner: null
          },
          badges: ['kz'],
          crossNote: null
        },
        {
          id: 'order-bot',
          title: 'Бот приёма заказов с корзиной',
          pain: 'Официант не успевает в пиковые часы, при передаче заказа на кухню голосом случаются ошибки.',
          mechanic: 'Гость выбирает блюда и оформляет заказ в Telegram. Заказ падает на кухню — на экран или голосовому помощнику — без искажений.',
          connections: [
            { serviceId: 'voice-kitchen', sectionId: 'kitchen', label: 'Заказ уходит на кухню напрямую' },
            { serviceId: 'loyalty-bot', sectionId: 'loyalty', label: 'Начисляет баллы лояльности' },
            { serviceId: 'ai-digest', sectionId: 'staff-management', label: 'Данные в дайджест владельцу' },
            { serviceId: 'ai-techcards', sectionId: 'kitchen', label: 'Расчёт себестоимости через техкарты' }
          ],
          effects: {
            guest: 'Не ждёт, когда к нему подойдут',
            staff: 'Меньше бегает с блокнотом, ошибок в заказе меньше',
            chef: null,
            owner: null
          },
          badges: ['kz'],
          crossNote: null
        },
        {
          id: 'booking',
          title: 'Бронирование столиков',
          pain: 'Администратор отвечает на звонки по брони весь день, при большом потоке путает брони. Ночью бронировать негде.',
          mechanic: 'Гость бронирует стол через бот или сайт без звонка. Администратор видит список броней на день в одном месте.',
          connections: [
            { serviceId: 'booking-social', sectionId: 'guest-service', label: 'Тот же движок для Instagram/VK/2ГИС' }
          ],
          effects: {
            guest: 'Бронирует 24/7 без звонков',
            staff: 'Не тратит время на звонки по брони, нет двойных бронирований',
            chef: null,
            owner: null
          },
          badges: [],
          crossNote: 'Пересекается с Halyk Рестораны — разница в кастомизации под конкретное заведение'
        },
        {
          id: 'allergen-ai',
          title: 'AI-консультант по аллергенам и диетам',
          pain: 'Гость с аллергией долго расспрашивает официанта или рискует заказать не то. Официант не помнит точный состав каждого блюда.',
          mechanic: 'Гость спрашивает бота «что у вас без глютена» — получает точный ответ на основе состава блюд из техкарт.',
          connections: [
            { serviceId: 'ai-techcards', sectionId: 'kitchen', label: 'Полностью зависит от данных техкарт' }
          ],
          effects: {
            guest: 'Доверяет заведению больше и возвращается',
            staff: 'Не несёт ответственность за то, что забыл упомянуть аллерген',
            chef: null,
            owner: null
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'voice-bot-orders',
          title: 'Голосовой бот для телефонных заказов',
          pain: 'Часть гостей звонит, а не пишет — линия занята, администратор отвлекается от зала.',
          mechanic: 'Бот распознаёт речь и принимает заказ по телефону как живой оператор, передавая его на кухню.',
          connections: [
            { serviceId: 'voice-kitchen', sectionId: 'kitchen', label: 'Один голосовой движок для заказов и кухни' },
            { serviceId: 'order-bot', sectionId: 'guest-service', label: 'Заказ уходит в тот же поток' }
          ],
          effects: {
            guest: 'Тот же уровень сервиса, что и через мессенджер',
            staff: 'Администратор не отрывается от зала',
            chef: null,
            owner: null
          },
          badges: ['kz', 'voice'],
          crossNote: null
        },
        {
          id: 'booking-social',
          title: 'Бронирование через Instagram/VK/2ГИС',
          pain: 'Сообщения в директ Instagram или комментарии 2ГИС легко теряются среди переписки администратора.',
          mechanic: 'Тот же движок бронирования и бота-визитки, подключённый к директу и комментариям площадок.',
          connections: [
            { serviceId: 'bot-vizitka', sectionId: 'guest-service', label: 'Расширение бота-визитки на другие каналы' },
            { serviceId: 'booking', sectionId: 'guest-service', label: 'Единая логика бронирования' }
          ],
          effects: {
            guest: 'Бронирует там, где ему удобно',
            staff: 'Ни одна заявка не теряется в личных сообщениях',
            chef: null,
            owner: null
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'ai-recommendations',
          title: 'AI-рекомендации «вам понравится»',
          pain: 'Гость каждый раз выбирает вслепую, средний чек не растёт — никто не предлагает удачные сочетания.',
          mechanic: 'На основе истории заказов система предлагает: «в прошлый раз вам понравилась паста — попробуйте новую».',
          connections: [
            { serviceId: 'order-bot', sectionId: 'guest-service', label: 'Питается данными из заказов' },
            { serviceId: 'loyalty-bot', sectionId: 'loyalty', label: 'Использует историю из лояльности' },
            { serviceId: 'promo-mailing', sectionId: 'reviews-marketing', label: 'Персонализирует рассылку' }
          ],
          effects: {
            guest: 'Чувствует, что его вкус помнят',
            staff: null,
            chef: null,
            owner: 'Средний чек растёт без давления со стороны официанта'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'auto-complaints',
          title: 'Автоматическая обработка жалоб',
          pain: 'Жалоба гостя требует быстрой реакции, но администратор видит её не сразу, формальное извинение портит ситуацию.',
          mechanic: 'ИИ классифицирует жалобу и готовит черновик извинения с предложением компенсации. Администратору остаётся утвердить.',
          connections: [
            { serviceId: 'ai-review-replies', sectionId: 'reviews-marketing', label: 'Один механизм для жалоб и отзывов' },
            { serviceId: 'photo-quality', sectionId: 'kitchen', label: 'Проверяет фотоконтроль если жалоба «не как на фото»' }
          ],
          effects: {
            guest: 'Получает реакцию за минуты, а не через день',
            staff: 'Не придумывает извинение с нуля',
            chef: null,
            owner: null
          },
          badges: [],
          crossNote: null
        }
      ]
    },

    // ═══════ 2. ОТЗЫВЫ И МАРКЕТИНГ ═══════
    {
      id: 'reviews-marketing',
      title: 'Отзывы, рейтинг и маркетинг',
      subtitle: 'Репутация и привлечение гостей на автопилоте — без отдельного SMM-щика',
      icon: '⭐',
      priority: 1,
      painEntry: 'Рейтинг не растёт, SMM дорого, акции забывают отправить',
      relatedPackage: 'advanced',
      services: [
        {
          id: 'auto-reviews',
          title: 'Автосбор отзывов',
          pain: 'Довольные гости редко пишут отзыв сами, а недовольные — почти всегда. Рейтинг в 2ГИС растёт медленно или падает.',
          mechanic: 'Гость автоматически получает сообщение после визита с просьбой оставить отзыв на 2ГИС/Google Maps с прямой ссылкой.',
          connections: [
            { serviceId: 'ai-review-replies', sectionId: 'reviews-marketing', label: 'Питает AI-ответы на отзывы' },
            { serviceId: 'ai-digest', sectionId: 'staff-management', label: 'Данные в дайджест владельцу' },
            { serviceId: 'loyalty-bot', sectionId: 'loyalty', label: 'Использует базу из лояльности' }
          ],
          effects: {
            guest: null,
            staff: 'Не нужно вручную просить оставить отзыв',
            chef: null,
            owner: 'Рейтинг растёт системно, а не случайно'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'ai-review-replies',
          title: 'AI-ответы на отзывы',
          pain: 'Отвечать на отзывы вручную — рутина, которую откладывают. Без ответов заведение выглядит равнодушным.',
          mechanic: 'ИИ мониторит отзывы в 2ГИС и Google Maps, готовит ответ — администратору остаётся нажать «опубликовать».',
          connections: [
            { serviceId: 'auto-complaints', sectionId: 'guest-service', label: 'Один механизм с обработкой жалоб' },
            { serviceId: 'ai-digest', sectionId: 'staff-management', label: 'Данные об отзывах в дайджест' }
          ],
          effects: {
            guest: null,
            staff: 'Минуты вместо часов на репутационную работу',
            chef: null,
            owner: 'Ни один отзыв не остаётся без ответа месяцами'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'auto-posting',
          title: 'Автопостинг в Telegram-канал',
          pain: 'Канал есть, но постить некому — администратор не копирайтер, а нанимать SMM дорого.',
          mechanic: 'ИИ ежедневно генерирует посты — меню дня, акции, новинки — и публикует по расписанию без участия человека.',
          connections: [
            { serviceId: 'ai-descriptions', sectionId: 'reviews-marketing', label: 'Использует те же описания блюд' },
            { serviceId: 'menu-day', sectionId: 'loyalty', label: 'Анонсирует меню дня' }
          ],
          effects: {
            guest: null,
            staff: 'Канал живёт без ежедневной ручной работы',
            chef: null,
            owner: 'Регулярность публикаций без найма SMM'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'ai-descriptions',
          title: 'AI-описания блюд',
          pain: 'У большинства меню описания отсутствуют или формальные — «курица, рис, соус». Это не продаёт.',
          mechanic: 'ИИ пишет аппетитные, продающие описания для всего меню — для QR-меню, сайта и соцсетей.',
          connections: [
            { serviceId: 'ai-techcards', sectionId: 'kitchen', label: 'Использует состав из техкарт' },
            { serviceId: 'qr-menu', sectionId: 'guest-service', label: 'Текст переиспользуется в QR-меню' },
            { serviceId: 'auto-posting', sectionId: 'reviews-marketing', label: 'И в автопостинге' }
          ],
          effects: {
            guest: 'Меню читается как гастрономический журнал',
            staff: null,
            chef: null,
            owner: 'Профессиональное меню без отдельного копирайтера'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'promo-mailing',
          title: 'Рассылка акций и спецпредложений',
          pain: 'Нет системного способа напомнить о себе постоянным гостям — акции держатся на памяти администратора.',
          mechanic: 'Автоматические сообщения в WhatsApp/Telegram по базе — скидки, события, новинки — по расписанию.',
          connections: [
            { serviceId: 'loyalty-bot', sectionId: 'loyalty', label: 'Использует базу из лояльности' },
            { serviceId: 'ai-recommendations', sectionId: 'guest-service', label: 'Персонализируется через AI-рекомендации' }
          ],
          effects: {
            guest: 'Получает предложения, а не спам',
            staff: null,
            chef: null,
            owner: 'База «прогревается» системно'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'ai-photo-video',
          title: 'AI-фото и видео для соцсетей',
          pain: 'Качественная съёмка блюд стоит дорого и требует регулярности, которой нет у небольшого заведения.',
          mechanic: 'Ролики-промо, stop-motion и Stories на основе ИИ-генерации, без выезда фотографа.',
          connections: [
            { serviceId: 'auto-posting', sectionId: 'reviews-marketing', label: 'Контент для автопостинга' },
            { serviceId: 'ai-target', sectionId: 'reviews-marketing', label: 'Визуалы для таргета' }
          ],
          effects: {
            guest: null,
            staff: null,
            chef: null,
            owner: 'Выглядит как сеть с маркетинговым бюджетом, не имея его'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'remarketing',
          title: 'Автоматический ремаркетинг',
          pain: 'Гость начал заказ, но не завершил — никто не напоминает, заказ теряется.',
          mechanic: '«Вы положили пиццу в корзину, но не оплатили» — автоматическое напоминание через бота.',
          connections: [
            { serviceId: 'order-bot', sectionId: 'guest-service', label: 'Триггер на данных корзины' }
          ],
          effects: {
            guest: null,
            staff: null,
            chef: null,
            owner: 'Часть потерянных заказов возвращается — измеримый эффект на выручку'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'ai-target',
          title: 'AI-таргет',
          pain: 'Настройка рекламы требует таргетолога, которого небольшое заведение не может себе позволить.',
          mechanic: 'Автоматическое создание рекламных объявлений на основе меню и акций, без участия таргетолога.',
          connections: [
            { serviceId: 'ai-photo-video', sectionId: 'reviews-marketing', label: 'Использует готовые визуалы' },
            { serviceId: 'ai-descriptions', sectionId: 'reviews-marketing', label: 'И готовые описания блюд' }
          ],
          effects: {
            guest: null,
            staff: null,
            chef: null,
            owner: 'Работающая реклама без маркетолога на ставке'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'blogger-search',
          title: 'Автоматический поиск блогеров',
          pain: 'Поиск подходящих микроинфлюенсеров в Караганде вручную — часы просмотра профилей.',
          mechanic: 'ИИ ищет микроинфлюенсеров по критериям — гео, тематика, охват — и предлагает список.',
          connections: [
            { serviceId: 'auto-posting', sectionId: 'reviews-marketing', label: 'Результат коллабораций — в автопостинг' }
          ],
          effects: {
            guest: null,
            staff: 'Готовый список вместо часов ручного поиска',
            chef: null,
            owner: null
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'site-seo',
          title: 'Сайт-одностраничник + SEO',
          pain: 'Заведение невидимо для тех, кто гуглит «кафе в Караганде» прямо сейчас.',
          mechanic: 'Сайт с фото, меню, картой, кнопкой бронирования, оптимизированный под Google и Яндекс.',
          connections: [
            { serviceId: 'booking', sectionId: 'guest-service', label: 'Ссылки на бронирование' },
            { serviceId: 'qr-menu', sectionId: 'guest-service', label: 'И на QR-меню' },
            { serviceId: 'ai-descriptions', sectionId: 'reviews-marketing', label: 'Тексты из AI-описаний' }
          ],
          effects: {
            guest: null,
            staff: null,
            chef: null,
            owner: 'Новые гости «из поиска» — те, кто ищет кафе прямо сейчас'
          },
          badges: [],
          crossNote: null
        }
      ]
    },

    // ═══════ 3. ЛОЯЛЬНОСТЬ ═══════
    {
      id: 'loyalty',
      title: 'Лояльность и повторные продажи',
      subtitle: 'Как удерживать гостя после первого визита',
      icon: '💎',
      priority: 2,
      painEntry: 'Гость может не вернуться просто потому, что забыл о заведении',
      relatedPackage: 'advanced',
      services: [
        {
          id: 'loyalty-bot',
          title: 'Бот лояльности',
          pain: 'Нет системного способа удержать гостя после первого визита — он не видит причины выбрать вас снова.',
          mechanic: 'Накопительные баллы за заказы, скидка в день рождения, рассылка акций постоянным гостям — автоматически.',
          connections: [
            { serviceId: 'order-bot', sectionId: 'guest-service', label: 'Данные из бота заказов' },
            { serviceId: 'promo-mailing', sectionId: 'reviews-marketing', label: 'Работает с рассылкой акций' },
            { serviceId: 'ai-recommendations', sectionId: 'guest-service', label: 'Персонализация по истории' }
          ],
          effects: {
            guest: 'Возвращается благодаря понятной выгоде',
            staff: 'Не ведёт учёт бонусов вручную',
            chef: null,
            owner: 'Повторные визиты растут системно'
          },
          badges: ['poster'],
          crossNote: 'У Poster есть платный аналог (~11 400 ₸/мес) — наше решение гибче и дешевле'
        },
        {
          id: 'menu-day',
          title: 'Меню дня / утренние рассылки',
          pain: 'Гости, обедающие рядом каждый день, не знают, что сегодня в меню — идут туда, где это очевидно.',
          mechanic: 'Бот отправляет актуальное меню подписчикам каждое утро автоматически.',
          connections: [
            { serviceId: 'ai-menu-planning', sectionId: 'kitchen', label: 'Что решила кухня — попадает и в рассылку' }
          ],
          effects: {
            guest: 'Заведение «первое в голове» в момент выбора, где обедать',
            staff: null,
            chef: null,
            owner: null
          },
          badges: [],
          crossNote: null
        }
      ]
    },

    // ═══════ 4. КУХНЯ И ПРОИЗВОДСТВО ═══════
    {
      id: 'kitchen',
      title: 'Кухня и производство',
      subtitle: 'Автоматизация, которая освобождает шефа от рутины — не от контроля',
      icon: '👨‍🍳',
      priority: 1,
      painEntry: 'Фудкост плывёт, техкарты в Excel, качество зависит от смены',
      relatedPackage: 'kitchen',
      services: [
        {
          id: 'ai-techcards',
          title: 'AI-техкарты и калькуляция себестоимости',
          pain: 'Шеф считает техкарты вручную в Excel, себестоимость «плывёт» при каждом изменении цены поставщика — пересчитывать некогда.',
          mechanic: 'Шеф присылает фото блюда и состав, ИИ считает граммовку, калорийность, аллергены и себестоимость. При изменении цены продукта — автоматический пересчёт.',
          connections: [
            { serviceId: 'demand-forecast', sectionId: 'procurement', label: 'Изменение цены → пересчёт себестоимости' },
            { serviceId: 'ai-descriptions', sectionId: 'reviews-marketing', label: 'Аллергены и состав → для описаний' },
            { serviceId: 'allergen-ai', sectionId: 'guest-service', label: 'Данные → AI-консультант по аллергенам' }
          ],
          effects: {
            guest: null,
            staff: null,
            chef: 'Не сидит вечерами в Excel, видит актуальную себестоимость в моменте',
            owner: 'Может обосновать поднятие цены цифрами, а не интуицией'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'ai-menu-planning',
          title: 'AI-планирование меню и заготовок',
          pain: 'Каждое утро шеф решает на глаз, что готовить из остатков — ошибается: то не успевает разойтись, то не хватает.',
          mechanic: 'Система смотрит остатки, скорость продаж и сроки годности, присылает поварам список: что заготовить и в каком объёме.',
          connections: [
            { serviceId: 'ai-techcards', sectionId: 'kitchen', label: 'Себестоимость спецпредложения считается автоматически' },
            { serviceId: 'demand-forecast', sectionId: 'procurement', label: 'Заготовки и закупки перестают жить в разных головах' }
          ],
          effects: {
            guest: null,
            staff: null,
            chef: 'Меньше «тушения пожаров» и списаний',
            owner: 'Шеф управляет фудкостом, а не просто готовит'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'voice-kitchen',
          title: 'Голосовой помощник на кухне',
          pain: 'В час пик повар не может отвлекаться на экран — руки заняты, заказы идут потоком, тайминги горят.',
          mechanic: 'Бот озвучивает заказы и держит таймер по каждому блюду голосом: «стейку осталось 2 минуты».',
          connections: [
            { serviceId: 'order-bot', sectionId: 'guest-service', label: 'Берёт данные из бота заказов' }
          ],
          effects: {
            guest: null,
            staff: null,
            chef: 'Меньше сожжённых блюд, контролирует несколько станций голосом',
            owner: null
          },
          badges: ['voice'],
          crossNote: 'Не заменяет кухонный экран Poster — дублирует его голосом'
        },
        {
          id: 'photo-quality',
          title: 'AI-контроль качества по фото',
          pain: 'Одно блюдо выглядит по-разному на разных сменах — гости жалуются «не как на фото», особенно без шефа.',
          mechanic: 'Фото готового блюда сравнивается с эталоном из техкарты. При расхождении — сигнал шефу прямо в смене.',
          connections: [
            { serviceId: 'ai-techcards', sectionId: 'kitchen', label: 'Эталонные фото из техкарт' },
            { serviceId: 'auto-complaints', sectionId: 'guest-service', label: 'Связан с обработкой жалоб' }
          ],
          effects: {
            guest: 'Блюдо выглядит одинаково каждый раз',
            staff: null,
            chef: 'Стандарт держится даже когда шефа нет на смене',
            owner: null
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'write-offs',
          title: 'Список списаний и дефектов (с фото)',
          pain: 'Акты на списание на бумаге, занижаются или пишутся задним числом — реальные потери «теряются».',
          mechanic: 'Повар фотографирует испорченный продукт, указывает причину — бот фиксирует с меткой времени, подделать нельзя.',
          connections: [
            { serviceId: 'extended-analytics', sectionId: 'analytics', label: 'Данные в аналитику — где теряются деньги' },
            { serviceId: 'demand-forecast', sectionId: 'procurement', label: 'Что портится чаще — заказывать меньше' }
          ],
          effects: {
            guest: null,
            staff: null,
            chef: 'Прозрачная картина потерь вместо подозрений',
            owner: 'Защита цифрами, а не оправданиями'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'sanpin-journal',
          title: 'Цифровой журнал СанПиН',
          pain: 'Бумажный журнал легко подделать задним числом — штраф при проверке СЭС. Заполнение вручную отнимает время.',
          mechanic: 'Бот напоминает замерить температуру / провести уборку. Сотрудник фотографирует — время и фото фиксируются автоматически.',
          connections: [],
          effects: {
            guest: null,
            staff: 'Меньше рутинной бумажной работы у поваров',
            chef: 'Меньше личной ответственности за ведение журнала',
            owner: 'Готовность к проверке СЭС в любой момент'
          },
          badges: [],
          crossNote: null
        }
      ]
    },

    // ═══════ 5. ЗАКУПКИ И СКЛАД ═══════
    {
      id: 'procurement',
      title: 'Закупки и склад',
      subtitle: 'Меньше списаний, точнее заказы, актуальная себестоимость',
      icon: '📦',
      priority: 2,
      painEntry: '2–3 часа в день на закупки вручную, заказы на глаз',
      relatedPackage: 'kitchen',
      services: [
        {
          id: 'demand-forecast',
          title: 'AI-прогноз спроса и автозаказ у поставщиков',
          pain: 'Администратор или шеф тратит 2–3 часа в день на закупки на глаз — то слишком много (списания), то мало (блюдо уходит из меню).',
          mechanic: 'Система анализирует историю продаж, сезонность и формирует заказ поставщику. Параллельно сверяет прайсы и подсказывает, когда пора поднять цену.',
          connections: [
            { serviceId: 'ai-menu-planning', sectionId: 'kitchen', label: 'Те же данные о скорости продаж' },
            { serviceId: 'ai-techcards', sectionId: 'kitchen', label: 'Изменение цены → пересчёт себестоимости' },
            { serviceId: 'write-offs', sectionId: 'kitchen', label: 'Данные списаний уточняют прогноз' }
          ],
          effects: {
            guest: null,
            staff: 'Не тратит часы на закупки вручную',
            chef: 'Заказы точнее — блюдо не заканчивается в пятницу вечером',
            owner: 'Меньше списаний, себестоимость не отстаёт от реальности'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'inventory-photo',
          title: 'Учёт остатков через фото/голос',
          pain: 'Инвентаризация — рутина, которую откладывают. Без неё прогнозы работают вслепую.',
          mechanic: 'Повар говорит «осталось 2 кг курицы» или делает фото — система фиксирует остаток в моменте.',
          connections: [
            { serviceId: 'demand-forecast', sectionId: 'procurement', label: 'Фундамент для прогноза' },
            { serviceId: 'ai-menu-planning', sectionId: 'kitchen', label: 'Фундамент для плана заготовок' }
          ],
          effects: {
            guest: null,
            staff: 'Учёт занимает секунды вместо часов',
            chef: null,
            owner: 'Реальная картина склада в любой момент'
          },
          badges: ['voice'],
          crossNote: null
        }
      ]
    },

    // ═══════ 6. ЗАЛ И КАССИРЫ ═══════
    {
      id: 'hall',
      title: 'Зал и кассиры',
      subtitle: 'Сверка, чаевые и QR-оплата — ежедневная рутина на автомате',
      icon: '💳',
      priority: 2,
      painEntry: 'Ручная сверка кассы, споры по чаевым, сложности с подключением QR-оплаты',
      relatedPackage: 'advanced',
      services: [
        {
          id: 'shift-reconciliation',
          title: 'Сверка смены',
          pain: 'В конце смены администратор вручную сверяет кассу — расхождения находят через неделю, когда уже не разобраться.',
          mechanic: 'Бот сверяет ожидаемую выручку с фактической. Расхождения и отчёт уходят владельцу в Telegram автоматически.',
          connections: [
            { serviceId: 'ai-digest', sectionId: 'staff-management', label: 'Данные в дайджест' },
            { serviceId: 'check-anomalies', sectionId: 'analytics', label: 'Повторяющиеся расхождения видны сразу' },
            { serviceId: 'schedule-bot', sectionId: 'staff-management', label: 'Понятно, кто был на кассе' }
          ],
          effects: {
            guest: null,
            staff: 'Не тратит вечер на ручную сверку',
            chef: null,
            owner: 'Расхождения находятся в день, когда произошли'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'tips-split',
          title: 'Разделение чаевых между сменой',
          pain: 'QR-сервисы принимают чаевые, но не делят их между поваром, официантом и барменом.',
          mechanic: 'Бот собирает чаевые за смену и делит автоматически по правилам заведения, формируя ведомость.',
          connections: [
            { serviceId: 'time-tracking', sectionId: 'staff-management', label: 'Учитывает, кто реально был на смене' },
            { serviceId: 'kaspi-setup', sectionId: 'hall', label: 'Банк принимает деньги — бот их делит' }
          ],
          effects: {
            guest: null,
            staff: 'Меньше споров о том, кому сколько досталось',
            chef: null,
            owner: 'Не нужно вручную считать ведомость'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'kaspi-setup',
          title: 'Настройка Kaspi/Halyk Рестораны',
          pain: 'Подключить QR-оплату не так просто: нужна касса нужного уровня, синхронизация с учётом.',
          mechanic: 'Консалтинг по выбору и подключению банковского QR-сервиса под вашу кассу + настройка синхронизации.',
          connections: [
            { serviceId: 'shift-reconciliation', sectionId: 'hall', label: 'Мост между банком и сверкой' },
            { serviceId: 'ai-digest', sectionId: 'staff-management', label: 'Данные об оплате в дайджест' }
          ],
          effects: {
            guest: 'Оплачивает по QR на столе',
            staff: null,
            chef: null,
            owner: 'QR-приём без месяцев самостоятельного разбирательства'
          },
          badges: [],
          crossNote: 'Не своя платёжная система, а мост между банком и вашими ботами'
        }
      ]
    },

    // ═══════ 7. УПРАВЛЕНИЕ ПЕРСОНАЛОМ ═══════
    {
      id: 'staff-management',
      title: 'Управление персоналом',
      subtitle: 'Графики, учёт, обучение, дайджест — единое окно администратора и владельца',
      icon: '👥',
      priority: 2,
      painEntry: 'Текучка, ручные графики, владелец не в курсе дел без звонка',
      relatedPackage: 'kitchen',
      services: [
        {
          id: 'schedule-bot',
          title: 'Бот-график смен',
          pain: 'Администратор тратит часы на график с учётом пожеланий и Трудового кодекса РК. При болезни — экстренный обзвон.',
          mechanic: 'Сотрудники подают пожелания через бота, график строится автоматически. При необходимости замены — рассылка «кто может выйти».',
          connections: [
            { serviceId: 'time-tracking', sectionId: 'staff-management', label: 'Синхронизирован с учётом времени' },
            { serviceId: 'ai-digest', sectionId: 'staff-management', label: 'Сколько человек было в день с высокой выручкой' }
          ],
          effects: {
            guest: null,
            staff: 'Сам разруливает подмены без ночных звонков',
            chef: null,
            owner: 'Юридические риски по переработкам снижаются'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'time-tracking',
          title: 'Учёт рабочего времени',
          pain: 'Табель ведётся вручную, не совпадает с фактом — споры о часах в конце месяца.',
          mechanic: 'Сотрудник отмечает «пришёл/ушёл» в боте (с геолокацией). Табель формируется автоматически.',
          connections: [
            { serviceId: 'schedule-bot', sectionId: 'staff-management', label: 'Кто реально отработал vs план' },
            { serviceId: 'tips-split', sectionId: 'hall', label: 'Данные для разделения чаевых' }
          ],
          effects: {
            guest: null,
            staff: null,
            chef: null,
            owner: 'Меньше споров о часах, меньше ручной работы при расчёте зарплаты'
          },
          badges: ['poster'],
          crossNote: 'У Poster/iiko есть аналог — наш вариант проще (Telegram) и для точек без такой кассы'
        },
        {
          id: 'knowledge-base',
          title: 'База знаний и AI-онбординг',
          pain: 'Текучка огромная, шеф и администратор раз за разом отвечают на одни вопросы новичков.',
          mechanic: 'Бот отвечает на процедурные вопросы 24/7, ведёт новичка по чек-листу, тестирует знание меню.',
          connections: [
            { serviceId: 'ai-techcards', sectionId: 'kitchen', label: 'Состав и аллергены — из техкарт' },
            { serviceId: 'ai-descriptions', sectionId: 'reviews-marketing', label: 'Единый источник правды о блюдах' }
          ],
          effects: {
            guest: null,
            staff: 'Новичок получает ответы, не отвлекая коллег',
            chef: 'Меньше времени на «натаскивание» — стандарт передаётся одинаково',
            owner: null
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'ai-digest',
          title: 'ИИ-дайджест по заведению',
          pain: 'У владельца нет времени каждый день разбираться в отчётах кассы. О проблеме узнаёт через неделю.',
          mechanic: 'Раз в день бот собирает выручку, отзывы, сверку, аномалии и присылает короткую сводку в Telegram.',
          connections: [
            { serviceId: 'shift-reconciliation', sectionId: 'hall', label: 'Данные сверки смены' },
            { serviceId: 'auto-reviews', sectionId: 'reviews-marketing', label: 'Новые отзывы' },
            { serviceId: 'schedule-bot', sectionId: 'staff-management', label: 'Данные графика' },
            { serviceId: 'extended-analytics', sectionId: 'analytics', label: 'Расширяется в аналитику' }
          ],
          effects: {
            guest: null,
            staff: null,
            chef: null,
            owner: 'В курсе дел, не открывая ни одного отчёта. Проблема видна за сутки'
          },
          badges: [],
          crossNote: 'Не подменяет аналитику Poster — push-уведомление для тех, кому некогда туда заходить'
        },
        {
          id: 'multi-point-analytics',
          title: 'Сводная аналитика по точкам',
          pain: 'У владельца сети нет единой картины — нужно заходить в кассу каждой точки отдельно.',
          mechanic: 'Дайджесты всех точек агрегируются в один Telegram-чат с разбивкой.',
          connections: [
            { serviceId: 'ai-digest', sectionId: 'staff-management', label: 'Расширение дайджеста на несколько точек' },
            { serviceId: 'unified-bot', sectionId: 'specialized', label: 'Часто в связке с единым ботом' }
          ],
          effects: {
            guest: null,
            staff: null,
            chef: null,
            owner: 'Экономит часы на объезд точек и созвоны с управляющими'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'ip-reminder',
          title: 'Напоминалка по срокам ИП',
          pain: 'Владелец пропускает сроки отчётности — штрафы на пустом месте.',
          mechanic: 'Бот заранее напоминает о сроках в зависимости от налогового режима.',
          connections: [
            { serviceId: 'ai-digest', sectionId: 'staff-management', label: 'В том же канале, что и дайджест' }
          ],
          effects: {
            guest: null,
            staff: null,
            chef: null,
            owner: 'Меньше штрафов и тревоги «а не забыл ли я сдать»'
          },
          badges: [],
          crossNote: null
        }
      ]
    },

    // ═══════ 8. ФИНАНСЫ И АНАЛИТИКА ═══════
    {
      id: 'analytics',
      title: 'Финансы и аналитика',
      subtitle: 'Не просто быть в курсе — управлять бизнесом по цифрам',
      icon: '📊',
      priority: 2,
      painEntry: 'Нет глубокой картины: почасовая динамика, аномалии, расхождения с 1С',
      relatedPackage: 'kitchen',
      services: [
        {
          id: 'extended-analytics',
          title: 'Расширенная аналитика выручки и прибыли',
          pain: 'Дайджест даёт выжимку, но для управления нужна глубина — почасовая динамика, сравнение за месяц.',
          mechanic: 'Почасовая выручка, средний чек, число гостей, сравнение с аналогичным днём и месяцем.',
          connections: [
            { serviceId: 'ai-digest', sectionId: 'staff-management', label: 'Расширение дайджеста для глубины' }
          ],
          effects: {
            guest: null,
            staff: null,
            chef: null,
            owner: 'Видит не «выручка упала», а «упала в обеденные часы по вторникам»'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'accounting-sync',
          title: 'Сверка с 1С / бухгалтерией',
          pain: 'Чеки и данные в 1С сводятся вручную с задержкой — расхождения находят в конце квартала.',
          mechanic: 'Автоматическое сопоставление чеков из кассы с записями в 1С, с уведомлением о расхождениях сразу.',
          connections: [
            { serviceId: 'shift-reconciliation', sectionId: 'hall', label: 'Первичный источник — сверка смены' }
          ],
          effects: {
            guest: null,
            staff: null,
            chef: null,
            owner: 'Расхождения видны в моменте, а не за квартал'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'predictive-analytics',
          title: 'Предиктивная аналитика',
          pain: 'Управляющий каждый день решает на глаз, сколько официантов ставить и продуктов иметь.',
          mechanic: 'На основе истории, погоды и событий: «завтра пик в 19:00, нужно 3 официанта и запас на 40 порций».',
          connections: [
            { serviceId: 'demand-forecast', sectionId: 'procurement', label: 'Тот же аналитический слой для закупок' },
            { serviceId: 'schedule-bot', sectionId: 'staff-management', label: 'И для расписания персонала' }
          ],
          effects: {
            guest: null,
            staff: null,
            chef: null,
            owner: 'Планирует заранее — меньше простоя и провалов в сервисе'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'check-anomalies',
          title: 'Контроль аномалий в чеках',
          pain: 'Манипуляции с чеками — снятие позиций, скидки друзьям — почти невозможно заметить среди сотен чеков.',
          mechanic: 'ИИ анализирует чеки на аномалии: много отменённых позиций, скидки за пределами нормы — список владельцу.',
          connections: [
            { serviceId: 'shift-reconciliation', sectionId: 'hall', label: 'Сверка смотрит на итог, аномалии — на паттерны внутри' },
            { serviceId: 'ai-digest', sectionId: 'staff-management', label: 'Часть блока «аномалии» в дайджесте' }
          ],
          effects: {
            guest: null,
            staff: null,
            chef: null,
            owner: 'Видит конкретные подозрительные паттерны по конкретным сотрудникам'
          },
          badges: [],
          crossNote: null
        }
      ]
    },

    // ═══════ 9. ДОСТАВКА ═══════
    {
      id: 'delivery',
      title: 'Доставка и агрегаторы',
      subtitle: 'Одно меню — все каналы. Синхронизация вместо ручного обновления',
      icon: '🚴',
      priority: 2,
      painEntry: 'Меню в 4 агрегаторах ведётся вручную, гость заказывает то, чего уже нет',
      relatedPackage: 'maximum',
      services: [
        {
          id: 'aggregator-sync',
          title: 'Синхронизация меню с агрегаторами',
          pain: 'Меню ведётся в 3–4 кабинетах вручную: изменил цену в одном — забыл в остальных.',
          mechanic: 'Меню и остатки синхронизируются из одного источника сразу во все агрегаторы — Wolt, Glovo, Chocofood.',
          connections: [
            { serviceId: 'qr-menu', sectionId: 'guest-service', label: 'Тот же источник данных, что QR-меню' },
            { serviceId: 'write-offs', sectionId: 'kitchen', label: 'При списании — позиция скрывается автоматически' }
          ],
          effects: {
            guest: 'Не сталкивается с недоступными блюдами',
            staff: 'Обновляет меню один раз вместо четырёх',
            chef: null,
            owner: null
          },
          badges: [],
          crossNote: 'Мы не конкурируем с Wolt/Chocofood — интегрируемся с ними'
        },
        {
          id: 'courier-routing',
          title: 'AI-маршрутизация курьеров',
          pain: 'Для заведений с собственной доставкой — распределение заказов вручную даёт опоздания.',
          mechanic: 'Система строит оптимальные маршруты для курьеров с учётом текущих заказов.',
          connections: [
            { serviceId: 'order-bot', sectionId: 'guest-service', label: 'Получает заказы из бота' },
            { serviceId: 'delivery-time', sectionId: 'delivery', label: 'Данные для расчёта времени доставки' }
          ],
          effects: {
            guest: 'Доставка приходит быстрее',
            staff: 'Не тратит время на ручное распределение',
            chef: null,
            owner: 'Меньше лишних километров у курьеров'
          },
          badges: [],
          crossNote: null
        },
        {
          id: 'delivery-time',
          title: 'Расчёт времени доставки',
          pain: 'Время доставки называют «на глаз» — обещание расходится с реальностью, жалобы.',
          mechanic: 'Расчёт учитывает загрузку кухни, расстояние и текущий маршрут курьера.',
          connections: [
            { serviceId: 'voice-kitchen', sectionId: 'kitchen', label: 'Загрузка кухни в реальном времени' },
            { serviceId: 'courier-routing', sectionId: 'delivery', label: 'Маршрут курьера' }
          ],
          effects: {
            guest: 'Получает точное ожидание вместо догадки',
            staff: null,
            chef: null,
            owner: 'Меньше жалоб «обещали за 30 минут, привезли за час»'
          },
          badges: [],
          crossNote: null
        }
      ]
    },

    // ═══════ 10+11. СПЕЦРЕШЕНИЯ ═══════
    {
      id: 'specialized',
      title: 'Специализированные решения',
      subtitle: 'Столовые, корпоративное питание и сети быстрого питания',
      icon: '🏢',
      priority: 3,
      painEntry: 'Решения для столовых с предзаказами и QSR с электронными очередями',
      relatedPackage: 'network',
      subsections: [
        {
          title: 'Столовые и корпоративное питание',
          icon: '🍱',
          serviceIds: ['canteen-preorder', 'canteen-qr-pay', 'subsidies', 'erp-integration', 'kbju']
        },
        {
          title: 'Сети быстрого питания (QSR)',
          icon: '🍔',
          serviceIds: ['unified-bot', 'queue-forecast', 'e-queue', 'dynamic-pricing', 'auto-upsell', 'self-service-kiosk']
        }
      ],
      services: [
        // --- Столовые ---
        {
          id: 'canteen-preorder',
          title: 'Предзаказ обедов для сотрудников',
          pain: 'Сотрудники стоят в очереди, кухня не знает, сколько готовить — то не хватает, то остаётся.',
          mechanic: 'Сотрудники заказывают обед заранее через бота — кухня готовит под факт.',
          connections: [],
          effects: { guest: 'Обед готов к нужному часу, без очереди', staff: null, chef: 'Готовит точно под спрос', owner: 'Меньше списаний' },
          badges: [],
          crossNote: null
        },
        {
          id: 'canteen-qr-pay',
          title: 'QR-оплата без кассира',
          pain: 'Касса — узкое горлышко в обеденный пик: очередь на оплату длиннее, чем на раздаче.',
          mechanic: 'Гость сканирует QR, оплачивает и получает чек без кассира.',
          connections: [],
          effects: { guest: 'Не стоит в очереди на кассу', staff: null, chef: null, owner: 'Меньше персонала на кассе' },
          badges: [],
          crossNote: null
        },
        {
          id: 'subsidies',
          title: 'Учёт льгот и субсидий',
          pain: 'Расчёт компенсаций для сотен сотрудников вручную — дни бухгалтерии.',
          mechanic: 'Автоматический расчёт: сколько доплатил сотрудник, сколько компенсирует компания. Готовый отчёт.',
          connections: [],
          effects: { guest: null, staff: null, chef: null, owner: 'Готовый отчёт вместо ручного расчёта' },
          badges: [],
          crossNote: null
        },
        {
          id: 'erp-integration',
          title: 'Интеграция с 1С:ERP / SAP / Bitrix24',
          pain: 'Ручная сверка данных о питании с корпоративной системой — двойная бухгалтерия.',
          mechanic: 'Данные о заказах, оплатах и льготах автоматически попадают в систему предприятия.',
          connections: [],
          effects: { guest: null, staff: null, chef: null, owner: 'Автоматическая передача данных без экспорта-импорта' },
          badges: [],
          crossNote: null
        },
        {
          id: 'kbju',
          title: 'КБЖУ и аллергены в описании',
          pain: 'Формальное требование указывать калорийность и БЖУ — считать вручную трудоёмко.',
          mechanic: 'Автоматический расчёт калорийности, БЖУ и аллергенов на основе состава.',
          connections: [],
          effects: { guest: 'Видит точные данные о составе', staff: null, chef: null, owner: 'Закрывает формальные требования автоматически' },
          badges: [],
          crossNote: null
        },
        // --- QSR ---
        {
          id: 'unified-bot',
          title: 'Единый бот на все точки франшизы',
          pain: 'Каждая точка сети изобретает своего бота — стандарт бренда разъезжается.',
          mechanic: 'Один бот (заказы, меню, лояльность) тиражируется на все точки с единым брендингом и локальными настройками.',
          connections: [],
          effects: { guest: 'Одинаковый опыт в любой точке', staff: null, chef: null, owner: 'Не нужен отдельный бот для каждой новой точки' },
          badges: [],
          crossNote: null
        },
        {
          id: 'queue-forecast',
          title: 'Прогноз очереди и загрузки по часам',
          pain: 'В фастфуде нагрузка скачет по часам — без прогноза либо не хватает персонала, либо он простаивает.',
          mechanic: 'На основе истории продаж по часам — ожидаемая загрузка по каждой точке.',
          connections: [],
          effects: { guest: null, staff: null, chef: null, owner: 'Расставляет персонал заранее по данным, а не по интуиции' },
          badges: [],
          crossNote: null
        },
        {
          id: 'e-queue',
          title: 'Электронная очередь',
          pain: 'Гости стоят без понимания, сколько ждать. Персонал не может выкрикивать номера.',
          mechanic: 'Табло очереди + SMS/push «ваш заказ готов» вместо ожидания у стойки.',
          connections: [],
          effects: { guest: 'Не стоит у стойки — получает уведомление', staff: 'Не выкрикивает заказы в шумном зале', chef: null, owner: null },
          badges: [],
          crossNote: null
        },
        {
          id: 'dynamic-pricing',
          title: 'Динамическое ценообразование',
          pain: 'Фиксированные цены не учитывают загрузку: в тихие часы можно привлечь скидкой, в пик — она не нужна.',
          mechanic: 'Цены корректируются в зависимости от загрузки — скидка в тихие часы, обычная цена в пик.',
          connections: [],
          effects: { guest: 'Получает скидку в тихие часы', staff: null, chef: null, owner: 'Сглаживает провалы посещаемости' },
          badges: [],
          crossNote: null
        },
        {
          id: 'auto-upsell',
          title: 'Автоматический upsell на кассе',
          pain: 'Кассир забывает предложить дополнение к заказу — средний чек не растёт.',
          mechanic: 'Система предлагает дополнение к содержимому корзины: «добавить картошку за 199 ₸?».',
          connections: [],
          effects: { guest: null, staff: 'Не нужно помнить скрипт допродажи', chef: null, owner: 'Средний чек растёт системно' },
          badges: [],
          crossNote: null
        },
        {
          id: 'self-service-kiosk',
          title: 'Self-service киоски (программная часть)',
          pain: 'Интеграция интерфейса киоска с системой заказов и кухней — отдельная техническая задача.',
          mechanic: 'Интерфейс для терминалов самообслуживания, интегрированный с ботом заказов и кухонным экраном.',
          connections: [],
          effects: { guest: 'Обслуживается без участия кассира', staff: 'Кассир свободен для зала', chef: null, owner: null },
          badges: [],
          crossNote: null
        }
      ]
    }
  ],

  // ──────────────────────────────────────────────
  // PACKAGES (5 tariffs)
  // ──────────────────────────────────────────────
  packages: [
    {
      id: 'starter',
      name: 'Стартовый',
      price: 39900,
      forWhom: 'Для кафе, которое хочет начать с базовой автоматизации гостевого сервиса',
      keyBenefit: 'Гость сам разбирается в меню, бронирует и получает ответы 24/7',
      popular: false,
      color: '#3b82f6',
      serviceIds: ['qr-menu', 'bot-vizitka', 'booking'],
    },
    {
      id: 'advanced',
      name: 'Продвинутый',
      price: 69900,
      forWhom: 'Для заведения, которое хочет не только обслуживать, но и возвращать гостей',
      keyBenefit: 'Заказы, отзывы, лояльность и рассылки работают без участия администратора',
      popular: true,
      color: '#8b5cf6',
      serviceIds: ['qr-menu', 'bot-vizitka', 'booking', 'order-bot', 'auto-reviews', 'ai-review-replies', 'loyalty-bot', 'promo-mailing'],
    },
    {
      id: 'maximum',
      name: 'Максимум',
      price: 129900,
      forWhom: 'Для ресторана, который хочет полную автоматизацию гостевого фронта и маркетинга',
      keyBenefit: 'Весь гостевой сервис и маркетинг на автопилоте — от первого касания до повторного визита',
      popular: false,
      color: '#f59e0b',
      serviceIds: ['qr-menu', 'bot-vizitka', 'booking', 'order-bot', 'allergen-ai', 'voice-bot-orders', 'booking-social', 'ai-recommendations', 'auto-complaints', 'auto-reviews', 'ai-review-replies', 'auto-posting', 'ai-descriptions', 'promo-mailing', 'ai-photo-video', 'remarketing', 'loyalty-bot', 'menu-day'],
    },
    {
      id: 'kitchen',
      name: 'Кухня и бэк-офис',
      price: 89900,
      forWhom: 'Для заведения, которое готово закрывать операционку, а не только маркетинг',
      keyBenefit: 'Управляем кухней и персоналом по цифрам, а не на глаз',
      popular: false,
      color: '#10b981',
      serviceIds: ['ai-techcards', 'ai-menu-planning', 'sanpin-journal', 'schedule-bot', 'ai-digest'],
    },
    {
      id: 'network',
      name: 'Экосистема для сети',
      price: 219900,
      forWhom: 'Для владельца 2+ точек, которому нужна единая картина по всей сети',
      keyBenefit: 'Все точки в одном экране — единый бот, сводная аналитика, прогноз загрузки',
      popular: false,
      color: '#ef4444',
      serviceIds: ['multi-point-analytics', 'unified-bot', 'queue-forecast'],
    }
  ],

  // ──────────────────────────────────────────────
  // DEMOS (live examples)
  // ──────────────────────────────────────────────
  demos: [
    { title: 'Кафе Шафран — сайт', url: 'https://sudo.akikating123.workers.dev/', type: 'Сайт заведения', desc: 'Полноценный сайт кафе с ботами заказов, визиткой и отзывами' },
    { title: 'Fresh Fish — QR-меню', url: 'https://freshfish.qrmenu98.workers.dev/', type: 'QR-меню', desc: 'Интерактивное QR-меню рыбного ресторана в Караганде' },
  ],

  // ──────────────────────────────────────────────
  // ECOSYSTEM DIAGRAM NODES (for interactive diagram)
  // ──────────────────────────────────────────────
  ecosystemNodes: [
    { id: 'guest', label: 'Гость', icon: '👤', type: 'role', x: 50, y: 5 },
    { id: 'n-qr', label: 'QR-меню', icon: '📱', type: 'service', section: 'guest-service', x: 20, y: 18 },
    { id: 'n-vizitka', label: 'Бот-визитка', icon: '💬', type: 'service', section: 'guest-service', x: 40, y: 18 },
    { id: 'n-order', label: 'Бот заказов', icon: '🛒', type: 'service', section: 'guest-service', x: 60, y: 18 },
    { id: 'n-booking', label: 'Бронирование', icon: '📅', type: 'service', section: 'guest-service', x: 80, y: 18 },
    { id: 'n-kitchen', label: 'Кухня', icon: '👨‍🍳', type: 'hub', section: 'kitchen', x: 50, y: 35 },
    { id: 'n-techcards', label: 'AI-техкарты', icon: '📋', type: 'service', section: 'kitchen', x: 25, y: 42 },
    { id: 'n-planning', label: 'План заготовок', icon: '📝', type: 'service', section: 'kitchen', x: 75, y: 42 },
    { id: 'n-quality', label: 'Контроль качества', icon: '📸', type: 'service', section: 'kitchen', x: 50, y: 50 },
    { id: 'n-waiter', label: 'Официант', icon: '🤵', type: 'role', x: 50, y: 62 },
    { id: 'n-shift', label: 'Сверка смены', icon: '✅', type: 'service', section: 'hall', x: 25, y: 68 },
    { id: 'n-tips', label: 'Чаевые', icon: '💰', type: 'service', section: 'hall', x: 75, y: 68 },
    { id: 'n-reviews', label: 'Отзывы', icon: '⭐', type: 'service', section: 'reviews-marketing', x: 85, y: 55 },
    { id: 'n-loyalty', label: 'Лояльность', icon: '💎', type: 'service', section: 'loyalty', x: 15, y: 55 },
    { id: 'n-schedule', label: 'График смен', icon: '📆', type: 'service', section: 'staff-management', x: 15, y: 75 },
    { id: 'n-digest', label: 'ИИ-дайджест', icon: '📊', type: 'hub', section: 'staff-management', x: 50, y: 80 },
    { id: 'n-analytics', label: 'Аналитика', icon: '📈', type: 'service', section: 'analytics', x: 50, y: 92 },
    { id: 'n-procurement', label: 'Закупки', icon: '📦', type: 'service', section: 'procurement', x: 85, y: 42 },
  ],
  ecosystemEdges: [
    { from: 'guest', to: 'n-qr' },
    { from: 'guest', to: 'n-vizitka' },
    { from: 'guest', to: 'n-order' },
    { from: 'guest', to: 'n-booking' },
    { from: 'n-order', to: 'n-kitchen' },
    { from: 'n-techcards', to: 'n-kitchen' },
    { from: 'n-planning', to: 'n-kitchen' },
    { from: 'n-kitchen', to: 'n-quality' },
    { from: 'n-quality', to: 'n-waiter' },
    { from: 'n-waiter', to: 'guest' },
    { from: 'n-waiter', to: 'n-shift' },
    { from: 'n-waiter', to: 'n-tips' },
    { from: 'n-schedule', to: 'n-kitchen' },
    { from: 'n-schedule', to: 'n-waiter' },
    { from: 'n-kitchen', to: 'n-digest' },
    { from: 'n-shift', to: 'n-digest' },
    { from: 'n-reviews', to: 'n-digest' },
    { from: 'n-digest', to: 'n-analytics' },
    { from: 'guest', to: 'n-reviews' },
    { from: 'guest', to: 'n-loyalty' },
    { from: 'n-loyalty', to: 'guest' },
    { from: 'n-procurement', to: 'n-techcards' },
    { from: 'n-planning', to: 'n-procurement' },
  ]
};

// ──────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────

window.getWhatsAppUrl = function(packageName, price) {
  var text = encodeURIComponent(
    'Здравствуйте! Мне нужен тариф «' + packageName + '», стоимостью ' +
    price.toLocaleString('ru-RU') + ' ₸/мес. Каким банком я могу оплатить?'
  );
  return 'https://api.whatsapp.com/send/?phone=' + SITE_DATA.meta.whatsapp + '&text=' + text;
};

window.getWhatsAppInquiry = function(subject) {
  var text = encodeURIComponent(subject || 'Здравствуйте! Хочу обсудить автоматизацию для моего заведения.');
  return 'https://api.whatsapp.com/send/?phone=' + SITE_DATA.meta.whatsapp + '&text=' + text;
};

window.formatPrice = function(price) {
  return price.toLocaleString('ru-RU') + ' ₸';
};

// Find a service by ID across all sections
window.findService = function(serviceId) {
  for (var i = 0; i < SITE_DATA.sections.length; i++) {
    var section = SITE_DATA.sections[i];
    for (var j = 0; j < section.services.length; j++) {
      if (section.services[j].id === serviceId) {
        return { service: section.services[j], section: section };
      }
    }
  }
  return null;
};
