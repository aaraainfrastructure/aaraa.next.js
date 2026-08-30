import urllib.request
import urllib.parse
import re
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

BASE_URL = "http://localhost:3007"

TARGET_URLS = [
    "/location/thoothukudi/solar-epc-contractor",
    "/location/kudligi/solar-epc-contractor",
    "/location/chennai/epc-contractor",
    "/location/hosur/industrial-construction-contractors",
    "/location/karnataka/solar-epc-contractor",
    "/location/maharashtra/institutional-building-contractor",
    "/location/chennai/commercial-building-contractors",
    "/location/tamil-nadu/civil-infrastructure-companies",
    "/location/andhra-pradesh/epc-contractors",
    "/location/tamil-nadu/solar-epc-contractor",
    "/location/tirunelveli/solar-epc-contractor",
    "/location/bengaluru/commercial-building-contractors",
    "/location/mumbai/commercial-building-contractors",
    "/location/telangana/epc-contractor",
    "/location/ncr/industrial-construction-contractors"
]

print("=== STARTING HTTP POST-BUILD AUDIT ===")

class SimpleHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = None
        self.meta_desc = None
        self.robots = None
        self.canonical = None
        self.h1 = None
        self.schemas = []
        self.links = []
        self.in_title = False
        self.in_h1 = False
        self.in_script = False

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if tag == "title":
            self.in_title = True
        elif tag == "h1":
            self.in_h1 = True
        elif tag == "meta":
            name = attr_dict.get("name", "").lower()
            if name == "description":
                self.meta_desc = attr_dict.get("content")
            elif name == "robots":
                self.robots = attr_dict.get("content")
        elif tag == "link":
            rel = attr_dict.get("rel", "").lower()
            if rel == "canonical":
                self.canonical = attr_dict.get("href")
        elif tag == "a":
            href = attr_dict.get("href")
            if href:
                self.links.append(href)
        elif tag == "script":
            stype = attr_dict.get("type", "")
            if "ld+json" in stype:
                self.in_script = True

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        elif tag == "h1":
            self.in_h1 = False
        elif tag == "script":
            self.in_script = False

    def handle_data(self, data):
        if self.in_title:
            self.title = (self.title or "") + data
        elif self.in_h1:
            self.h1 = (self.h1 or "") + data
        elif self.in_script:
            self.schemas.append(data.strip())

results = {}

for path in TARGET_URLS:
    url = BASE_URL + path
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 SEO-Auditor'})
        with urllib.request.urlopen(req) as resp:
            status = resp.status
            html = resp.read().decode('utf-8')
            
            parser = SimpleHTMLParser()
            parser.feed(html)
            
            results[path] = {
                'status': status,
                'html_length': len(html),
                'title': parser.title.strip() if parser.title else None,
                'meta_desc': parser.meta_desc.strip() if parser.meta_desc else None,
                'robots': parser.robots.strip() if parser.robots else None,
                'canonical': parser.canonical.strip() if parser.canonical else None,
                'h1': parser.h1.strip() if parser.h1 else None,
                'schemas': parser.schemas,
                'links': parser.links,
                'raw_html': html
            }
            print(f"[SUCCESS] {path} returned HTTP {status}")
    except Exception as e:
        print(f"[ERROR] fetching {path}: {e}")

print("\n=== TESTING DUPLICATE URL VARIANTS & REDIRECTS ===")
duplicate_test_paths = [
    "/location/thoothukudi/solar-epc-contractor.html",
    "/location/kudligi/solar-epc-contractor.html",
    "/location/chennai/epc-contractor.html",
    "/location/hosur/industrial-construction-contractors.html",
    "/location/thoothukudi/solar-epc-contractor/",
    "/location/kudligi/solar-epc-contractor/",
    "/location/chennai/epc-contractor/",
    "/location/hosur/industrial-construction-contractors/"
]

class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = urllib.request.build_opener(NoRedirectHandler())

for dup_path in duplicate_test_paths:
    url = BASE_URL + dup_path
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 SEO-Auditor'})
        resp = opener.open(req)
        print(f"[DUP CHECK] {dup_path} returned HTTP {resp.status}")
    except urllib.error.HTTPError as e:
        print(f"[DUP REDIRECT/ERROR] {dup_path} returned HTTP {e.code}")

print("\n=== VERIFYING SITEMAP.XML VALIDITY ===")
sitemap_path = "public/sitemap.xml"
try:
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    urls_in_sitemap = [elem.text.strip() for elem in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    
    print(f"[SUCCESS] Sitemap XML is valid. Total URLs: {len(urls_in_sitemap)}")
    
    for path in TARGET_URLS:
        full_canonical = "https://www.aaraainfrastructure.com" + path
        if full_canonical in urls_in_sitemap:
            print(f"[SITEMAP MATCH] {full_canonical} is present in sitemap.xml")
        else:
            print(f"[SITEMAP MISSING] {full_canonical} NOT found in sitemap.xml")
except Exception as e:
    print(f"[SITEMAP ERROR] {e}")

print("\n=== VERIFYING ROBOTS.TXT ===")
try:
    with open("public/robots.txt", "r") as f:
        robots_txt = f.read()
    print("robots.txt Content snippet:")
    print(robots_txt[:300])
except Exception as e:
    print(f"[ROBOTS ERROR] {e}")

print("\n=== CONTENT SIMILARITY CHECK ===")
def get_words(text):
    return set(re.findall(r'\b[a-zA-Z]{4,}\b', text.lower()))

texts = {path: data['raw_html'] for path, data in results.items()}
paths = list(texts.keys())

for i in range(len(paths)):
    for j in range(i+1, len(paths)):
        p1, p2 = paths[i], paths[j]
        w1, w2 = get_words(texts[p1]), get_words(texts[p2])
        jaccard = len(w1 & w2) / len(w1 | w2)
        print(f"Jaccard word similarity between {p1} and {p2}: {jaccard:.2%}")

print("\n=== DETAILED POST-BUILD AUDIT SUMMARY ===")
for path, data in results.items():
    print(f"\n--- URL: https://www.aaraainfrastructure.com{path} ---")
    print(f"HTTP Status: {data['status']}")
    print(f"Title: {data['title']}")
    print(f"Meta Description: {data['meta_desc']}")
    print(f"Robots: {data['robots']}")
    print(f"Canonical: {data['canonical']}")
    print(f"H1: {data['h1']}")
    print(f"JSON-LD Schemas Found: {len(data['schemas'])}")
    print(f"Internal Links Found: {len(data['links'])}")

