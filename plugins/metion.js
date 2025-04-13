const { default: makeWASocket, useSingleFileAuthState, MessageType, Mimetype } = require('@whiskeysockets/baileys');
const fs = require('fs');

const { state, saveState } = useSingleFileAuthState('./auth_info.json');

async function() {
    const sock = makeWASocket({
        auth: state,
    });

    sock.ev.on('creds.update', saveState);

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const messageText = msg.message.conversation || msg.message.extendedTextMessage?.text;

        // Detect @mention
        const mentionedJid = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (mentionedJid && mentionedJid.length > 0) {
            // Send a pre-recorded voice note
            const voiceBuffer = fs.readFileSync('./https://files.catbox.moe/m9vn95.mp3');

            await sock.sendMessage(msg.key.remoteJid, {
                audio: voiceBuffer,
                mimetype: 'audio/ogg; codecs=opus',
                ptt: true, // marks it as a voice note
            });
        }
    });
}
  
