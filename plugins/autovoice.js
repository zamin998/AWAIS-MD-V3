const axios = require('axios');

module.exports = {
  name: 'autovoice',
  type: 'group',
  description: 'Auto sends a voice note on mention',
  disablePrefix: true, // Important for auto execution
  onlyGroup: true,

  async execute(m, { conn }) {
    try {
      // Only trigger when there's a mention
      const mentions = m?.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      if (!mentions.length) return;

      // Your voice note
      const voiceURL = 'https://github.com/Awais-star-a11y/TESTING-REPO/raw/refs/heads/main/VID-20250118-WA0022.mp3';

      const res = await axios.get(voiceURL, { responseType: 'arraybuffer' });

      await conn.sendMessage(m.chat, {
        audio: res.data,
        mimetype: 'audio/mp4',
        ptt: true,
        contextInfo: {
          mentionedJid: mentions
        }
      }, { quoted: m });

    } catch (err) {
      console.error('AutoVoice mention error:', err);
    }
  }
};
