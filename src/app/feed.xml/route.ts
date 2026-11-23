import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/db';
import { INITIAL_PRODUCTS } from '@/lib/initialData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    let products = [];
    try {
      const dbResult = getProducts();
      products = dbResult.products;
    } catch {
      products = INITIAL_PRODUCTS;
    }

    if (!products || products.length === 0) {
      products = INITIAL_PRODUCTS;
    }

    const baseUrl = 'https://www.goyalcollections.shop';

    const escapeXml = (unsafe: string) =>
      (unsafe || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

    const itemsXml = products
      .filter((p) => (p.status || 'active') === 'active')
      .map((p) => {
        const link = `${baseUrl}/product/${p.slug}`;
        const image = p.images?.[0] || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200';
        const availability = (p.stock || 0) > 0 ? 'in_stock' : 'out_of_stock';
        const price = `${p.mrp || p.price} INR`;
        const salePrice = `${p.price} INR`;
        const brand = escapeXml(p.brand || 'GOYAL COLLECTIONS');
        const title = escapeXml(p.name);
        const description = escapeXml(p.description);
        const category = escapeXml(p.categoryTitle || p.category);

        return `    <item>
      <g:id>${escapeXml(p.sku || p.id)}</g:id>
      <g:title>${title}</g:title>
      <g:description>${description}</g:description>
      <g:link>${link}</g:link>
      <g:image_link>${image}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${availability}</g:availability>
      <g:price>${price}</g:price>
      <g:sale_price>${salePrice}</g:sale_price>
      <g:brand>${brand}</g:brand>
      <g:google_product_category>Apparel &amp; Accessories &gt; Clothing</g:google_product_category>
      <g:product_type>${category}</g:product_type>
      <g:shipping>
        <g:country>IN</g:country>
        <g:service>Standard Express</g:service>
        <g:price>0 INR</g:price>
      </g:shipping>
    </item>`;
      })
      .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>GOYAL COLLECTIONS — Google Merchant Product Feed</title>
    <link>${baseUrl}</link>
    <description>Official Google Merchant Center Product Feed for GOYAL COLLECTIONS Luxury Footwear &amp; Ready-made Clothes.</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'no-store, must-revalidate',
      },
    });
  } catch (error: any) {
    return new NextResponse(`Error generating product feed: ${error.message}`, { status: 500 });
  }
}
