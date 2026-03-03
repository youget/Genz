'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; // ✅ Tambahkan ini untuk navigasi Next.js

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

  // ... (semua useEffect dan fungsi tetap sama seperti sebelumnya)
  // Copy dari kode vibe page kamu yang lama, TAPI ganti bagian navbar di bawah ini:

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* ========== NAVBAR ========== */}
      <nav className="navbar">
        {/* ✅ LOGO DENGAN NEXT.JS LINK (bisa klik ke home) */}
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
          
          {/* ✅ HAMBURGER MENU (selalu muncul di semua device) */}
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

      {/* ... (SISA KODE VIBE PAGE TETAP SAMA: search bar, video grid, dll) ... */}
      
      {/* Contoh bagian vibe content (copy dari kode lama kamu) */}
      <main className="vibe-page">
        <div className="vibe-header">
          <h1 className="vibe-title">✨ What's the Vibe Today?</h1>
          <p className="vibe-subtitle">Trending shorts from around the world • Region: {region.toUpperCase()}</p>
          
          <div className="search-container">
            <form onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) { setPageToken(null); setVideos([]); } }} className="search-form">
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
          
          {/* ... (lanjutkan dengan trending chips, video grid, dll) ... */}
        </div>
      </main>
      
      {/* ... (ScrollToTop, VideoModal, Footer - copy dari kode lama) ... */}
    </div>
  );
}
