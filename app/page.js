'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // State for Submenus
  const [openSubmenu, setOpenSubmenu] = useState(null); // 'vibe', 'ai', 'fav'
  
  // Translator State
  const [showTranslator, setShowTranslator] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  const toggleSubmenu = (name) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const t = {
    en: {
      home: "🏠 Home",
      vibe: "✨ Vibe",
      ai: "🤖 AI Generator",
      fav: "❤️ Favorite",
      link: "🔗 External Link",
      welcome: "Welcome to GenZee",
      subtitle: "Gen Z playground for viral videos & AI magic!",
      explore: "Explore Now",
      tryAi: "Try AI Generator",
      whatIs: "What is GenZee?",
      simple: "Simple! We're your go-to spot for:",
      viral: "Viral videos that make you LOL, cry, or say 'WTF' 😂",
      tools: "AI tools that blow your mind 🤯",
      friends: "Friends who share the same vibes 👯",
      goodVibes: "Good vibes only, no toxicity! 🌈",
      buddy: "Think of us as your chill internet buddy! 😎",
      videosZone: "Viral Videos Zone",
      watch: "Watch. Laugh. Share. Repeat!",
      trending: "Trending Now:",
      viewAll: "View All Videos",
      addFav: "Add to Favorites",
      aiLab: "AI Generator Lab",
      create: "Create magic with AI! No skills needed!",
      start: "Start Creating!",
      getLove: "Get Friend Get Love",
      math: "More friends = More love! Simple math! ❤️",
      howItWorks: "Here's How It Works",
      steps: ["Share your GenZee link", "Friends join using your link", "Get LOVE POINTS! 💯"],
      promise: "GenZee Promise",
      wePromise: "We promise to give you:",
      madeIt: "You Made It!",
      awesome: "If you're still reading this, you're officially awesome! 🌟",
      joke: "Random Joke of the Day:",
      cookie: "Still here? Here's a virtual cookie! 🍪",
      letsGo: "Let's Go!",
      tryNow: "Try AI Now",
      watchVid: "Watch Videos",
      ps: "P.S. If you see any bugs, just ignore them. They're part of the charm! 🐛✨"
    },
    id: {
      home: "🏠 Beranda",
      vibe: "✨ Vibe",
      ai: "🤖 AI Generator",
      fav: "❤️ Favorit",
      link: "🔗 Link Eksternal",
      welcome: "Selamat Datang di GenZee",
      subtitle: "Taman bermain Gen Z untuk video viral & sihir AI!",
      explore: "Jelajahi Sekarang",
      tryAi: "Coba AI Generator",
      whatIs: "Apa itu GenZee?",
      simple: "Simpel! Kami tempat utama kamu untuk:",
      viral: "Video viral yang bikin LOL, nangis, atau 'WTF' 😂",
      tools: "Tools AI yang bikin melongo 🤯",
      friends: "Teman yang satu frekuensi 👯",
      goodVibes: "Good vibes only, no toxicity! 🌈",
      buddy: "Anggap kami teman internet santai kamu! 😎",
      videosZone: "Zona Video Viral",
      watch: "Nonton. Ketawa. Share. Ulangi!",
      trending: "Sedang Tren:",
      viewAll: "Lihat Semua Video",
      addFav: "Tambah ke Favorit",
      aiLab: "Lab Generator AI",
      create: "Buat sihir dengan AI! Gak butuh skill!",
      start: "Mulai Buat!",
      getLove: "Dapat Teman Dapat Cinta",
      math: "Banyak teman = Banyak cinta! Matematika simpel! ❤️",
      howItWorks: "Cara Kerjanya",
      steps: ["Share link GenZee kamu", "Teman gabung pakai link kamu", "Dapat POIN CINTA! 💯"],
      promise: "Janji GenZee",
      wePromise: "Kami janji bakal kasih kamu:",
      madeIt: "Kamu Berhasil!",
      awesome: "Kalau masih baca ini, kamu resmi keren! 🌟",
      joke: "Lelucon Acak Hari Ini:",
      cookie: "Masih di sini? Ini kue virtual! 🍪",
      letsGo: "Gas!",
      tryNow: "Coba AI Sekarang",
      watchVid: "Nonton Video",
      ps: "P.S. Kalau ada bug, anggap aja fitur rahasia. 🐛✨"
    }
  };

  const content = t[currentLang] || t.en;

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
      
      {/* Navbar */}
      <nav className="navbar">
        <Link href="/" className="navbar-logo">
          <span className="navbar-logo-text">GenZee</span>
        </Link>
        
        <div className="navbar-right">
          <button className="theme-toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button className="translate-btn" onClick={() => setShowTranslator(true)}>
            🌐
          </button>
          
          <button className="hamburger-btn mobile-trigger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
          <button className="hamburger-btn desktop-trigger" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            ☰
          </button>
        </div>

        {/* Desktop Dropdown */}
        {isDropdownOpen && (
          <div className="desktop-dropdown" onMouseLeave={() => setIsDropdownOpen(false)}>
            <ul className="dropdown-menu-list">
              <li><Link href="/" onClick={() => setIsDropdownOpen(false)}>{content.home}</Link></li>
              
              <li>
                <button className="submenu-toggle" onClick={() => toggleSubmenu('vibe')}>
                  {content.vibe} {openSubmenu === 'vibe' ? '▲' : '▼'}
                </button>
                {openSubmenu === 'vibe' && (
                  <ul className="dropdown-submenu active">
                    <li><Link href="/vibe?source=youtube">▶️ YouTube</Link></li>
                    <li><Link href="#" onClick={(e)=>{e.preventDefault(); alert('TikTok Coming Soon! 🚧')}}>🎵 TikTok</Link></li>
                    <li><Link href="#" onClick={(e)=>{e.preventDefault(); alert('Instagram Coming Soon! 🚧')}}>📸 Instagram</Link></li>
                  </ul>
                )}
              </li>

              <li>
                <button className="submenu-toggle" onClick={() => toggleSubmenu('ai')}>
                  {content.ai} {openSubmenu === 'ai' ? '▲' : '▼'}
                </button>
                {openSubmenu === 'ai' && (
                  <ul className="dropdown-submenu active">
                    <li><Link href="/ai?type=chat">💬 Chat</Link></li>
                    <li><Link href="/ai?type=image">🎨 Image</Link></li>
                    <li><Link href="/ai?type=voice">🎤 Voice</Link></li>
                    <li><Link href="/ai?type=video">🎬 Video</Link></li>
                  </ul>
                )}
              </li>

              <li>
                <button className="submenu-toggle" onClick={() => toggleSubmenu('fav')}>
                  {content.fav} {openSubmenu === 'fav' ? '▲' : '▼'}
                </button>
                {openSubmenu === 'fav' && (
                  <ul className="dropdown-submenu active">
                    <li><Link href="/favorite?vibe">✨ Vibe Saves</Link></li>
                    <li><Link href="/favorite?ai">🤖 AI Creations</Link></li>
                  </ul>
                )}
              </li>

              <li><a href="https://pollinations.ai" target="_blank" rel="noopener noreferrer">{content.link}</a></li>
            </ul>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
            <div className="mobile-menu" onClick={e => e.stopPropagation()}>
              <div className="mobile-menu-header">
                <span className="mobile-menu-title">GenZee Menu</span>
                <button className="mobile-menu-close" onClick={() => setIsMenuOpen(false)}>✕</button>
              </div>
              <ul className="mobile-menu-list">
                <li><Link href="/" onClick={() => setIsMenuOpen(false)}>{content.home}</Link></li>
                
                <li>
                  <button className="mobile-submenu-toggle" onClick={() => toggleSubmenu('vibe')}>
                    {content.vibe} {openSubmenu === 'vibe' ? '▲' : '▼'}
                  </button>
                  {openSubmenu === 'vibe' && (
                    <ul className="submenu active">
                      <li><Link href="/vibe?source=youtube">▶️ YouTube</Link></li>
                      <li><Link href="#" onClick={(e)=>{e.preventDefault(); alert('TikTok Coming Soon!')}}>🎵 TikTok</Link></li>
                      <li><Link href="#" onClick={(e)=>{e.preventDefault(); alert('IG Coming Soon!')}}>📸 Instagram</Link></li>
                    </ul>
                  )}
                </li>

                <li>
                  <button className="mobile-submenu-toggle" onClick={() => toggleSubmenu('ai')}>
                    {content.ai} {openSubmenu === 'ai' ? '▲' : '▼'}
                  </button>
                  {openSubmenu === 'ai' && (
                    <ul className="submenu active">
                      <li><Link href="/ai?type=chat">💬 Chat</Link></li>
                      <li><Link href="/ai?type=image">🎨 Image</Link></li>
                      <li><Link href="/ai?type=voice">🎤 Voice</Link></li>
                      <li><Link href="/ai?type=video">🎬 Video</Link></li>
                    </ul>
                  )}
                </li>

                <li>
                  <button className="mobile-submenu-toggle" onClick={() => toggleSubmenu('fav')}>
                    {content.fav} {openSubmenu === 'fav' ? '▲' : '▼'}
                  </button>
                  {openSubmenu === 'fav' && (
                    <ul className="submenu active">
                      <li><Link href="/favorite?vibe">✨ Vibe Saves</Link></li>
                      <li><Link href="/favorite?ai">🤖 AI Creations</Link></li>
                    </ul>
                  )}
                </li>

                <li><a href="https://pollinations.ai" target="_blank" rel="noopener noreferrer">{content.link}</a></li>
              </ul>
              <div className="mobile-menu-footer"><p>GenZee - Your Digital Playground</p></div>
            </div>
          </div>
        )}
      </nav>

      {/* Translator Modal */}
      {showTranslator && (
        <div className="translator-modal" onClick={() => setShowTranslator(false)}>
          <div className="translator-box" onClick={e => e.stopPropagation()}>
            <button className="close-translator" onClick={() => setShowTranslator(false)}>✕</button>
            <h3>🌐 Select Language / Pilih Bahasa</h3>
            <select className="lang-select" value={currentLang} onChange={(e) => setCurrentLang(e.target.value)}>
              <option value="en">English (Default)</option>
              <option value="id">Bahasa Indonesia</option>
              <option value="jp">日本語 (Soon)</option>
              <option value="kr">한국어 (Soon)</option>
            </select>
            <p style={{marginTop:'15px', fontSize:'0.9rem', color:'#666'}}>Default is English. Change anytime!</p>
          </div>
        </div>
      )}

      <main>
        {/* Hero */}
        <section className="hero" id="home">
          <div className="hero-content">
            <h1 className="hero-title">✨ {content.welcome} <span className="logo">GenZee</span> ✨</h1>
            <p className="hero-subtitle">{content.subtitle}</p>
            <div className="hero-buttons">
              <button className="btn btn-primary">🎮 {content.explore}</button>
              <button className="btn btn-secondary">🤖 {content.tryAi}</button>
            </div>
          </div>
        </section>

        {/* What Is */}
        <section className="section">
          <div className="section-content">
            <h2 className="section-title">🤔 {content.whatIs}</h2>
            <div className="wave-divider"></div>
            <p className="section-text">{content.simple}</p>
            <ul className="features-list">
              <li>✅ {content.viral}</li>
              <li>✅ {content.tools}</li>
              <li>✅ {content.friends}</li>
              <li>✅ {content.goodVibes}</li>
            </ul>
            <p className="section-text">{content.buddy}</p>
          </div>
        </section>

        {/* Videos Zone */}
        <section className="section" id="videos">
          <div className="section-content">
            <h2 className="section-title">🔥 {content.videosZone} 🔥</h2>
            <div className="wave-divider"></div>
            <p className="section-text">{content.watch}</p>
            <div className="platform-icons">
              <div className="platform-icon"><span className="icon">▶️</span><span>YouTube</span></div>
              <div className="platform-icon"><span className="icon">🎵</span><span>TikTok</span></div>
              <div className="platform-icon"><span className="icon">📸</span><span>Instagram</span></div>
              <div className="platform-icon"><span className="icon">❤️</span><span>Favorites</span></div>
            </div>
            <div className="trending-section">
              <h3 className="sub-title" style={{textAlign:'center', marginBottom:'20px'}}>{content.trending}</h3>
              <ul className="video-list">
                <li>• "Cat fails compilation" - 2.1M views 🐱</li>
                <li>• "Dance challenge gone wrong" - 1.8M views 💃</li>
                <li>• "Cooking disaster" - 1.5M views 👨‍🍳</li>
              </ul>
            </div>
            <div className="section-buttons">
              <button className="btn btn-primary">📺 {content.viewAll}</button>
              <button className="btn btn-outline">❤️ {content.addFav}</button>
            </div>
          </div>
        </section>

        {/* AI Lab */}
        <section className="section" id="ai">
          <div className="section-content">
            <h2 className="section-title">🧪 {content.aiLab} 🧪</h2>
            <div className="wave-divider"></div>
            <p className="section-text">{content.create}</p>
            <div className="ai-cards">
              <div className="ai-card"><div className="card-icon">💬</div><h3>🤖 Chat AI</h3><p>"Talk to our AI buddy!"</p></div>
              <div className="ai-card"><div className="card-icon">🎨</div><h3>🎨 Image Gen</h3><p>"Type what you want!"</p></div>
              <div className="ai-card"><div className="card-icon">🎬</div><h3>🎬 Video Gen</h3><p>"Ideas to videos!"</p></div>
              <div className="ai-card"><div className="card-icon">📜</div><h3>📜 History</h3><p>"See creations!"</p></div>
            </div>
            <button className="btn btn-primary" style={{display:'block', margin:'40px auto'}}>{content.start}</button>
          </div>
        </section>

        {/* Love Section */}
        <section className="section" id="love">
          <div className="section-content">
            <h2 className="section-title">💖 {content.getLove} 💖</h2>
            <div className="wave-divider"></div>
            <p className="section-text">{content.math}</p>
            <div className="love-info">
              <h3 className="love-info-title">{content.howItWorks}</h3>
              <ol className="love-steps">
                {content.steps.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </div>
            <div className="section-buttons">
              <button className="btn btn-primary">💌 Share Link</button>
              <button className="btn btn-secondary">💯 Check Points</button>
            </div>
          </div>
        </section>

        {/* Promise */}
        <section className="section" id="promise">
          <div className="section-content">
            <h2 className="section-title">🤝 {content.promise} 🤝</h2>
            <div className="wave-divider"></div>
            <p className="section-text">{content.wePromise}</p>
            <ul className="promise-list">
              <li>✅ Safe content & Good vibes</li>
              <li>✅ AI tools that work</li>
              <li>✅ No toxicity, just fun!</li>
            </ul>
          </div>
        </section>

        {/* Fun Outro */}
        <section className="section" id="fun">
          <div className="section-content">
            <h2 className="section-title">🎉 {content.madeIt} 🎉</h2>
            <div className="wave-divider"></div>
            <p className="section-text">{content.awesome}</p>
            <div className="joke-box">
              <h3>{content.joke}</h3>
              <p className="joke-text">Why did the Gen Z kid cross the road? To get to the other TikTok! 😂</p>
            </div>
            <p className="section-text">{content.cookie}</p>
            <div className="cookie-emoji">🍪</div>
            <div className="section-buttons">
              <button className="btn btn-primary">🚀 {content.letsGo}</button>
              <button className="btn btn-secondary">🤖 {content.tryNow}</button>
              <button className="btn btn-outline">📺 {content.watchVid}</button>
            </div>
            <p className="footer-joke">{content.ps}</p>
          </div>
        </section>
      </main>

      {/* New Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>✨ GenZee</h4>
            <p>Your ultimate digital playground for Gen Z vibes. Viral videos, AI magic, and good times only!</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/vibe">Vibe</Link></li>
              <li><Link href="/ai">AI Generator</Link></li>
              <li><a href="https://pollinations.ai" target="_blank">Pollinations AI</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>hello@genzeee.vercel.app</p>
            <p>Follow us on social media for updates!</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GenZee. All rights reserved. Made with 💖 for Gen Z.</p>
        </div>
      </footer>
    </div>
  );
}
