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
    "https://cdn.ironman.my.id/i/rnptgd.mp4",
    "https://cdn.ironman.my.id/i/smsl2s.mp4",
    "https://cdn.ironman.my.id/i/vkvh1d.mp4",
    "https://cdn.ironman.my.id/i/9xp5lb.mp4",
    "https://cdn.ironman.my.id/i/jfr6cu.mp4",
    "https://cdn.ironman.my.id/i/l4dyvg.mp4",
    "https://cdn.ironman.my.id/i/4z93dg.mp4",
    "https://files.catbox.moe/j27hyg",
    "https://cdn.ironman.my.id/i/m9gwk0.mp4",
    "https://cdn.ironman.my.id/i/gr1jjc.mp4",
    "https://cdn.ironman.my.id/i/lbr8of.mp4",
    "https://cdn.ironman.my.id/i/0z95mz.mp4",
    "https://cdn.ironman.my.id/i/rldpwy.mp4",
    "https://cdn.ironman.my.id/i/lz2z87.mp4",
    "https://cdn.ironman.my.id/i/gg5jct.mp4"
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
        title: "𓆩𝑨𝑾𝑨𝑰𝑺𝑿𝑫𓆪",
        body: "𝐓𝝰̚𝐠͜͡𝗲 𝝪𝐨̚𝝻͜͡𝐫 𝐋𝝾̚𝝼͜͡𝗲 :🦚🍬⛱️🎗️💖",
        mediaType: 4,
        thumbnailUrl: "https://github.com/Awais-star-a11y/TESTING-REPO/raw/refs/heads/main/IMG-20250409-WA0093.jpg",
        sourceUrl: "https://Wa.me/923182832887",
        showAdAttribution: true
      }
    },
    mentions: [mentionedUser]
  });
});
//CODES BY AWAISXD
