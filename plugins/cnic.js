const puppeteer = require('puppeteer');
const { cmd } = require('../command');

cmd({
    pattern: "cnic",
    desc: "Check CNIC Tax Info",
    react: "🧾",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q || !/^\d{13}$/.test(q)) {
            return reply("❗ Please provide a valid 13-digit CNIC.\nExample: `.cnic 3740519463201`");
        }

        const cnic = q;
        const url = `https://famofc.kesug.com/apis/fbi.php?cnic=${cnic}&i=1`;

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'networkidle2' });

        const pageContent = await page.content();

        // Extract JSON from <pre> tag
        const json = await page.evaluate(() => {
            try {
                const pre = document.querySelector("pre");
                if (!pre) return null;
                return JSON.parse(pre.innerText);
            } catch {
                return null;
            }
        });

        await browser.close();

        if (!json || json.status !== "success") {
            return reply("⚠️ No valid data found for this CNIC.");
        }

        const { NTN, Name, ['Tax Office']: TaxOffice, ['Taxpayer Type']: TaxType, timestamp } = json.data;

        const result = `✅ *CNIC Info Found!*

👤 *Name:* ${Name}
🧾 *NTN:* ${NTN}
🏢 *Tax Office:* ${TaxOffice}
📄 *Type:* ${TaxType}
🕒 *Timestamp:* ${timestamp}

🔎 Powered by: AWAIS`;

        return reply(result);

    } catch (e) {
        console.error("CNIC error:", e);
        return reply("❌ Error fetching CNIC info. Try again later.");
    }
});
  
