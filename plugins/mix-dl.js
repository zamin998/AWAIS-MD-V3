const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "fb",
  alias: ["facebook", "fb3", "fbdl"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) {
      return reply("*`Need a valid Facebook URL!`*");
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://lance-frank-asta.onrender.com/api/downloader?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data?.content?.status || !data?.content?.data?.result?.length) {
      throw new Error("Invalid API response or no video found.");
    }

    let videoData = data.content.data.result.find(v => v.quality === "HD") || 
                    data.content.data.result.find(v => v.quality === "SD");

    if (!videoData) {
      throw new Error("No valid video URL found.");
    }

    await conn.sendMessage(from, {
      video: { url: videoData.url },
      caption: `📥 *AWAIS-MD FB DOWNLOADER..🚀*\n\n*QUAILTY•${videoData.quality}*\n\n🔗 *ᴀᴡᴀɪs ᴍᴅ*`
    }, { quoted: m });

  } catch (error) {
    console.error("FB Download Error:", error);

    // Send error details to bot owner
    const ownerNumber = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    await conn.sendMessage(ownerNumber, {
      text: `⚠️ *FB Downloader Error!*\n\n📍 *Group/User:* ${from}\n💬 *Query:* ${q}\n❌ *Error:* ${error.message || error}`
    });

    // Notify the user
    reply("❌ *Error:* Unable to process the request. Please try again later.");
  }
});

cmd({
  'pattern': 'ig4',
  'alias': ["insta"],
  'desc': "To download instagram videos.",
  'react': '🎥',
  'category': "download",
  'filename': __filename
}, async (_0x386562, _0x1b4817, _0x2d5654, {
  from: _0x2b1245,
  quoted: _0x35994d,
  body: _0x3ef60e,
  isCmd: _0x445688,
  command: _0x28d49a,
  args: _0x353941,
  q: _0x133e89,
  isGroup: _0xae87fe,
  sender: _0x2dff22,
  senderNumber: _0x37d5bb,
  botNumber2: _0x49a8d8,
  botNumber: _0x2ef999,
  pushname: _0x535d59,
  isMe: _0x231e91,
  isOwner: _0x299df6,
  groupMetadata: _0x162e52,
  groupName: _0x647ac4,
  participants: _0x5409f2,
  groupAdmins: _0x36386c,
  isBotAdmins: _0x2ec1e7,
  isAdmins: _0x318dfb,
  reply: _0x1bd856
}) => {
  try {
    if (!_0x133e89) {
      return _0x2d5654.reply("Please Give Me a vaild Link...");
    }
    _0x2d5654.react('⬇️');
    let _0x46b060 = await igdl(_0x133e89);
    let _0x2ec7e8 = await _0x46b060.data;
    for (let _0x2c5a94 = 0x0; _0x2c5a94 < 0x14; _0x2c5a94++) {
      let _0x226a29 = _0x2ec7e8[_0x2c5a94];
      let _0x3d32a8 = _0x226a29.url;
      _0x2d5654.react('⬆️');
      await _0x386562.sendMessage(_0x2b1245, {
        'video': {
          'url': _0x3d32a8
        },
        'mimetype': "video/mp4",
        'caption': "*© CREATED BY AWAIS*"
      }, {
        'quoted': _0x1b4817
      });
      _0x2d5654.react('✅');
    }
  } catch (_0x169bd8) {
    console.log(_0x169bd8);
  }
});


cmd({
    pattern: "tiktok",
    alias: ["ttdl", "tk", "tiktokdl", "tt"],
    desc: "Download TikTok video without watermark",
    category: "downloader",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("Please provide a TikTok video link.");
        if (!q.includes("tiktok.com")) return reply("Invalid TikTok link.");
        
        reply("*_AWAIS-MD DOWNLOADING TIKTOK VIDEO , PLEASE WAIT...🚀_*");
        
        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${q}`;
        const { data } = await axios.get(apiUrl);
        
        if (!data.status || !data.data) return reply("Failed to fetch TikTok video.");
        
        const { title, like, comment, share, author, meta } = data.data;
        const videoUrl = meta.media.find(v => v.type === "video").org;
        
        const caption = `🎵 *AWAIS-MD TIKTOK VIDEO* 🎵\n\n` +
                        `👤 *USER:* ${author.nickname} (@${author.username})\n` +
                        `📖 *TITLE:* ${title}\n` +
                        `👍 *LIKES:* ${like}\n💬 *COMMENTS:* ${comment}\n🔁 *SHARES:* ${share}\n\n *©ᴀᴡᴀɪs ᴍᴅ* ♥️`;
        
        await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });
        
    } catch (e) {
        console.error("Error in TikTok downloader command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
          
