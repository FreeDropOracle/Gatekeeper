import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GateKeeper/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch URL');
    }

    const html = await response.text();

    // Extract title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // Extract description
    const descMatch =
      html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
    const description = descMatch ? descMatch[1] : '';

    // Extract favicon
    const faviconMatch =
      html.match(/<link[^>]*rel=["'](shortcut icon|icon)["'][^>]*href=["']([^"']+)["']/i) ||
      html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["'](shortcut icon|icon)["']/i);
    let favicon = faviconMatch ? faviconMatch[2] || faviconMatch[1] : '';

    if (favicon && !favicon.startsWith('http')) {
      const urlObj = new URL(url);
      favicon = urlObj.origin + favicon;
    }

    return NextResponse.json({
      title: title || url,
      description: description || '',
      favicon: favicon || '',
      url,
    });
  } catch (error) {
    console.error('Metadata fetch error:', error);
    return NextResponse.json(
      {
        title: url,
        description: '',
        favicon: '',
        url,
      },
      { status: 200 }
    );
  }
}
