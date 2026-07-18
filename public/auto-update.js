/*!
 * AARAA Auto Update Script
 * Version 1.0
 * Works with GitHub + Cloudflare
 */

(() => {
    "use strict";

    // Configuration
    const VERSION_URL = "/version.json";
    const CHECK_INTERVAL = 30000; // 30 seconds

    let currentVersion = null;

    async function checkForUpdates() {
        try {
            const response = await fetch(
                VERSION_URL + "?t=" + Date.now(),
                {
                    cache: "no-store",
                    headers: {
                        "Cache-Control": "no-cache"
                    }
                }
            );

            if (!response.ok) return;

            const data = await response.json();

            if (!data.version) return;

            // First load
            if (currentVersion === null) {
                currentVersion = data.version;
                console.log("Website Version:", currentVersion);
                return;
            }

            // New deployment detected
            if (currentVersion !== data.version) {

                console.log("New Version Found:", data.version);

                const update = confirm(
                    "🚀 A new version of this website is available.\n\nClick OK to refresh."
                );

                if (update) {
                    window.location.reload();
                }
            }

        } catch (error) {
            console.warn("Auto Update Error:", error);
        }
    }

    // Initial check
    checkForUpdates();

    // Continue checking
    setInterval(checkForUpdates, CHECK_INTERVAL);

})();