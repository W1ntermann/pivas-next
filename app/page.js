"use client"

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Константи для даних
const BEER_ITEMS = [
    { src: '/medove2.jpg', title: 'Медове' },
    { src: '/firmove6.png', title: 'Фірмове' },
    { src: '/pshen5.jpg', title: 'Пшеничне пиво' },
    { src: '/dusha.jpg', title: 'Душа бровара' },
    { src: '/koryf2.jpg', title: 'Опілля Корифей' },
    { src: '/blanche2.jpg', title: 'Бланш' },
    { src: '/bile4.jpg', title: 'Біле' },
    { src: '/odeske2.jpg', title: 'Одеське' },
    { src: '/porter2.jpg', title: 'Портер' },
    { src: '/zhig2.jpg', title: 'Жигулівське' },
    { src: '/сeske_spec.jpg', title: 'Чеське спеціальне' },
]

const DRINK_ITEMS = [
    { src: '/sizarini.jpg', title: 'Вино Prosecco' },
    { src: '/Lemonade.jpg', title: 'Сидр' },
    { src: '/quas.jpg', title: 'Безалкогольні напої' },
    { src: '/glyntwine.jpg', title: 'Вино Glühwein' },
    { src: '/sydr-frag2.jpg', title: 'Сидр полуничний' },
    { src: '/sydr.jpg', title: 'Сидр яблучний' },
    { src: '/mango.jpg', title: 'Напій манго' },
    { src: '/ruby-grande.jpg', title: 'Вино Ruby Grande' },
]

const STORE_ITEMS = [
    { src: '/lyp-60.jpg', address: 'Вул. Лип Івана та Юрія, 60/1', phone: '0994633694' },
    { src: '/lyp-5.jpg', address: 'Вул. Лип Івана та Юрія, 5/1', phone: '0660106819' },
    { src: '/stovbova.jpg', address: 'Вул. Стовбова, 27', phone: '0660256694' },
    { src: '/radisna.jpg', address: 'Вул. Радісна 23а', phone: '0668834443' },
]

