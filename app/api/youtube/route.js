// app/api/youtube/route.js
// ⚠️ API KEYS HANYA DI Vercel Environment Variables - TIDAK PERNAH DI KODE INI!

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || 'shorts viral';
  const pageToken = searchParams.get('pageToken') || '';

  // Dapatkan IP pengguna untuk geolocation
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             '8.8.8.8';

  // Deteksi region dari IP (fallback ke US jika gagal)
  let regionCode = 'US';
  try {
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoResponse.json();
    regionCode = geoData.country_code || 'US';
  } catch (error) {
    console.log('Geolocation failed, using default US');
  }

  // Rotasi 5 API keys berdasarkan menit sekarang (anti quota limit)
  const keys = [
    process.env.YOUTUBE_API_KEY_1,
    process.env.YOUTUBE_API_KEY_2,
    process.env.YOUTUBE_API_KEY_3,
    process.env.YOUTUBE_API_KEY_4,
    process.env.YOUTUBE_API_KEY_5
  ].filter(key => key); // Hanya ambil keys yang ada

  if (keys.length === 0) {
    return Response.json({ 
      error: 'YouTube API keys not configured in Vercel Environment Variables' 
    }, { status: 500 });
  }

  const minute = Math.floor(Date.now() / 60000);
  const apiKey = keys[minute % keys.length];

  try {
    // YouTube API v3 Search Endpoint
    const youtubeUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    youtubeUrl.searchParams.append('key', apiKey);
    youtubeUrl.searchParams.append('part', 'snippet');
    youtubeUrl.searchParams.append('q', `${query} #shorts`);
    youtubeUrl.searchParams.append('type', 'video');
    youtubeUrl.searchParams.append('videoDuration', 'short'); // <60 seconds
    youtubeUrl.searchParams.append('maxResults', '50');
    youtubeUrl.searchParams.append('order', 'rating'); // Trending by engagement
    youtubeUrl.searchParams.append('regionCode', regionCode);
    youtubeUrl.searchParams.append('relevanceLanguage', regionCode.toLowerCase());
    
    if (pageToken) {
      youtubeUrl.searchParams.append('pageToken', pageToken);
    }

    const response = await fetch(youtubeUrl.toString());
    const data = await response.json();

    if (data.error) {
      console.error('YouTube API Error:', data.error);
      
      // Jika quota exceeded, coba key berikutnya
      if (data.error.code === 403 && data.error.errors?.[0]?.reason === 'quotaExceeded') {
        return Response.json({ 
          error: 'YouTube quota exceeded. Try again in a few minutes.' 
        }, { status: 429 });
      }
      
      return Response.json({ error: data.error.message }, { status: data.error.code || 500 });
    }

    // Format response untuk frontend
    const videos = data.items
      .filter(item => item.id?.videoId) // Hanya ambil video yang valid
      .map(item => ({
        id: item.id.videoId,
        title: item.snippet.title.substring(0, 60), // Potong judul panjang
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium?.url || 
                   item.snippet.thumbnails.default?.url ||
                   'https://via.placeholder.com/320x180/ff6b6b/ffffff?text=GenZee+Vibe',
        publishedAt: item.snippet.publishedAt
      }));

    return Response.json({
      videos,
      nextPageToken: data.nextPageToken || null,
      region: regionCode.toLowerCase(),
      totalResults: data.pageInfo?.totalResults || 0
    });

  } catch (error) {
    console.error('YouTube API Fetch Error:', error);
    return Response.json({ 
      error: 'Failed to fetch vibe. YouTube might be down or quota exceeded.' 
    }, { status: 500 });
  }
}
