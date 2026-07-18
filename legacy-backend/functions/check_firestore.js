const admin = require("firebase-admin");

admin.initializeApp({
  projectId: "aaraa-infra-web"
});

const db = admin.firestore();

async function checkSubmissions() {
  console.log("=== FETCHING LATEST FIRESTORE SUBMISSIONS ===");

  const collections = ['careers', 'vendor', 'subcontractor', 'partnership', 'joint-venture', 'quick-enquiry', 'contact'];

  for (const col of collections) {
    try {
      const snap = await db.collection("submissions").doc(col).collection("entries")
        .orderBy("timestamp", "desc")
        .limit(3)
        .get();

      if (snap.empty) continue;

      console.log(`\nCollection: submissions/${col}/entries`);
      snap.forEach(doc => {
        const data = doc.data();
        console.log(`- ID: ${doc.id}`);
        console.log(`  Name: ${data.full_name || data.name || data.company || 'N/A'}`);
        console.log(`  Email: ${data.email || 'N/A'}`);
        console.log(`  Timestamp: ${data.timestamp}`);
        console.log(`  Lead Status: ${data.lead_status}`);
        if (data.email_error) {
          console.log(`  Email Error: ${data.email_error}`);
        }
      });
    } catch (err) {
      console.log(`Error reading submissions/${col}/entries:`, err.message);
    }
  }
  console.log("\n=== COMPLETED FETCHING ===");
}

checkSubmissions();
