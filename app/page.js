'use client';

import { useState, useEffect } from 'react';
import './globals.css';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [lovePoints, setLovePoints] = useState(0);
  const [friendCount, setFriendCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [joke, setJoke] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setFriendCount(Math.floor(Math.random() * 1000) + 1);
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      const jokes = [
        "Why did the Gen Z kid cross the road? To get to the other TikTok! 😂",
        "What's a Gen Z's favorite exercise? Scrolling! 💪",
        "How many Gen Z does it take to change a lightbulb? Just one, they learned it from YouTube! 📱",
        "Why don't Gen Z kids tell jokes? They're too busy making TikTok dances! 🕺",
        "What did the WiFi say to the Gen Z? 'I'm really feeling the connection!' 📶",
        "Why was the smartphone sad? It had too many hang-ups! 📱",
        "What's a Gen Z's favorite type of music? Wi-Fi! 🎵",
        "Why did the meme go to therapy? It had too many issues to resolve! 😅"
      ];
      setJoke(jokes[Math.floor(Math.random() * jokes.length)]);
    }
  }, [isClient]);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setShowNavbar(false);
    }, 10000);
    return () => clearTimeout(hideTimer);
  }, [lastActivity]);

  useEffect(() => {
    const handleActivity = () => {
      setShowNavbar(true);
      setLastActivity(Date.now());
    };
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('mousemove', handleActivity);
    return () => {
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
    };
  }, []);

  const playSound = (soundName) => {
    if (soundEnabled && isClient) {
      console.log(`Playing sound: ${soundName}`);
    }
  };

  const addLovePoints = () => {
    const points = Math.floor(Math.random() * 10) + 1;
    setLovePoints(prev => prev + points);
    playSound('boop');
  };

  if (!isClient) {
    return (
      <div className="loading">
        <p>Loading GenZee...</p>
      </div>
    );
  }
  
  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
      
      {/* ========== NAVBAR ========== */}
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-logo">
          <span className="navbar-logo-text">✨ GenZee ✨</span>
        </div>
        
        {/* Menu & Theme Toggle */}
        <div className="navbar-right">
          {/* Theme Toggle Button */}
          <button 
            className="theme-toggle-btn" 
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          {/* Hamburger Menu Button */}
          <button 
  className="hamburger-btn" 
  onClick={() => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      setIsDesktopMenuOpen(!isDesktopMenuOpen);
    }
  }}
  aria-label="Toggle menu"
>
  {isMenuOpen || isDesktopMenuOpen ? '✕' : '☰'}
