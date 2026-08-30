import os
import glob

target_str = '<a href="https://www.aaraainfrastructure.com/" class="topbar-link"><i class="fa-solid fa-house"></i> Main Website</a>'

location_dir = os.path.join(os.getcwd(), "legacy-pages", "location")
html_files = glob.glob(os.path.join(location_dir, "**", "*.html"), recursive=True)

updated_count = 0

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    if target_str in content:
        content = content.replace(target_str, "")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        updated_count += 1
        print(f"Removed 'Main Website' link from: {os.path.relpath(file_path)}")

print(f"Successfully removed 'Main Website' link from {updated_count} files.")
