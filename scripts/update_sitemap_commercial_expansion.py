import os

NEW_COMMERCIAL_URLS = [
    "https://www.aaraainfrastructure.com/location/chennai/commercial-contractor",
    "https://www.aaraainfrastructure.com/location/karnataka/commercial-contractor",
    "https://www.aaraainfrastructure.com/location/delhi/commercial-contractor",
    "https://www.aaraainfrastructure.com/location/mumbai/commercial-contractor",
    "https://www.aaraainfrastructure.com/location/andhra-pradesh/commercial-contractor",
    "https://www.aaraainfrastructure.com/location/thoothukudi/commercial-contractor",
    "https://www.aaraainfrastructure.com/location/tirunelveli/commercial-contractor",
    "https://www.aaraainfrastructure.com/location/gadag/commercial-contractor",
    "https://www.aaraainfrastructure.com/location/kudligi/commercial-contractor",
    "https://www.aaraainfrastructure.com/location/amaravati/commercial-contractor",
    "https://www.aaraainfrastructure.com/location/telangana/commercial-contractor",
    "https://www.aaraainfrastructure.com/location/ncr/commercial-contractor",
    "https://www.aaraainfrastructure.com/location/tamil-nadu/commercial-contractor"
]

sitemap_path = "public/sitemap.xml"

with open(sitemap_path, "r", encoding="utf-8") as f:
    content = f.read()

added_count = 0
new_url_blocks = []

for url in NEW_COMMERCIAL_URLS:
    if f"<loc>{url}</loc>" not in content:
        url_block = f"""  <url>
    <loc>{url}</loc>
    <lastmod>2026-09-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>"""
        new_url_blocks.append(url_block)
        added_count += 1

if new_url_blocks:
    insertion = "\n" + "\n".join(new_url_blocks) + "\n</urlset>"
    content = content.replace("</urlset>", insertion)
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Added {added_count} new canonical Commercial URLs to public/sitemap.xml")
else:
    print("All Commercial URLs already exist in public/sitemap.xml")

