const config = require('../config');
const { cmd } = require('../command');

cmd({
  name: 'mee',
  command: ['mee', 'Mee'],
  description: 'Mention user and send voice note',
  async execute(m, sock) {
    const voiceUrl = 'https://github.com/Awais-star-a11y/TESTING-REPO/raw/refs/heads/main/VID-20250118-WA0022.mp3';
    const mentionedUser = m.sender;

    // Mention the user
    await sock.sendMessage(m.chat, {
      text: `@${mentionedUser.split('@')[0]}`,
      mentions: [mentionedUser]
    });

    // Send the voice message
    await sock.sendMessage(m.chat, {
      audio: { url: voiceUrl },
      mimetype: 'audio/mp4',
      ptt: true,
      mentions: [mentionedUser]
    });
  }
};
