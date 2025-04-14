const { MessageType, Mimetype } = require('@whiskeysockets/baileys');
const axios = require('axios');

module.exports = {
  name: 'mention-voice',
  description: 'Send random voice note when someone is mentioned in a group',
  type: 'group',
  async execute(m, { conn }) {
    try {
      if (!m.isGroup) return;

      const mentions = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      if (!mentions.length) return;
      const voices = [
        'https://github.com/Awais-star-a11y/TESTING-REPO/raw/refs/heads/main/IMG-20250409-WA0093.jpg',
        'https://github.com/Awais-star-a11y/TESTING-REPO/raw/refs/heads/main/IMG-20250409-WA0093.jpg',
        'https://github.com/Awais-star-a11y/TESTING-REPO/raw/refs/heads/main/IMG-20250409-WA0093.jpg'
      ];
      const randomVoice = voices[Math.floor(Math.random() * voices.length)];
      const response = await axios.get(randomVoice, { responseType: 'arraybuffer' });
      const audioBuffer = response.data
      await conn.sendMessage(m.chat, audioBuffer, MessageType.audio, {
        mimetype: Mimetype.mp4Audio,
        ptt: true,
        quoted: m
      });

    } catch (err) {
      console.error('Error sending mention voice:', err);
    }
  }
};
