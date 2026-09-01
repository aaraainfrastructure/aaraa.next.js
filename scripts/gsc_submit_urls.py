import os
import json
import requests
from google.oauth2 import service_account
from google.auth.transport.requests import Request

SERVICE_ACCOUNT_FILE = "service_account.json"
SCOPES = [
    "https://www.googleapis.com/auth/webmasters",
    "https://www.googleapis.com/auth/indexing"
]

TARGET_URLS = [
    "https://www.aaraainfrastructure.com/location/thoothukudi/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/kudligi/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/chennai/epc-contractor",
    "https://www.aaraainfrastructure.com/location/hosur/industrial-construction-contractors",
    "https://www.aaraainfrastructure.com/location/karnataka/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/maharashtra/institutional-building-contractor",
    "https://www.aaraainfrastructure.com/location/chennai/commercial-building-contractors",
    "https://www.aaraainfrastructure.com/location/tamil-nadu/civil-infrastructure-companies",
    "https://www.aaraainfrastructure.com/location/andhra-pradesh/epc-contractors",
    "https://www.aaraainfrastructure.com/location/tamil-nadu/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/tirunelveli/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/bengaluru/commercial-building-contractors",
    "https://www.aaraainfrastructure.com/location/mumbai/commercial-building-contractors",
    "https://www.aaraainfrastructure.com/location/telangana/epc-contractor",
    "https://www.aaraainfrastructure.com/location/ncr/industrial-construction-contractors",
    "https://www.aaraainfrastructure.com/location/karnataka/epc-contractor",
    "https://www.aaraainfrastructure.com/location/delhi/epc-contractor",
    "https://www.aaraainfrastructure.com/location/mumbai/epc-contractor",
    "https://www.aaraainfrastructure.com/location/tuticorin/epc-contractor",
    "https://www.aaraainfrastructure.com/location/tirunelveli/epc-contractor",
    "https://www.aaraainfrastructure.com/location/gadag/epc-contractor",
    "https://www.aaraainfrastructure.com/location/kudligi/epc-contractor",
    "https://www.aaraainfrastructure.com/location/amaravati/epc-contractor",
    "https://www.aaraainfrastructure.com/location/ncr/epc-contractor",
    "https://www.aaraainfrastructure.com/location/tamil-nadu/epc-contractor",
    "https://www.aaraainfrastructure.com/location/chennai/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/delhi/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/mumbai/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/andhra-pradesh/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/gadag/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/amaravati/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/telangana/solar-epc-contractor",
    "https://www.aaraainfrastructure.com/location/ncr/solar-epc-contractor"
]

print("=== STARTING GOOGLE SEARCH CONSOLE & INDEXING API SUBMISSION ===")

try:
    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )
    # Refresh OAuth token using requests transport
    credentials.refresh(Request())
    access_token = credentials.token
    print(f"[OK] Successfully generated access token for: {credentials.service_account_email}")
except Exception as e:
    print(f"[FAIL] Failed to generate OAuth access token: {e}")
    exit(1)

headers = {
    "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json"
}

# 1. Submit Sitemap to Google Search Console via REST API
print("\n--- 1. Submitting Sitemap to Search Console ---", flush=True)
properties = [
    "sc-domain:aaraainfrastructure.com",
    "https://www.aaraainfrastructure.com/"
]

sitemap_url = "https://www.aaraainfrastructure.com/sitemap.xml"

for prop in properties:
    encoded_prop = requests.utils.quote(prop, safe="")
    encoded_sitemap = requests.utils.quote(sitemap_url, safe="")
    api_url = f"https://www.googleapis.com/webmasters/v3/sites/{encoded_prop}/sitemaps/{encoded_sitemap}"
    try:
        res = requests.put(api_url, headers=headers, timeout=5)
        if res.status_code in [200, 204]:
            print(f"[OK] Sitemap successfully submitted to GSC property '{prop}'", flush=True)
        else:
            print(f"  Note for property '{prop}': HTTP {res.status_code} - {res.text}", flush=True)
    except Exception as err:
        print(f"  Note for property '{prop}': {err}", flush=True)

# 2. Submit URLs to Google Indexing API v3 via REST API
print(f"\n--- 2. Submitting {len(TARGET_URLS)} Canonical URLs to Google Indexing API v3 ---", flush=True)
indexing_api_endpoint = "https://indexing.googleapis.com/v3/urlNotifications:publish"

success_count = 0
for idx, target_url in enumerate(TARGET_URLS, 1):
    payload = {
        "url": target_url,
        "type": "URL_UPDATED"
    }
    try:
        res = requests.post(indexing_api_endpoint, json=payload, headers=headers, timeout=5)
        if res.status_code == 200:
            print(f"  [{idx}/{len(TARGET_URLS)}] [OK] Submitted: {target_url}", flush=True)
            success_count += 1
        else:
            print(f"  [{idx}/{len(TARGET_URLS)}] [FAIL] HTTP {res.status_code} for {target_url}: {res.text}", flush=True)
    except Exception as err:
        print(f"  [{idx}/{len(TARGET_URLS)}] [FAIL] Exception for {target_url}: {err}", flush=True)

print(f"\n[OK] Indexing API Submission Complete: {success_count}/{len(TARGET_URLS)} URLs successfully notified to Googlebot.", flush=True)
print("=== SUBMISSION COMPLETE ===", flush=True)
