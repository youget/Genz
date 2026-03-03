'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VibePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageToken, setPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [region, setRegion] = useState('global');

  // Fetch videos on mount & search
  useEffect(() => {
    const fetchVideos = async (query = 'shorts viral', token = null) => {
      setLoading(true);
      setError(null);
      
      try {
        const url = `/api/youtube?q=${encodeURIComponent(query)}${token ? `&pageToken=${token}` : ''}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        // Merge with existing videos for load more
        setVideos(prev => token ? [...prev, ...data.videos] : data.videos);
        setPageToken(data.nextPageToken);
        setHasMore(!!data.nextPageToken);
        setRegion(data.region || 'global');
        
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Gagal load vibe. Coba lagi nanti! 😅');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos(searchQuery, null);
  }, [searchQuery]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setPageToken(null);
      setVideos([]);
    }
  };

  // Handle load more
  const handleLoadMore = () => {
    if (pageToken && !loading) {
      fetch(`/api/youtube?q=${encodeURIComponent(searchQuery)}&pageToken=${pageToken}`)
        .then(res => res.json())
        .then(data => {
          setVideos(prev => [...prev, ...data.videos]);
          setPageToken(data.nextPageToken);
          setHasMore(!!data.nextPageToken);
        })
        .catch(err => {
          console.error('Load more error:', err);
          setError('Gagal load lebih banyak vibe 😢');
        });
    }
  };

  // Handle trending chip click
  const handleChipClick = (chip) => {
    setSearchQuery(chip);
  };

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* ========== NAVBAR ========== */}
      <nav className="navbar">
        <Link href="/" className="navbar-logo">
          <span className="navbar-logo-text">GenZee</span>
        </Link>
        
        <div className="navbar-right">
          <button 
            className="theme-toggle-btn" 
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          <button 
            className="hamburger-btn" 
            onClick={() => {
              if (window.innerWidth <= 768) {
                setIsMenuOpen(!isMenuOpen);
                setIsDropdownOpen(false);
              } else {
                setIsDropdownOpen(!isDropdownOpen);
                setIsMenuOpen(false);
              }
            }}
            aria-label="Toggle menu"
          >
            {isMenuOpen || isDropdownOpen ? '✕' : '☰'}
          </button>
        </div>
        
        {/* Desktop Dropdown */}
        {isDropdownOpen && window.innerWidth > 768 && (
          <div className="desktop-dropdown" onMouseLeave={() => setIsDropdownOpen(false)}>
            <ul className="dropdown-menu-list">
              <li><Link href="/" onClick={() => setIsDropdownOpen(false)}>🏠 Home</Link></li>
              <li><Link href="/vibe" onClick={() => setIsDropdownOpen(false)}>✨ Vibe</Link></li>
              <li><Link href="/ai" onClick={() => setIsDropdownOpen(false)}>🤖 AI Generator</Link></li>
            </ul>
          </div>
        )}
        
        {/* Mobile Menu */}
        {isMenuOpen && window.innerWidth <= 768 && (
          <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
            <div className="mobile-menu" onClick={e => e.stopPropagation()}>
              <div className="mobile-menu-header">
                <span className="mobile-menu-title">GenZee Menu</span>
                <button className="mobile-menu-close" onClick={() => setIsMenuOpen(false)}>✕</button>
              </div>
              <ul className="mobile-menu-list">
                <li><Link href="/" onClick={() => setIsMenuOpen(false)}>🏠 Home</Link></li>
                <li><Link href="/vibe" onClick={() => setIsMenuOpen(false)}>✨ Vibe</Link></li>
                <li><Link href="/ai" onClick={() => setIsMenuOpen(false)}>🤖 AI Generator</Link></li>
              </ul>
              <div className="mobile-menu-footer">
                <p>GenZee - Your Digital Playground</p>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="vibe-page">
        <div className="vibe-header">
          <h1 className="vibe-title">✨ What's the Vibe Today?</h1>
          <p className="vibe-subtitle">Trending shorts from around the world • Region: {region.toUpperCase()}</p>
          
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari vibe... (contoh: cats, dance, fails)"
                className="search-input"
              />
              <button type="submit" className="search-btn">🔍</button>
            </form>
          </div>
          
          <div className="trending-chips">
            {['funny', 'animals', 'ai', 'dance', 'gaming', 'cooking', 'pranks', 'fails', 'satisfying', 'cosplay'].map((chip, index) => (
              <button 
                key={index} 
                className="chip" 
                onClick={() => handleChipClick(chip)}
              >
                #{chip}
              </button>
            ))}
          </div>
        </div>
        
        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}
        
        {loading && videos.length === 0 ? (
          <div className="loading-grid">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-thumbnail"></div>
                <div className="skeleton-title"></div>
                <div className="skeleton-channel"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videos-grid">
            {videos.map((video, index) => (
              <div 
                key={video.id || index} 
                className={`video-card ${((index + 1) % 10 === 0) ? 'ad-card' : ''}`}
                onClick={() => ((index + 1) % 10 !== 0) && setSelectedVideo(video)}
              >
                {((index + 1) % 10 === 0) ? (
                  // Ad slot every 10th video
                  <div className="ad-content">
                    <span className="ad-label">ADS</span>
                    <p className="ad-text">
                      {['🎮 Game Terbaru!', '🛍️ Diskon Hari Ini!', '📱 Flash Sale!', '🎬 Nonton Sekarang!', '🎵 Lagu Viral!'][
                        Math.floor(index / 10) % 5
                      ]}
                    </p>
                    <a 
                      href={['https://www.youtube.com', 'https://www.tokopedia.com', 'https://www.shopee.co.id', 'https://www.netflix.com', 'https://www.spotify.com'][
                        Math.floor(index / 10) % 5
                      ]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ad-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Kunjungi →
                    </a>
                  </div>
                ) : (
                  // Regular video
                  <>
                    <div className="thumbnail-container">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="thumbnail"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/320x180/ff6b6b/ffffff?text=GenZee+Vibe';
                        }}
                      />
                      <div className="video-duration">0:{Math.floor(Math.random() * 55) + 5}</div>
                    </div>
                    <div className="video-info">
                      <h3 className="video-title">{video.title}</h3>
                      <div className="channel-info">
                        <span className="channel-name">{video.channel}</span>
                        <span className="view-count">{Math.floor(Math.random() * 1000) + 1}K views</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        
        {hasMore && !loading && (
          <div className="load-more-container">
            <button 
              className="load-more-btn" 
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? 'Loading vibe...' : '⬇️ Load More Vibe'}
            </button>
            <p className="ads-info">ℹ️ Setiap 10 vibe ada 1 slot iklan (ADS)</p>
          </div>
        )}
        
        {!hasMore && videos.length > 0 && (
          <p className="no-more-videos">
            🎉 You've vibed through everything today! Try a new keyword 🔍
          </p>
        )}
      </main>
      
      {/* Scroll to Top */}
      <button 
        className="scroll-to-top" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
      
      {/* Video Modal */}
      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="video-player">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&modestbranding=1&rel=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedVideo.title}
              ></iframe>
            </div>
            
            <div className="modal-controls">
              <button 
                className="modal-btn share-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  if (navigator.share) {
                    navigator.share({
                      title: `Nonton ${selectedVideo.title} di GenZee!`,
                      text: 'Vibe check this short! 🔥',
                      url: `https://genzeee.vercel.app/vibe`
                    }).catch(err => console.log('Share failed:', err));
                  } else {
                    navigator.clipboard.writeText(`https://genzeee.vercel.app/vibe?video=${selectedVideo.id}`);
                    alert('🔗 Link copied to clipboard!');
                  }
                }}
              >
                📤 Share
              </button>
              
              <button className="modal-btn close-btn" onClick={() => setSelectedVideo(null)}>
                ✕ Close
              </button>
              
              <button 
                className="modal-btn favorite-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  alert('❤️ Saved to your vibe list!');
                }}
              >
                ❤️ Favorite
              </button>
            </div>
          </div>
        </div>
      )}
      
      <footer className="vibe-footer">
        <p>✨ Vibe powered by YouTube API • 5 keys rotation • Region: {region.toUpperCase()}</p>
        <p>⚠️ All videos are copyright of their owners. GenZee only displays public content.</p>
      </footer>
    </div>
  );
}
