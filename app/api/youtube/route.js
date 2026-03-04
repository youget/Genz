// app/api/youtube/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || 'shorts viral';
  const pageToken = searchParams.get('pageToken') || '';

  // 1. Ambil IP untuk region (tetap pakai ini biar akurat)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             '8.8.8.8';

  let regionCode = 'US';
  try {
    // ✅ FIX: Hapus spasi berlebih di URL ipapi.co
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoResponse.json();
    if (geoData.country_code) regionCode = geoData.country_code;
  } catch (error) {
    console.log('Geolocation failed, using US');
  }

  // 2. ROTASI 5 API KEYS (Anti Quota Limit)
  const keys = [
    process.env.YOUTUBE_API_KEY_1,
    process.env.YOUTUBE_API_KEY_2,
    process.env.YOUTUBE_API_KEY_3,
    process.env.YOUTUBE_API_KEY_4,
    process.env.YOUTUBE_API_KEY_5
  ].filter(key => key); // Hanya ambil key yang benar-benar ada di Vercel

  if (keys.length === 0) {
    return Response.json({ 
      error: 'YouTube API keys not configured in Vercel Environment Variables' 
    }, { status: 500 });
  }

  // Pilih key berdasarkan menit sekarang (Round Robin)
  const minute = Math.floor(Date.now() / 60000);
  const apiKey = keys[minute % keys.length];

  try {
    // ✅ FIX: Hapus spasi berlebih di URL YouTube API
    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.append('key', apiKey);
    url.searchParams.append('part', 'snippet');
    url.searchParams.append('q', `${query} #shorts`);
    url.searchParams.append('type', 'video');
    url.searchParams.append('videoDuration', 'short');
    url.searchParams.append('maxResults', '50'); // ✅ Kembali ke 50 video
    url.searchParams.append('order', 'rating');
    url.searchParams.append('regionCode', regionCode);
    
    if (pageToken) url.searchParams.append('pageToken', pageToken);

    const response = await fetch(url.toString());
    const data = await response.json();

    // 4. Cek Error dari YouTube
    if (data.error) {
      console.error('YouTube Error:', data.error);
      
      // Handle Quota Exceeded khusus
      if (data.error.code === 403 && data.error.errors?.[0]?.reason === 'quotaExceeded') {
        return Response.json({ 
          error: 'Quota exceeded. Rotating key automatically...', 
          details: data.error.errors 
        }, { status: 429 });
      }

      return Response.json({ 
        error: data.error.message,
        details: data.error.errors 
      }, { status: data.error.code || 500 });
    }

    // 5. Format Data Video
    const videos = data.items
      .filter(item => item.id?.videoId)
      .map(item => ({
        id: item.id.videoId,
        title: item.snippet.title.substring(0, 60),
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        publishedAt: item.snippet.publishedAt
      }));

    return Response.json({
      videos,
      nextPageToken: data.nextPageToken || null,
      region: regionCode.toLowerCase(),
      totalResults: data.pageInfo?.totalResults
    });

  } catch (error) {
    console.error('Fetch Error:', error);
    return Response.json({ 
      error: 'Gagal connect ke YouTube API. Cek logs.' 
    }, { status: 500 });
  }
}
