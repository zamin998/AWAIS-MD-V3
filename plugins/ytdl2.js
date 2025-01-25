const {
  cmd,
  commands
} = require("../command");
const yts = require("yt-search");
const axios = require("axios");
const {
  fetchJson,
  getBuffer
} = require("../lib/functions");

cmd({
    pattern: "song",
    alias: "play",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) {
      return reply("❌ Please provide a title. ❌");
    }

    const searchResults = await yts(q);
    const video = searchResults.videos[0];
    const videoUrl = video.url;
    const videoTitle = video.title.length > 20 ? video.title.substring(0, 20) + "..." : video.title;

    const downloadMessage = `
      ☛AWAIS MD☚
      ╔══════════════════════
      ║🎶 SONG DOWNLOAD 🎶
      ╠══════════════════════
      ║🎧 Song Name - ${videoTitle}
      ╠══════════════════════
      ║⌛ Ready to Download 
      ║Reply Required Format
      ╚══════════════════════
      
      1️⃣ AUDIO  MP3 TYPE 🎶
      2️⃣ AUDIO  DOC TYPE 📂
      3️⃣ AUDIO VOICE MODE 🎤

      > BY AWAIS MD
    `;

    const axiosOptions = { responseType: "arraybuffer" };
    const thumbnailImage = Buffer.from(
      (await axios.get("https://i.imgur.com/XM8Vadf.jpeg", axiosOptions)).data,
      "binary"
    );

    const messageContext = {
      image: { url: video.thumbnail || "https://i.imgur.com/XM8Vadf.jpeg" },
      caption: downloadMessage,
      contextInfo: {
        mentionedJid: [sender],
        externalAdReply: {
          showAdAttribution: true,
          containsAutoReply: true,
          title: "AWAIS MD",
          body: "AWAIS MD",
          previewType: "PHOTO",
          thumbnail: thumbnailImage,
          sourceUrl: "https://whatsapp.com/channel/0029VashGieHAdNP11OHXH3P",
          mediaType: 1,
        },
      },
    };

    const fetchAudio = await fetchJson(`https://dark-shan-yt.koyeb.app/download/ytmp3?url=${videoUrl}`);
    const downloadLink = fetchAudio.data.download;

    const initialMessage = await bot.sendMessage(from, messageContext, { quoted: message });

    bot.ev.on("messages.upsert", async (newMessageEvent) => {
      const newMessage = newMessageEvent.messages[0];

      if (!newMessage.message || !newMessage.message.extendedTextMessage) {
        return;
      }

      const userResponse = newMessage.message.extendedTextMessage.text.trim();
      const contextInfo = newMessage.message.extendedTextMessage.contextInfo;

      if (contextInfo && contextInfo.stanzaId === initialMessage.key.id) {
        try {
          switch (userResponse) {
            case "1":
              await bot.sendMessage(
                from,
                {
                  audio: { url: downloadLink },
                  mimetype: "audio/mpeg",
                  fileName: `${video.title}.mp3`,
                  caption: "*AWAIS MD*",
                },
                { quoted: newMessage }
              );
              break;

            case "2":
              await bot.sendMessage(
                from,
                {
                  document: { url: downloadLink },
                  mimetype: "audio/mpeg",
                  fileName: `${video.title}.mp3`,
                  caption: "*AWAIS MD*",
                },
                { quoted: newMessage }
              );
              break;

            case "3":
              await bot.sendMessage(
                from,
                {
                  audio: { url: downloadLink },
                  mimetype: "audio/mpeg",
                  ptt: true,
                },
                { quoted: newMessage }
              );
              break;

            default:
              reply("❌ Invalid option. Please select a valid option (1, 2, or 3) 🔴");
          }
        } catch (error) {
          console.error(error);
          reply(`❌ Error: ${error.message} ❌`);
        }
      }
    });
  } catch (error) {
    console.error(error);
    reply(`❌ Error: ${error.message} ❌`);
  }
});