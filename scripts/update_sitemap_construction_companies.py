import os

NEW_CONSTRUCTION_URLS = [
    "https://www.aaraainfrastructure.com/location/chennai/construction-companies",
    "https://www.aaraainfrastructure.com/location/karnataka/construction-companies",
    "https://www.aaraainfrastructure.com/location/delhi/construction-companies",
    "https://www.aaraainfrastructure.com/location/mumbai/construction-companies",
    "https://www.aaraainfrastructure.com/location/andhra-pradesh/construction-companies",
    "https://www.aaraainfrastructure.com/location/thoothukudi/construction-companies",
    "https://www.aaraainfrastructure.com/location/tirunelveli/construction-companies",
    "https://www.aaraainfrastructure.com/location/gadag/construction-companies",
    "https://www.aaraainfrastructure.com/location/kudligi/construction-companies",
    "https://www.aaraainfrastructure.com/location/amaravati/construction-companies",
    "https://www.aaraainfrastructure.com/location/telangana/construction-companies",
    "https://www.aaraainfrastructure.com/location/ncr/construction-companies",
    "https://www.aaraainfrastructure.com/location/tamil-nadu/construction-companies"
]

sitemap_path = "public/sitemap.xml"

with open(sitemap_path, "r", encoding="utf-8") as f:
    content = f.read()

added_count = 0
new_url_blocks = []

for url in NEW_CONSTRUCTION_URLS:
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
    print(f"Added {added_count} new canonical Construction Companies URLs to public/sitemap.xml")
else:
    print("All Construction Companies URLs already exist in public/sitemap.xml")

