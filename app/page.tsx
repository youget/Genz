'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [lovePoints, setLovePoints] = useState(0);
  const [friendCount, setFriendCount] = useState(0); // Default 0
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [joke, setJoke] = useState('');
  const [isClient, setIsClient] = useState(false); // Untuk pastikan di client

  // Pastikan kita di client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate random friend count hanya di client
  useEffect(() => {
    if (isClient) {
      setFriendCount(Math.floor(Math.random() * 1000) + 1);
    }
  }, [isClient]);

  // Generate random joke hanya di client
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

  // Auto-hide navbar after 10 seconds of inactivity
  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setShowNavbar(false);
    }, 10000);

    return () => clearTimeout(hideTimer);
  }, [lastActivity]);

  // Show navbar on scroll or mouse move
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

  // Play sound function
  const playSound = (soundName) => {
    if (soundEnabled && isClient) {
      console.log(`Playing sound: ${soundName}`);
    }
  };

  // Add love points
  const addLovePoints = () => {
    const points = Math.floor(Math.random() * 10) + 1;
    setLovePoints(prev => prev + points);
    playSound('boop');
  };

  // Kalau belum di client, tampilkan loading
  if (!isClient) {
    return (
      <div className={styles.loading}>
        <p>Loading GenZee...</p>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.darkMode : ''}`}>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            ✨ Welcome to <span className={styles.logo}>GenZee</span>! ✨
          </h1>
          <p className={styles.heroSubtitle}>
            Gen Z playground for viral videos & AI magic!
          </p>
          
          <div className={styles.heroButtons}>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`} 
              onClick={() => playSound('boop')}
            >
              🎮 Explore Now
            </button>
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`} 
              onClick={() => playSound('boop')}
            >
              🤖 Try AI Generator
            </button>
          </div>
        </div>
      </section>

      {/* What is GenZee */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>🤔 What is GenZee?</h2>
          <div className={styles.waveDivider}></div>
          
          <p className={styles.sectionText}>
            Simple! We're your go-to spot for:
          </p>
          
          <ul className={styles.featuresList}>
            <li>✅ Viral videos that make you LOL, cry, or say "WTF" 😂</li>
            <li>✅ AI tools that blow your mind 🤯</li>
            <li>✅ Friends who share the same vibes 👯</li>
            <li>✅ Good vibes only, no toxicity! 🌈</li>
          </ul>

          <p className={styles.sectionText}>
            Think of us as your chill internet buddy! 😎
          </p>
        </div>
      </section>

      {/* Viral Videos Zone */}
      <section className={styles.section} id="videos">
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>🔥 Viral Videos Zone 🔥</h2>
          <div className={styles.waveDivider}></div>
          
          <p className={styles.sectionText}>
            Watch. Laugh. Share. Repeat!
          </p>

          {/* Platform Icons */}
          <div className={styles.platformIcons}>
            <div className={styles.platformIcon}>
              <span className={styles.icon}>▶️</span>
              <span>YouTube</span>
            </div>
            <div className={styles.platformIcon}>
              <span className={styles.icon}>🎵</span>
              <span>TikTok</span>
            </div>
            <div className={styles.platformIcon}>
              <span className={styles.icon}>📸</span>
              <span>Instagram</span>
            </div>
            <div className={styles.platformIcon}>
              <span className={styles.icon}>❤️</span>
              <span>Favorites</span>
            </div>
          </div>

          {/* Trending Videos */}
          <div className={styles.trendingSection}>
            <h3 className={styles.subTitle}>Trending Now:</h3>
            <ul className={styles.videoList}>
              <li>• "Cat fails compilation" - 2.1M views 🐱</li>
              <li>• "Dance challenge gone wrong" - 1.8M views 💃</li>
              <li>• "Cooking disaster" - 1.5M views 👨‍🍳</li>
              <li>• "POV: When your mom finds your search history" - 3.2M views 😳</li>
              <li>• "Trying viral TikTok hacks" - 2.8M views 🤯</li>
            </ul>
          </div>

          <div className={styles.sectionButtons}>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`} 
              onClick={() => playSound('boop')}
            >
              📺 View All Videos
            </button>
            <button 
              className={`${styles.btn} ${styles.btnOutline}`} 
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
      <section className={styles.section} id="ai">
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>🧪 AI Generator Lab 🧪</h2>
          <div className={styles.waveDivider}></div>
          
          <p className={styles.sectionText}>
            Create magic with AI! No skills needed!
          </p>

          <div className={styles.aiCards}>
            <div 
              className={styles.aiCard} 
              onMouseEnter={() => playSound('boop')}
            >
              <div className={styles.cardIcon}>💬</div>
              <h3>🤖 Chat AI</h3>
              <p>"Talk to our AI buddy - it's smarter than your ex!"</p>
            </div>

            <div 
              className={styles.aiCard} 
              onMouseEnter={() => playSound('boop')}
            >
              <div className={styles.cardIcon}>🎨</div>
              <h3>🎨 Image Generator</h3>
              <p>"Type what you want, get amazing art instantly!"</p>
            </div>

            <div 
              className={styles.aiCard} 
              onMouseEnter={() => playSound('boop')}
            >
              <div className={styles.cardIcon}>🎬</div>
              <h3>🎬 Video Generator</h3>
              <p>"Turn your ideas into videos in seconds!"</p>
            </div>

            <div 
              className={styles.aiCard} 
              onMouseEnter={() => playSound('boop')}
            >
              <div className={styles.cardIcon}>📜</div>
              <h3>📜 History</h3>
              <p>"See what you've created!"</p>
            </div>
          </div>

          <p className={styles.smallText}>
            ✨ Powered by: YouTube API, Pollinations AI, and more!
          </p>

          <button 
            className={`${styles.btn} ${styles.btnPrimary}`} 
            onClick={() => playSound('boop')}
          >
            🚀 Start Creating!
          </button>
        </div>
      </section>

      {/* Get Friend Get Love */}
      <section className={styles.section} id="love">
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>💖 Get Friend Get Love 💖</h2>
          <div className={styles.waveDivider}></div>
          
          <p className={styles.sectionText}>
            More friends = More love! Simple math! ❤️
          </p>

          <div className={styles.loveInfo}>
  <h3 className={styles.loveInfoTitle}>💖 Here's How It Works 💖</h3>
  <ol className={styles.loveSteps}>
    <li>Share your GenZee link with friends</li>
    <li>Friends join using your special link</li>
    <li>You get LOVE POINTS! 💯 (virtual hugs included)</li>
  </ol>
