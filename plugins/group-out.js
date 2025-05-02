const { cmd } = require('../command');

cmd({
    pattern: "out",
    alias: ["dafa", "nikalo"],
    desc: "Removes all members with specific country code from the group",
    category: "admin",
    react: "🔪",
    filename: __filename
},
async (conn, mek, m, {
    from, q, isGroup, isBotAdmins, reply, groupMetadata, senderNumber
}) => {
    // Check if the command is used in a group
    if (!isGroup) return reply("THIS COMMAND ONLY FOR GROUP");

    // Get the bot owner's number dynamically from conn.user.id
    const botOwner = conn.user.id.split(":")[0];
    if (senderNumber !== botOwner) {
        return reply("ONLY BOT OWNER CAN USE THIS COMMAND");
    }

    // Check if the bot is an admin
    if (!isBotAdmins) return reply("give me admin first😒");

    if (!q) return reply("PROVIDE COUNTY CODE LIKE .DAFA 92");

    const countryCode = q.trim();
    if (!/^\d+$/.test(countryCode)) {
        return reply("🔪WRONG COUNTY CODE. PLEASE PROVIDE ONLY NUMBERS (e.g., 92 FOR +92 NUMBERS)");
    }

    try {
        const participants = await groupMetadata.participants;
        const targets = participants.filter(
            participant => participant.id.startsWith(countryCode) && 
                         !participant.admin // Don't remove admins
        );

        if (targets.length === 0) {
            return reply(`NO MEMBERS FOUND WITH COUNTRY CODE +${countryCode}`);
        }

        const jids = targets.map(p => p.id);
        await conn.groupParticipantsUpdate(from, jids, "remove");
        
        reply(`✅REMOVED DONE ${targets.length} MEMBERS WITH COUNTRY CODE +${countryCode}`);
    } catch (error) {
        console.error("Out command error:", error);
        reply("❌ Failed to remove members. Error: " + error.message);
    }
});
