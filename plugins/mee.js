const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: 'mee',
  alias: ['Mee'],
  desc: 'Mention user and send voice note',
  category: 'fun',
  react: '🎙️'
}, async (conn, m, { reply }) => {
  const voiceClips = [
    "https://cdn.ironman.my.id/i/7p5plg.mp4",
    "https://cdn.ironman.my.id/i/l4dyvg.mp4",
    "https://cdn.ironman.my.id/i/4z93dg.mp4",
    "https://cdn.ironman.my.id/i/m9gwk0.mp4",
    "https://cdn.ironman.my.id/i/gr1jjc.mp4",
    "https://cdn.ironman.my.id/i/lbr8of.mp4",
    "https://cdn.ironman.my.id/i/0z95mz.mp4",
    "https://cdn.ironman.my.id/i/rldpwy.mp4",
    "https://cdn.ironman.my.id/i/lz2z87.mp4"
  ];

  const randomClip = voiceClips[Math.floor(Math.random() * voiceClips.length)];
  const mentionedUser = m.sender;

  // 🧷 Mention user with text first
  await conn.sendMessage(m.chat, {
    text: `@${mentionedUser.split('@')[0]}`,
    mentions: [mentionedUser]
  });

  // 🎙️ Send Voice Note with Audio Type and Waveform + ExternalAdReply
  await conn.sendMessage(m.chat, {
    audio: { url: randomClip },
    mimetype: 'audio/mp4',
    ptt: true,
    waveform: [99, 0, 99, 0, 99],
    contextInfo: {
      forwardingScore: 55555,
      isForwarded: true,
      externalAdReply: {
        title: "✗ ₊⃗ ₉ ₂ ₃ᷟ ₄ͧ ₂ᷦ ₇ᷧ ₇ͫ ₇ͥ ₆ᷞ ₂ ₁⃖ ₀ ✗",
        body: "𓀂⎋ ᴅᴀᴀʟ🤢کــــؔـــر🙌🏻ᴛᴇʀᴀ💃🏻عشــــؔـــق🪽ꜱʜᴀᴘᴀʀ🚮میــــؔـــں⚠️ʙᴀʜᴏᴛ📡دور🔖ᴘʜᴇɴᴋ🖐🏿آئــــؔـــے🔥ʜᴀɪ ᭄𓀂 ❥⇷𝙓3𝙊𝙣⇸❥",
        mediaType: 4,
        thumbnailUrl: "https://cdn.ironman.my.id/i/yewsfo.jpg",
        mediaUrl: "https://www.instagram.com/officialbaloch003/profilecard/?igsh=MXY3bnZibWNhMnN5MQ==",
        sourceUrl: "https://Wa.me/923182832887",
        showAdAttribution: true
      }
    },
    mentions: [mentionedUser]
  });
});
