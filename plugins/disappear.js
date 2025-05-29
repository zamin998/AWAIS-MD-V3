const config = require('../config');
const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');

// Duration constants in seconds
const WA_DEFAULT_EPHEMERAL_24H = 86400;  // 24 hours
const WA_DEFAULT_EPHEMERAL_7D = 604800;  // 7 days
const WA_DEFAULT_EPHEMERAL_90D = 7776000; // 90 days

cmd({
    pattern: "disappear",
    react: "🌪️",
    alias: ["dm"],
    desc: "Turn on/off disappearing messages.",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from, isGroup, isAdmins, args }) => {
    if (!isGroup) {
        await conn.sendMessage(from, { text: 'This command can only be used in groups.' });
        return;
    }
    
    if (!isAdmins) {
        await conn.sendMessage(from, { text: 'Only admins can turn on/off disappearing messages.' });
        return;
    }

    const action = args[0];

    if (action === 'on') {
        const duration = args[1];
        let ephemeralDuration;

        switch (duration) {
            case '24h':
                ephemeralDuration = WA_DEFAULT_EPHEMERAL_24H;
                break;
            case '7d':
                ephemeralDuration = WA_DEFAULT_EPHEMERAL_7D;
                break;
            case '90d':
                ephemeralDuration = WA_DEFAULT_EPHEMERAL_90D;
                break;
            default:
                await conn.sendMessage(from, { text: 'Invalid duration! Use `24h`, `7d`, or `90d`.' });
                return;
        }

        // Turn on disappearing messages with the specified duration
        await conn.sendMessage(
            from,
            { disappearingMessagesInChat: ephemeralDuration }
        );
        await conn.sendMessage(from, { text: `Disappearing messages are now ON for ${duration}.` });
    } else if (action === 'off') {
        // Turn off disappearing messages
        await conn.sendMessage(
            from,
            { disappearingMessagesInChat: false }
        );
        await conn.sendMessage(from, { text: 'Disappearing messages are now OFF.' });
    } else {
        await conn.sendMessage(from, { text: 'Please use `!disappear on <duration>` or `!disappear off`.' });
    }
});

// Command to send a disappearing message
cmd({
    pattern: "senddm",
    react: "🌪️",
    alias: ["senddisappear"],
    desc: "Send a disappearing message.",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from, isGroup, isAdmins, args }) => {
    if (!isGroup) {
        await conn.sendMessage(from, { text: 'This command can only be used in groups.' });
        return;
    }
    
    if (!args.length) {
        await conn.sendMessage(from, { text: 'Please provide a message to send.' });
        return;
    }

    const message = args.join(' '); // Join the args to create the message text

    // Send the disappearing message
    await conn.sendMessage(from, { text: message }, { ephemeralExpiration: WA_DEFAULT_EPHEMERAL_7D }); // Default duration is set to 7 days
});

//CREATED BY AWAIS XD IF YOU WANT COPY PLUGIN THEN GIVE CREATED 