const SNACK_ITEMS = [
    { src: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', title: 'Чипси' },
    { src: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', title: "М'ясо" },
    { src: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', title: 'Кукурудза' },
    { src: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', title: 'Арахіс' },
    { src: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', title: 'Риба' },
]

// Компоненти
const Header = () => (
    <header>
        <div className="container header-container">
            <Link href="/" className="logo" aria-label="Пивас — головна">
                <Image
                    src="/logopivas.jpg"
                    alt="ПИВАС логотип"
                    width={100}
                    height={50}
                    priority
                />
            </Link>
            <div className="burger" aria-label="Меню" tabIndex={0}>
                <span></span><span></span><span></span>
            </div>
            <ul className="nav-menu">
                <li><Link href="#main">Головна</Link></li>
                <li><Link href="#stores">Магазини</Link></li>
                <li><Link href="#beer">Пиво</Link></li>
                <li><Link href="#drinks">Напої</Link></li>
                <li><Link href="#snacks">Закуски</Link></li>
                <li><Link href="#franchise">Франшиза</Link></li>
                <li><Link href="#delivery">Доставка</Link></li>
            </ul>
        </div>
    </header>
)

const ProductCard = ({ src, title }) => (
    <div className="product-card">
        <div className="product-img">
            <Image src={src} alt={title} width={200} height={200} />
        </div>
        <div className="product-info" style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '3.0rem', fontWeight: '700' }}>{title}</h3>
        </div>
    </div>
)

const StoreCard = ({ src, address, phone }) => (
    <div className="store-card">
        <div className="store-img">
            <Image src={src} alt={`Магазин на ${address}`} width={300} height={200} />
        </div>
        <div className="store-info">
            <h3>Магазин</h3>
            <p title="Адреса">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                <span>{address}</span>
            </p>
            <p title="Телефон">
                <i className="fas fa-phone" aria-hidden="true"></i>
                <a href={`tel:${phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {phone}
                </a>
            </p>
        </div>
    </div>
)

const SliderSection = ({ id, title, items, isStore = false }) => (
    <section id={id}>
        <div className="container">
            <div className="section-title">
                <h2>{title}</h2>
            </div>
            <div className={`beer-slider ${id}-slider`}>
                <div className={`beer-track ${id}-track`}>
                    {items.map((item, idx) => (
                        <div className="beer-slide" key={idx}>
                            {isStore ? (
                                <StoreCard {...item} />
                            ) : (
                                <ProductCard {...item} />
                            )}
                        </div>
                    ))}
                </div>
                <div className="beer-nav">
                    <button className="beer-btn" id={`${id}Prev`} aria-label="Попередній">‹</button>
                    <button className="beer-btn" id={`${id}Next`} aria-label="Наступний">›</button>
                </div>
            </div>
            <div className="beer-dots" id={`${id}Dots`}></div>
        </div>
    </section>
)

export default function Home() {
    const setupSlider = useCallback((rootSelector, trackSelector, slidesSelector, prevId, nextId, dotsId) => {
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

        const goPrev = () => {
            index = (index - 1 + slides.length) % slides.length
            update()
        }

        const goNext = () => {
            index = (index + 1) % slides.length
            update()
        }

        prev?.addEventListener('click', goPrev)
        next?.addEventListener('click', goNext)

        setActive()

        return () => {
            prev?.removeEventListener('click', goPrev)
            next?.removeEventListener('click', goNext)
        }
    }, [])

    useEffect(() => {
        // Бургер меню
        const burger = document.querySelector('.burger')
        const nav = document.querySelector('.nav-menu')

        const toggleMenu = () => {
            nav?.classList.toggle('nav-active')
            burger?.classList.toggle('active')
        }

        burger?.addEventListener('click', toggleMenu)

        // Закриття меню при кліку на посилання
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                if (nav?.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active')
                    burger?.classList.remove('active')
                }
            })
        })

        // Закриття меню при кліку поза ним
        const handleOutsideClick = (e) => {
            if (nav?.classList.contains('nav-active') &&
                !nav.contains(e.target) &&
                !burger?.contains(e.target)) {
                nav.classList.remove('nav-active')
                burger?.classList.remove('active')
            }
        }

        // Закриття меню по ESC
        const handleEscKey = (e) => {
            if (e.key === 'Escape' && nav?.classList.contains('nav-active')) {
                nav.classList.remove('nav-active')
                burger?.classList.remove('active')
            }
        }

        document.addEventListener('click', handleOutsideClick)
        document.addEventListener('keydown', handleEscKey)

        // Прокрутка до головної секції
        const mainSection = document.getElementById('main')
        const headerEl = document.querySelector('header')

        if (mainSection && headerEl) {
            const headerH = headerEl.offsetHeight
            const top = mainSection.getBoundingClientRect().top + window.pageYOffset - headerH - 8
            window.scrollTo({ top, left: 0, behavior: 'auto' })
            history.replaceState(null, '', '#main')
        }

        // Налаштування слайдерів
        const cleanups = [
            setupSlider('#beer .beer-slider', '.beer-track', '.beer-slide', 'beerPrev', 'beerNext', 'beerDots'),
            setupSlider('.stores-slider', '.beer-track', '.beer-slide', 'storesPrev', 'storesNext', 'storesDots'),
            setupSlider('.drinks-slider', '.drinks-track', '.beer-slide', 'drinksPrev', 'drinksNext', 'drinksDots'),
            setupSlider('.snacks-slider', '.snacks-track', '.beer-slide', 'snacksPrev', 'snacksNext', 'snacksDots')
        ]

        return () => {
            burger?.removeEventListener('click', toggleMenu)
            document.removeEventListener('click', handleOutsideClick)
            document.removeEventListener('keydown', handleEscKey)
            cleanups.forEach(cleanup => typeof cleanup === 'function' && cleanup())
        }
    }, [setupSlider])

    return (
        <>
            <Header />

            <section id="main" className="hero">
                <div className="container">
                    <Image
                        src="/logo-for-main2.jpg"
                        alt="ПИВАС - Магазин розливного пива"
                        className="hero-logo"
                        width={300}
                        height={100}
                        priority
                    />
                    <p>У нас можливо переглянути топ футбол, бокс та інші спортивні заходи. Насолодиться затишною атмосферою у кафе за цінами магазину розливного пива, зустрінеться з друзями та відзначити всіляки заходи</p>
                </div>
            </section>

            <SliderSection
                id="stores"
                title="Наші магазини"
                items={STORE_ITEMS}
                isStore={true}
            />

            <SliderSection
                id="beer"
                title="Наше пиво"
                items={BEER_ITEMS}
            />

            <SliderSection
                id="drinks"
                title="Напої"
                items={DRINK_ITEMS}
            />

            <SliderSection
                id="snacks"
                title="Закуски"
                items={SNACK_ITEMS}
            />

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
                            <Image
                                src="/logopivas.jpg"
                                alt="ПИВАС логотип"
                                width={120}
                                height={60}
                                style={{
                                    marginBottom: '12px',
                                    borderRadius: '16px',
                                    boxShadow: '0 4px 18px 0 rgba(44,44,44,0.25)',
                                    background: 'var(--yellow)'
                                }}
                            />
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