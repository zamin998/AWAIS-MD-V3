const axios = require('axios');

module.exports = {
  name: 'mention-voice',
  description: 'Auto send voice note when someone is mentioned in group',
  type: 'group',
  async execute(m, { conn }) {
    try {
      if (!m.isGroup) return;

      const mentions =
        m.message?.extendedTextMessage?.contextInfo?.mentionedJid ||
        m.message?.contextInfo?.mentionedJid || [];

      if (!mentions.length) return;

      const voiceLink = 'https://github.com/Awais-star-a11y/TESTING-REPO/raw/refs/heads/main/VID-20250118-WA0022.mp3';
      const response = await axios.get(voiceLink, { responseType: 'arraybuffer' });
      const audioBuffer = response.data;

      await conn.sendMessage(m.chat, {
        audio: audioBuffer,
        mimetype: 'audio/mp4',
        ptt: true,
        contextInfo: {
          mentionedJid: mentions
        }
      }, { quoted: m });

    } catch (err) {
      console.error('Mention Voice Plugin Error:', err);
    }
  }
};
