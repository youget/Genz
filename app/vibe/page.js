'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Data Video Channel Kamu (Ganti ID nya nanti!)
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

  // Search & Data State
  const [searchInput, setSearchInput] = useState(''); // Input user (belum di submit)
  const [searchQuery, setSearchQuery] = useState('shorts viral'); // Query aktif untuk API
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageToken, setPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [region, setRegion] = useState('ID');

  // Fetch Function
  const fetchVideos = async (query, token = null) => {
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
      setRegion(data.region || 'global');
      
      if (!token && data.videos.length === 0) {
        setError(`No vibes found for "${query}" 😕`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchVideos(searchQuery);
  }, []); // Only run once on mount

  // Handle Submit (ENTER or Click)
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    
    setVideos([]);
    setPageToken(null);
    setSearchQuery(searchInput.trim());
    // Trigger fetch manually because useEffect dependency is removed to prevent auto-fetch on type
    fetchVideos(searchInput.trim());
  };

  const handleLoadMore = () => {
    if (pageToken) fetchVideos(searchQuery, pageToken);
  };

  const toggleSubmenu = (name) => setOpenSubmenu(openSubmenu === name ? null : name);

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Navbar (Same structure as Home, simplified for brevity) */}
      <nav className="navbar">
        <Link href="/" className="navbar-logo"><span className="navbar-logo-text">GenZee</span></Link>
        <div className="navbar-right">
          <button className="theme-toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode ? '☀️' : '🌙'}</button>
          <button className="hamburger-btn mobile-trigger" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? '✕' : '☰'}</button>
          <button className="hamburger-btn desktop-trigger" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>☰</button>
        </div>
        {/* Add Dropdown/Mobile Menu logic here similar to Home page */}
        {isDropdownOpen && (
           <div className="desktop-dropdown" onMouseLeave={() => setIsDropdownOpen(false)}>
             <ul className="dropdown-menu-list">
               <li><Link href="/" onClick={()=>setIsDropdownOpen(false)}>🏠 Home</Link></li>
               <li><Link href="/vibe" onClick={()=>setIsDropdownOpen(false)}>✨ Vibe</Link></li>
               <li><Link href="/ai" onClick={()=>setIsDropdownOpen(false)}>🤖 AI</Link></li>
             </ul>
           </div>
        )}
        {isMenuOpen && (
          <div className="mobile-menu-overlay" onClick={()=>setIsMenuOpen(false)}>
            <div className="mobile-menu" onClick={e=>e.stopPropagation()}>
              <div className="mobile-menu-header"><span>Menu</span><button onClick={()=>setIsMenuOpen(false)}>✕</button></div>
              <ul className="mobile-menu-list">
                <li><Link href="/" onClick={()=>setIsMenuOpen(false)}>🏠 Home</Link></li>
                <li><Link href="/vibe" onClick={()=>setIsMenuOpen(false)}>✨ Vibe</Link></li>
                <li><Link href="/ai" onClick={()=>setIsMenuOpen(false)}>🤖 AI</Link></li>
              </ul>
            </div>
          </div>
        )}
      </nav>

      <main className="vibe-page">
        <div className="vibe-header">
          <h1 className="vibe-title">✨ Vibe For You ({region.toUpperCase()}) 🇮🇩</h1>
          <p className="vibe-subtitle">Curated shorts just for your region!</p>
          
          {/* Tabs Gimmick */}
          <div style={{display:'flex', justifyContent:'center', gap:'10px', marginBottom:'20px'}}>
            <button className="btn btn-primary" style={{padding:'8px 20px', fontSize:'0.9rem'}}>YouTube</button>
            <button className="btn btn-outline" style={{padding:'8px 20px', fontSize:'0.9rem'}} onClick={()=>alert('TikTok Coming Soon! 🚧')}>TikTok</button>
            <button className="btn btn-outline" style={{padding:'8px 20px', fontSize:'0.9rem'}} onClick={()=>alert('Instagram Coming Soon! 🚧')}>Instagram</button>
          </div>

          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search vibe (e.g., mukbang, cats)..."
                className="search-input"
              />
              <button type="submit" className="search-btn">🔍</button>
            </form>
          </div>
          
          <div className="trending-chips">
            {['funny', 'animals', 'ai', 'dance', 'gaming'].map(chip => (
              <button key={chip} className="chip" onClick={() => { setSearchInput(chip); setSearchQuery(chip); setVideos([]); fetchVideos(chip); }}>#{chip}</button>
            ))}
          </div>
        </div>

        {error && <div className="error-message">❌ {error}</div>}

        {loading && videos.length === 0 ? (
          <div className="loading-grid">{[...Array(6)].map((_, i) => <div key={i} className="skeleton-card"></div>)}</div>
        ) : !loading && videos.length === 0 && !error ? (
          <div className="no-more-videos">😕 Start searching to find vibes!</div>
        ) : (
          <div className="videos-grid">
            {videos.map((video, index) => {
              const isAdSlot = (index + 1) % 10 === 0;
              const isCreatorSlot = (index + 1) % 5 === 0 && !isAdSlot;

              if (isAdSlot) {
                return (
                  <div key={`ad-${index}`} className="video-card ad-card">
                    <div className="thumbnail-container">
                      <img src={`https://via.placeholder.com/320x568/ff6b6b/ffffff?text=ADS+${Math.floor(index/10)+1}`} alt="Ad" className="thumbnail" />
                      <div className="video-duration" style={{background:'#ff4757'}}>ADS</div>
                    </div>
                    <div className="video-info">
                      <h3 className="video-title">🔥 Special Offer Just For You!</h3>
                      <a href="https://google.com" target="_blank" className="btn-small">Visit Now →</a>
                    </div>
                  </div>
                );
              }

              if (isCreatorSlot) {
                return (
                  <div key={`creator-${index}`} className="video-card creator-card">
                    <div className="thumbnail-container">
                      <img src={MY_CHANNEL_VIDEOS[0].thumb} alt="Creator" className="thumbnail" style={{opacity:0.8}} />
                      <div className="video-duration" style={{background:'#7b61ff'}}>🔥 CREATOR'S PICK</div>
                    </div>
                    <div className="video-info">
                      <h3 className="video-title" style={{color:'#7b61ff'}}>✨ My Latest Shorts!</h3>
                      <div style={{display:'flex', gap:'5px', overflowX:'auto', padding:'5px 0'}}>
                        {MY_CHANNEL_VIDEOS.slice(0,3).map((v,i) => (
                          <a key={i} href={`https://youtube.com/shorts/${v.id}`} target="_blank">
                            <img src={v.thumb} style={{width:'50px', borderRadius:'4px'}} alt="" />
                          </a>
                        ))}
                      </div>
                      <a href="https://youtube.com/@YOUR_CHANNEL" target="_blank" className="btn-small">Subscribe ❤️</a>
                    </div>
                  </div>
                );
              }

              return (
                <div key={video.id} className="video-card" onClick={() => setSelectedVideo(video)}>
                  <div className="thumbnail-container">
                    <img src={video.thumbnail} alt={video.title} className="thumbnail" loading="lazy" />
                    <div className="video-duration">0:{Math.floor(Math.random()*55)+5}</div>
                  </div>
                  <div className="video-info">
                    <h3 className="video-title">{video.title}</h3>
                    <div className="channel-info">
                      <span>{video.channel}</span>
                      <span>{Math.floor(Math.random()*900)+100}K views</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {hasMore && !loading && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={handleLoadMore} disabled={loading}>⬇️ Load More Vibe</button>
          </div>
        )}
      </main>

      {/* Modal Video */}
      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="video-player">
              <iframe src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`} frameBorder="0" allowFullScreen></iframe>
            </div>
            <div className="modal-controls">
              <button className="modal-btn share-btn">📤 Share</button>
              <button className="modal-btn close-btn" onClick={() => setSelectedVideo(null)}>✕ Close</button>
              <button className="modal-btn favorite-btn">❤️ Fav</button>
            </div>
          </div>
        </div>
      )}

      {/* New Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-section"><h4>✨ GenZee Vibe</h4><p>Best shorts curated for you.</p></div>
          <div className="footer-section"><h4>Links</h4><ul><li><Link href="/">Home</Link></li><li><Link href="/vibe">Vibe</Link></li></ul></div>
          <div className="footer-section"><h4>Legal</h4><ul><li><Link href="/privacy">Privacy</Link></li><li><Link href="/disclaimer">Disclaimer</Link></li></ul></div>
        </div>
        <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} GenZee. All rights reserved.</p></div>
      </footer>
    </div>
  );
}
