import os
import glob
import re
from html.parser import HTMLParser

LOCATIONS = [
    "karnataka", "delhi", "mumbai", "andhra-pradesh", "tuticorin", "thoothukudi",
    "tirunelveli", "gadag", "kudligi", "amaravati", "telangana", "ncr", "tamil-nadu"
]

class SEOAuditParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = None
        self.meta_desc = None
        self.h1 = None
        self.canonical = None
        self.in_title = False
        self.in_h1 = False

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == "title":
            self.in_title = True
        elif tag == "h1":
            self.in_h1 = True
        elif tag == "meta":
            if attrs_dict.get("name", "").lower() == "description":
                self.meta_desc = attrs_dict.get("content")
        elif tag == "link":
            if attrs_dict.get("rel", "").lower() == "canonical":
                self.canonical = attrs_dict.get("href")

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        elif tag == "h1":
            self.in_h1 = False

    def handle_data(self, data):
        if self.in_title:
            self.title = (self.title or "") + data.strip()
        elif self.in_h1:
            self.h1 = (self.h1 or "") + data.strip()

results = []

for loc in LOCATIONS:
    pattern = f"legacy-pages/location/{loc}/*.html"
    files = glob.glob(pattern)
    for fpath in files:
        with open(fpath, "r", encoding="utf-8") as f:
            html = f.read()
        parser = SEOAuditParser()
        parser.feed(html)
        rel_path = os.path.relpath(fpath, "legacy-pages").replace("\\", "/")
        results.append({
            "location": loc,
            "path": f"/{rel_path.replace('.html', '')}",
            "file": fpath,
            "title": parser.title,
            "h1": parser.h1,
            "canonical": parser.canonical,
            "meta_desc": parser.meta_desc
        })

print("=== EXISTING SEO AUDIT FOR TARGET LOCATIONS ===")
for r in results:
    print(f"URL: {r['path']}")
    print(f"  Title: {r['title']}")
    print(f"  H1: {r['h1']}")
    print(f"  Canonical: {r['canonical']}")
    print("-" * 50)
