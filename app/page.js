"use client"

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const burger = document.querySelector('.burger')
    const nav = document.querySelector('.nav-menu')

    burger && burger.addEventListener('click', function () {
      nav?.classList.toggle('nav-active')
      burger.classList.toggle('active')
    })

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function () {
        if (nav?.classList.contains('nav-active')) {
          nav.classList.remove('nav-active')
          burger?.classList.remove('active')
        }
      })
    })

    const outsideClick = (e) => {
      if (nav?.classList.contains('nav-active') && !nav.contains(e.target) && !burger?.contains(e.target)) {
        nav.classList.remove('nav-active')
        burger?.classList.remove('active')
      }
    }
    document.addEventListener('click', outsideClick)

    const escHandler = (e) => {
      if (e.key === 'Escape' && nav?.classList.contains('nav-active')) {
        nav.classList.remove('nav-active')
        burger?.classList.remove('active')
      }
    }
    document.addEventListener('keydown', escHandler)

    const mainSection = document.getElementById('main')
    const headerEl = document.querySelector('header')
    if (mainSection) {
      const headerH = headerEl ? headerEl.offsetHeight : 0
      const top = mainSection.getBoundingClientRect().top + window.pageYOffset - headerH - 8
      window.scrollTo({ top, left: 0, behavior: 'auto' })
      history.replaceState(null, '', '#main')
    }

    // Beer slider
    const setupSlider = (rootSelector, trackSelector, slidesSelector, prevId, nextId, dotsId) => {
      const container = document.querySelector(rootSelector)
      if (!container) return
      const track = container.querySelector(trackSelector)
      const slides = Array.from(container.querySelectorAll(slidesSelector))
      const prev = document.getElementById(prevId)
      const next = document.getElementById(nextId)
      const dotsWrap = document.getElementById(dotsId)
      if (!track || !slides.length || !dotsWrap) return
      let index = 0
      const setActive = () => {
        slides.forEach((s, i) => s.classList.toggle('active', i === index))
        dotsWrap.querySelectorAll('.beer-dot').forEach((d, i) => d.classList.toggle('active', i === index))
      }
      const update = () => {
        track.style.transform = `translateX(-${index * 100}%)`
        setActive()
      }
      dotsWrap.innerHTML = ''
      slides.forEach((_, i) => {
        const dot = document.createElement('button')
        dot.className = 'beer-dot' + (i === 0 ? ' active' : '')
        dot.addEventListener('click', () => { index = i; update() })
        dotsWrap.appendChild(dot)
      })
      const goPrev = () => { index = (index - 1 + slides.length) % slides.length; update() }
      const goNext = () => { index = (index + 1) % slides.length; update() }
      prev && prev.addEventListener('click', goPrev)
      next && next.addEventListener('click', goNext)
      setActive()
      return () => {
        prev && prev.removeEventListener('click', goPrev)
        next && next.removeEventListener('click', goNext)
      }
    }

    const cleanups = []
    cleanups.push(setupSlider('#beer .beer-slider', '.beer-track', '.beer-slide', 'beerPrev', 'beerNext', 'beerDots'))
    cleanups.push(setupSlider('.stores-slider', '.beer-track', '.beer-slide', 'storesPrev', 'storesNext', 'storesDots'))
    cleanups.push(setupSlider('.drinks-slider', '.drinks-track', '.beer-slide', 'drinksPrev', 'drinksNext', 'drinksDots'))
    cleanups.push(setupSlider('.snacks-slider', '.snacks-track', '.beer-slide', 'snacksPrev', 'snacksNext', 'snacksDots'))

    return () => {
      document.removeEventListener('click', outsideClick)
      document.removeEventListener('keydown', escHandler)
      cleanups.forEach(fn => typeof fn === 'function' && fn())
    }
  }, [])

  return (
    <>
      <header>
        <div className="container header-container">
          <a href="#" className="logo" aria-label="Пивас — головна">
            <img src="/logopivas.jpg" alt="ПИВАС логотип" />
          </a>
          <div className="burger" aria-label="Меню" tabIndex={0}>
            <span></span><span></span><span></span>
          </div>
          <ul className="nav-menu">
            <li><a href="#main">Головна</a></li>
            <li><a href="#stores">Магазини</a></li>
            <li><a href="#beer">Пиво</a></li>
            <li><a href="#drinks">Напої</a></li>
            <li><a href="#snacks">Закуски</a></li>
            <li><a href="#franchise">Франшиза</a></li>
            <li><a href="#delivery">Доставка</a></li>
          </ul>
        </div>
      </header>

      <section id="main" className="hero">
        <div className="container">
          <img src="/logo-for-main2.jpg" alt="ПИВАС - Магазин розливного пива" className="hero-logo" />
          <p>У нас можливо переглянути топ футбол, бокс та інші спортивні заходи. Насолодиться затишною атмосферою у кафе за цінами магазину розливного пива, зустрінеться з друзями та відзначити всіляки заходи</p>
        </div>
      </section>

      <section id="stores">
        <div className="container">
          <div className="section-title">
            <h2>Наші магазини</h2>
          </div>
          <div className="beer-slider stores-slider">
            <div className="beer-track stores-track">
              <div className="beer-slide">
                <div className="store-card">
                  <div className="store-img">
                    <img src="/lyp-60.jpg" alt="Магазин на вул. Лип Івана та Юрія, 60/1" />
                  </div>
                  <div className="store-info">
                    <h3>Магазин</h3>
                    <p title="Адреса"><i className="fas fa-map-marker-alt" aria-hidden="true"></i><span>Вул. Лип Івана та Юрія, 60/1</span></p>
                    <p title="Телефон"><i className="fas fa-phone" aria-hidden="true"></i><a href="tel:0994633694" style={{ color: 'inherit', textDecoration: 'none' }}>099 463 3694</a></p>
                  </div>
                </div>
              </div>

              <div className="beer-slide">
                <div className="store-card">
                  <div className="store-img">
                    <img src="/lyp-5.jpg" alt="Магазин на вул. Лип Івана та Юрія, 5/1" />
                  </div>
                  <div className="store-info">
                    <h3>Магазин</h3>
                    <p title="Адреса"><i className="fas fa-map-marker-alt" aria-hidden="true"></i><span>Вул. Лип Івана та Юрія, 5/1</span></p>
                    <p title="Телефон"><i className="fas fa-phone" aria-hidden="true"></i><a href="tel:0660106819" style={{ color: 'inherit', textDecoration: 'none' }}>066 010 6819</a></p>
                  </div>
                </div>
              </div>

              <div className="beer-slide">
                <div className="store-card">
                  <div className="store-img">
                    <img src="/stovbova.jpg" alt="Магазин на вул. Стовбова, 27" />
                  </div>
                  <div className="store-info">
                    <h3>Магазин</h3>
                    <p title="Адреса"><i className="fas fa-map-marker-alt" aria-hidden="true"></i><span>Вул. Стовбова, 27</span></p>
                    <p title="Телефон"><i className="fas fa-phone" aria-hidden="true"></i><a href="tel:0660256694" style={{ color: 'inherit', textDecoration: 'none' }}>066 025 6694</a></p>
                  </div>
                </div>
              </div>

              <div className="beer-slide">
                <div className="store-card">
                  <div className="store-img">
                    <img src="/radisna.jpg" alt="Магазин на вул. Радісна 23а" />
                  </div>
                  <div className="store-info">
                    <h3>Магазин</h3>
                    <p title="Адреса"><i className="fas fa-map-marker-alt" aria-hidden="true"></i><span>Вул. Радісна 23а</span></p>
                    <p title="Телефон"><i className="fas fa-phone" aria-hidden="true"></i><a href="tel:0668834443" style={{ color: 'inherit', textDecoration: 'none' }}>066 883 4443</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="beer-nav">
              <button className="beer-btn" id="storesPrev" aria-label="Попередній">‹</button>
              <button className="beer-btn" id="storesNext" aria-label="Наступний">›</button>
            </div>
          </div>
          <div className="beer-dots" id="storesDots"></div>
        </div>
      </section>

      <section id="beer">
        <div className="container">
          <div className="section-title">
            <h2>Наше пиво</h2>
          </div>
          <div className="beer-slider">
            <div className="beer-track">
              {[
                { src: '/medove2.jpg', title: 'Світле пиво', desc: "Освіжаюче світле пиво з м'яким смаком та легким ароматом", price: 'від 25 грн/л' },
                { src: '/firmove6.png', title: 'Крафтове пиво', desc: 'Унікальні сорти крафтового пива з ексклюзивними рецептурами', price: 'від 45 грн/л' },
                { src: '/pshen5.jpg', title: 'Пшеничне пиво', desc: 'Свіже пшеничне пиво з фруктовими нотами та м\'якою піною', price: 'від 28 грн/л' },
                { src: '/dusha.jpg', title: 'Темне пиво', desc: 'Насичене темне пиво з багатим смаком та карамельними нотами', price: 'від 30 грн/л' },
                { src: '/koryf2.jpg', title: 'Темне пиво', desc: 'Насичене темне пиво з багатим смаком та карамельними нотами', price: 'від 30 грн/л' },
                { src: '/blanche2.jpg', title: 'Темне пиво', desc: 'Насичене темне пиво з багатим смаком та карамельними нотами', price: 'від 30 грн/л' },
                { src: '/bile4.jpg', title: 'Темне пиво', desc: 'Насичене темне пиво з багатим смаком та карамельними нотами', price: 'від 30 грн/л' },
                { src: '/odeske2.jpg', title: 'Темне пиво', desc: 'Насичене темне пиво з багатим смаком та карамельними нотами', price: 'від 30 грн/л' },
                { src: '/porter2.jpg', title: 'Темне пиво', desc: 'Насичене темне пиво з багатим смаком та карамельними нотами', price: 'від 30 грн/л' },
                { src: '/zhig2.jpg', title: 'Темне пиво', desc: 'Насичене темне пиво з багатим смаком та карамельними нотами', price: 'від 30 грн/л' },
                { src: '/сeske_spec.jpg', title: 'Темне пиво', desc: 'Насичене темне пиво з багатим смаком та карамельними нотами', price: 'від 30 грн/л' },
              ].map((item, idx) => (
                <div className="beer-slide" key={idx}>
                  <div className="product-card">
                    <div className="product-img">
                      <img src={item.src} alt={item.title} />
                    </div>
                    <div className="product-info">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                      <div className="price">{item.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="beer-nav">
              <button className="beer-btn" id="beerPrev" aria-label="Попередній">‹</button>
              <button className="beer-btn" id="beerNext" aria-label="Наступний">›</button>
            </div>
          </div>
          <div className="beer-dots-container">
            <div className="beer-dots" id="beerDots"></div>
          </div>
        </div>
      </section>

      <section id="drinks">
        <div className="container">
          <div className="section-title">
            <h2>Напої</h2>
          </div>
          <div className="beer-slider drinks-slider">
            <div className="beer-track drinks-track">
              {[
                { src: '/prosecco.jpg', title: 'Вино', desc: 'Червоне та біле вино різних сортів з усього світу' },
                { src: '/lymonad.jpg', title: 'Сидр', desc: 'Освіжаючий яблучний та грушевий сидр з натуральних фруктів' },
                { src: '/kvas.jpg', title: 'Безалкогольні напої', desc: 'Лимонад, квас, соки та інші освіжаючі напої' },
                { src: '/glyntwein.jpg', title: 'Вино', desc: 'Червоне та біле вино різних сортів з усього світу' },
                { src: '/sydr-frag2.jpg', title: 'Вино', desc: 'Червоне та біле вино різних сортів з усього світу' },
                { src: '/sydr.jpg', title: 'Вино', desc: 'Червоне та біле вино різних сортів з усього світу' },
                { src: '/mango.jpg', title: 'Вино', desc: 'Червоне та біле вино різних сортів з усього світу' },
                { src: '/ruby-grande.jpg', title: 'Вино', desc: 'Червоне та біле вино різних сортів з усього світу' },
              ].map((item, idx) => (
                <div className="beer-slide" key={idx}>
                  <div className="product-card">
                    <div className="product-img">
                      <img src={item.src} alt={item.title} />
                    </div>
                    <div className="product-info">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="beer-nav">
              <button className="beer-btn" id="drinksPrev" aria-label="Попередній">‹</button>
              <button className="beer-btn" id="drinksNext" aria-label="Наступний">›</button>
            </div>
          </div>
          <div className="beer-dots" id="drinksDots"></div>
        </div>
      </section>

      <section id="snacks">
        <div className="container">
          <div className="section-title">
            <h2>Закуски</h2>
          </div>
          <div className="beer-slider snacks-slider">
            <div className="beer-track snacks-track">
              {[
                { src: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', title: 'Чипси', desc: 'Різноманітні чипси, сухарики та інші хрусткі снеки' },
                { src: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', title: "М'ясо", desc: 'Ковбаси, сир, м\'ясні нарізки та ароматні копченості' },
                { src: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', title: 'Кукурудза', desc: 'Асорті з різних сортів сиру та свіжих фруктів' },
                { src: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', title: 'Арахіс', desc: 'Асорті з різних сортів сиру та свіжих фруктів' },
                { src: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', title: 'Риба', desc: 'Асорті з різних сортів сиру та свіжих фруктів' },
              ].map((item, idx) => (
                <div className="beer-slide" key={idx}>
                  <div className="product-card">
                    <div className="product-img">
                      <img src={item.src} alt={item.title} />
                    </div>
                    <div className="product-info">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="beer-nav">
              <button className="beer-btn" id="snacksPrev" aria-label="Попередній">‹</button>
              <button className="beer-btn" id="snacksNext" aria-label="Наступний">›</button>
            </div>
          </div>
          <div className="beer-dots" id="snacksDots"></div>
        </div>
      </section>

      <section id="franchise" className="franchise">
        <div className="container">
          <div className="section-title">
            <h2>Франшиза</h2>
          </div>
          <div className="franchise-content">
            <p>Швидке відкриття, ціни нижче ринкових, багато бонусів, супровід</p>
            <p>З усіх питань звертайтесь:</p>
            <a href="tel:0979646415" className="phone-number">097 964 6415</a>
          </div>
        </div>
      </section>

      <section id="delivery">
        <div className="container">
          <div className="section-title">
            <h2>Доставка</h2>
          </div>
          <div className="delivery-content">
            <p>Ми пропонуємо доставку за допомогою сервісу</p>
            <div className="bond-logo">BOND</div>
            <p>Замовляйте ваші улюблені напої та закуски прямо додому!</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section" style={{ textAlign: 'center' }}>
              <img src="/logopivas.jpg" alt="ПИВАС логотип" style={{ width: '120px', height: 'auto', marginBottom: '12px', borderRadius: '16px', boxShadow: '0 4px 18px 0 rgba(44,44,44,0.25)', background: 'var(--yellow)' }} />
              <p>Найкраще пиво та затишна атмосфера. Заходьте до нас щодня з 10:00 до 22:00.</p>
            </div>
            <div className="footer-section">
              <h3>Контакти</h3>
              <p><i className="fas fa-envelope"></i> Email: info@pivas.ua</p>
              <p><i className="fas fa-phone"></i> Телефон: 0800 123 456</p>
            </div>
            <div className="footer-section">
              <h3>Соціальні мережі</h3>
              <div className="social-icons">
                <a href="https://www.instagram.com/pivas.od.ua?igsh=am94aXl4N3UyM2xv&utm_source=qr" target="_blank" className="social-link instagram" rel="noreferrer">
                  <i className="fab fa-instagram"></i>
                  <span>Instagram</span>
                </a>
                <a href="https://www.facebook.com/share/1ZkujpD6CE/?mibextid=wwXIfr" target="_blank" className="social-link facebook" rel="noreferrer">
                  <i className="fab fa-facebook-f"></i>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>© 2023 ПИВАС. Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
