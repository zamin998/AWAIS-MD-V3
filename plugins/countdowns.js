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
            
