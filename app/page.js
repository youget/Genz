'use client';

import { useState, useEffect } from 'react';
import './globals.css';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lovePoints, setLovePoints] = useState(0);
  const [friendCount, setFriendCount] = useState(0);
  const [joke, setJoke] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Fix hydration: set isClient only on client side
  useEffect(() => {
    setIsClient(true);
    // Generate random friend count on client only
    setFriendCount(Math.floor(Math.random() * 1000) + 1);
    
    // Generate random joke
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
  }, []);

  // Close dropdown on scroll/mouse move
  useEffect(() => {
    const handleActivity = () => {
      setIsDropdownOpen(false);
    };
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('mousemove', handleActivity);
    return () => {
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
    };
  }, []);

  // Play sound function (console only for now)
  const playSound = (soundName) => {
    if (isClient) {
      console.log(`Playing sound: ${soundName}`);
    }
  };

  // Add love points
  const addLovePoints = () => {
    const points = Math.floor(Math.random() * 10) + 1;
    setLovePoints(prev => prev + points);
    playSound('boop');
  };

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
      
      {/* ========== NAVBAR ========== */}
      <nav className="navbar">
        <div 
          className="navbar-logo" 
          onClick={() => {
            setIsMenuOpen(false);
            setIsDropdownOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="navbar-logo-text">GenZee</span>
        </div>
        
        <div className="navbar-right">
          <button 
            className="theme-toggle-btn" 
            onClick={(e) => {
              e.stopPropagation();
              setIsDarkMode(!isDarkMode);
            }}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          {/* Desktop Dropdown Menu Trigger */}
          <button 
            className="hamburger-btn desktop-trigger" 
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
              setIsMenuOpen(false);
            }}
            aria-label="Open menu"
            onMouseEnter={() => setIsDropdownOpen(true)}
          >
            ☰
          </button>
          
          {/* Mobile Menu Trigger */}
          <button 
            className="hamburger-btn mobile-trigger" 
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
              setIsDropdownOpen(false);
            }}
            aria-label="Open menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
        
        {/* Desktop Dropdown Menu */}
        {isDropdownOpen && (
          <div 
            className="desktop-dropdown"
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <ul className="dropdown-menu-list">
              <li>
                <a href="#home" onClick={() => setIsDropdownOpen(false)}>
                  🏠 Home
                </a>
              </li>
              <li>
                <a href="#videos" onClick={() => setIsDropdownOpen(false)}>
                  🎥 Videos
                </a>
                <ul className="dropdown-submenu">
                  <li><a href="#youtube" onClick={() => setIsDropdownOpen(false)}>▶️ YouTube</a></li>
                  <li><a href="#tiktok" onClick={() => setIsDropdownOpen(false)}>🎵 TikTok</a></li>
                  <li><a href="#instagram" onClick={() => setIsDropdownOpen(false)}>📸 Instagram</a></li>
                  <li><a href="#favorites" onClick={() => setIsDropdownOpen(false)}>❤️ Favorites</a></li>
                </ul>
              </li>
              <li>
                <a href="#ai" onClick={() => setIsDropdownOpen(false)}>
                  🤖 AI Generator
                </a>
                <ul className="dropdown-submenu">
                  <li><a href="#chat" onClick={() => setIsDropdownOpen(false)}>💬 Chat</a></li>
                  <li><a href="#image" onClick={() => setIsDropdownOpen(false)}>🎨 Image</a></li>
                  <li><a href="#video" onClick={() => setIsDropdownOpen(false)}>🎬 Video</a></li>
                  <li><a href="#history" onClick={() => setIsDropdownOpen(false)}>📜 History</a></li>
                </ul>
              </li>
              <li>
                <a 
                  href="https://google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  🔗 Link (Google)
                </a>
              </li>
              <li>
                <a href="#translator" onClick={() => setIsDropdownOpen(false)}>
                  🌐 Translator
                </a>
              </li>
            </ul>
          </div>
        )}
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            className="mobile-menu-overlay"
            onClick={() => setIsMenuOpen(false)}
          >
            <div 
              className="mobile-menu"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <span className="mobile-menu-title">GenZee Menu</span>
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
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1 className="hero-title">
            ✨ Welcome to <span className="logo">GenZee</span> ✨
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

      {/* ========== WHAT IS GENZEE ========== */}
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

      {/* ========== VIRAL VIDEOS ZONE ========== */}
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

      {/* ========== AI GENERATOR LAB ========== */}
      <section className="section" id="ai">
        <div className="section-content">
          <h2 className="section-title">🧪 AI Generator Lab 🧪</h2>
          <div className="wave-divider"></div>
          
          <p className="section-text">
            Create magic with AI! No skills needed!
          </p>

          <div className="ai-cards">
            <div className="ai-card">
              <div className="card-icon">💬</div>
              <h3>🤖 Chat AI</h3>
              <p>"Talk to our AI buddy - it's smarter than your ex!"</p>
            </div>

            <div className="ai-card">
              <div className="card-icon">🎨</div>
              <h3>🎨 Image Generator</h3>
              <p>"Type what you want, get amazing art instantly!"</p>
            </div>

            <div className="ai-card">
              <div className="card-icon">🎬</div>
              <h3>🎬 Video Generator</h3>
              <p>"Turn your ideas into videos in seconds!"</p>
            </div>

            <div className="ai-card">
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

      {/* ========== GET FRIEND GET LOVE ========== */}
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

      {/* ========== GENZEE PROMISE ========== */}
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

      {/* ========== PENUTUP KOCAL ========== */}
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
