import os
import glob
import re

location_dir = os.path.join(os.getcwd(), "legacy-pages", "location")
html_files = glob.glob(os.path.join(location_dir, "**", "*.html"), recursive=True)

print(f"Found {len(html_files)} HTML files in legacy-pages/location/")

updated_count = 0

for file_path in html_files:
    rel_path = os.path.relpath(file_path, os.path.join(os.getcwd(), "legacy-pages"))
    # Clean URL path: e.g. location/thoothukudi/solar-epc-contractor
    clean_path = "/" + rel_path.replace("\\", "/").replace(".html", "")
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = content
    
    # Replace all proposal / quick-enquiry links with contact-us?ref=<clean_path>
    new_link = f"https://www.aaraainfrastructure.com/contact-us?ref={clean_path}"
    
    # Regex replace any quick-enquiry or forms link
    new_content = re.sub(
        r'href=["\']https://www\.aaraainfrastructure\.com/aaraa-forms/[^"\']+["\']',
        f'href="{new_link}"',
        new_content
    )
    
    # Also update topbar contact-us link to include ?ref=
    topbar_target = 'href="https://www.aaraainfrastructure.com/contact-us" class="topbar-link topbar-btn"'
    topbar_replace = f'href="https://www.aaraainfrastructure.com/contact-us?ref={clean_path}" class="topbar-link topbar-btn"'
    new_content = new_content.replace(topbar_target, topbar_replace)

    if new_content != content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        updated_count += 1
        print(f"Updated links in: {rel_path} -> ?ref={clean_path}")

print(f"Successfully updated proposal links in {updated_count} files.")
