const { cmd, commands } = require('../command');
const yts = require('yt-search');
const { fetchJson } = require('../lib/functions');

// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return q;
}

cmd({
    pattern: "song2",
    alias: "play",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
 if (!q) return reply("*`Need Title`*");     
 
 q = convertYouTubeLink(q);
        if (!q) return reply("*`Need YT_URL or Title`*");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;
 
let downMsg =`
*DOWNLOADING...📥*
> AWAIS-MD
`;
let upMsg =`
*UPLOADING ...📤*
> AWAIS-MD
`;
const sentMsg = await conn.sendMessage(from, {
            image: { url: data.thumbnail},
            caption: downMsg,
  contextInfo: {
                mentionedJid: ['923196076038@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363369260614615@newsletter',
                    newsletterName: "AWAIS MD",
                    serverMessageId: 999
                }
            }
     }, {quoted: mek});
 const down =  await fetchJson(`https://apis-keith.vercel.app/download/dlmp3?url=${url}`);
 await conn.sendMessage(from, {
      text: upMsg,
      edit: sentMsg.key,
    });
                const laraDown = down.result.downloadUrl; 
                    await conn.sendMessage(from, { 
                        audio: { url: laraDown }, 
                        mimetype: "audio/mpeg",
                        contextInfo: {
                            externalAdReply: {
                                title: "AWAIS-MD",
                                body: "© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴀᴡᴀɪs ᴍᴅ",
                                mediaType: 1,
                                sourceUrl: "https://www.youtube.com",
                                thumbnailUrl: down.result.image, // This should match the image URL provided above
                                renderLargerThumbnail: true,
                                showAdAttribution: true
                            }
                        }
                    
                    }, { quoted: mek });
                    await conn.sendMessage(from, { delete: sentMsg.key });
        
 } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "play3",
    alias: "play3",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        q = convertYouTubeLink(q);
        if (!q) return reply("*`Need YT_URL or Title`*");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = ` *ᴀᴡᴀɪs ᴍᴅ*

>  *TITLE :* ${data.title}
>  *DURATION :* ${data.timestamp}
>  *VIEWS :* ${data.views}
>  *UPLOAD ON :* ${data.ago}


🔢 *REPLY BELOW THE NUMBER TO*
*DOWNLOAD FROMAT*

*1* | *DOWNLOAD AUDIO 🎧*
*2* | *DOWNLOAD DOCUMENT  📁*
*3* | *DOWNLOAD VOICE 🎤*

> AWAIS-MD
`;
let info = `
*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ  ᴀᴡᴀɪs ᴍᴅ · ·*
 `;   
const sentMsg = await conn.sendMessage(from, {
            image: { url: data.thumbnail},
            caption: desc,
  contextInfo: {
                mentionedJid: ['923196076038@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363369260614615@newsletter',
                    newsletterName: "AWAIS-MD",
                    serverMessageId: 999
                }            
            }
     }, {quoted: mek});
     
     const messageID = sentMsg.key.id; // Save the message ID for later reference


        // Listen for the user's response
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;
            const sender = mek.key.participant || mek.key.remoteJid;

            // Check if the message is a reply to the previously sent message
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {
                // React to the user's reply (the "1" or "2" message)

                // React to the upload (sending the file)
                

                if (messageType === '1') {
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
                    const sadee =  await fetchJson(`https://dark-shan-yt.koyeb.app/download/ytmp3?url=${url}`);
                const downSadee = sadee.data.download;
                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });  
                    await conn.sendMessage(from, { 
                        audio: { url: downSadee }, 
                        mimetype: "audio/mpeg" ,
                        contextInfo: {
                            externalAdReply: {
                                title: data.title,
                                body: data.videoId,
                                mediaType: 1,
                                sourceUrl: data.url,
                                thumbnailUrl: data.thumbnail, // This should match the image URL provided above
                                renderLargerThumbnail: true,
                                showAdAttribution: true
                            }
                        }
                    
                    }, { quoted: mek });
                    await conn.sendMessage(from, { delete: sentMsg.key });
                
                } else if (messageType === '2') {
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
                    const sadee =  await fetchJson(`https://dark-shan-yt.koyeb.app/download/ytmp3?url=${url}`);
                const downSadee = sadee.data.download;
                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    await conn.sendMessage(from, {
                        document: { url: downSadee },
                        mimetype: "audio/mp3",
                        fileName: `${data.title}.mp3`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info,
                        contextInfo: {
                            externalAdReply: {
                                title: data.title,
                                body: "AWAISXD",
                                mediaType: 1,
                                sourceUrl: "https://github.com/Awais-star-a11y",
                                thumbnailUrl: "https://github.com/Awais-star-a11y/TESTING-REPO/raw/refs/heads/main/IMG-20250409-WA0093.jpg", // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                                            
                      }, { quoted: mek });
                      await conn.sendMessage(from, { delete: sentMsg.key });
                     } else if (messageType === '3') {
                     await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
                    const sadee =  await fetchJson(`https://dark-shan-yt.koyeb.app/download/ytmp3?url=${url}`);
                const downSadee = sadee.data.download;
                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });  
                    await conn.sendMessage(from, { 
                        audio: { url: downSadee }, 
                        mimetype: "audio/mpeg" ,
                        ptt: "true" ,
                        contextInfo: {
                            externalAdReply: {
                                title: data.title,
                                body: data.videoId,
                                mediaType: 1,
                                sourceUrl: data.url,
                                thumbnailUrl: data.thumbnail, // This should match the image URL provided above
                                renderLargerThumbnail: true,
                                showAdAttribution: true
                            }
                        }
                    
                    }, { quoted: mek });
                    await conn.sendMessage(from, { delete: sentMsg.key }); 
                }
            }
        });
        
 } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
