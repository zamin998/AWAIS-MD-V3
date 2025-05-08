const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "countdown",
    desc: "Start a countdown timer (Owner only)",
    category: "tools",
    react: "⏱️",
    filename: __filename
},
async (conn, m, message, { args, reply, isCreator, isOwner }) => {
    try {
        if (!isCreator) return reply("_*☣️ THIS COMMAND CAN ONLY BE USED BY MY OWNER !*_");

        let seconds = parseInt(args[0]);
        if (isNaN(seconds) || seconds <= 0) {
            return reply("❌ PLEASE PROVIDE A VALID NUMBER OF SECONDS.");
        }

        reply(`☣️ COUNTDOWN STARTED FOR ${seconds} SECONDS...`);

        const timer = setInterval(() => {
            seconds--;
            reply(`⏱️ Time left: ${seconds} seconds`);
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
            
