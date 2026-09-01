import os

NEW_SOLAR_URLS = [
    "https://www.aaraainfrastructure.com/location/chennai/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/delhi/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/mumbai/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/andhra-pradesh/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/gadag/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/amaravati/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/telangana/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/ncr/solar-epc-contractor"
]

sitemap_path = "public/sitemap.xml"

with open(sitemap_path, "r", encoding="utf-8") as f:
    content = f.read()

added_count = 0
new_url_blocks = []

for url in NEW_SOLAR_URLS:
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
    print(f"Added {added_count} new canonical Solar URLs to public/sitemap.xml")
else:
    print("All Solar URLs already exist in public/sitemap.xml")
