const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "countdown",
    alias: ['count','start'],
    desc: "Start a countdown timer (Owner only)",
    category: "tools",
    react: "⏱️",
    filename: __filename
},
async (conn, m, message, { args, reply, isCreator, isOwner }) => {
    try {
        if (!isCreator) return reply("_*☣️ THIS COMMAND ONLY FOR MOII OWNER!*_");

        let seconds = parseInt(args[0]);
        if (isNaN(seconds) || seconds <= 0) {
            return reply("❌ PLEASE PROVIDE A VALID NUMBER OF SECONDS.");
        }

        reply(`_*☣️ COUNTDOWN STARTED FOR ${seconds} SECONDS...*_`);

        const timer = setInterval(() => {
            seconds--;
            reply(`_*☣️ TIME LEFT: ${seconds} SECONDS*_`);
            if (seconds === 0) {
                clearInterval(timer);
                reply("✅ _*COUNTDOWN FINISHED*_ ☣️");
            }
        }, 1000);
        
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

//FETCH API 
cmd({
    pattern: "fetch",
    alias: ["get", "api"],
    desc: "Fetch data from any URL (JSON, files, etc)",
    category: "tools",
    react: "🌐",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        const q = args.join(" ").trim();
        if (!q) return reply('❌ Please provide a URL.');
        if (!/^https?:\/\//.test(q)) return reply('❌ URL must start with http:// or https://');

        const res = await axios.get(q, { responseType: 'arraybuffer' });
        const contentType = res.headers['content-type'];
        const buffer = Buffer.from(res.data);
        
        const options = { quoted: mek };
        const fileName = `fetched.${contentType.split('/')[1] || 'bin'}`;

        // Handle JSON response
        if (contentType.includes('application/json')) {
            const json = JSON.parse(buffer.toString());
            return conn.sendMessage(from, {
                text: `📦 *Fetched JSON*:\n\`\`\`${JSON.stringify(json, null, 2).slice(0, 2048)}\`\`\``
            }, options);
        }

        // Handle file responses (images, videos, etc.)
        let messageContent = {};
        if (contentType.includes('image')) {
            messageContent.image = buffer;
        } else if (contentType.includes('video')) {
            messageContent.video = buffer;
        } else if (contentType.includes('audio')) {
            messageContent.audio = buffer;
        } else {
            // For unknown or generic files
            const filePath = path.join(__dirname, '..', 'temp', fileName);
            await fs.outputFile(filePath, buffer);
            messageContent.document = fs.readFileSync(filePath);
            messageContent.mimetype = contentType;
            messageContent.fileName = fileName;
        }

        await conn.sendMessage(from, messageContent, options);

    } catch (e) {
        console.error("Fetch Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
