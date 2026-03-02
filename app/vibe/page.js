'use client';

import { useState, useEffect, useRef } from 'react';
import '../globals.css';

// Navbar Component (reused from main page)
function Navbar({ isDarkMode, setIsDarkMode }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showNavbar, setShowNavbar] = useState(true);

  // Auto-hide navbar after 10 seconds of inactivity
  useEffect(() => {
    const hideTimer = setTimeout(() => setShowNavbar(false), 10000);
    return () => clearTimeout(hideTimer);
  }, [lastActivity]);

  // Show navbar on activity
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

  return (
    <nav className={`navbar ${showNavbar ? 'visible' : 'hidden'}`}>
      <div 
        className="navbar-logo" 
        onClick={() => {
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
        <button 
          className="hamburger-btn desktop-trigger"
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>
      
      {isDropdownOpen && (
        <div 
          className="desktop-dropdown" 
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <ul className="dropdown-menu-list">
            <li><a href="/" onClick={() => setIsDropdownOpen(false)}>🏠 Home</a></li>
            <li><a href="/vibe" onClick={() => setIsDropdownOpen(false)}>✨ Vibe</a></li>
            <li><a href="/ai" onClick={() => setIsDropdownOpen(false)}>🤖 AI Generator</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

// Video Card Component with Ads every 10th video
function VideoCard({ video, index, onVideoClick }) {
  // Every 10th video = ad slot
  if ((index + 1) % 10 === 0) {
    const adIndex = Math.floor(index / 10) % 5;
    const ads = [
      { url: 'https://www.youtube.com', label: '🎮 Game Terbaru!' },
      { url: 'https://www.tokopedia.com', label: '🛍️ Diskon Hari Ini!' },
      { url: 'https://www.shopee.co.id', label: '📱 Flash Sale!' },
      { url: 'https://www.netflix.com', label: '🎬 Nonton Sekarang!' },
      { url: 'https://www.spotify.com', label: '🎵 Lagu Viral!' }
    ];
    
    return (
      <div className="video-card ad-card">
        <div className="ad-content">
          <span className="ad-label">ADS</span>
          <p className="ad-text">{ads[adIndex].label}</p>
        </div>
        <a 
          href={ads[adIndex].url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="ad-link"
        >
          Kunjungi →
        </a>
      </div>
    );
  }

  return (
    <div className="video-card" onClick={() => onVideoClick(video)}>
      <div className="thumbnail-container">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="thumbnail"
          loading="lazy"
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
    </div>
  );
}

// Video Modal Component
function VideoModal({ video, onClose }) {
  if (!video) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="video-player">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&modestbranding=1&rel=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          ></iframe>
        </div>
        
        <div className="modal-controls">
          <button 
            className="modal-btn share-btn" 
            onClick={(e) => {
              e.stopPropagation();
              if (navigator.share) {
                navigator.share({
                  title: `Nonton ${video.title} di GenZee!`,
                  text: 'Vibe check this short! 🔥',
                  url: `https://genzeee.vercel.app/vibe`
                }).catch(err => console.log('Share failed:', err));
              } else {
                navigator.clipboard.writeText(`https://genzeee.vercel.app/vibe?video=${video.id}`);
                alert('🔗 Link copied to clipboard!');
              }
            }}
          >
            📤 Share
          </button>
          
          <button className="modal-btn close-btn" onClick={onClose}>
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
  );
}

// Scroll to Top Button
function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showButton) return null;

  return (
    <button className="scroll-to-top" onClick={scrollToTop}>
      ↑
    </button>
  );
}

// Trending Chips Component
function TrendingChips({ onChipClick }) {
  const chips = [
    'funny', 'animals', 'ai', 'dance', 'gaming', 
    'cooking', 'pranks', 'fails', 'satisfying', 'cosplay'
  ];

  return (
    <div className="trending-chips">
      {chips.map((chip, index) => (
        <button 
          key={index} 
          className="chip" 
          onClick={() => onChipClick(chip)}
        >
          #{chip}
        </button>
      ))}
    </div>
  );
}

export default function VibePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
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
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
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
              <button type="submit" className="search-btn">
                🔍
              </button>
            </form>
          </div>
          
          <TrendingChips onChipClick={handleChipClick} />
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
              <VideoCard 
                key={video.id || index} 
                video={video} 
                index={index} 
                onVideoClick={setSelectedVideo} 
              />
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
      
      <ScrollToTop />
      
      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
      
      <footer className="vibe-footer">
        <p>✨ Vibe powered by YouTube API • 5 keys rotation • Region: {region.toUpperCase()}</p>
        <p>⚠️ All videos are copyright of their owners. GenZee only displays public content.</p>
      </footer>
    </div>
  );
}
