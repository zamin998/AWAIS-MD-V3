const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "ss",
  alias: ["ssweb"],
  react: "🔰",
  desc: "WEBSITE SCREENSHOT",
  category: "other",
  use: ".ss (url)",
  filename: __filename,
}, 
async (conn, mek, m, {
  from, l, quoted, body, isCmd, command, args, q, isGroup, sender, 
  senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, 
  groupMetadata, groupName, participants, isItzcp, groupAdmins, 
  isBotAdmins, isAdmins, reply 
}) => {
  if (!q) {
    return reply("PLEASE GIVE URL.");
  }

  try {
    const response = await axios.get(`https://api.davidcyriltech.my.id/ssweb?url=${q}`);
    const screenshotUrl = response.data.screenshotUrl;
    const imageMessage = {
      image: { url: screenshotUrl },
      caption: "*SSWEB DOWNLOADER*\n\n> *ᴀᴡᴀɪs ᴍᴅ*",
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363369260614615@newsletter',
          newsletterName: "ᴀᴡᴀɪs ᴍᴅ",
          serverMessageId: 143,
        },
      },
    };

    await conn.sendMessage(from, imageMessage, { quoted: m });
  } catch (error) {
    console.error(error);
    reply("ERROR PLEASE TRY AGAIN.");
  }
});
