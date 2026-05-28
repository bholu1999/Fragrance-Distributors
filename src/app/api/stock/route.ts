import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const url = 'https://www.symphonya.eu/api/getStock/754ad6b8e4c9095a7b30a112cfa6c41543deb3b6';
    const response = await fetch(url, {
      next: { revalidate: 60 } // Cache response for 60 seconds to optimize performance and prevent rate limiting
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch stock from Symphonya: ${response.statusText}`);
    }
    
    const textData = await response.text();
    const rawData = JSON.parse(textData);
    
    if (!rawData.response || !Array.isArray(rawData.response)) {
      throw new Error('Invalid response structure from Symphonya API');
    }
    
    const mappedData = rawData.response.map((item: any) => {
      const priceEur = parseFloat(item.price) + 3;
      const priceUsd = priceEur * 1.17;
      const priceGbp = '£' + (priceEur * 0.866).toFixed(2);
      
      return {
        EAN: item.ean || item['clean-ean'] || '',
        BRAND: (item.brand || '').toUpperCase(),
        STATUS: item.presentation || 'Regular',
        DESCRIPTION: item.name || '',
        'READY QTYS': parseInt(item.stock) || 0,
        'PRICE EUR': parseFloat(priceEur.toFixed(2)),
        'PRICE USD': parseFloat(priceUsd.toFixed(2)),
        'PRICE GBP': priceGbp
      };
    });
    
    return NextResponse.json(mappedData);
  } catch (error: any) {
    console.error('Error fetching stock in Next.js API Route:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
