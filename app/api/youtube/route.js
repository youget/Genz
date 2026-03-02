// app/api/youtube/route.js
import { NextResponse } from 'next/server';

// Helper: Rotasi 5 API keys berdasarkan timestamp
function getApiKey() {
  const keys = [
    process.env.YOUTUBE_API_KEY_1,
    process.env.YOUTUBE_API_KEY_2,
    process.env.YOUTUBE_API_KEY_3,
    process.env.YOUTUBE_API_KEY_4,
    process.env.YOUTUBE_API_KEY_5
  ];
  
  // Round-robin berdasarkan menit sekarang
  const minute = Math.floor(Date.now() / 60000);
  return keys[minute % keys.length];
}

// Helper: Deteksi region dari IP
async function getRegionFromIP(ip) {
  try {
    // Gunakan free geolocation API
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    return data.country_code?.toLowerCase() || 'us';
  } catch (error) {
    console.log('Geolocation failed, using default US');
    return 'us';
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || 'shorts viral funny';
  const pageToken = searchParams.get('pageToken') || '';
  
  // Dapatkan IP pengguna
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             '8.8.8.8';
  
  // Deteksi region
  const regionCode = await getRegionFromIP(ip);
  
  // Pilih API key
  const apiKey = getApiKey();
  if (!apiKey) {
    return NextResponse.json({ error: 'YouTube API keys not configured' }, { status: 500 });
  }
  
  try {
    // YouTube API v3 Search Endpoint
    const youtubeUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    youtubeUrl.searchParams.append('key', apiKey);
    youtubeUrl.searchParams.append('part', 'snippet');
    youtubeUrl.searchParams.append('q', `${query} #shorts`);
    youtubeUrl.searchParams.append('type', 'video');
    youtubeUrl.searchParams.append('videoDuration', 'short'); // Under 60 seconds
    youtubeUrl.searchParams.append('maxResults', '50');
    youtubeUrl.searchParams.append('order', 'rating'); // Trending by engagement
    youtubeUrl.searchParams.append('regionCode', regionCode.toUpperCase());
    youtubeUrl.searchParams.append('relevanceLanguage', regionCode);
    
    if (pageToken) {
      youtubeUrl.searchParams.append('pageToken', pageToken);
    }
    
    const response = await fetch(youtubeUrl.toString());
    const data = await response.json();
    
    if (data.error) {
      console.error('YouTube API Error:', data.error);
      return NextResponse.json({ error: data.error.message }, { status: data.error.code || 500 });
    }
    
    // Format response untuk frontend
    const videos = data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
      region: regionCode
    }));
    
    return NextResponse.json({
      videos,
      nextPageToken: data.nextPageToken || null,
      region: regionCode,
      totalResults: data.pageInfo.totalResults
    });
    
  } catch (error) {
    console.error('YouTube API Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
