const { MessageType, Mimetype } = require('@whiskeysockets/baileys');
const axios = require('axios');

module.exports = {
  name: 'mention-voice',
  description: 'Send random voice note when someone is mentioned in a group',
  type: 'group',
  async execute(m, { conn }) {
    try {
      if (!m.isGroup) return;

      // Mentioned user(s)
      const mentions =
        m.message?.extendedTextMessage?.contextInfo?.mentionedJid ||
        m.message?.contextInfo?.mentionedJid ||
        [];

      if (!mentions.length) return;

      // Tumhare voice links
      const voices = [
        'https://github.com/Awais-star-a11y/TESTING-REPO/raw/main/VID-20250408-WA0005.mp3',
        'https://github.com/Awais-star-a11y/TESTING-REPO/raw/main/VID-20250408-WA0006.mp3'
      ];

      const randomVoice = voices[Math.floor(Math.random() * voices.length)];
      const res = await axios.get(randomVoice, { responseType: 'arraybuffer' });
      const audioBuffer = res.data;

      // Send voice note
      await conn.sendMessage(m.chat, {
        audio: audioBuffer,
        mimetype: 'audio/mp4',
        ptt: true,
        contextInfo: {
          mentionedJid: mentions
        }
      }, { quoted: m });

    } catch (err) {
      console.error('Mention Voice Error:', err);
    }
  }
};
