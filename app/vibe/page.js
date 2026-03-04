'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Data Video Channel Kamu
const MY_CHANNEL_VIDEOS = [
  { id: 'Re3-ngqr6LU', title: 'Ranking Best Funny Moments', thumb: 'https://i.ytimg.com/vi/Re3-ngqr6LU/mqdefault.jpg' },
  { id: 'VIDEO_ID_2', title: 'My Latest Vlog', thumb: 'https://via.placeholder.com/320x180?text=Video+2' },
  { id: 'VIDEO_ID_3', title: 'Epic Fail Comp', thumb: 'https://via.placeholder.com/320x180?text=Video+3' },
  { id: 'VIDEO_ID_4', title: 'Cute Cats', thumb: 'https://via.placeholder.com/320x180?text=Video+4' },
  { id: 'VIDEO_ID_5', title: 'Gaming Highlights', thumb: 'https://via.placeholder.com/320x180?text=Video+5' },
];

export default function VibePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [showTranslator, setShowTranslator] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  // Search & Data State
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('shorts viral');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageToken, setPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [region, setRegion] = useState('ID');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // --- CACHE HELPER ---
  const getCacheKey = (q) => `genzee_cache_${q.toLowerCase().trim()}`;
  const getCachedData = (key) => {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(key);
    if (!item) return null;
    const { data, timestamp } = JSON.parse(item);
    if (new Date().getTime() - timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  };
  const setCacheData = (key, data) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify({ data, timestamp: new Date().getTime() }));
  };

  // --- FETCH ---
  const fetchVideos = async (query, token = null) => {
    if (!token) {
      const cached = getCachedData(getCacheKey(query));
      if (cached) {
        setVideos(cached.videos);
        setPageToken(cached.nextPageToken);
        setHasMore(!!cached.nextPageToken);
        setRegion(cached.region || 'ID');
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    setError(null);
    try {
      const url = `/api/youtube?q=${encodeURIComponent(query)}${token ? `&pageToken=${token}` : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setVideos(prev => token ? [...prev, ...data.videos] : data.videos);
      setPageToken(data.nextPageToken);
      setHasMore(!!data.nextPageToken);
      setRegion(data.region || 'ID');

      if (!token) setCacheData(getCacheKey(query), {
        videos: data.videos,
        nextPageToken: data.nextPageToken,
        region: data.region
      });

      if (!token && data.videos.length === 0) setError(`No vibes found for "${query}" 😕`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos('shorts viral');
    const handleScroll = () => setShowScrollTop(window.pageYOffset > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setVideos([]);
    setPageToken(null);
    const q = searchInput.trim();
    setSearchQuery(q);
    fetchVideos(q);
  };

  const handleLoadMore = () => {
    if (pageToken) fetchVideos(searchQuery, pageToken);
  };

  const toggleSubmenu = (name) => setOpenSubmenu(openSubmenu === name ? null : name);

  // --- TRANSLATOR CONTENT ---
  const t = {
    en: { vibe: "✨ Vibe", ai: "🤖 AI", fav: "❤️ Favorite", link: "🔗 Link" },
    id: { vibe: "✨ Vibe", ai: "🤖 AI", fav: "❤️ Favorit", link: "🔗 Link" }
  };
  const content = t[currentLang] || t.en;

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
      
      {/* NAVBAR LENGKAP & STICKY */}
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
          <div className="desktop-dropdown" onMouseLeave={() => { setIsDropdownOpen(false); setOpenSubmenu(null); }}>
            <ul className="dropdown-menu-list">
              <li><Link href="/" onClick={()=>setIsDropdownOpen(false)}>🏠 Home</Link></li>
              <li>
                <button className="submenu-toggle" onClick={() => toggleSubmenu('vibe')}>
                  {content.vibe} {openSubmenu === 'vibe' ? '▲' : '▼'}
                </button>
                {openSubmenu === 'vibe' && (
                  <ul className="dropdown-submenu active">
                    <li><Link href="/vibe?src=yt">▶️ YouTube</Link></li>
                    <li><a href="#" onClick={(e)=>{e.preventDefault();alert('TikTok Soon!')}}>🎵 TikTok</a></li>
                    <li><a href="#" onClick={(e)=>{e.preventDefault();alert('IG Soon!')}}>📸 Instagram</a></li>
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
                    <li><Link href="/fav?vibe">Vibe Saves</Link></li>
                    <li><Link href="/fav?ai">AI Creations</Link></li>
                  </ul>
                )}
              </li>
              <li><a href="https://pollinations.ai" target="_blank">{content.link}</a></li>
            </ul>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
            <div className="mobile-menu" onClick={e => e.stopPropagation()}>
              <div className="mobile-menu-header">
                <span className="mobile-menu-title">Menu</span>
                <button className="mobile-menu-close" onClick={() => setIsMenuOpen(false)}>✕</button>
              </div>
              <ul className="mobile-menu-list">
                <li><Link href="/" onClick={()=>setIsMenuOpen(false)}>🏠 Home</Link></li>
                <li>
                  <button className="mobile-submenu-toggle" onClick={() => toggleSubmenu('vibe')}>
                    {content.vibe} {openSubmenu === 'vibe' ? '▲' : '▼'}
                  </button>
                  {openSubmenu === 'vibe' && (
                    <ul className="submenu active">
                      <li><Link href="/vibe?src=yt">▶️ YouTube</Link></li>
                      <li><a href="#" onClick={(e)=>{e.preventDefault();alert('TikTok Soon!')}}>🎵 TikTok</a></li>
                      <li><a href="#" onClick={(e)=>{e.preventDefault();alert('IG Soon!')}}>📸 Instagram</a></li>
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
                      <li><Link href="/fav?vibe">Vibe Saves</Link></li>
                      <li><Link href="/fav?ai">AI Creations</Link></li>
                    </ul>
                  )}
                </li>
                <li><a href="https://pollinations.ai" target="_blank">{content.link}</a></li>
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* TRANSLATOR MODAL */}
      {showTranslator && (
        <div className="translator-modal" onClick={() => setShowTranslator(false)}>
          <div className="translator-box" onClick={e => e.stopPropagation()}>
            <button className="close-translator" onClick={() => setShowTranslator(false)}>✕</button>
            <h3>🌐 Select Language</h3>
            <select className="lang-select" value={currentLang} onChange={(e) => setCurrentLang(e.target.value)}>
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
            </select>
          </div>
        </div>
      )}

      <main className="vibe-page">
        <div className="vibe-header">
          <h1 className="vibe-title">✨ Vibe For You</h1>
          <p className="vibe-subtitle">Curated shorts just for you!</p>
          
          {/* TABS MODE GESER (MOBILE) / RAPI (DESKTOP) */}
          <div className="tabs-container">
            <button className="tab-btn active">YouTube</button>
            <button className="tab-btn" onClick={()=>alert('TikTok Coming Soon! 🚧')}>TikTok</button>
            <button className="tab-btn" onClick={()=>alert('Instagram Coming Soon! 🚧')}>Instagram</button>
          </div>

          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search vibe..." className="search-input" />
              <button type="submit" className="search-btn">🔍</button>
            </form>
          </div>
          
          <div className="trending-chips">
            {['funny', 'cats', 'ai', 'dance', 'gaming'].map(chip => (
              <button key={chip} className="chip" onClick={() => { setSearchInput(chip); fetchVideos(chip); }}>#{chip}</button>
            ))}
          </div>
        </div>

        {error && <div className="error-message">❌ {error}</div>}

        {loading && videos.length === 0 ? (
          <div className="loading-grid">{[...Array(6)].map((_, i) => <div key={i} className="skeleton-card"></div>)}</div>
        ) : !loading && videos.length === 0 && !error ? (
          <div className="no-more-videos">😕 Start searching!</div>
        ) : (
          <div className="videos-grid">
            {videos.map((video, index) => {
              const isAd = (index + 1) % 10 === 0;
              const isCreator = (index + 1) % 5 === 0 && !isAd;
              if (isAd) return (
                <div key={index} className="video-card ad-card">
                  <div className="thumbnail-container"><img src="https://via.placeholder.com/320x568?text=ADS" className="thumbnail"/><div className="video-duration">ADS</div></div>
                  <div className="video-info"><h3 className="video-title">Special Offer!</h3><a href="#" className="btn-small">Visit →</a></div>
                </div>
              );
              if (isCreator) return (
                <div key={index} className="video-card creator-card">
                  <div className="thumbnail-container"><img src={MY_CHANNEL_VIDEOS[0].thumb} className="thumbnail"/><div className="video-duration">CREATOR</div></div>
                  <div className="video-info"><h3 className="video-title">My Latest Shorts!</h3><a href="#" className="btn-small">Subscribe ❤️</a></div>
                </div>
              );
              return (
                <div key={video.id} className="video-card" onClick={() => setSelectedVideo(video)}>
                  <div className="thumbnail-container"><img src={video.thumbnail} className="thumbnail" loading="lazy"/><div className="video-duration">0:{Math.floor(Math.random()*55)+5}</div></div>
                  <div className="video-info"><h3 className="video-title">{video.title}</h3><div className="channel-info"><span>{video.channel}</span><span>Views</span></div></div>
                </div>
              );
            })}
          </div>
        )}

        {hasMore && !loading && <div className="load-more-container"><button className="load-more-btn" onClick={handleLoadMore}>⬇️ Load More</button></div>}
      </main>

      {/* VIDEO MODAL (FIXED CONTROLS) */}
      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="video-player">
              <iframe src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`} frameBorder="0" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>
            {/* Controls Always Visible */}
            <div className="modal-controls">
              <button className="modal-btn share-btn">📤 Share</button>
              <button className="modal-btn close-btn" onClick={() => setSelectedVideo(null)}>✕ Close</button>
              <button className="modal-btn favorite-btn">❤️ Fav</button>
            </div>
          </div>
        </div>
      )}

      {/* SCROLL TO TOP */}
      {showScrollTop && (
        <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
      )}

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-section"><h4>GenZee</h4><p>Vibe Curated.</p></div>
          <div className="footer-section"><h4>Links</h4><ul><li><Link href="/">Home</Link></li><li><Link href="/vibe">Vibe</Link></li></ul></div>
          <div className="footer-section"><h4>Legal</h4><ul><li><Link href="/privacy">Privacy</Link></li><li><Link href="/disclaimer">Disclaimer</Link></li></ul></div>
        </div>
        <div className="footer-bottom"><p>&copy; 2026 GenZee.</p></div>
      </footer>
    </div>
  );
}