</div>

          {/* Love Tiers */}
          <div className={styles.loveTiers}>
            <div className={styles.tierCard}>
              <div className={styles.tierIcon}>🥉</div>
              <h3>Bronze Heart</h3>
              <p>1-10 friends</p>
              <p className={styles.tierPoints}>= 100 love points</p>
            </div>

            <div className={styles.tierCard}>
              <div className={styles.tierIcon}>🥈</div>
              <h3>Silver Heart</h3>
              <p>11-50 friends</p>
              <p className={styles.tierPoints}>= 500 love points</p>
            </div>

            <div className={styles.tierCard}>
              <div className={styles.tierIcon}>🥇</div>
              <h3>Gold Heart</h3>
              <p>51+ friends</p>
              <p className={styles.tierPoints}>= 1000+ love points!</p>
            </div>
          </div>

          {/* Love Points Counter */}
          <div className={styles.loveCounter}>
            <h3>Your Stats:</h3>
            <div className={styles.statsRow}>
              <span>💖 Love Points:</span>
              <span className={styles.loveNumber}>{lovePoints}</span>
            </div>
            <div className={styles.statsRow}>
              <span>👯 Friends:</span>
              <span className={styles.friendNumber}>{friendCount}</span>
            </div>
          </div>

          <p className={styles.loveDisclaimer}>
            ❌ Can't buy anything (we're not that serious)<br/>
            ✅ Brag to your friends<br/>
            ✅ Feel loved and appreciated<br/>
            ✅ Get virtual hugs from us! 🤗
          </p>

          <div className={styles.sectionButtons}>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`} 
              onClick={() => {
                playSound('boop');
                addLovePoints();
              }}
            >
              💌 Share Your Link
            </button>
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`} 
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

      {/* ViralScape Promise */}
      <section className={styles.section} id="promise">
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>🤝 GenZee Promise 🤝</h2>
          <div className={styles.waveDivider}></div>
          
          <p className={styles.sectionText}>
            We promise to give you:
          </p>

          <ul className={styles.promiseList}>
            <li>✅ Videos that make you feel something (happy, sad, shocked, whatever!)</li>
            <li>✅ Safe content (no creepy stuff, we promise!)</li>
            <li>✅ AI tools that actually work (most of the time 😅)</li>
            <li>✅ Good vibes and positive energy</li>
            <li>✅ New friends who share your interests</li>
            <li>✅ Virtual love and support! ❤️</li>
            <li>✅ Content that's actually worth your time</li>
            <li>✅ No fake news, no toxicity, just fun!</li>
          </ul>

          <p className={styles.sectionText}>
            That's it! No complicated promises, just good times! 😊
          </p>
        </div>
      </section>

      {/* Penutup Kocak */}
      <section className={styles.section} id="fun">
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>🎉 You Made It! 🎉</h2>
          <div className={styles.waveDivider}></div>
          
          <p className={styles.sectionText}>
            If you're still reading this, you're officially awesome! 🌟
          </p>

          {/* Random Joke */}
          <div className={styles.jokeBox}>
            <h3>Random Joke of the Day:</h3>
            <p className={styles.jokeText}>{joke}</p>
          </div>

          <p className={styles.sectionText}>
            Still here? Here's a virtual cookie! 🍪<br/>
            (You can't eat it, but imagine it's delicious!)
          </p>

          <div className={styles.cookieEmoji}>🍪</div>

          <div className={styles.sectionButtons}>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`} 
              onClick={() => playSound('boop')}
            >
              🚀 Let's Go!
            </button>
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`} 
              onClick={() => playSound('boop')}
            >
              🤖 Try AI Now
            </button>
            <button 
              className={`${styles.btn} ${styles.btnOutline}`} 
              onClick={() => playSound('boop')}
            >
              📺 Watch Videos
            </button>
          </div>

          <p className={styles.footerJoke}>
            P.S. If you see any bugs, just ignore them.<br/>
            They're part of the charm! 🐛✨
          </p>
        </div>
      </section>
    </div>
  );
}