</button>
        </div>
        
        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
            <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-menu-header">
                <span className="mobile-menu-title">✨ GenZee Menu ✨</span>
                <button 
                  className="mobile-menu-close" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  ✕
                </button>
              </div>
              
              <ul className="mobile-menu-list">
                <li>
                  <a href="#home" onClick={() => setIsMenuOpen(false)}>
                    🏠 Home
                  </a>
                </li>
                <li>
                  <a href="#videos" onClick={() => setIsMenuOpen(false)}>
                    🎥 Videos
                  </a>
                  <ul className="submenu">
                    <li><a href="#youtube" onClick={() => setIsMenuOpen(false)}>▶️ YouTube</a></li>
                    <li><a href="#tiktok" onClick={() => setIsMenuOpen(false)}>🎵 TikTok</a></li>
                    <li><a href="#instagram" onClick={() => setIsMenuOpen(false)}>📸 Instagram</a></li>
                    <li><a href="#favorites" onClick={() => setIsMenuOpen(false)}>❤️ Favorites</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#ai" onClick={() => setIsMenuOpen(false)}>
                    🤖 AI Generator
                  </a>
                  <ul className="submenu">
                    <li><a href="#chat" onClick={() => setIsMenuOpen(false)}>💬 Chat</a></li>
                    <li><a href="#image" onClick={() => setIsMenuOpen(false)}>🎨 Image</a></li>
                    <li><a href="#video" onClick={() => setIsMenuOpen(false)}>🎬 Video</a></li>
                    <li><a href="#history" onClick={() => setIsMenuOpen(false)}>📜 History</a></li>
                  </ul>
                </li>
                <li>
                  <a 
                    href="https://google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🔗 Link (Google)
                  </a>
                </li>
                <li>
                  <a href="#translator" onClick={() => setIsMenuOpen(false)}>
                    🌐 Translator
                  </a>
                </li>
              </ul>
              
              <div className="mobile-menu-footer">
                <p>GenZee - Your Digital Playground</p>
              </div>
            </div>
          </div>
        )}
                  {/* Desktop Menu Overlay */}
        {isDesktopMenuOpen && (
          <>
            <div 
              className="desktop-menu-overlay active" 
              onClick={() => setIsDesktopMenuOpen(false)}
            ></div>
            <div className="desktop-menu active">
              <div className="desktop-menu-header">
                <span className="desktop-menu-title">✨ GenZee Menu ✨</span>
                <button 
                  className="desktop-menu-close" 
                  onClick={() => setIsDesktopMenuOpen(false)}
                >
                  ✕
                </button>
              </div>
              
              <ul className="desktop-menu-list">
                <li>
                  <a href="#home" onClick={() => setIsDesktopMenuOpen(false)}>
                    🏠 Home
                  </a>
                </li>
                <li>
                  <a href="#videos" onClick={() => setIsDesktopMenuOpen(false)}>
                    🎥 Videos
                  </a>
                  <ul className="submenu">
                    <li><a href="#youtube" onClick={() => setIsDesktopMenuOpen(false)}>▶️ YouTube</a></li>
                    <li><a href="#tiktok" onClick={() => setIsDesktopMenuOpen(false)}>🎵 TikTok</a></li>
                    <li><a href="#instagram" onClick={() => setIsDesktopMenuOpen(false)}>📸 Instagram</a></li>
                    <li><a href="#favorites" onClick={() => setIsDesktopMenuOpen(false)}>❤️ Favorites</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#ai" onClick={() => setIsDesktopMenuOpen(false)}>
                    🤖 AI Generator
                  </a>
                  <ul className="submenu">
                    <li><a href="#chat" onClick={() => setIsDesktopMenuOpen(false)}>💬 Chat</a></li>
                    <li><a href="#image" onClick={() => setIsDesktopMenuOpen(false)}>🎨 Image</a></li>
                    <li><a href="#video" onClick={() => setIsDesktopMenuOpen(false)}>🎬 Video</a></li>
                    <li><a href="#history" onClick={() => setIsDesktopMenuOpen(false)}>📜 History</a></li>
                  </ul>
                </li>
                <li>
                  <a 
                    href="https://google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => setIsDesktopMenuOpen(false)}
                  >
                    🔗 Link (Google)
                  </a>
                </li>
                <li>
                  <a href="#translator" onClick={() => setIsDesktopMenuOpen(false)}>
                    🌐 Translator
                  </a>
                </li>
              </ul>
              
              <div className="desktop-menu-footer">
                <p>GenZee - Your Digital Playground</p>
              </div>
            </div>
          </>
        )}
      </nav>
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            ✨ Welcome to <span className="logo">GenZee</span>! ✨
          </h1>
          <p className="hero-subtitle">
            Gen Z playground for viral videos & AI magic!
          </p>
          
          <div className="hero-buttons">
            <button 
              className="btn btn-primary" 
              onClick={() => playSound('boop')}
            >
              🎮 Explore Now
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => playSound('boop')}
            >
              🤖 Try AI Generator
            </button>
          </div>
        </div>
      </section>

      {/* What is GenZee */}
      <section className="section">
        <div className="section-content">
          <h2 className="section-title">🤔 What is GenZee?</h2>
          <div className="wave-divider"></div>
          
          <p className="section-text">
            Simple! We're your go-to spot for:
          </p>
          
          <ul className="features-list">
            <li>✅ Viral videos that make you LOL, cry, or say "WTF" 😂</li>
            <li>✅ AI tools that blow your mind 🤯</li>
            <li>✅ Friends who share the same vibes 👯</li>
            <li>✅ Good vibes only, no toxicity! 🌈</li>
          </ul>

          <p className="section-text">
            Think of us as your chill internet buddy! 😎
          </p>
        </div>
      </section>

      {/* Viral Videos Zone */}
      <section className="section" id="videos">
        <div className="section-content">
          <h2 className="section-title">🔥 Viral Videos Zone 🔥</h2>
          <div className="wave-divider"></div>
          
          <p className="section-text">
            Watch. Laugh. Share. Repeat!
          </p>

          {/* Platform Icons */}
          <div className="platform-icons">
            <div className="platform-icon">
              <span className="icon">▶️</span>
              <span>YouTube</span>
            </div>
            <div className="platform-icon">
              <span className="icon">🎵</span>
              <span>TikTok</span>
            </div>
            <div className="platform-icon">
              <span className="icon">📸</span>
              <span>Instagram</span>
            </div>
            <div className="platform-icon">
              <span className="icon">❤️</span>
              <span>Favorites</span>
            </div>
          </div>

          {/* Trending Videos */}
          <div className="trending-section">
            <h3 className="sub-title">Trending Now:</h3>
            <ul className="video-list">
              <li>• "Cat fails compilation" - 2.1M views 🐱</li>
              <li>• "Dance challenge gone wrong" - 1.8M views 💃</li>
              <li>• "Cooking disaster" - 1.5M views 👨‍🍳</li>
              <li>• "POV: When your mom finds your search history" - 3.2M views 😳</li>
              <li>• "Trying viral TikTok hacks" - 2.8M views 🤯</li>
            </ul>
          </div>

          <div className="section-buttons">
            <button 
              className="btn btn-primary" 
              onClick={() => playSound('boop')}
            >
              📺 View All Videos
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => {
                playSound('boop');
                addLovePoints();
              }}
            >
              ❤️ Add to Favorites
            </button>
          </div>
        </div>
      </section>

      {/* AI Generator Lab */}
      <section className="section" id="ai">
        <div className="section-content">
          <h2 className="section-title">🧪 AI Generator Lab 🧪</h2>
          <div className="wave-divider"></div>
          
          <p className="section-text">
            Create magic with AI! No skills needed!
          </p>

          <div className="ai-cards">
            <div 
              className="ai-card" 
              onMouseEnter={() => playSound('boop')}
            >
              <div className="card-icon">💬</div>
              <h3>🤖 Chat AI</h3>
              <p>"Talk to our AI buddy - it's smarter than your ex!"</p>
            </div>

            <div 
              className="ai-card" 
              onMouseEnter={() => playSound('boop')}
            >
              <div className="card-icon">🎨</div>
              <h3>🎨 Image Generator</h3>
              <p>"Type what you want, get amazing art instantly!"</p>
            </div>

            <div 
              className="ai-card" 
              onMouseEnter={() => playSound('boop')}
            >
              <div className="card-icon">🎬</div>
              <h3>🎬 Video Generator</h3>
              <p>"Turn your ideas into videos in seconds!"</p>
            </div>

            <div 
              className="ai-card" 
              onMouseEnter={() => playSound('boop')}
            >
              <div className="card-icon">📜</div>
              <h3>📜 History</h3>
              <p>"See what you've created!"</p>
            </div>
          </div>

          <p className="small-text">
            ✨ Powered by: YouTube API, Pollinations AI, and more!
          </p>

          <button 
            className="btn btn-primary" 
            onClick={() => playSound('boop')}
          >
            🚀 Start Creating!
          </button>
        </div>
      </section>

      {/* Get Friend Get Love */}
      <section className="section" id="love">
        <div className="section-content">
          <h2 className="section-title">💖 Get Friend Get Love 💖</h2>
          <div className="wave-divider"></div>
          
          <p className="section-text">
            More friends = More love! Simple math! ❤️
          </p>

          <div className="love-info">
            <h3 className="love-info-title">💖 Here's How It Works 💖</h3>
            <ol className="love-steps">
              <li>Share your GenZee link with friends</li>
              <li>Friends join using your special link</li>
              <li>You get LOVE POINTS! 💯 (virtual hugs included)</li>
            </ol>
          </div>

          {/* Love Tiers */}
          <div className="love-tiers">
            <div className="tier-card">
              <div className="tier-icon">🥉</div>
              <h3>Bronze Heart</h3>
              <p>1-10 friends</p>
              <p className="tier-points">= 100 love points</p>
            </div>

            <div className="tier-card">
              <div className="tier-icon">🥈</div>
              <h3>Silver Heart</h3>
              <p>11-50 friends</p>
              <p className="tier-points">= 500 love points</p>
            </div>

            <div className="tier-card">
              <div className="tier-icon">🥇</div>
              <h3>Gold Heart</h3>
              <p>51+ friends</p>
              <p className="tier-points">= 1000+ love points!</p>
            </div>
          </div>

          {/* Love Points Counter */}
          <div className="love-counter">
            <h3>Your Stats:</h3>
            <div className="stats-row">
              <span>💖 Love Points:</span>
              <span className="love-number">{lovePoints}</span>
            </div>
            <div className="stats-row">
              <span>👯 Friends:</span>
              <span className="friend-number">{friendCount}</span>
            </div>
          </div>

          <p className="love-disclaimer">
            ❌ Can't buy anything (we're not that serious)<br/>
            ✅ Brag to your friends<br/>
            ✅ Feel loved and appreciated<br/>
            ✅ Get virtual hugs from us! 🤗
          </p>

          <div className="section-buttons">
            <button 
              className="btn btn-primary" 
              onClick={() => {
                playSound('boop');
                addLovePoints();
              }}
            >
              💌 Share Your Link
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => {
                playSound('boop');
                setLovePoints(lovePoints + 50);
              }}
            >
              💯 Check Love Points
            </button>
          </div>
        </div>
      </section>

      {/* GenZee Promise */}
      <section className="section" id="promise">
        <div className="section-content">
          <h2 className="section-title">🤝 GenZee Promise 🤝</h2>
          <div className="wave-divider"></div>
          
          <p className="section-text">
            We promise to give you:
          </p>

          <ul className="promise-list">
            <li>✅ Videos that make you feel something (happy, sad, shocked, whatever!)</li>
            <li>✅ Safe content (no creepy stuff, we promise!)</li>
            <li>✅ AI tools that actually work (most of the time 😅)</li>
            <li>✅ Good vibes and positive energy</li>
            <li>✅ New friends who share your interests</li>
            <li>✅ Virtual love and support! ❤️</li>
            <li>✅ Content that's actually worth your time</li>
            <li>✅ No fake news, no toxicity, just fun!</li>
          </ul>

          <p className="section-text">
            That's it! No complicated promises, just good times! 😊
          </p>
        </div>
      </section>

      {/* Penutup Kocak */}
      <section className="section" id="fun">
        <div className="section-content">
          <h2 className="section-title">🎉 You Made It! 🎉</h2>
          <div className="wave-divider"></div>
          
          <p className="section-text">
            If you're still reading this, you're officially awesome! 🌟
          </p>

          {/* Random Joke */}
          <div className="joke-box">
            <h3>Random Joke of the Day:</h3>
            <p className="joke-text">{joke}</p>
          </div>

          <p className="section-text">
            Still here? Here's a virtual cookie! 🍪<br/>
            (You can't eat it, but imagine it's delicious!)
          </p>

          <div className="cookie-emoji">🍪</div>

          <div className="section-buttons">
            <button 
              className="btn btn-primary" 
              onClick={() => playSound('boop')}
            >
              🚀 Let's Go!
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => playSound('boop')}
            >
              🤖 Try AI Now
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => playSound('boop')}
            >
              📺 Watch Videos
            </button>
          </div>

          <p className="footer-joke">
            P.S. If you see any bugs, just ignore them.<br/>
            They're part of the charm! 🐛✨
          </p>
        </div>
      </section>
    </div>
  );
}
